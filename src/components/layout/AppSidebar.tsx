import { useState } from "react";
import { 
  LayoutGrid, 
  Users, 
  FileText, 
  Package, 
  BarChart3, 
  Layers, 
  Settings,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoSynapsis from "@/assets/logo_synapsis_white.png";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  submenu?: { label: string; active?: boolean }[];
}

const navItems: NavItem[] = [
  { 
    icon: <FileText size={18} />, 
    label: "Facturas",
    submenu: [
      { label: "Factura comercial importación" },
      { label: "Factura exportación" },
      { label: "Subdivisión de factura", active: true },
    ]
  },
  { icon: <Users size={18} />, label: "Clientes" },
  { icon: <Package size={18} />, label: "Pedimentos" },
  { icon: <BarChart3 size={18} />, label: "Reportes" },
  { icon: <Layers size={18} />, label: "Subdivisiones" },
];

const bottomNavItems: NavItem[] = [
  { icon: <LayoutGrid size={18} />, label: "Dashboard" },
  { icon: <Settings size={18} />, label: "Configuración" },
];

/**
 * Sidebar de navegación lateral izquierda
 * Ancho fijo de 60px con iconos verticales, expandible con menú dinámico
 */
export function AppSidebar() {
  const [expandedItem, setExpandedItem] = useState<string | null>("Facturas");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (label: string) => {
    if (expandedItem === label) {
      setExpandedItem(null);
    } else {
      setExpandedItem(label);
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar flex flex-col items-center py-4 z-50 transition-all duration-300",
        isExpanded ? "w-[240px]" : "w-[60px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-6 w-full px-2">
        {isExpanded ? (
          <img src={logoSynapsis} alt="Synapsis" className="h-6 object-contain" />
        ) : (
          <div className="w-8 h-8 bg-sidebar-foreground/20 rounded-lg flex items-center justify-center">
            <span className="text-sidebar-foreground font-bold text-sm">S</span>
          </div>
        )}
      </div>

      {/* Botón expandir/colapsar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="sidebar-nav-item text-sidebar-foreground/70 hover:text-sidebar-foreground mb-4"
        title={isExpanded ? "Colapsar" : "Expandir"}
      >
        {isExpanded ? <ChevronRight size={18} className="rotate-180" /> : <ChevronRight size={18} />}
      </button>

      {/* Navegación principal */}
      <nav className="flex flex-col gap-1 flex-1 w-full px-2">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => item.submenu && toggleExpand(item.label)}
              className={cn(
                "sidebar-nav-item text-sidebar-foreground/70 hover:text-sidebar-foreground w-full",
                expandedItem === item.label && "bg-sidebar-accent text-sidebar-foreground",
                isExpanded && "justify-start px-3 gap-3"
              )}
              title={item.label}
            >
              {item.icon}
              {isExpanded && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.submenu && (
                    <ChevronDown 
                      size={14} 
                      className={cn(
                        "transition-transform",
                        expandedItem === item.label && "rotate-180"
                      )} 
                    />
                  )}
                </>
              )}
            </button>

            {/* Submenu */}
            {isExpanded && item.submenu && expandedItem === item.label && (
              <div className="ml-6 mt-1 space-y-1 animate-fadeIn">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs rounded-lg transition-colors",
                      subItem.active 
                        ? "text-sidebar-foreground bg-chart/30" 
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Navegación inferior */}
      <nav className="flex flex-col gap-1 mt-auto w-full px-2">
        {bottomNavItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "sidebar-nav-item text-sidebar-foreground/70 hover:text-sidebar-foreground w-full",
              isExpanded && "justify-start px-3 gap-3"
            )}
            title={item.label}
          >
            {item.icon}
            {isExpanded && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}