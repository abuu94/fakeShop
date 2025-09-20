// components/ProductFilter.tsx
import { useState } from "react";
import { useProducts } from "@/hooks/useProductHook";
import { Input } from "@/components/ui/input";
import { ProductCard } from "./ProductCard";

export const ProductFilter = () => {
  const { data: products = [] } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products.filter((product) =>
    `${product.title} ${product.category} ${product.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
