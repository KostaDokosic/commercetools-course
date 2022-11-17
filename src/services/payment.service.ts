import { Cart, CartAddPaymentAction, CartUpdate, Customer, CustomerResourceIdentifier, Payment, PaymentDraft, PaymentResourceIdentifier, PaymentStatusDraft } from "@commercetools/platform-sdk"
import { PaymentIntentResult } from "@stripe/stripe-js";
import axios from "axios";
import { getApiRoot } from "../commercetools/ClientBuilder";
import { ErrorResponse } from "../types/error.types";

const apiRoot = getApiRoot();

export const getClientSecret = async (amount: number, currency: string) => {
  return await axios.get<PaymentIntentResult>('https://5vlesiun04.execute-api.us-east-1.amazonaws.com/default/stripe-svc', {
    params: {
      amount,
      currency
    }
  })
}

export const createPayment = async (customer: Customer, centAmount: number, currencyCode: string) => {
  try {
    const customerRes: CustomerResourceIdentifier = {
      typeId: "customer",
      id: customer.id
    }
    const paymentStatus: PaymentStatusDraft = {
      interfaceCode: 'Paid',
      interfaceText: 'Payment Successfully Completed'
    }
    const draft: PaymentDraft = {
      amountPlanned: {
        centAmount,
        currencyCode
      },
      customer: customerRes,
      paymentStatus
    }
    const data = await apiRoot.payments().post({body: draft}).execute();
    return data;
  }
  catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}

export const addPaymentToCart = async (cart: Cart, payment: Payment) => {
  try {
    const paymentRes: PaymentResourceIdentifier = {
      typeId: "payment",
      id: payment.id
    }
    const action: CartAddPaymentAction = {
      action: "addPayment",
      payment: paymentRes
    }
    const update: CartUpdate = {
      version: cart.version,
      actions: [action]
    }
    const data = await apiRoot.carts().withId({ID: cart.id}).post({body: update}).execute();
    return data.body;
  } catch(e) {
    return (e as ErrorResponse).body.message as string;
  }
}