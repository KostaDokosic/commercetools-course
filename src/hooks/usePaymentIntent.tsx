import { useGetClientPayentIntentQuery } from "../queries/payment.query";

type Props = {
  amount: number,
  currency: string;
}

const usePaymentIntent = ({amount, currency}: Props) => {
 const {data, isLoading, error} = useGetClientPayentIntentQuery(amount, currency);

  const paymentIntent = () => data?.data.paymentIntent;

  const clientSecret = () => paymentIntent()?.client_secret;

 return {paymentIntent, isLoading, error, clientSecret}
}

export default usePaymentIntent;