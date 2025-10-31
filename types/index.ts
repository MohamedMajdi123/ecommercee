export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, cartId: string) => void;
  removeFromCart: (cartId: string) => void;
  increaseQuantity: (cartId: string) => void;
  decreaseQuantity: (cartId: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}
