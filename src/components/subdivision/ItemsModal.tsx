import { useState } from "react";
import { X } from "lucide-react";
import { ItemsTable } from "./ItemsTable";
import { ItemPartida } from "@/types/subdivision";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ItemPartida[];
  onItemsAdded: (items: ItemPartida[], cantidadParcial: Record<string, number>, parcialItems: Record<string, boolean>) => void;
}

/**
 * Modal para seleccionar items y crear subdivisiones
 * Con padding de 10px y input dinámico para cantidad comercial
 */
export function ItemsModal({ isOpen, onClose, items, onItemsAdded }: ItemsModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [parcialItems, setParcialItems] = useState<Record<string, boolean>>({});
  const [cantidadParcial, setCantidadParcial] = useState<Record<string, number>>({});

  const handleParcialChange = (itemId: string, isParcial: boolean) => {
    setParcialItems((prev) => ({
      ...prev,
      [itemId]: isParcial,
    }));
    
    // Si desactiva parcial, resetear la cantidad
    if (!isParcial) {
      const item = items.find(i => i.objectidproductos === itemId);
      if (item) {
        setCantidadParcial((prev) => ({
          ...prev,
          [itemId]: item.cantidadcomercialpartida,
        }));
      }
    }
  };

  const handleCantidadParcialChange = (itemId: string, cantidad: number) => {
    setCantidadParcial((prev) => ({
      ...prev,
      [itemId]: cantidad,
    }));
  };

  const handleAgregar = () => {
    // Filtrar los items seleccionados
    const itemsToAdd = items.filter((item) =>
      selectedItems.includes(item.objectidproductos)
    );
    
    // Notificar al padre los items agregados con sus cantidades parciales
    onItemsAdded(itemsToAdd, cantidadParcial, parcialItems);
    
    // Limpiar selección
    setSelectedItems([]);
    setParcialItems({});
    setCantidadParcial({});
    
    // Cerrar modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-2.5 rounded-2xl">
        <DialogHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Seleccionar Items para Subdivisión
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <X size={20} />
          </Button>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(90vh-100px)] p-2.5">
          <ItemsTable
            items={items}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            onParcialChange={handleParcialChange}
            parcialItems={parcialItems}
            cantidadParcial={cantidadParcial}
            onCantidadParcialChange={handleCantidadParcialChange}
            onAgregar={handleAgregar}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}