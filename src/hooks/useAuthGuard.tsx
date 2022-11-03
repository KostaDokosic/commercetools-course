import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { ROUTES } from "../utils/static";

type Props = {
  authProtection: boolean;
}

const useAuthGuard = ({ authProtection }: Props) => {
  const { customer } = useContext(CustomerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!customer && authProtection) { //for protection routes where customer must be authentificated
      navigate(ROUTES.HOME);
    }
    else if (customer && !authProtection) { // for protection routes like login/register where customer is already authentificated
      navigate(ROUTES.HOME);
    }
  });
}

export default useAuthGuard;