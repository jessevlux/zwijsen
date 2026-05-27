import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Exercise, Workbook } from "../types/workbook";
import {
  createVloggenExampleWorkbook,
  EXAMPLE_VLOGGEN_WORKBOOK_ID,
} from "../library/seedWorkbook";

const STORAGE_KEY = "zwijsen.library.workbooks.v2";

/** Oude opdracht-id's — sync naar huidige seed (één opdracht per type). */
const LEGACY_VLOGGEN_EXERCISE_IDS = new Set([
  "ex-example-concept-kaart",
  "ex-example-swipe",
  "ex-example-raad-coach",
  "ex-example-meerkeuze",
  "ex-example-koppelen",
  "ex-example-invullen-zin",
  "ex-example-markeren",
  "ex-example-tabel",
  // Verwijderd bij terugbrengen naar 8 opdrachten (dubbele types):
  "ex-vlog-koppel-vlogtermen",
  "ex-vlog-mk-vlogsoorten",
  "ex-vlog-mk-vlogdoel",
  "ex-vlog-invullen-vlog",
  "ex-vlog-markeren-positief",
  "ex-vlog-tabel-team",
  "ex-vlog-koppel-tonen",
  "ex-vlog-invullen-plan",
  "ex-vlog-markeren-kritisch",
  "ex-vlog-tabel-uitrusting",
]);

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

function spansEqual(
  a: { start: number; end: number }[],
  b: { start: number; end: number }[],
): boolean {
  if (a.length !== b.length) return false;
  return a.every((s, i) => s.start === b[i].start && s.end === b[i].end);
}

/** True when content is an old placeholder ({ type only }) or otherwise unusable. */
function exerciseNeedsSeedSync(stored: Exercise, seed: Exercise): boolean {
  if (!seed.content) return false;
  if (!stored.content) return true;
  if (stored.content.type !== seed.content.type) return true;
  if (!("brief" in stored.content) || !stored.content.brief) return true;
  if (seed.variants?.length && !stored.variants?.length) return true;
  if (stored.content?.type === "tabel-invullen" && seed.content?.type === "tabel-invullen") {
    if (seed.content.openAnswers !== stored.content.openAnswers) return true;
    if (seed.content.rows.length !== stored.content.rows.length) return true;
  }
  if (stored.content?.type === "markeren" && seed.content?.type === "markeren") {
    if (stored.content.text !== seed.content.text) return true;
    if (stored.content.instruction !== seed.content.instruction) return true;
    if (
      JSON.stringify(stored.content.markingLabel) !== JSON.stringify(seed.content.markingLabel)
    ) {
      return true;
    }
    if (!spansEqual(stored.content.correctSpans, seed.content.correctSpans)) return true;
  }
  return false;
}

function vloggenSeedStructureOutdated(
  workbook: Workbook,
  seed: Workbook,
): boolean {
  const wbIds = workbook.exercises.map((e) => e.id);
  if (wbIds.some((id) => LEGACY_VLOGGEN_EXERCISE_IDS.has(id))) return true;
  const seedIdSet = new Set(seed.exercises.map((e) => e.id));
  if (wbIds.length !== seed.exercises.length) return true;
  return wbIds.some((id) => !seedIdSet.has(id));
}

/** Oude localStorage: sync rubric, bronnen en volledige opdrachtenlijst met seed. */
function mergeStoredWorkbooks(stored: Workbook[]): Workbook[] {
  const seed = createVloggenExampleWorkbook();
  let changed = false;

  const next = stored.map((wb) => {
    if (wb.id !== EXAMPLE_VLOGGEN_WORKBOOK_ID) return wb;

    if (vloggenSeedStructureOutdated(wb, seed)) {
      changed = true;
      return {
        ...wb,
        pages: seed.pages,
        intro: seed.intro,
        rubricGoals: seed.rubricGoals,
        exercises: seed.exercises.map((e) => ({ ...e, workbookId: wb.id })),
        sources: seed.sources,
      };
    }

    let workbook = wb;
    if (seed.intro && !workbook.intro) {
      workbook = { ...workbook, intro: seed.intro };
      changed = true;
    }

    const seedGoals = seed.rubricGoals;
    if (
      seedGoals?.length &&
      (!workbook.rubricGoals || workbook.rubricGoals.length === 0)
    ) {
      workbook = { ...workbook, rubricGoals: seedGoals };
      changed = true;
    }

    const seedById = new Map(seed.exercises.map((e) => [e.id, e]));
    let exercisesSynced = false;
    const syncedExercises = workbook.exercises.map((ex) => {
      const seedEx = seedById.get(ex.id);
      if (!seedEx || !exerciseNeedsSeedSync(ex, seedEx)) return ex;
      exercisesSynced = true;
      return { ...seedEx, workbookId: workbook.id };
    });

    if (exercisesSynced) {
      changed = true;
      workbook = { ...workbook, exercises: syncedExercises };
    }

    const existingIds = new Set(workbook.exercises.map((e) => e.id));
    const missingExercises = seed.exercises.filter(
      (e) => !existingIds.has(e.id),
    );
    if (missingExercises.length > 0) {
      workbook = {
        ...workbook,
        exercises: [...workbook.exercises, ...missingExercises],
      };
      changed = true;
    }

    const existingSourceIds = new Set(workbook.sources.map((s) => s.id));
    const missingSources = seed.sources.filter(
      (s) => !existingSourceIds.has(s.id),
    );
    if (missingSources.length > 0) {
      workbook = {
        ...workbook,
        sources: [...workbook.sources, ...missingSources],
      };
      changed = true;
    }

    if (workbook.pages !== seed.pages) {
      workbook = { ...workbook, pages: seed.pages };
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
  findExercise: (
    exerciseId: string,
  ) => { exercise: Exercise; workbook: Workbook } | undefined;
}

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [workbooks, setWorkbooks] = useState<Workbook[]>(() => {
    const stored = loadWorkbooksFromStorage();
    if (stored?.length) return mergeStoredWorkbooks(stored);
    return [createVloggenExampleWorkbook()];
  });

  const addWorkbook = useCallback((w: Workbook) => {
    setWorkbooks((prev) => {
      const next = [...prev, w];
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  const updateExercise = useCallback(
    (workbookId: string, exercise: Exercise) => {
      setWorkbooks((prev) => {
        const next = prev.map((wb) =>
          wb.id !== workbookId
            ? wb
            : {
                ...wb,
                exercises: wb.exercises.map((e) =>
                  e.id === exercise.id ? exercise : e,
                ),
              },
        );
        saveWorkbooksToStorage(next);
        return next;
      });
    },
    [],
  );

  const removeWorkbook = useCallback((id: string) => {
    setWorkbooks((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWorkbooksToStorage(next);
      return next;
    });
  }, []);

  const getWorkbook = useCallback(
    (id: string) => workbooks.find((w) => w.id === id),
    [workbooks],
  );

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
    [
      workbooks,
      addWorkbook,
      updateExercise,
      removeWorkbook,
      getWorkbook,
      findExercise,
    ],
  );

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
