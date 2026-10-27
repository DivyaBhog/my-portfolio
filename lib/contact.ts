import { z } from "zod";

/** Shared by the contact form (client) and the route handler (server). */
export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(100, { error: "Name must be 100 characters or fewer." }),
  // Trim before the format check; z.email().trim() would validate the untrimmed value.
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .max(254, { error: "Email address is too long." })
    .pipe(z.email({ error: "Please enter a valid email address." })),
  message: z
    .string({ error: "Please enter a message." })
    .trim()
    .min(10, { error: "Message should be at least 10 characters." })
    .max(5000, { error: "Message must be 5000 characters or fewer." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** Anti-spam fields sent alongside the form values; not shown to users. */
export const spamSchema = z.object({
  /** Honeypot: hidden from humans, bots tend to fill it. */
  website: z.string().max(200).optional(),
  /** ms timestamp of when the form was first shown. */
  startedAt: z.number().int().nonnegative().optional(),
});

export const MIN_FILL_TIME_MS = 3000;

export interface ContactResponse {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFieldErrors;
}

export function toFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const flat = z.flattenError(error).fieldErrors;
  const result: ContactFieldErrors = {};
  for (const key of Object.keys(flat) as ContactField[]) {
    const first = flat[key]?.[0];
    if (first) result[key] = first;
  }
  return result;
}
