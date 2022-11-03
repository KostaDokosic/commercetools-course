import { Customer } from "@commercetools/platform-sdk";
import { createContext } from "react";


interface ICustomerContext {
  customer: Customer | null,
  setCustomer: (customer: Customer) => void,
  login: (customer: Customer) => void,
  logout: () => void
}

export const CustomerContext = createContext<ICustomerContext>({
  customer: null,
  setCustomer: (customer: Customer) => Function,
  login: (customer: Customer) => Function,
  logout: () => Function,
})