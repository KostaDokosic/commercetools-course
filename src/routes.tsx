import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout/CheckoutPage';
import ProfilePage from './pages/Customer/ProfilePage';
import SingleProductPage from './pages/Products/SingleProductPage';
import ProductsPage from './pages/ProductsPage';
import { ROUTES } from './utils/static';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigation />}>
        <Route path={ROUTES.REGISTER} element={<SignupPage />} />
        <Route path={ROUTES.LOGIN} element={<SigninPage />} />

        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />

        <Route index={true} path={ROUTES.PRODUCTS} element={<ProductsPage />} />
        <Route
          path={`${ROUTES.PRODUCTS}/:productId`}
          element={<SingleProductPage />}
        />
      </Route>
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};

export default AppRoutes;
