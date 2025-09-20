import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCart, useUpdateCart } from "@/hooks/useCartHook";
import { useState } from "react";
import type { Cart } from "@/types/CartType";

type Props = {
  mode: "create" | "edit";
  triggerLabel?: string;
  cart?: Cart;
};

export const CartFormDialog = ({ mode, triggerLabel = "Open", cart }: Props) => {
  const { mutate: createCart } = useCreateCart();
  const { mutate: updateCart } = useUpdateCart();

  const [form, setForm] = useState({
    userId: cart?.userId.toString() || "",
    date: cart?.date || new Date().toISOString().slice(0, 10),
    products: cart?.products || [{ productId: 1, quantity: 1 }],
  });

  const handleProductChange = (index: number, field: string, value: string) => {
    const updated = [...form.products];
    updated[index] = {
      ...updated[index],
      [field]: field === "quantity" ? parseInt(value) : parseInt(value),
    };
    setForm({ ...form, products: updated });
  };

  const addProduct = () => {
    setForm({ ...form, products: [...form.products, { productId: 0, quantity: 1 }] });
  };

  const handleSubmit = () => {
    const payload = {
      userId: parseInt(form.userId),
      date: new Date(form.date).toISOString(),
      products: form.products,
    };

    mode === "edit"
      ? updateCart({ id: cart!.id, cart: payload })
      : createCart(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={mode === "edit" ? "outline" : "default"} size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Cart" : "Create Cart"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="User ID"
            type="number"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <div className="space-y-2">
            {form.products.map((product, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Product ID"
                  type="number"
                  value={product.productId}
                  onChange={(e) =>
                    handleProductChange(index, "productId", e.target.value)
                  }
                />
                <Input
                  placeholder="Quantity"
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={addProduct}>
              + Add Product
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
