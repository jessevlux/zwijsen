import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, Boxes, Lightbulb, Link2 } from "lucide-react";
import type { Relation } from "../../../types/content";

export const relations: {
  value: Relation;
  label: string;
  Icon: LucideIcon;
  color: string;
}[] = [
  { value: "synoniem", label: "Synoniem", Icon: Link2, color: "#4299E1" },
  { value: "tegenstelling", label: "Tegenstelling", Icon: ArrowLeftRight, color: "#F56565" },
  { value: "onderdeel van", label: "Onderdeel van", Icon: Boxes, color: "#D69E2E" },
  { value: "voorbeeld van", label: "Voorbeeld van", Icon: Lightbulb, color: "#48BB78" },
];
