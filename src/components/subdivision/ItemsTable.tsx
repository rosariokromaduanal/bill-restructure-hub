import { useState, useMemo } from "react";
import { Search, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemPartida } from "@/types/subdivision";

interface ItemsTableProps {
  items: ItemPartida[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  onParcialChange: (itemId: string, isParcial: boolean) => void;
  parcialItems: Record<string, boolean>;
  cantidadParcial: Record<string, number>;
  onCantidadParcialChange: (itemId: string, cantidad: number) => void;
  onAgregar: () => void;
}

/**
 * Tabla interactiva de items de la factura
 * Con selección múltiple, búsqueda, toggle de parcialidad y cantidad editable
 */
export function ItemsTable({
  items,
  selectedItems,
  onSelectionChange,
  onParcialChange,
  parcialItems,
  cantidadParcial,
  onCantidadParcialChange,
  onAgregar
}: ItemsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar items basado en búsqueda
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.numeropartida.toString().includes(term) ||
        item.numeropartepartida.toLowerCase().includes(term) ||
        item.descripcionpartepartidaoriginal.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  // Manejar selección de un item
  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter((id) => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  // Manejar selección de todos
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(filteredItems.map((item) => item.objectidproductos));
    } else {
      onSelectionChange([]);
    }
  };

  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => selectedItems.includes(item.objectidproductos));

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Barra de búsqueda y acciones */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive rounded-full"
            disabled={selectedItems.length === 0}
          >
            <Trash2 size={18} />
          </Button>

          <div className="relative">
            <Input
              type="text"
              placeholder={`Buscar item 1 - ${items.length}, ${items.length}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 md:w-64 pr-10 rounded-full"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
        </div>
      </div>

      {/* Tabla de items */}
      <div className="overflow-x-auto">
        <table className="items-table">
          <thead className="bg-muted/30">
            <tr>
              <th className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th>Item</th>
              <th>Orden compra</th>
              <th>Número parte</th>
              <th>Descripción</th>
              <th>Valor mercancía</th>
              <th>Cantidad tarifa</th>
              <th>Cantidad comercial</th>
              <th>Total mercancía</th>
              <th>Parcial</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => {
              const isSelected = selectedItems.includes(item.objectidproductos);
              const isParcial = parcialItems[item.objectidproductos] || false;
              const cantidadActual = cantidadParcial[item.objectidproductos] ?? item.cantidadcomercialpartida;
              
              // Alternar destacar algunas filas para el efecto visual de la maqueta
              const isHighlighted = index === 1;

              return (
                <tr
                  key={item.objectidproductos}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleItemSelect(item.objectidproductos)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleItemSelect(item.objectidproductos)}
                    />
                  </td>
                  <td className="font-medium">{item.numeropartida}</td>
                  <td>{item.numeropartida}</td>
                  <td>{item.numeropartepartida}</td>
                  <td className="max-w-[200px] truncate">
                    {item.descripcionpartepartidaoriginal}
                  </td>
                  <td className={isHighlighted ? "text-accent font-semibold" : ""}>
                    $ {item.valormercanciapartida.toFixed(2)}
                  </td>
                  <td>{item.cantidadfacturapartida.toFixed(3)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {/* Input dinámico de cantidad comercial */}
                    <Input
                      type="number"
                      value={cantidadActual}
                      onChange={(e) => onCantidadParcialChange(item.objectidproductos, parseFloat(e.target.value) || 0)}
                      disabled={!isParcial}
                      className={`w-20 h-8 text-center rounded-lg ${
                        isParcial 
                          ? "border-secondary bg-secondary/10" 
                          : "border-border bg-muted/30 cursor-not-allowed"
                      }`}
                      min={0}
                      max={item.cantidadcomercialpartida}
                    />
                  </td>
                  <td>$ {item.valormercanciapartida.toFixed(2)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isParcial}
                        onCheckedChange={(checked) =>
                          onParcialChange(item.objectidproductos, checked)
                        }
                        className={isParcial ? "toggle-si" : "toggle-no"}
                      />
                      <span className={`text-xs font-medium ${
                        isParcial ? "text-accent" : "text-muted-foreground"
                      }`}>
                        {isParcial ? "Si" : "No"}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Botón agregar */}
      <div className="flex justify-end p-4 border-t border-border">
        <Button
          onClick={onAgregar}
          className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
          disabled={selectedItems.length === 0}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}