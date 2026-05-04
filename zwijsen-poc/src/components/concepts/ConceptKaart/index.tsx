import { useState } from "react";
import InventoryPanel from "./InventoryPanel";
import SemanticCanvas from "./SemanticCanvas";
import { inventoryWords } from "./data";

export default function ConceptKaart() {
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex h-full overflow-hidden">
      <InventoryPanel words={inventoryWords} usedWordIds={usedWordIds} />
      <SemanticCanvas
        inventoryWords={inventoryWords}
        onUsedWordsChange={setUsedWordIds}
      />
    </div>
  );
}
