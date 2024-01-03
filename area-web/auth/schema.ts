import { z } from "zod";

/**
 * Schema for validating username and password.
 */
export const usernameSchema = z.object({
  username: z.string().min(4).max(31),
  password: z.string().min(6).max(255),
});
