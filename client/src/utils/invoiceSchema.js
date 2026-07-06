import { z } from "zod";

const invoiceSchema = z.object({
  clientId: z
    .string()
    .min(1, "Please select a client."),

  amount: z
    .number({
      error: "Amount is required.",
    })
    .positive("Amount must be greater than zero."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters.")
    .max(500, "Description cannot exceed 500 characters."),

  dueDate: z
    .string()
    .min(1, "Due date is required."),
});

export default invoiceSchema;