import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader, GeneralesSection } from "@/components/subdivision/PageHeader";
import { InvoiceInfoCard } from "@/components/subdivision/InvoiceInfoCard";
import { SubdivisionsList } from "@/components/subdivision/SubdivisionsList";
import { ItemsModal } from "@/components/subdivision/ItemsModal";
import { SubdivisionData, ItemPartida } from "@/types/subdivision";
import subdivisionData from "@/data/ModeladoSubdivision.json";

/**
 * Página principal de Subdivisión de Facturas
 * Dashboard completo con información de factura, tabla de items y lista de subdivisiones
 */
const Index = () => {
  const [data, setData] = useState<SubdivisionData | null>(null);
  const [isGeneralesExpanded, setIsGeneralesExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar datos del JSON
  useEffect(() => {
    setData(subdivisionData as SubdivisionData);
  }, []);

  // Manejar items agregados a nueva subdivisión
  const handleItemsAdded = (items: ItemPartida[]) => {
    console.log("Items agregados a subdivisión:", items);
    // Aquí se podría actualizar el estado global o enviar a un backend
  };

  if (!data) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Cargando...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header de la página */}
      <PageHeader />

      {/* Sección Generales */}
      <GeneralesSection 
        isExpanded={isGeneralesExpanded} 
        onToggle={() => setIsGeneralesExpanded(!isGeneralesExpanded)} 
      />

      {/* Card de información de factura */}
      {isGeneralesExpanded && (
        <div className="mb-8 animate-fade-in">
          <InvoiceInfoCard 
            data={data} 
            onSubdividir={() => setIsModalOpen(true)} 
          />
        </div>
      )}

      {/* Lista de subdivisiones */}
      <SubdivisionsList subdivisions={data.detallesubdivision} />

      {/* Modal de selección de items */}
      <ItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={data.facturaoriginal.items}
        onItemsAdded={handleItemsAdded}
      />
    </MainLayout>
  );
};

export default Index;
