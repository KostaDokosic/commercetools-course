import { Cart, CartDraft } from "@commercetools/platform-sdk"
import { useQuery } from "@tanstack/react-query"
import { getApiRoot } from "../commercetools/ClientBuilder";
import { QUERY_KEYS } from "../utils/query"

const apiRoot = getApiRoot();

export const useGetCustomerCartQuery = (customerId: string) =>
  useQuery<Cart>([QUERY_KEYS.CART], async () => {
    const data = await apiRoot.carts().withCustomerId({customerId}).get().execute();
    return data.body;
  });

export const useCreateCustomerCartQuery = (cartDraft: CartDraft) =>
  useQuery<Cart>([QUERY_KEYS.CART], async () => {
    const data = await apiRoot.carts().post({body: cartDraft}).execute();
    return data.body;
  });
