// src/pages/MyCartPage.tsx
import { useMyCarts } from "../hooks/useCartHook";

const MyCartPage = () => {
  // const { data: myCarts, isLoading } = useMyCarts();
  // const { data: latestCart } = useMyLatestCart();


  const { data: carts = [], isLoading, isError } = useMyCarts();

  if (isLoading) return <p>Loading your carts...</p>;
  if (isError) return <p>Failed to load carts.</p>;
  if (!carts.length) return <p>No carts found.</p>;

  const sortedCarts = carts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Carts</h2>
      {sortedCarts.map((cart) => (
        <div key={cart.id} className="mb-6 border-b pb-4">
          <p><strong>Cart ID:</strong> {cart.id}</p>
          <p><strong>Date:</strong> {cart.date}</p>
          <ul className="list-disc ml-6 mt-2">
            {cart.products.map((item, index) => (
              <li key={index}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyCartPage;

// // src/pages/MyCartPage.tsx
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import { getCartsByUserId } from "../services/cart-service";
// import type { Cart } from "../types/CartType";

// const MyCartPage = () => {
//   const { user } = useAuth();
//   const [carts, setCarts] = useState<Cart[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCarts = async () => {
//       if (!user) return;

//       try {
//         const userCarts = await getCartsByUserId(user.id);
//         const sortedCarts = userCarts.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//         setCarts(sortedCarts);
//       } catch (err) {
//         console.error("Failed to fetch carts:", err);
//         setError("Failed to load carts.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarts();
//   }, [user]);

//   if (loading) return <p>Loading your carts...</p>;
//   if (error) return <p>{error}</p>;
//   if (!carts.length) return <p>No carts found.</p>;

//   return (
//     <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Your Carts</h2>
//       {carts.map((cart) => (
//         <div key={cart.id} className="mb-6 border-b pb-4">
//           <p><strong>Cart ID:</strong> {cart.id}</p>
//           <p><strong>Date:</strong> {cart.date}</p>
//           <ul className="list-disc ml-6 mt-2">
//             {cart.products.map((item, index) => (
//               <li key={index}>
//                 Product ID: {item.productId}, Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyCartPage;

