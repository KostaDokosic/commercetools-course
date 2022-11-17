import { CartDraft, LineItemDraft, Product } from "@commercetools/platform-sdk";
import { useEffect, useState } from "react";
import { useGetCustomerCartQuery } from "../queries/cart.query";
import { addProductToCart, createCart } from "../services/cart.service";
import { getTotalPriceOfCart } from "../utils/helper";
import { cartStorageKey } from "../utils/static";
import { setItemToStorage } from "../utils/storage";
import useCustomer from "./useCustomer";

const useCart = () => {
  const { customer } = useCustomer();
  const { data: cart, isLoading, refetch } = useGetCustomerCartQuery(customer?.id || '');
  const [totalItems, setTotalItems] = useState<number>(0);

  const addCartProduct = async (product: Product) => {
    if (!cart) {
      const draft: CartDraft = {
        currency: "EUR",
        customerId: customer?.id,
        lineItems: []
      }
      await createCart(draft)
      refetch();
      setTotalItems(1);
    }
    if (!cart) return;
    await refetch()
    addProductToCart(cart, product.id, 1);
    setItemToStorage(cartStorageKey, JSON.stringify(cart));
    setTotalItems(totalItems + 1)
  }
  useEffect(() => {
    if(cart) setTotalItems(cart.lineItems.length)
  }, [cart]);

  const removeCartProduct = () => {

  }

  const clearCart = () => {

  }

  const updateCartProduct = () => {

  }

  const totalPrice = () => {
    return cart ? Math.ceil(getTotalPriceOfCart(cart)) : 0
  }

  return { cart, addCartProduct, removeCartProduct, clearCart, totalPrice, updateCartProduct, isLoading, totalItems }
}

export default useCart;