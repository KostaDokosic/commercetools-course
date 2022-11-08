import { CartContext } from "../context/CartContext";
import useCart from "../hooks/useCart";

interface Props {
  children: React.ReactNode;
}

export default function CartProvider({ children }: Props) {
  const { cart, removeCartProduct, clearCart, updateCartProduct, addCartProduct, isLoading } = useCart();

  return (
    <CartContext.Provider value={{ cart, clearCart, updateCartProduct, removeCartProduct, addCartProduct, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}
