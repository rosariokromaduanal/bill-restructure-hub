import { Star, ChevronUp } from "lucide-react";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";

/**
 * Header de la página de subdivisión
 * Contiene título, icono de favorito y botones de acción
 */
export function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-secondary transition-colors">
          <Star size={24} />
        </button>
        <h1 className="text-xl font-semibold text-foreground">
          Subdivisión <span className="font-normal text-muted-foreground">factura comercial</span>
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
          <div className="w-1 h-5 bg-secondary rounded" />
          <span className="font-medium text-foreground">Generales</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-secondary hover:text-secondary/80 w-6 h-6"
        >
          <ChevronUp 
            size={18} 
            className={`transition-transform ${isExpanded ? "" : "rotate-180"}`} 
          />
        </Button>
      </div>
      <div className="h-px bg-border mt-2" />
    </div>
  );
}
