import {
  ErrorObject,
  Product,
  ProductPagedQueryResponse,
} from "@commercetools/platform-sdk";
import { useQuery } from "@tanstack/react-query";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { PAGINATION_SIZE, QUERY_KEYS } from "../utils/query";

const apiRoot = getApiRoot();

export const useGetProductsQuery = (page: number = 1) =>
  useQuery<ProductPagedQueryResponse, ErrorObject>(
    [QUERY_KEYS.PRODUCTS],
    async () => {
      const data = await apiRoot
        .products()
        .get({
          queryArgs: {
            limit: PAGINATION_SIZE,
            offset: (page - 1) * PAGINATION_SIZE,
          },
        })
        .execute();
      return data.body;
    }
  );

export const useGetProductByIdQuery = (ID: string) =>
  useQuery<Product, ErrorObject>([QUERY_KEYS.PRODUCT], async () => {
    const data = await apiRoot.products().withId({ ID }).get().execute();
    return data.body;
  });

export const useGetProductByKeyQuery = (key: string) =>
  useQuery<Product, ErrorObject>([QUERY_KEYS.PRODUCT], async () => {
    const data = await apiRoot.products().withKey({ key }).get().execute();
    return data.body;
  });
