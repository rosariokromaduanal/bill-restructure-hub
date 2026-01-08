import { useState } from "react";
import { ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetalleSubdivision } from "@/types/subdivision";

interface SubdivisionCardProps {
  subdivision: DetalleSubdivision;
}

/**
 * Card individual de subdivisión estilo cápsula
 * Con borde izquierdo #634db0 y bordes redondeados
 */
export function SubdivisionCard({ subdivision }: SubdivisionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatear número de pedimento para mostrar
  const formatPedimento = (num: string) => {
    if (!num) return "";
    // Formato: XX XX XXXX XXXXXXX
    return num.replace(/(\d{2})(\d{2})(\d{4})(\d+)/, "$1 $2 $3 $4");
  };

  // Determinar si tiene pedimento asociado
  const tienePedimento = subdivision.numeropedimento && subdivision.numeropedimento.length > 0;

  return (
    <div className={`mb-3 bg-card border border-border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${isExpanded ? 'rounded-lg' : 'rounded-full'}`}>
      {/* Contenido principal de la tarjeta */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-1 pl-0">
        {/* Badge de subdivisión con borde izquierdo #634db0 */}
        <div 
          className="min-w-[60px] text-center py-2 px-3 rounded-full font-semibold text-xs text-white"
          style={{ backgroundColor: "#634DB0" }}
        >
          {subdivision.clave}
        </div>

        {/* Información de la subdivisión */}
        <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-mono">111 294 90</span>
          <span className="font-mono">8503.00.99</span>
          <span className="truncate max-w-[200px]">
            TAPA SOPORTE CAJA CONEXIÓN...
          </span>
        </div>

        {/* Estado y pedimento */}
        <div className="flex items-center gap-4">
          {/* Indicador de estado */}
          <div className={tienePedimento ? "text-accent" : "text-muted-foreground/30"}>
            <RefreshCcw size={18} />
          </div>

          {/* Número de pedimento */}
          {tienePedimento && (
            <span className="font-mono text-sm text-muted-foreground">
              {formatPedimento(subdivision.numeropedimento)}
            </span>
          )}

          {/* Botón ver más/menos */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 rounded-full text-foreground"
            style={{ backgroundColor: "#e0e0e0" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#bdbdbd"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
          >
            {isExpanded ? (
              <>Ver menos <ChevronUp size={16} /></>
            ) : (
              <>Ver más <ChevronDown size={16} /></>
            )}
          </Button>
        </div>
      </div>

      {/* Tabla detallada de items (expandible) */}
      {isExpanded && subdivision.itemsasociados.length > 0 && (
        <div className="border-t border-border p-4 animate-fade-in bg-muted/10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="py-2 px-3 font-medium">Item</th>
                  <th className="py-2 px-3 font-medium">Número de parte</th>
                  <th className="py-2 px-3 font-medium">Descripción</th>
                  <th className="py-2 px-3 font-medium">Cantidad tarifa</th>
                  <th className="py-2 px-3 font-medium">Cantidad comercial</th>
                  <th className="py-2 px-3 font-medium">Valor mercancía</th>
                </tr>
              </thead>
              <tbody>
                {subdivision.itemsasociados.map((item, index) => {
                  // Destacar item parcial
                  const isHighlighted = item.tiposubdivision === "PARCIAL";
                  
                  return (
                    <tr 
                      key={`${item.objectidproductos}-${index}`}
                      className={isHighlighted ? "text-secondary" : ""}
                    >
                      <td className="py-2 px-3 font-medium">{item.numeropartida}</td>
                      <td className={`py-2 px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {item.numeropartepartida}
                      </td>
                      <td className={`py-2 px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {item.fraccionarancelariapartida.substring(0, 4)}.00.99 - {item.descripcionpartepartidaoriginal}
                      </td>
                      <td className={`py-2 px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {Math.floor(item.cantidadcomercialpartida)} {item.unidadmedidacomercialpartida}
                      </td>
                      <td className={`py-2 px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {Math.floor(item.cantidadcomercialpartida)} {item.unidadmedidacomercialpartida}
                      </td>
                      <td className={`py-2 px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        $ {item.valormercanciapartida.toFixed(2)} USD
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}