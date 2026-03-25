export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export type EmailFormData = {
  email: string;
};

export type ResetFormData = {
  otp: string;
  password: string;
  confirmPassword: string;
};

export type Step = "email" | "reset";
