import { z } from 'zod'

/** Validate and trim a non-empty greeting name. */
export const greetNameSchema = z.string().trim().min(1)

/** Create a friendly greeting, throwing ZodError for an invalid name. */
export function greet(name: string): string {
  return `Hello, ${greetNameSchema.parse(name)}!`
}
