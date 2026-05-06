import type { CorrectPair, Relation } from "../../../types/content";

export function validateConnection(
  word1: string,
  word2: string,
  relation: Relation,
  pairs: CorrectPair[],
): boolean {
  return pairs.some((pair) => {
    const directMatch =
      pair.word1 === word1 && pair.word2 === word2 && pair.relation === relation;
    const reverseMatch =
      pair.bidirectional &&
      pair.word1 === word2 &&
      pair.word2 === word1 &&
      pair.relation === relation;
    return directMatch || reverseMatch;
  });
}
