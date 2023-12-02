export type User = {
  name: string;
  email: string;
  id: string;
}

export type AuthResult = {
  access_token: string;
  user: User
};

export enum AuthenticationType {
  LOGIN,
  REGISTER,
}
