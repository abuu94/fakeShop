import { useState, useEffect } from "react";
import { useCarts, useDeleteCart } from "../hooks/useCartHook";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CartPage = () => {
  const { data: carts = [], isLoading, error } = useCarts();
  const { mutate: deleteCart } = useDeleteCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter carts by userId or date
  const filteredCarts = carts.filter((cart) =>
    `${cart.userId} ${cart.date}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCarts.length / itemsPerPage);
  const paginatedCarts = filteredCarts.slice(
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
              placeholder="Search by user ID or date"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                {/* <TableHead>Links</TableHead> */}
                <TableHead>Total Items</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading carts...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4}>Error loading carts</TableCell>
                </TableRow>
              ) : paginatedCarts.length > 0 ? (
                paginatedCarts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell>{cart.userId}</TableCell>
                    <TableCell>
                      {new Date(cart.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {cart.products.map((p) => (
                        <div key={p.productId}>
                          Product #{p.productId} × {p.quantity}
                        </div>
                      ))}
                    </TableCell>
                    {/* <TableCell>
                      {cart.products.map((p) => (
                        <div key={p.productId}>
                          <a
                            href={`/products/${p.productId}`}
                            className="text-blue-600 hover:underline"
                          >
                            Product #{p.productId}
                          </a>{" "}
                          × {p.quantity}
                        </div>
                      ))}
                    </TableCell> */}

                    <TableCell>
                      {cart.products.reduce((sum, p) => sum + p.quantity, 0)}{" "}
                      items
                    </TableCell>

                    <TableCell className="flex justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCart(cart.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No carts found</TableCell>
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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

export default CartPage;
