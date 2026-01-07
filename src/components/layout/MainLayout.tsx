import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal de la aplicación
 * Estructura: Sidebar izquierda + Header superior + Contenido principal
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppHeader />
      
      {/* Contenido principal con offset para sidebar y header */}
      <main className="ml-[60px] mt-14 p-6 min-h-[calc(100vh-56px)]">
        {children}
      </main>
    </div>
  );
}
