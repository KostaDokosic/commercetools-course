import { Route } from "../types/navigation.types";

export const customerStorageKey = 'customer';

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGOUT: "/logout",
  LOGIN: "/login",
  PRODUCTS: "/products",
  CART: "/cart",
  MY_ORDERS: "/myorders",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
};

export const NAVIGATION_ROUTES: Route[] = [
  {
    name: "Login",
    path: ROUTES.LOGIN,
    perms: { requiredAuth: false, guestOnly: true, },
  },
  {
    name: "Register",
    path: ROUTES.REGISTER,
    perms: { requiredAuth: false, guestOnly: true, },
  },
  {
    name: "Products",
    path: ROUTES.PRODUCTS,
    perms: { requiredAuth: true, guestOnly: true, },
  },
];

export const PROFILE_ROUTES: Route[] = [
  {
    name: "Profile",
    path: ROUTES.PROFILE,
    perms: { requiredAuth: true, guestOnly: false, },
  },
  {
    name: "My Cart",
    path: ROUTES.CART,
    perms: { requiredAuth: true, guestOnly: false, },
  },
  {
    name: "My Orders",
    path: ROUTES.MY_ORDERS,
    perms: { requiredAuth: true, guestOnly: false, },
  },
  {
    name: "Logout",
    path: ROUTES.LOGOUT,
    perms: { requiredAuth: true, guestOnly: false, },
  },
];
