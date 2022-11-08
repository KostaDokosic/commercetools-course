import { CartDraft, LineItemDraft, Product } from "@commercetools/platform-sdk";
import { useGetCustomerCartQuery } from "../queries/cart.query";
import { addProductToCart, createCart } from "../services/cart.service";
import { cartStorageKey } from "../utils/static";
import { setItemToStorage } from "../utils/storage";
import useCustomer from "./useCustomer";

const useCart = () => {
  const { customer } = useCustomer();
  const { data: cart, isLoading, refetch } = useGetCustomerCartQuery(customer?.id || '');

  const addCartProduct = async (product: Product) => {
    if (!cart) {
      const draft: CartDraft = {
        currency: "EUR",
        customerId: customer?.id,
        lineItems: []
      }
      await createCart(draft)
      refetch();
    }
    if (!cart) return;
    addProductToCart(cart, product.id, 1);
    setItemToStorage(cartStorageKey, JSON.stringify(cart));
  }

  const removeCartProduct = () => {

  }

  const clearCart = () => {

  }

  const updateCartProduct = () => {

  }

  return { cart, addCartProduct, removeCartProduct, clearCart, updateCartProduct, isLoading }
}

export default useCart;