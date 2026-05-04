/** Achtergrond voor stapkaarten: zelfde kleur als accent, oplopende menging met wit. */
export function stepCardBackground(accent: string, index: 0 | 1 | 2): string {
  const mix = [9, 15, 22][index];
  return `color-mix(in srgb, ${accent} ${mix}%, white)`;
}

/** Rand iets sterker per stap, nog steeds dezelfde tintfamilie. */
export function stepCardBorder(accent: string, index: 0 | 1 | 2): string {
  const mix = [20, 26, 32][index];
  return `color-mix(in srgb, ${accent} ${mix}%, white)`;
}
