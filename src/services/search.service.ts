import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const searchProducts = async (text: string) => {
  try {
    const data = await apiRoot.productProjections().search().get({
      queryArgs: {
        'text.en-US': text,
        limit: 3
      }
    }).execute();
    return data.body.results;
  } catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}