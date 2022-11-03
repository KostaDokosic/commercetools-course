import { Customer } from "@commercetools/platform-sdk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerStorageKey, ROUTES } from "../utils/static";
import { clearItemFromStorage, getItemFromStorage, setItemToStorage } from "../utils/storage";


const useCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(getItemFromStorage(customerStorageKey));
  const navigate = useNavigate();

  const login = (customer: Customer) => {
    setCustomer(customer);
    setItemToStorage(customerStorageKey, JSON.stringify(customer));
    navigate(ROUTES.PRODUCTS);
  }

  const logout = () => {
    setCustomer(null);
    clearItemFromStorage(customerStorageKey);
    navigate(ROUTES.LOGIN);
  }

  return { customer, setCustomer, login, logout }
}

export default useCustomer;