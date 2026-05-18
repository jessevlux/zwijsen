# AGENTS — AI-sessies op deze repo

- Lees eerst **[`HANDOVER.md`](./HANDOVER.md)** voor architectuur, domeinmodellen en het recept om nieuwe oefeningen toe te voegen.
- Bij een **nieuw opdrachttype**: lees eerst de HANDOVER-sectie van dat type (meerkeuze, koppelen-lijnen, invullen-zin, markeren, tabel-invullen) en gebruik **ConceptKaart**, **SwipeKaarten** of **RaadCoach** als referentie voor mapstructuur, `ConceptIntro`/`ConceptHeader` en stijl (`toneTokens`, `zwijsenTokens`).
- Zoek in de codebase op **`TODO(handover)`** voor bewust opengehouden extensiepunten (PDF-parser, AI, persistentie).
- De app draait in **`zwijsen-poc/`**; start met `npm run dev` vanuit die map.

Conventies: geen secrets in git; API-keys horen server-side. Frontend-flow is leidend tot er een backend is.
