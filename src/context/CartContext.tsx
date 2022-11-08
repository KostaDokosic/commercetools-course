import { Cart, Product } from "@commercetools/platform-sdk";
import { createContext } from "react";


interface ICartContext {
  cart: Cart | undefined,
  addCartProduct: (product: Product) => void,
  removeCartProduct: () => void,
  updateCartProduct: () => void,
  clearCart: () => void,
  isLoading: boolean
}

export const CartContext = createContext<ICartContext>({
  cart: undefined,
  addCartProduct: (product: Product) => Function,
  removeCartProduct: () => Function,
  updateCartProduct: () => Function,
  clearCart: () => Function,
  isLoading: false
})