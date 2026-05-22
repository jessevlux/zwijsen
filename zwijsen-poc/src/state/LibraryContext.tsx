import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Exercise, Workbook } from "../types/workbook";
import {
  createTestExtractedWorkbook,
  createVloggenExampleWorkbook,
  EXAMPLE_TEST_WORKBOOK_ID,
  EXAMPLE_VLOGGEN_WORKBOOK_ID,
} from "../library/seedWorkbook";

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

  // Voeg het Test-werkboek toe als het in localStorage nog ontbreekt.
  if (!next.some((wb) => wb.id === EXAMPLE_TEST_WORKBOOK_ID)) {
    next.push(createTestExtractedWorkbook());
    changed = true;
  }

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
    return [createVloggenExampleWorkbook(), createTestExtractedWorkbook()];
  });

  const addWorkbook = useCallback((w: Workbook) => {
    setWorkbooks((prev) => {
      const next = [...prev, w];
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

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
