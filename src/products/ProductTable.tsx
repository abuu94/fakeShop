// components/ProductTable.tsx
import { useProducts } from "@/hooks/useProductHook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProductTable = () => {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div>

      
    </div>
    // <Table>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead>Title</TableHead>
    //       <TableHead>Category</TableHead>
    //       <TableHead>Price</TableHead>
    //       <TableHead>Rating</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {isLoading ? (
    //       <TableRow>
    //         <TableCell colSpan={4}>Loading...</TableCell>
    //       </TableRow>
    //     ) : (
    //       products.map((product) => (
    //         <TableRow key={product.id}>
    //           <TableCell>{product.title}</TableCell>
    //           <TableCell>{product.category}</TableCell>
    //           <TableCell>${product.price}</TableCell>
    //           <TableCell>
    //             {product.rating.rate} ({product.rating.count})
    //           </TableCell>
    //         </TableRow>
    //       ))
    //     )}
    //   </TableBody>
    // </Table>
  );
};
