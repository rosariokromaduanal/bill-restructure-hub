import { Plus, RotateCcw, Trash2, Archive, ChevronDown, Download, Printer, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Grupo de botones de acción principal
 * Guardar (+), Deshacer, Eliminar/Archivar y menú de Acciones
 * Todos los botones redondeados y unidos
 */
export function ActionButtons() {
  return (
    <div className="flex items-center rounded-full overflow-hidden border border-border shadow-sm">
      {/* Botón Guardar con + (color #634DB0) */}
      <Button
        variant="default"
        size="sm"
        className="rounded-none border-r border-white/20 flex items-center gap-1 px-4 h-9"
        style={{ backgroundColor: "#331289" }}
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Guardar</span>
      </Button>

      {/* Botón Deshacer */}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none px-3 h-9 border-r border-border hover:opacity-80"
        style={{ backgroundColor: "#634DB0", color: "#ffffff" }}
        title="Deshacer"
      >
        <RotateCcw size={16} />
      </Button>

      {/* Botón Eliminar/Archivar */}
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none px-3 h-9 border-r border-border hover:opacity-80"
        style={{ backgroundColor: "#634DB0", color: "#ffffff" }}
        title="Eliminar o archivar"
      >
        <Trash2 size={16} />
      </Button>

      {/* Menú de Acciones (color #321761) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none hover:bg-muted/50 px-4 h-9 flex items-center gap-1 text-primary-foreground"
            style={{ backgroundColor: "#321761" }}
          >
            <span className="text-sm">Acciones</span>
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg">
            <Download size={16} />
            <span>Descargar</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg">
            <Printer size={16} />
            <span>Imprimir</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg">
            <Mail size={16} />
            <span>Enviar por correo</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}