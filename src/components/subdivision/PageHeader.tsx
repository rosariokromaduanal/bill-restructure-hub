import { Pin, ChevronUp } from "lucide-react";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";

/**
 * Header de la página de subdivisión
 * Contiene título, icono de chincheta y botones de acción
 */
export function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button className="transition-colors" style={{ color: "#BDBDBD" }}>
          <Pin size={24} />
        </button>
        <h1 className="text-2xl sm:text-2xl md:text-3xl text-foreground">
          <span style={{ color: "#634DB0" }}>Subdivisión</span>{" "}
          <span className="font-bold" style={{ color: "#79145C" }}>factura comercial</span>
        </h1>
      </div>

      <ActionButtons />
    </div>
  );
}

interface GeneralesSectionProps {
  onToggle: () => void;
  isExpanded: boolean;
}

/**
 * Sección "Generales" con línea separadora y botón de colapsar
 */
export function GeneralesSection({ onToggle, isExpanded }: GeneralesSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-6 rounded" style={{ backgroundColor: "#E91E63" }} />
          <span className="font-bold text-foreground text-lg sm:text-lg md:text-2xl" style={{ color: "#757575" }}>Generales</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: "#634DB0" }}
        >
          <ChevronUp
            size={18}
            className={`transition-transform text-white ${isExpanded ? "" : "rotate-180"}`}
          />
        </Button>
      </div>
      <div className="h-px mt-2" style={{ backgroundColor: "#634DB0" }} />
    </div>
  );
}
