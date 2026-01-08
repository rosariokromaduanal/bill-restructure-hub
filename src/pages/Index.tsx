import { useState, useEffect, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader, GeneralesSection } from "@/components/subdivision/PageHeader";
import { InvoiceInfoCard } from "@/components/subdivision/InvoiceInfoCard";
import { SubdivisionsList } from "@/components/subdivision/SubdivisionsList";
import { ItemsModal } from "@/components/subdivision/ItemsModal";
import { SubdivisionData, ItemPartida } from "@/types/subdivision";
import subdivisionData from "@/data/ModeladoSubdivision.json";

/**
 * Página principal de Subdivisión de Facturas
 */
const Index = () => {
  const [data, setData] = useState<SubdivisionData | null>(null);
  const [isGeneralesExpanded, setIsGeneralesExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setData(subdivisionData as SubdivisionData);
  }, []);

  const handleItemsAdded = (items: ItemPartida[], cantidadParcial: Record<string, number>) => {
    console.log("Items agregados:", items, "Cantidades:", cantidadParcial);
  };

  const handleSectionChange = (section: number) => {
    setActiveSection(section);
  };

  if (!data) {
    return (
      <MainLayout activeSection={0} onSectionChange={() => {}} totalSections={3}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">Cargando...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeSection={activeSection} onSectionChange={handleSectionChange} totalSections={3}>
      <PageHeader />
      <GeneralesSection 
        isExpanded={isGeneralesExpanded} 
        onToggle={() => setIsGeneralesExpanded(!isGeneralesExpanded)} 
      />
      {isGeneralesExpanded && (
        <div className="mb-8 animate-fade-in">
          <InvoiceInfoCard data={data} onSubdividir={() => setIsModalOpen(true)} />
        </div>
      )}
      <SubdivisionsList subdivisions={data.detallesubdivision} />
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
