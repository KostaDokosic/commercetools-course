import { CartResourceIdentifier, OrderFromCartDraft } from "@commercetools/platform-sdk"
import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const createOrder = async (cartId: string, cartVersion: number) => {
  try {
    const cartResource: CartResourceIdentifier = {
      typeId: "cart",
      id: cartId,
    }
    const orderDraft: OrderFromCartDraft = {
      cart: cartResource,
      version: cartVersion,
      paymentState: 'Paid',
      
    }
    const order = await apiRoot.orders().post({body: orderDraft}).execute();
    return order.body;
  }
  catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}