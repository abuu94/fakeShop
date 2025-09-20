


// components/ProductTable.tsx
import { useState, useEffect } from "react";
import { useDeleteProduct, useProducts } from "@/hooks/useProductHook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { CreateUserDialog } from "@/pages/CreateUserDialog";
import { UserFormDialog } from "@/pages/UserFormDialog";
import { deleteUser } from "@/services/product-services";


export const ProductTable = () => {
  const { data: products = [], isLoading, error } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter products by title or category
  const filteredProducts = products.filter((product) =>
    `${product.title} ${product.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 space-y-6">
      <Card>
        
        <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <CreateUserDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Category</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading products...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={6}>Error loading products</TableCell>
            </TableRow>
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.image}
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right">{product.category}</TableCell>
                <TableCell className="text-right">{product.rating.count},{product.rating.rate}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  {/* <UserFormDialog mode="edit" triggerLabel="Edit" product={product} /> */}
                  {/* <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(product.id)}
                  >
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No products found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
        </CardContent>
      
      </Card>
    
    </div>
   
  );
};
