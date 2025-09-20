export type CartProduct = {
  productId: number;
  quantity: number;
};

export type Cart = {
  id: number;
  userId: number;
  date: string; // ISO date string
  products: CartProduct[];
  __v: number;
};

export type CartType = Cart[];
