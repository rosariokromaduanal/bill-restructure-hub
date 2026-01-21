import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoSynapsis from "@/assets/logo_synapsis_white.png";

const offices = [
  "Veracruz",
  "CDMX",
  "Tuxpan",
  "Laredo",
  "Manzanillo",
  "Altamira",
  "Tampico",
];

interface AppHeaderProps {
  onSearch?: (invoiceNumber: string) => void;
}

/**
 * Header principal de la aplicación
 * Contiene logo, búsqueda funcional, selector de ubicación
 */
export function AppHeader({ onSearch }: AppHeaderProps) {
  const [selectedOffice, setSelectedOffice] = useState("Veracruz");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <header className="header-gradient h-12 flex items-center justify-between px-4 fixed top-0 left-[60px] right-0 z-40">
      {/* Logo y búsqueda */}
      <div className="flex items-center gap-4">
        {/* Logo Synapsis */}
        <img src={logoSynapsis} alt="Synapsis" className="h-5 object-contain" />

        {/* Barra de búsqueda funcional */}
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Buscar factura"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-48 md:w-64 pl-3 pr-10 h-8 bg-white/20 border-0 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-1 focus-visible:ring-primary-foreground/30 text-sm"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="text-primary-foreground/60 hover:text-primary-foreground transition-colors" size={14} />
          </button>
        </form>
      </div>

      {/* Selector de ubicación */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors">
            <span className="text-primary-foreground text-sm font-medium">{selectedOffice}</span>
            <ChevronDown className="text-primary-foreground" size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {offices.map((office) => (
            <DropdownMenuItem
              key={office}
              onClick={() => setSelectedOffice(office)}
              className={office === selectedOffice ? "bg-muted" : ""}
            >
              {office}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}