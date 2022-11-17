import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import useLoading from "../../hooks/useLoading";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const {loading, setLoading} = useLoading();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          // @ts-ignore
          setMessage("Payment succeeded!")
          break;
        case "processing":
          // @ts-ignore
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          // @ts-ignore
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          // @ts-ignore
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3001/paymentsuccess",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      // @ts-ignore
      setMessage(error.message);
    } else {
      // @ts-ignore
      setMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={loading || !stripe || !elements} id="submit">
        <span id="button-text">
          {loading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}