import {
  ErrorObject,
  Order,
} from "@commercetools/platform-sdk";
import { useQuery } from "@tanstack/react-query";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { QUERY_KEYS } from "../utils/query";

const apiRoot = getApiRoot();

export const useGetOrdersQuery = () =>
  useQuery<Order[], ErrorObject>([QUERY_KEYS.ORDERS], async () => {
      const data = await apiRoot.orders().get().execute();
      return data.body.results;
  });
