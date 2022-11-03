export interface NavPerms {
  requiredAuth: boolean;
  guestOnly: boolean;
}

export interface Route {
  name: string;
  path: string;
  perms: NavPerms;
}
