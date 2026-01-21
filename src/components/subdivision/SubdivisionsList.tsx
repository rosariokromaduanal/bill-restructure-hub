import { useState } from "react";
import { SubdivisionCard } from "./SubdivisionCard";
import { Button } from "@/components/ui/button";
import { DetalleSubdivision } from "@/types/subdivision";

interface SubdivisionsListProps {
  subdivisions: DetalleSubdivision[];
  isLoaded: boolean;
}

/**
 * Lista de subdivisiones con paginación
 * Muestra las tarjetas individuales de cada subdivisión
 */
export function SubdivisionsList({ subdivisions, isLoaded }: SubdivisionsListProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleSubdivisions = subdivisions.slice(0, visibleCount);
  const hasMore = visibleCount < subdivisions.length;

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-lg md:text-xl font-semibold text-foreground" style={{ color: "#757575" }}>Subdivisiones</h2>
      
      {/* Estado vacío cuando no hay subdivisiones */}
      {subdivisions.length === 0 ? (
        <div className="flex justify-center py-8">
          <span className="text-center" style={{ color: "#321761", fontSize: "12px" }}>
            Aún no generadas
          </span>
        </div>
      ) : (
        <>
          {/* Lista de tarjetas */}
          <div className="space-y-2">
            {visibleSubdivisions.map((subdivision) => (
              <SubdivisionCard key={subdivision.clave} subdivision={subdivision} />
            ))}
          </div>

          {/* Botón mostrar más */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="text-secondary"
              >
                Mostrar siguientes
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
