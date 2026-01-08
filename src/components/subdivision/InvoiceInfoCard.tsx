import { useState } from "react";
import { ChevronUp, ChevronDown, Lock, LockOpen } from "lucide-react";
import { ProgressChart } from "./ProgressChart";
import { Button } from "@/components/ui/button";
import { SubdivisionData } from "@/types/subdivision";

interface InvoiceInfoCardProps {
  data: SubdivisionData;
  onSubdividir: () => void;
}

/**
 * Card de información general de la factura
 * Layout 50/50: Lado izquierdo gráfica, lado derecho datos
 */
export function InvoiceInfoCard({ data, onSubdividir }: InvoiceInfoCardProps) {
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  // Extraer valores numéricos del monto
  const montoUtilizado = data.montoutilizadofactura.split(" ")[0];
  const totalFactura = data.totalfactura.split(" ")[0];

  const isComplete = data.porcentajeutilizadofactura >= 100;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LADO IZQUIERDO - 50% - Gráfica y número de factura */}
        <div className="flex flex-col items-center justify-center gap-4 lg:border-r lg:border-border lg:pr-6">
          <ProgressChart percentage={data.porcentajeutilizadofactura} />
          <div className="text-center">
            <h2 className="text-2xl font-light text-muted-foreground">
              Factura
            </h2>
            <p className="text-xl text-muted-foreground">aplicada</p>
            <p className="text-xl font-semibold mt-1" style={{ color: "#79145C" }}>
              {data.numerofactura.replace("E007355E24", "2024/4607")}
            </p>
          </div>
        </div>

        {/* LADO DERECHO - 50% - Información del cliente y datos */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
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

            {/* Indicador de días con candado */}
            <div className="flex items-center gap-2">
              {isComplete ? (
                <Lock size={24} className="text-secondary" />
              ) : (
                <LockOpen size={24} className="text-secondary" />
              )}
              <span className="text-2xl font-semibold text-secondary">2 d</span>
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
              className="text-muted-foreground hover:text-foreground rounded-full"
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
              <span className="text-2xl font-bold text-secondary">
                ${montoUtilizado}
              </span>
              <span className="text-lg text-muted-foreground">
                {" "}/${totalFactura}
              </span>
            </div>
            <Button
              onClick={onSubdividir}
              className="rounded-full px-6"
              style={{ backgroundColor: "#79145C" }}
            >
              Subdividir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}