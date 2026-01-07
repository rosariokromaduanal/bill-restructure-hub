import { 
  LayoutGrid, 
  Users, 
  FileText, 
  Package, 
  BarChart3, 
  Layers, 
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: <ChevronRight size={18} />, label: "Menu", active: false },
  { icon: <Users size={18} />, label: "Clientes" },
  { icon: <FileText size={18} />, label: "Facturas" },
  { icon: <Package size={18} />, label: "Pedimentos" },
  { icon: <BarChart3 size={18} />, label: "Reportes", active: true },
  { icon: <Layers size={18} />, label: "Subdivisiones" },
];

const bottomNavItems: NavItem[] = [
  { icon: <LayoutGrid size={18} />, label: "Dashboard" },
  { icon: <Settings size={18} />, label: "Configuración" },
];

/**
 * Sidebar de navegación lateral izquierda
 * Ancho fijo de 60px con iconos verticales
 */
export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[60px] bg-sidebar flex flex-col items-center py-4 z-50">
      {/* Navegación principal con indicadores */}
      <nav className="flex flex-col gap-2 flex-1 mt-14 relative">
        {navItems.map((item, index) => (
          <div key={index} className="relative flex items-center">
            {/* Indicadores de color a la izquierda */}
            {index === 1 && (
              <div className="absolute -left-3 w-2 h-2 rounded-full bg-destructive" />
            )}
            {index === 2 && (
              <div className="absolute -left-3 w-2 h-2 rounded-full bg-destructive" />
            )}
            {index === 3 && (
              <div className="absolute -left-3 w-2 h-2 rounded-full bg-orange-500" />
            )}
            {index === 4 && (
              <div className="absolute -left-3 w-2 h-2 rounded-full bg-orange-500" />
            )}
            
            <button
              className={cn(
                "sidebar-nav-item text-sidebar-foreground/70 hover:text-sidebar-foreground",
                item.active && "active text-sidebar-foreground bg-sidebar-accent"
              )}
              title={item.label}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </nav>

      {/* Navegación inferior */}
      <nav className="flex flex-col gap-2 mt-auto">
        {bottomNavItems.map((item, index) => (
          <button
            key={index}
            className="sidebar-nav-item text-sidebar-foreground/70 hover:text-sidebar-foreground"
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
}
