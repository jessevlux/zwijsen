# Zwijsen PoC 

Prototype voor werkboek-bibliotheek, importflow en interactieve oefeningen. **Geen backend:** state staat in het geheugen en kan optioneel in `**localStorage`** worden bewaard.

**Team-overdracht en architectuur:** `[HANDOVER.md](./HANDOVER.md)` · **Cursor-agents:** `[AGENTS.md](./AGENTS.md)`

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


| Modus                     | Navigatie                      | Startscherm                                                                             |
| ------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| **Redacteur** (standaard) | Start, Bibliotheek, Importeren | CTAs naar bibliotheek en import; korte verwijzing naar voorbeeldoefeningen via Leerling |
| **Leerling**              | Logo + drie oefening-tabs      | Grid met drie demo-oefeningen                                                           |


Schakel tussen **Leerling** en **Redacteur** rechtsboven in de topbalk. In Leerling-modus zijn bibliotheek en import niet bereikbaar via de UI; bij overschakelen wordt zo nodig naar het startscherm gegaan.

- **Bibliotheek:** voorbeeldwerkboek met opdrachten en player voor echte contenttypes.
- **Importeren:** wizard (PDF wordt nog niet geparsed; opdrachten starten leeg).
- **Demo-oefeningen:** Conceptkaart, Swipe-kaarten, Raad & Coach — eigen voorbeelddata in `examples.ts` per component.

De footer met PoC-/human-in-the-loop-regel hoort bij **Redacteur**; er is geen apart redacteur-zijpaneel meer.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion, `@xyflow/react` (conceptkaart), Lucide-icons.

## Verdere documentatie

- Routelogica en types: zie `[HANDOVER.md](./HANDOVER.md)`.
- Requirements-context: `[../kennis/Requirements op basis van de analyses.pdf](../kennis/Requirements%20op%20basis%20van%20de%20analyses.pdf)` (repo-root).

