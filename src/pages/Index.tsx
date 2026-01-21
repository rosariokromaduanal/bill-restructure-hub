import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader, GeneralesSection } from "@/components/subdivision/PageHeader";
import { InvoiceInfoCard } from "@/components/subdivision/InvoiceInfoCard";
import { SubdivisionsList } from "@/components/subdivision/SubdivisionsList";
import { ItemsModal } from "@/components/subdivision/ItemsModal";
import { SubdivisionData, ItemPartida, DetalleSubdivision } from "@/types/subdivision";
import subdivisionData from "@/data/ModeladoSubdivision.json";

/**
 * Página principal de Subdivisión de Facturas
 */
const Index = () => {
  const [data, setData] = useState<SubdivisionData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGeneralesExpanded, setIsGeneralesExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [subdivisions, setSubdivisions] = useState<DetalleSubdivision[]>([]);

  const handleSearch = (invoiceNumber: string) => {
    // Simular búsqueda - cargar datos cuando se busca
    console.log("Buscando factura:", invoiceNumber);
    setData(subdivisionData as SubdivisionData);
    setIsLoaded(true);
    // Las subdivisiones empiezan vacías, solo se agregan desde el modal
    setSubdivisions([]);
  };

  const handleItemsAdded = (items: ItemPartida[], cantidadParcial: Record<string, number>, parcialItems: Record<string, boolean>) => {
    if (!data) return;
    
    // Crear nueva subdivisión con los items seleccionados
    const newSubdivision: DetalleSubdivision = {
      sec: subdivisions.length + 1,
      clave: `SUB${String(subdivisions.length + 1).padStart(2, '0')}`,
      descripciongeneral: items[0]?.descripcionpartepartidaoriginal?.substring(0, 30) + "..." || "Nueva subdivisión",
      numeropedimento: "",
      fechaasociacionpedimento: "",
      estado: 0,
      itemsasociados: items.map(item => {
        const isParcial = parcialItems[item.objectidproductos];
        const cantidadUsada = cantidadParcial[item.objectidproductos] || item.cantidadcomercialpartida;
        return {
          ...item,
          cantidadcomercialpartida: isParcial ? cantidadUsada : item.cantidadcomercialpartida,
          cantidadfacturapartida: isParcial ? cantidadUsada : item.cantidadfacturapartida,
        };
      })
    };

    setSubdivisions(prev => [...prev, newSubdivision]);
    
    // Procesar items parciales y generar los sobrantes automáticamente
    const newItems: ItemPartida[] = [];
    items.forEach(item => {
      if (parcialItems[item.objectidproductos]) {
        const cantidadUsada = cantidadParcial[item.objectidproductos] || 0;
        const cantidadRestante = item.cantidadcomercialpartida - cantidadUsada;
        
        if (cantidadRestante > 0) {
          // Crear item con cantidad restante
          const itemRestante: ItemPartida = {
            ...item,
            objectidproductos: `${item.objectidproductos}_restante`,
            cantidadcomercialpartida: cantidadRestante,
            cantidadfacturapartida: cantidadRestante,
            valormercanciapartida: (item.valormercanciapartida / item.cantidadcomercialpartida) * cantidadRestante
          };
          newItems.push(itemRestante);
        }
      }
    });
    
    console.log("Items agregados:", items, "Items restantes generados:", newItems);
  };

  const handleSectionChange = (section: number) => {
    setActiveSection(section);
  };

  return (
    <MainLayout activeSection={activeSection} onSectionChange={handleSectionChange} totalSections={3} onSearch={handleSearch}>
      <PageHeader />
      <GeneralesSection 
        isExpanded={isGeneralesExpanded} 
        onToggle={() => setIsGeneralesExpanded(!isGeneralesExpanded)} 
      />
      {isGeneralesExpanded && (
        <div className="mb-8 animate-fade-in">
          <InvoiceInfoCard 
            data={data} 
            onSubdividir={() => setIsModalOpen(true)} 
            isLoaded={isLoaded}
          />
        </div>
      )}
      <SubdivisionsList subdivisions={subdivisions} isLoaded={isLoaded} />
      {data && (
        <ItemsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={data.facturaoriginal.items}
          onItemsAdded={handleItemsAdded}
        />
      )}
    </MainLayout>
  );
};

export default Index;
