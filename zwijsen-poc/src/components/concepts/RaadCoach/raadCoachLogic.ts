export const ROUND_START_SCORE = 100;
export const LETTER_HINT_COST = 15;
export const CONTEXT_HINT_COST = 25;
export const WRONG_GUESS_PENALTY = 5;
export const STREAK_BONUS = 5;
export const STREAK_BONUS_AT = 2;

export function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

export function normalizeAnswer(s: string): string {
  return stripAccents(s.trim().toLowerCase());
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) row[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n];
}

export function isGuessCorrect(guess: string, targetWord: string): boolean {
  const g = normalizeAnswer(guess);
  const t = normalizeAnswer(targetWord);
  if (g.length === 0) return false;
  if (g === t) return true;
  return levenshtein(g, t) <= 1;
}

export function maskWordInContext(sentence: string, word: string): string {
  const w = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return sentence.replace(new RegExp(w, "gi"), "____");
}
