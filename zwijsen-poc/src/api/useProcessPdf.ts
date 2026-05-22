/**
 * useProcessPdf
 * ==============
 * React hook that wraps the full upload → poll → fetch flow
 * into a single `process(file, grade)` call.
 *
 * Usage:
 *   const { status, error, woordenlijst, lessen, conceptkaart, process, reset } = useProcessPdf();
 *
 *   // In a file input handler:
 *   const onFileSelected = (file: File) => process(file, "Groep 7");
 *
 *   // In your JSX:
 *   if (status === "processing") return <Spinner />;
 *   if (status === "done") return <ConceptKaart data={conceptkaart} />;
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { uploadPdf, getJobStatus, getOutputFile } from "./extractorApi";

// ============================================================
// TYPES
// ============================================================

type Status = "idle" | "uploading" | "processing" | "fetching" | "done" | "error";

interface ProcessState {
  /** Current phase of the pipeline. */
  status: Status;
  /** Server-assigned job ID (available once uploading completes). */
  jobId: string | null;
  /** Human-readable error message if something went wrong. */
  error: string | null;
  /** Parsed woordenlijst.json — null until the pipeline finishes. */
  woordenlijst: unknown | null;
  /** Parsed lessen.json — null until the pipeline finishes. */
  lessen: unknown | null;
  /** Parsed conceptkaart.json — null until the pipeline finishes. */
  conceptkaart: unknown | null;
}

const INITIAL_STATE: ProcessState = {
  status: "idle",
  jobId: null,
  error: null,
  woordenlijst: null,
  lessen: null,
  conceptkaart: null,
};

/** How often to check if the server is done processing (ms). */
const POLL_INTERVAL_MS = 3_000;

// ============================================================
// HOOK
// ============================================================

export function useProcessPdf() {
  const [state, setState] = useState<ProcessState>(INITIAL_STATE);

  // Keep a ref to the poll timer so we can clean it up.
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up polling on unmount to prevent memory leaks.
  useEffect(() => {
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, []);

  /**
   * Upload a PDF and wait for the extraction pipeline to finish.
   * Updates `status` through each phase so the UI can react.
   *
   * @param file  - The PDF to process.
   * @param grade - Grade label, e.g. "Groep 8". Passed to the server
   *                for the concept-kaart themeLabel.
   */
  const process = useCallback(async (file: File, grade: string = "Groep 8") => {
    // Clear any leftover state from a previous run.
    if (pollTimer.current) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }

    try {
      // ---- Phase 1: Upload the PDF ----
      setState((s) => ({ ...s, status: "uploading", error: null }));
      const { job_id } = await uploadPdf(file, grade);
      setState((s) => ({ ...s, status: "processing", jobId: job_id }));

      // ---- Phase 2: Poll until "done" or "error" ----
      await new Promise<void>((resolve, reject) => {
        pollTimer.current = setInterval(async () => {
          try {
            const job = await getJobStatus(job_id);

            if (job.status === "done") {
              clearInterval(pollTimer.current!);
              pollTimer.current = null;
              resolve();
            } else if (job.status === "error") {
              clearInterval(pollTimer.current!);
              pollTimer.current = null;
              reject(new Error(job.error ?? "Pipeline failed on the server."));
            }
            // Otherwise still "processing" — keep polling.
          } catch (err) {
            // Network error during poll — stop and surface it.
            clearInterval(pollTimer.current!);
            pollTimer.current = null;
            reject(err);
          }
        }, POLL_INTERVAL_MS);
      });

      // ---- Phase 3: Fetch the output JSONs ----
      setState((s) => ({ ...s, status: "fetching" }));

      const [woordenlijst, lessen, conceptkaart] = await Promise.all([
        getOutputFile(job_id, "woordenlijst.json"),
        getOutputFile(job_id, "lessen.json"),
        // conceptkaart.json may not exist if the workbook had fewer than
        // 8 valid words. Catch the 404 and set it to null instead of
        // failing the entire flow.
        getOutputFile(job_id, "conceptkaart.json").catch(() => null),
      ]);

      setState((s) => ({
        ...s,
        status: "done",
        woordenlijst,
        lessen,
        conceptkaart,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  }, []);

  /** Reset back to idle. Cancels any in-flight polling. */
  const reset = useCallback(() => {
    if (pollTimer.current) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
    setState(INITIAL_STATE);
  }, []);

  return { ...state, process, reset };
}
