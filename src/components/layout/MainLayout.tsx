import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface MainLayoutProps {
  children: React.ReactNode;
  activeSection?: number;
  onSectionChange?: (section: number) => void;
  totalSections?: number;
}

/**
 * Layout principal de la aplicación
 * Estructura: Sidebar izquierda + Header superior + Contenido principal
 * Con navigation bullets entre sidebar y contenido
 */
export function MainLayout({ 
  children, 
  activeSection = 0, 
  onSectionChange,
  totalSections = 3 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppHeader />
      
      {/* Navigation bullets - bolitas rojas #f44336 */}
      <div className="fixed left-[70px] top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSectionChange?.(index)}
            className={`nav-bullet ${activeSection === index ? 'active scale-125' : ''}`}
            title={`Sección ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Contenido principal con offset para sidebar y header */}
      <main className="ml-[90px] mt-12 p-6 min-h-[calc(100vh-48px)]">
        {children}
      </main>
    </div>
  );
}