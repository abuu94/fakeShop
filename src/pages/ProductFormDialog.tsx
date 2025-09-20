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
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProductHook";
import { useState } from "react";
import type { Product } from "@/types/ProductType";

type Props = {
  mode: "create" | "edit";
  triggerLabel?: string;
  product?: Product;
};

export const ProductFormDialog = ({
  mode,
  triggerLabel = "Open",
  product,
}: Props) => {
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price.toString() || "",
    description: product?.description || "",
    category: product?.category || "",
    image: product?.image || "",
    rate: product?.rating.rate.toString() || "",
    count: product?.rating.count.toString() || "",
  });

  const handleSubmit = () => {
    const payload: Product = {
      id: product?.id || Date.now(),
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
      rating: {
        rate: parseFloat(form.rate),
        count: parseInt(form.count),
      },
    };

    mode === "edit"
      ? updateProduct({ id: payload.id, product: payload })
      : createProduct(payload);
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
          <DialogTitle>
            {mode === "edit" ? "Edit Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <Input
            placeholder="Rating (rate)"
            type="number"
            value={form.rate}
            onChange={(e) => setForm({ ...form, rate: e.target.value })}
          />
          <Input
            placeholder="Rating (count)"
            type="number"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: e.target.value })}
          />
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
