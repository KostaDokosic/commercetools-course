import { CustomerContext } from "../context/CustomerContext";
import useCustomer from "../hooks/useCustomer";

interface Props {
  children: React.ReactNode;
}

export default function CustomerProvider({ children }: Props) {
  const { customer, setCustomer, login, logout } = useCustomer();

  return (
    <CustomerContext.Provider value={{ customer, login, logout, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}
