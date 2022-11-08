import { Cart, CartAddLineItemAction, CartDraft, CartUpdate, ClientResponse } from "@commercetools/platform-sdk";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const getCustomerCart = async (customerId: string): Promise<Cart | string> => {
  try {
    const cart: ClientResponse<Cart> = await apiRoot.carts().withCustomerId({customerId}).get().execute();
    return cart.body;
  } catch (e) {
    return (e as ErrorResponse).body.message as string;
  }
}

export const addProductToCart = async (cart: Cart, productId: string, quantity: number = 1) => {
  try {
    const action: CartAddLineItemAction = {
      action: "addLineItem",
      productId,
      quantity,
    }
    const cartUpdate: CartUpdate = {
      version: cart.version,
      actions: [action]
    }

    const cartResponse = await apiRoot.carts().withId({ID: cart.id}).post({body: cartUpdate}).execute();
    return cartResponse.body;
  } catch (e) {
    return (e as ErrorResponse).body.message as string;
  }
}

export const createCart = async (cartDraft: CartDraft) => {
  const data = await apiRoot.carts().post({body: cartDraft}).execute();
  return data.body;
}