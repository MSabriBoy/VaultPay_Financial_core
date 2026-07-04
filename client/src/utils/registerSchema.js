import { z } from "zod";

import { ROLES } from "../constants/roles";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters."),

  email: z
    .string()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  role: z.enum([
    ROLES.ADMIN,
    ROLES.CLIENT,
  ]),
});

export default registerSchema;