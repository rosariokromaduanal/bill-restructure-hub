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
    <div className={`mb-2 sm:mb-3 bg-card border border-border shadow-sm transition-all duration-200 hover:shadow-md`}>
      {/* Contenido principal de la tarjeta */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-1 pl-0">
        {/* Badge de subdivisión sin redondeado */}
        <div
          className={`min-w-[50px] sm:min-w-[60px] text-center py-2 sm:py-3 px-3 sm:px-5 text-xs text-white`}
          style={{ backgroundColor: "#634DB0" }}
        >
          {subdivision.clave}
        </div>

        {/* Información de la subdivisión */}
        <div className="flex-1 flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground justify-center sm:justify-start">
          <span className="font-mono">111 294 90</span>
          <span className="font-mono hidden sm:inline">8503.00.99</span>
          <span className="truncate max-w-full sm:max-w-[200px] text-xs">
            TAPA SOPORTE CAJA CONEXIÓN...
          </span>
        </div>

        {/* Estado y pedimento */}
        <div className="flex items-center gap-1 sm:gap-4 w-full sm:w-auto justify-end">
          {/* Indicador de estado */}
          <div className={tienePedimento ? "text-accent" : "text-muted-foreground/30"}>
            <RefreshCcw size={14} className="sm:w-4.5 sm:h-4.5" />
          </div>

          {/* Número de pedimento */}
          {tienePedimento && (
            <span className="font-mono text-xs sm:text-sm text-muted-foreground hidden md:inline">
              {formatPedimento(subdivision.numeropedimento)}
            </span>
          )}

          {/* Botón solo icono */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-70 p-1 sm:p-2"
            style={{ backgroundColor: "#e0e0e0" }}
            title={isExpanded ? "Ver menos" : "Ver más"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 sm:w-4 sm:h-4" size={12} />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4" size={12} />
            )}
          </Button>
        </div>
      </div>

      {/* Tabla detallada de items (expandible) */}
      {isExpanded && subdivision.itemsasociados.length > 0 && (
        <div className="border-t border-border p-2 sm:p-4 animate-fade-in bg-muted/10">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Item</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Número de parte</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Descripción</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Cantidad tarifa</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Cantidad comercial</th>
                  <th className="py-1 sm:py-2 px-2 sm:px-3 font-medium">Valor mercancía</th>
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
                      <td className="py-1 sm:py-2 px-2 sm:px-3 font-medium">{item.numeropartida}</td>
                      <td className={`py-1 sm:py-2 px-2 sm:px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {item.numeropartepartida}
                      </td>
                      <td className={`py-1 sm:py-2 px-2 sm:px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {item.fraccionarancelariapartida.substring(0, 4)}.00.99 - {item.descripcionpartepartidaoriginal}
                      </td>
                      <td className={`py-1 sm:py-2 px-2 sm:px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {Math.floor(item.cantidadcomercialpartida)} {item.unidadmedidacomercialpartida}
                      </td>
                      <td className={`py-1 sm:py-2 px-2 sm:px-3 ${isHighlighted ? "text-secondary" : ""}`}>
                        {Math.floor(item.cantidadcomercialpartida)} {item.unidadmedidacomercialpartida}
                      </td>
                      <td className={`py-1 sm:py-2 px-2 sm:px-3 ${isHighlighted ? "text-secondary" : ""}`}>
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