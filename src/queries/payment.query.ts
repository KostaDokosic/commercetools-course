import { useQuery } from "@tanstack/react-query";
import { getClientSecret } from "../services/payment.service";
import { QUERY_KEYS } from "../utils/query";

export const useGetClientPayentIntentQuery = (amount: number, currency: string) =>
  useQuery([QUERY_KEYS.PAYMENTSECRET], async () => {
    return await getClientSecret(amount, currency)
  });
