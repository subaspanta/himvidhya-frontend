export class ContractError extends Error {
  public data: any;

  constructor(message: string, data?: any) {
    super(message);
    this.name = "ContractError";
    this.data = data;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ContractError);
    }
  }
}
