export type { Role, User } from "./domain.types";
export type { AuthStore } from "./store.types";

export type {
  RegisterData,
  LoginCredentials,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  VerifyOTPPayload,
  VerifyOTPResponse,
  ResetPasswordPayload,
  AuthUserDTO,
  CurrentUserDTO,
} from "./api.types";

export type {
  RegisterFormData,
  LoginFormData,
  EmailFormData,
  ResetFormData,
  Step,
} from "./form.types";

export type {
  AuthModal,
  RegisterFormProps,
  LoginFormProps,
  AuthModalsProps,
  ForgotPasswordFormProps,
} from "./ui.types";
