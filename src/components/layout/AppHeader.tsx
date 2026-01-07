import { Search, ChevronDown, User } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Header principal de la aplicación
 * Contiene logo, búsqueda, selector de ubicación y usuario
 */
export function AppHeader() {
  return (
    <header className="header-gradient h-14 flex items-center justify-between px-4 fixed top-0 left-[60px] right-0 z-40">
      {/* Logo y menú hamburguesa */}
      <div className="flex items-center gap-4">
        <button className="text-primary-foreground/80 hover:text-primary-foreground">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="0" y="2" width="4" height="4" rx="1" />
            <rect x="6" y="2" width="4" height="4" rx="1" />
            <rect x="0" y="8" width="4" height="4" rx="1" />
            <rect x="6" y="8" width="4" height="4" rx="1" />
            <rect x="0" y="14" width="4" height="4" rx="1" />
            <rect x="6" y="14" width="4" height="4" rx="1" />
          </svg>
        </button>

        {/* Logo Synapsis */}
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary-foreground">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
            <path d="M9 14C9 11.2386 11.2386 9 14 9C16.7614 9 19 11.2386 19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="14" r="3" fill="currentColor" />
          </svg>
          <span className="text-primary-foreground font-semibold text-lg">Synapsis</span>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/60" size={16} />
          <Input
            type="text"
            placeholder="Buscar factura"
            className="w-64 pl-10 bg-secondary/30 border-0 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-1 focus-visible:ring-primary-foreground/30"
          />
        </div>
      </div>

      {/* Selector de ubicación y usuario */}
      <div className="flex items-center gap-6">
        {/* Selector de ubicación */}
        <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary/70 px-4 py-2 rounded-md transition-colors">
          <span className="text-primary-foreground text-sm font-medium">Veracruz</span>
          <ChevronDown className="text-primary-foreground" size={16} />
        </button>

        {/* Información del usuario */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <User className="text-muted-foreground" size={18} />
          </div>
          <span className="text-primary-foreground text-sm font-medium hidden md:block">
            Pedro Bautista Méndez
          </span>
        </div>
      </div>
    </header>
  );
}
