import { AddressDraft, Cart, CartSetShippingAddressAction, CartUpdate, TaxCategoryDraft, TaxCategoryUpdateAction } from "@commercetools/platform-sdk";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const setCartShippingAddress = async (cart: Cart, addressDraft: AddressDraft) => {
  try {
    createTaxCategory();
    const action: CartSetShippingAddressAction = {
      action: "setShippingAddress",
      address: addressDraft
    }
    const cartUpdate: CartUpdate = {
      version: cart.version,
      actions: [action]
    }
    const data = await apiRoot.carts().withId({ID: cart.id}).post({body: cartUpdate}).execute();
    return data.body;
  
  } catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}

export const createTaxCategory = async () => {
  try {
    const existing = await apiRoot.taxCategories().get().execute();
    if(existing.body.results.find(i => i.name === 'Serbia' || i.rates[0].country === 'RS')) return;
    const taxDraft: TaxCategoryDraft = {
      name: "Serbia",
      rates: [{
        name: 'Serbia_rate',
        country: 'RS',
        includedInPrice: true,
        state: 'Serbia',  
        amount: 1
      }]
    }
    const data = await apiRoot.taxCategories().post({body: taxDraft}).execute();
    return data.body;
  } catch(e) {
    return null;
  }
}