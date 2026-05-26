/**
 * useServerImport
 * ===============
 * On app startup, ask the extraction server whether it has finished
 * workbooks the webapp hasn't imported yet, and pull them in.
 *
 * Rules (see product decision):
 *   - Server unreachable  → do nothing (leave existing data untouched).
 *   - Server has no data  → do nothing.
 *   - Workbook without a conceptkaart.json → skipped (concept-kaart is the
 *     only extraction type the UI can render today).
 *   - Already-imported workbooks (matched by job_id) → skipped.
 *
 * Anything that goes wrong is swallowed: a flaky server must never break
 * the library or change what the user already has.
 */

import { useEffect, useRef } from "react";
import { listWorkbooks, getOutputFile, type Workbook as ServerWorkbook } from "./extractorApi";
import type { ConceptKaartContent } from "../types/exerciseContent";
import type { Workbook } from "../types/workbook";

/** localStorage/library id derived from a server job, so imports are idempotent. */
const EXTRACTED_ID_PREFIX = "wb-extracted-";

export function extractedWorkbookId(jobId: string): string {
  return EXTRACTED_ID_PREFIX + jobId;
}

/**
 * Tolerant check for a concept-kaart output. Matches bare names ("conceptkaart.json")
 * and paths ("<job>/conceptkaart.json"). If the server sends no files hint at all,
 * we return true and let the fetch below decide (a 404 is then handled gracefully).
 */
function mentionsConceptkaart(files: string[] | undefined): boolean {
  if (!files || files.length === 0) return true;
  return files.some((f) => f.endsWith("conceptkaart.json"));
}

/** Only import a card that actually has the words + pairs the canvas needs. */
function isRenderableConceptkaart(content: unknown): content is ConceptKaartContent {
  if (!content || typeof content !== "object") return false;
  const c = content as Partial<ConceptKaartContent>;
  return Array.isArray(c.words) && Array.isArray(c.pairs);
}

function buildWorkbook(meta: ServerWorkbook, content: ConceptKaartContent): Workbook {
  const id = extractedWorkbookId(meta.job_id);
  const title = meta.pdf_name?.replace(/\.pdf$/i, "").trim() || "Geïmporteerd werkboek";
  return {
    id,
    title,
    grade: meta.grade || "Onbekend",
    side: "taakboekje",
    pages: 1,
    origin: "imported",
    importedAt: meta.created_at || new Date().toISOString(),
    exercises: [
      {
        id: `ex-${meta.job_id}-conceptkaart`,
        workbookId: id,
        pageNumber: 1,
        type: "concept-kaart",
        difficulty: "b",
        isPlus: false,
        isOwnAnswer: false,
        // Guarantee a valid discriminant regardless of what the server serialized.
        content: { ...content, type: "concept-kaart" },
      },
    ],
    sources: [],
  };
}

/**
 * @param onImport       - Called once with the freshly built workbooks to merge
 *                         into the library. Not called if there's nothing new.
 * @param getExistingIds - Returns the set of workbook ids currently in the
 *                         library, so we can skip ones already imported.
 */
export function useServerImport(
  onImport: (workbooks: Workbook[]) => void,
  getExistingIds: () => Set<string>,
) {
  const ran = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode's double-invoke in development.
    if (ran.current) return;
    ran.current = true;

    void (async () => {
      let serverWorkbooks: ServerWorkbook[];
      try {
        serverWorkbooks = await listWorkbooks();
      } catch {
        // Server not running / unreachable — nothing changes.
        console.debug("[serverImport] server unreachable — leaving existing data unchanged");
        return;
      }

      if (serverWorkbooks.length === 0) {
        console.debug("[serverImport] server has no workbooks — nothing to import");
        return;
      }

      const existing = getExistingIds();
      const fresh = serverWorkbooks.filter(
        (wb) =>
          !existing.has(extractedWorkbookId(wb.job_id)) && mentionsConceptkaart(wb.files),
      );

      if (fresh.length === 0) {
        console.debug("[serverImport] no new concept-kaart workbooks to import");
        return;
      }

      const built: Workbook[] = [];
      for (const meta of fresh) {
        try {
          const content = await getOutputFile<ConceptKaartContent>(meta.job_id, "conceptkaart.json");
          if (isRenderableConceptkaart(content)) {
            built.push(buildWorkbook(meta, content));
          } else {
            console.debug(`[serverImport] ${meta.job_id}: conceptkaart.json missing words/pairs — skipped`);
          }
        } catch {
          // No card for this job (404) or a bad file — skip it, keep the rest.
          console.debug(`[serverImport] ${meta.job_id}: no readable conceptkaart.json — skipped`);
        }
      }

      if (built.length > 0) {
        console.debug(`[serverImport] importing ${built.length} workbook(s) from server`);
        onImport(built);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
