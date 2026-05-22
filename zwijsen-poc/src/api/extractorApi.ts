/**
 * Taaljacht Extractor API Client
 * ================================
 * Plain fetch wrappers for the FastAPI server.
 *
 * Set VITE_API_URL in your .env (or .env.local) to point at the Python server:
 *   VITE_API_URL=http://192.168.1.42:8000
 *
 * Falls back to localhost:8000 if not set.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// ============================================================
// TYPES
// ============================================================

/** Status of a single extraction job as returned by the server. */
export interface JobStatus {
  job_id: string;
  status: "processing" | "done" | "error";
  pdf_name: string;
  grade: string;
  created_at: string;
  error: string | null;
  files: string[];
}

/** A completed workbook entry from GET /workbooks. */
export interface Workbook {
  job_id: string;
  pdf_name: string;
  grade: string;
  created_at: string;
  files: string[];
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Upload a PDF to the extraction server.
 * Returns immediately with a job_id — the pipeline runs in the background.
 *
 * @param file  - The PDF file to process.
 * @param grade - Grade label for the concept-kaart themeLabel, e.g. "Groep 8".
 */
export async function uploadPdf(
  file: File,
  grade: string = "Groep 8",
): Promise<{ job_id: string; status: string }> {
  const form = new FormData();
  form.append("file", file);
  form.append("grade", grade);

  const res = await fetch(`${API_BASE}/process`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Upload failed (${res.status}): ${body}`);
  }

  return res.json();
}

/**
 * Poll the status of a running extraction job.
 * Call this on an interval until status is "done" or "error".
 */
export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`);

  if (!res.ok) {
    throw new Error(`Status check failed (${res.status})`);
  }

  return res.json();
}

/**
 * Fetch an output JSON file from a completed job.
 *
 * @param jobId    - The job that produced the file.
 * @param filename - e.g. "woordenlijst.json", "lessen.json", or "conceptkaart.json"
 * @returns Parsed JSON content of the file.
 */
export async function getOutputFile<T = unknown>(jobId: string, filename: string): Promise<T> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/files/${filename}`);

  if (!res.ok) {
    throw new Error(`File fetch failed (${res.status}): ${filename}`);
  }

  return res.json();
}

/**
 * List all previously completed workbooks.
 * Use this on app startup to show what's already been processed.
 */
export async function listWorkbooks(): Promise<Workbook[]> {
  const res = await fetch(`${API_BASE}/workbooks`);

  if (!res.ok) {
    throw new Error(`Workbook list failed (${res.status})`);
  }

  return res.json();
}
