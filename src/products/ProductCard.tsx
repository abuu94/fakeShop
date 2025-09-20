// components/ProductCard.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/ProductType";

export const ProductCard = ({ product }: { product: Product }) => (
  <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
    <CardHeader>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
      <p className="text-sm line-clamp-2">{product.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold text-primary">${product.price}</span>
        <span className="text-xs text-muted-foreground">
          ⭐ {product.rating.rate} ({product.rating.count})
        </span>
      </div>
    </CardContent>
  </Card>
);
