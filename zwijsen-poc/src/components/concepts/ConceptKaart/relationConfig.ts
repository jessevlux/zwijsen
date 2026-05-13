import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, Boxes, Lightbulb, Link2 } from "lucide-react";
import type { Relation } from "../../../types/content";
import { zwijsenTokens as Z } from "../../../theme/zwijsenTokens";

export const relations: {
  value: Relation;
  label: string;
  Icon: LucideIcon;
  color: string;
}[] = [
  { value: "synoniem", label: "Synoniem", Icon: Link2, color: Z.relationSynoniem },
  { value: "tegenstelling", label: "Tegenstelling", Icon: ArrowLeftRight, color: Z.relationTegenstelling },
  { value: "onderdeel van", label: "Onderdeel van", Icon: Boxes, color: Z.relationOnderdeel },
  { value: "voorbeeld van", label: "Voorbeeld van", Icon: Lightbulb, color: Z.relationVoorbeeld },
];
