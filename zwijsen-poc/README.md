# Zwijsen PoC

Prototype voor een **stand-alone webpagina** waar **leerlingen** werkboek-oefeningen en interactieve oefeningen kunnen doen. Redacteursfuncties (bibliotheek, begeleide import) zijn secundair en bereikbaar via de modusschakelaar.

**Geen backend:** state staat in het geheugen en kan optioneel in **localStorage** worden bewaard.

**Team-overdracht en architectuur:** [HANDOVER.md](./HANDOVER.md) · **Cursor-agents:** [AGENTS.md](./AGENTS.md)

## Vereisten

- Node.js met npm (LTS aanbevolen)

## Commando’s

```bash
cd zwijsen-poc
npm install
npm run dev      # http://localhost:5173 (poort kan afwijken)
npm run build    # productiebuild
npm run preview  # lokale preview van de build
npm run lint     # ESLint
```

## Wat zit erin?

| Modus | Navigatie | Startscherm |
| ----- | --------- | ------------- |
| **Leerling** (standaard bij openen) | Logo + drie demo-tabs | Grid met drie demo-oefeningen (conceptkaart / swipe / raad & coach) |
| **Redacteur** | Start, Bibliotheek, Importeren | CTAs naar bibliotheek en import; uitleg leerling-focus en begeleide import |

Schakel rechtsboven tussen **Leerling** en **Redacteur**. In leerlingmodus zijn bibliotheek en import niet via de topnav bereikbaar; bij overschakelen naar leerling wordt zo nodig naar het startscherm gegaan.

- **Bibliotheek:** voorbeeldwerkboek _Taaljacht — Groep 8 — Vloggen_ met **acht** opdrachten (drie met werkende UI, vijf placeholders voor het team).
- **Werkboek-flow (leerling):** intro → zelfevaluatie (emoji-rubric) → opdrachtenkaarten → player.
- **Importeren:** wizard met expliciete verwachting: **begeleide / semi-automatische** flow — geen volledig automatische, foutloze PDF-conversie; output is bedoeld als **gestructureerde** data (o.a. vraag, antwoord, brontekst), zie [HANDOVER.md](./HANDOVER.md).
- **Demo-oefeningen:** los van de bibliotheek — zelfde drie interactieve concepten via de welkomst-tabs.

De footer met PoC-/human-in-the-loop hoort bij **Redacteur**. Visuele **brand guide** van de klant: nog niet toegepast; volgende iteratie zodra aangeleverd.

## Voor groepsgenoten: nieuwe opdrachttypes

Vijf opdrachten staan klaar als **lege** items in het Vloggen-werkboek (`meerkeuze`, `koppelen-lijnen`, `invullen-zin`, `markeren`, `tabel-invullen`). Volledige specs, datacontract-schetsen, UI-conventies en Definition of Done staan in [HANDOVER.md — Vijf nieuwe opdrachttypes](./HANDOVER.md#vijf-nieuwe-opdrachttypes--specs). Wijs per type één eigenaar toe vóór je begint.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion, `@xyflow/react` (conceptkaart), Lucide-icons.

## Verdere documentatie

- Routelogica, domein, stijl en team-taken: [HANDOVER.md](./HANDOVER.md).
- Requirements-context: [../kennis/Requirements op basis van de analyses.pdf](../kennis/Requirements%20op%20basis%20van%20de%20analyses.pdf) (repo-root).
