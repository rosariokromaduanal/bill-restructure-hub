import { useState } from "react";
import { ChevronUp, ChevronDown, Ship } from "lucide-react";
import { ProgressChart } from "./ProgressChart";
import { Button } from "@/components/ui/button";
import { SubdivisionData } from "@/types/subdivision";

interface InvoiceInfoCardProps {
  data: SubdivisionData;
  onSubdividir: () => void;
}

/**
 * Card de información general de la factura
 * Muestra gráfica de progreso, datos del cliente/proveedor y botón subdividir
 */
export function InvoiceInfoCard({ data, onSubdividir }: InvoiceInfoCardProps) {
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  // Extraer valores numéricos del monto
  const montoUtilizado = data.montoutilizadofactura.split(" ")[0];
  const totalFactura = data.totalfactura.split(" ")[0];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gráfica de progreso */}
        <div className="flex-shrink-0">
          <ProgressChart percentage={data.porcentajeutilizadofactura} />
        </div>

        {/* Información de la factura */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-light text-muted-foreground">
                Factura
              </h2>
              <p className="text-2xl text-muted-foreground">aplicada</p>
              <p className="text-2xl font-semibold text-secondary mt-1">
                {data.numerofactura.replace("E007355E24", "2024/4607")}
              </p>
            </div>

            {/* Cliente y proveedor */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground/70 text-xs">Cliente</span>
                <p className="font-medium text-foreground">{data.cliente}</p>
              </div>
              <div>
                <span className="text-muted-foreground/70 text-xs">Proveedor</span>
                <p className="font-medium text-foreground">{data.proveedor}</p>
              </div>
            </div>

            {/* Indicador de días */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ship size={24} />
              <span className="text-2xl font-semibold">2 d</span>
            </div>
          </div>

          {/* Información adicional (colapsable) */}
          {showMoreInfo && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 animate-fade-in">
              <div>
                <span className="text-muted-foreground/70 text-xs">Acuse de valor</span>
                <p className="font-medium text-foreground text-sm">
                  {data.masinformacion.numeroacusevalor}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground/70 text-xs">Incoterm</span>
                <p className="font-medium text-foreground text-sm">
                  {data.masinformacion.incoterm}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground/70 text-xs">Fecha factura</span>
                <p className="font-medium text-foreground text-sm">
                  {data.masinformacion.fechafactura.replace("24-09-2024", "03/09/2024")}
                </p>
              </div>
            </div>
          )}

          {/* Botón ver más/menos */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showMoreInfo ? (
                <>Ver menos <ChevronUp className="ml-1" size={16} /></>
              ) : (
                <>Ver más <ChevronDown className="ml-1" size={16} /></>
              )}
            </Button>
          </div>

          {/* Montos y botón subdividir */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
            <div className="text-right">
              <span className="text-2xl font-bold text-accent">
                ${montoUtilizado}
              </span>
              <span className="text-lg text-muted-foreground">
                {" "}/${totalFactura}
              </span>
            </div>
            <Button
              onClick={onSubdividir}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6"
            >
              Subdividir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
