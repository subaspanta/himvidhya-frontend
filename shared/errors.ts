export class ContractError extends Error {
  public data: unknown;

  constructor(message: string, data?: unknown) {
    super(message);
    this.name = "ContractError";
    this.data = data;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContractError);
    }
  }
}
