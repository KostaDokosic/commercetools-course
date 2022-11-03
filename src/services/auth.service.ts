import { ClientResponse, CustomerDraft, CustomerSignin, CustomerSignInResult } from "@commercetools/platform-sdk";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const signUp = async (customerDraft: CustomerDraft): Promise<CustomerSignInResult | string> => {
  try {
    const data: ClientResponse<CustomerSignInResult> = await apiRoot.customers().post({body: customerDraft}).execute();
    return data.body;
  } catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}

export const signIn = async (payload: CustomerSignin) => {
  try {
    const data = await apiRoot.login().post({body: payload}).execute();
    return data.body;
  } catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}