import { z } from "zod";
import { ContractError } from "../errors";

export function validateDTO<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContractError("Backend contract validation failed", result.error.format());
  }
  return result.data;
}
