export type ErrorType =
  | "validation"
  | "auth"
  | "network"
  | "server"
  | "unknown";

export interface AppError {
  type: ErrorType;
  message: string;
  statusCode: number;
  validationErrors?: Record<string, string>;
}
