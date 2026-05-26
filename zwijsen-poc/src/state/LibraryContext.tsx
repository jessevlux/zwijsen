import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Exercise, Workbook } from "../types/workbook";
import {
  createVloggenExampleWorkbook,
  EXAMPLE_VLOGGEN_WORKBOOK_ID,
} from "../library/seedWorkbook";
import { useServerImport } from "../api/useServerImport";

const STORAGE_KEY = "zwijsen.library.workbooks.v1";

function loadWorkbooksFromStorage(): Workbook[] | null {
  // TODO(handover): vervang door API-persistentie; localStorage is alleen PoC-demo.
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Workbook[];
  } catch {
    return null;
  }
}

function saveWorkbooksToStorage(workbooks: Workbook[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workbooks));
  } catch {
    /* ignore quota */
  }
}

/** Oude localStorage: vul rubricGoals en ontbrekende seed-opdrachten/bronteksten aan. */
function mergeStoredWorkbooks(stored: Workbook[]): Workbook[] {
  const seed = createVloggenExampleWorkbook();
  let changed = false;

  const next: Workbook[] = stored.map((wb) => {
    if (wb.id !== EXAMPLE_VLOGGEN_WORKBOOK_ID) return wb;

    let workbook = wb;
    const seedGoals = seed.rubricGoals;
    if (seedGoals?.length && (!workbook.rubricGoals || workbook.rubricGoals.length === 0)) {
      workbook = { ...workbook, rubricGoals: seedGoals };
      changed = true;
    }

    const existingIds = new Set(workbook.exercises.map((e) => e.id));
    const missingExercises = seed.exercises.filter((e) => !existingIds.has(e.id));
    if (missingExercises.length > 0) {
      workbook = {
        ...workbook,
        exercises: [...workbook.exercises, ...missingExercises],
      };
      changed = true;
    }

    const existingSourceIds = new Set(workbook.sources.map((s) => s.id));
    const missingSources = seed.sources.filter((s) => !existingSourceIds.has(s.id));
    if (missingSources.length > 0) {
      workbook = {
        ...workbook,
        sources: [...workbook.sources, ...missingSources],
      };
      changed = true;
    }

    return workbook;
  });

  if (changed) {
    saveWorkbooksToStorage(next);
  }
  return next;
}

interface LibraryContextValue {
  workbooks: Workbook[];
  addWorkbook: (w: Workbook) => void;
  updateExercise: (workbookId: string, exercise: Exercise) => void;
  removeWorkbook: (id: string) => void;
  getWorkbook: (id: string) => Workbook | undefined;
  findExercise: (exerciseId: string) => { exercise: Exercise; workbook: Workbook } | undefined;
}

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [workbooks, setWorkbooks] = useState<Workbook[]>(() => {
    const stored = loadWorkbooksFromStorage();
    if (stored?.length) return mergeStoredWorkbooks(stored);
    return [createVloggenExampleWorkbook()];
  });

  // Keep a live snapshot of ids so the startup server-import can skip
  // workbooks we already have without re-fetching their files.
  const workbooksRef = useRef(workbooks);
  useEffect(() => {
    workbooksRef.current = workbooks;
  }, [workbooks]);

  const addWorkbook = useCallback((w: Workbook) => {
    setWorkbooks((prev) => {
      const next = [...prev, w];
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  // Merge server-imported workbooks, deduped against current state.
  const mergeImportedWorkbooks = useCallback((incoming: Workbook[]) => {
    setWorkbooks((prev) => {
      const ids = new Set(prev.map((w) => w.id));
      const toAdd = incoming.filter((w) => !ids.has(w.id));
      if (toAdd.length === 0) return prev;
      const next = [...prev, ...toAdd];
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  useServerImport(
    mergeImportedWorkbooks,
    useCallback(() => new Set(workbooksRef.current.map((w) => w.id)), []),
  );

  const updateExercise = useCallback((workbookId: string, exercise: Exercise) => {
    setWorkbooks((prev) => {
      const next = prev.map((wb) =>
        wb.id !== workbookId
          ? wb
          : {
              ...wb,
              exercises: wb.exercises.map((e) => (e.id === exercise.id ? exercise : e)),
            },
      );
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  const removeWorkbook = useCallback((id: string) => {
    setWorkbooks((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  const getWorkbook = useCallback((id: string) => workbooks.find((w) => w.id === id), [workbooks]);

  const findExercise = useCallback(
    (exerciseId: string) => {
      for (const wb of workbooks) {
        const exercise = wb.exercises.find((e) => e.id === exerciseId);
        if (exercise) return { exercise, workbook: wb };
      }
      return undefined;
    },
    [workbooks],
  );

  const value = useMemo(
    () => ({
      workbooks,
      addWorkbook,
      updateExercise,
      removeWorkbook,
      getWorkbook,
      findExercise,
    }),
    [workbooks, addWorkbook, updateExercise, removeWorkbook, getWorkbook, findExercise],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
