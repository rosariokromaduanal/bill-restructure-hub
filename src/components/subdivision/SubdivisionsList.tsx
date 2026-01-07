import { useState } from "react";
import { SubdivisionCard } from "./SubdivisionCard";
import { Button } from "@/components/ui/button";
import { DetalleSubdivision } from "@/types/subdivision";

interface SubdivisionsListProps {
  subdivisions: DetalleSubdivision[];
}

/**
 * Lista de subdivisiones con paginación
 * Muestra las tarjetas individuales de cada subdivisión
 */
export function SubdivisionsList({ subdivisions }: SubdivisionsListProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  // Subdivisiones adicionales para simular más datos según la maqueta
  const allSubdivisions: DetalleSubdivision[] = [
    ...subdivisions,
    {
      sec: 3,
      clave: "SUB03",
      descripciongeneral: "1342459 ALAMBRE CIRCULAR...",
      numeropedimento: "234339453003221",
      fechaasociacionpedimento: "2024-12-27",
      estado: 1,
      itemsasociados: subdivisions[0]?.itemsasociados || []
    },
    {
      sec: 4,
      clave: "SUB04",
      descripciongeneral: "1342460 ALAMBRE CIRCULAR...",
      numeropedimento: "234339453003221",
      fechaasociacionpedimento: "2024-12-27",
      estado: 1,
      itemsasociados: []
    },
    {
      sec: 5,
      clave: "SUB05",
      descripciongeneral: "1342461 ALAMBRE CIRCULAR...",
      numeropedimento: "234339453003221",
      fechaasociacionpedimento: "2024-12-27",
      estado: 1,
      itemsasociados: []
    },
    {
      sec: 6,
      clave: "SUB07",
      descripciongeneral: "1342462 ALAMBRE CIRCULAR...",
      numeropedimento: "234339453003221",
      fechaasociacionpedimento: "2024-12-27",
      estado: 1,
      itemsasociados: []
    },
    {
      sec: 7,
      clave: "SUB08",
      descripciongeneral: "1342463 ALAMBRE CIRCULAR...",
      numeropedimento: "",
      fechaasociacionpedimento: "",
      estado: 0,
      itemsasociados: []
    },
  ];

  const visibleSubdivisions = allSubdivisions.slice(0, visibleCount);
  const hasMore = visibleCount < allSubdivisions.length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Subdivisiones</h2>
      
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
            className="text-secondary hover:text-secondary/80"
          >
            Mostrar siguientes
          </Button>
        </div>
      )}
    </div>
  );
}
