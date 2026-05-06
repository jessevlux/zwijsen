import type { BookSide } from "../../../types/workbook";
import type { Exercise } from "../../../types/workbook";
import type { SourceText } from "../../../types/workbook";

export interface ImportDraft {
  title: string;
  grade: string;
  side: BookSide;
  pages: number;
  fileName: string | null;
  fileSize: number | null;
  exercises: Exercise[];
  sources: SourceText[];
}
