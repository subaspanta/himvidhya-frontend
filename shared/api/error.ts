type ErrorType = "validation" | "auth" | "network" | "server" | "unknown";
interface AppError {
  type: ErrorType;
  message: string;
  statusCode: number;
  validationErrors?: Record<string, string>;
}
