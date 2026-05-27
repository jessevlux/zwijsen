/** Korte ondertitel op opdrachtkaarten (leerlingmodus). */
export const VLOGGEN_STUDENT_SUBTITLES: Record<string, string> = {
  "ex-vlog-concept-kaart": "Verbind woorden die bij je vlog horen",
  "ex-vlog-swipe": "Kies het woord dat in de zin past",
  "ex-vlog-koppel-betekenis": "Leg lijnen tussen woord en betekenis",
  "ex-vlog-mk-recensie": "Kies het juiste antwoord",
  "ex-vlog-tabel-brainstorm": "Vul je vlogplan stap voor stap in",
  "ex-vlog-invullen-taal": "Vul het ontbrekende woord in",
  "ex-vlog-markeren-oordeel": "Markeer recensie en beoordeling in de zin",
  "ex-vlog-raad-coach": "Raad het woord met hints van de coach",
};

export function getStudentExerciseSubtitle(exerciseId: string, pageNumber: number): string {
  return VLOGGEN_STUDENT_SUBTITLES[exerciseId] ?? `Pagina ${pageNumber}`;
}
