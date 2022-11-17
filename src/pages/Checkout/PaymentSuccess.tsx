import { ErrorObject } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useCustomer from '../../hooks/useCustomer';
import useLoading from '../../hooks/useLoading';
import { clearCart } from '../../services/cart.service';
import { createOrder } from '../../services/orders.service';
import { createPayment } from '../../services/payment.service';
import { ROUTES } from '../../utils/static';

export default function PaymentSuccess() {

  const {customer} = useCustomer();
  const {totalPrice, cart} = useCart();
  const {setLoading, setLoadingError} = useLoading();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<boolean>(false)

  useEffect(() => {
    if(cart && customer && !completed) {
      paymentSuccess();
    }
  }, [cart, customer]);

  const paymentSuccess = async () => {
    setLoading(true);
    console.log(customer, cart);
    
    if(!customer || !cart) return console.log('bad');
    
    try {
      await createPayment(customer, totalPrice(), 'EUR');
      await createOrder(cart.id, cart.version);
      await clearCart(cart);
      navigate(ROUTES.MY_ORDERS);
      setCompleted(true)
    } catch(e) {
      setLoadingError((e as ErrorObject) || 'Error')
    }
    setLoading(false);
  }
  return (
    <div>PaymentSuccess. Redirecting ...</div>
  )
}
