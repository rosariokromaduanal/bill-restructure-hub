import { Plus, RotateCcw, Trash2, ChevronDown, Download, Printer, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Grupo de botones de acción principal
 * Guardar, Restaurar, Eliminar y menú de Acciones
 */
export function ActionButtons() {
  return (
    <div className="flex items-center gap-0 rounded-md overflow-hidden border border-primary/20">
      {/* Botón Guardar con + */}
      <Button
        variant="default"
        size="sm"
        className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1 px-3"
      >
        <Plus size={16} />
        <span>Guardar</span>
      </Button>

      {/* Botón Restaurar */}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3"
      >
        <RotateCcw size={16} />
      </Button>

      {/* Botón Eliminar */}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none text-muted-foreground hover:text-destructive hover:bg-muted/50 px-3"
      >
        <Trash2 size={16} />
      </Button>

      {/* Menú de Acciones */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 flex items-center gap-1"
          >
            <span>Acciones</span>
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Download size={16} />
            <span>Descargar</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Printer size={16} />
            <span>Imprimir</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Mail size={16} />
            <span>Enviar por correo</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
