// Centralized types for user and auth
export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
};

export type AuthResponse = {
  user: User;
};
