"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  contactSchema,
  toFieldErrors,
  type ContactField,
  type ContactFieldErrors,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact";
import { buttonClasses, cn } from "@/lib/styles";

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: ContactInput = { name: "", email: "", message: "" };
const fieldOrder: ContactField[] = ["name", "email", "message"];

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function validate(next: ContactInput): ContactFieldErrors {
    const result = contactSchema.safeParse(next);
    return result.success ? {} : toFieldErrors(result.error);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = { ...values, [event.target.name]: event.target.value };
    setValues(next);
    // Only re-validate live after the first submit attempt, to avoid nagging while typing.
    if (submitted) setErrors(validate(next));
    if (status === "success" || status === "error") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const clientErrors = validate(values);
    setErrors(clientErrors);
    const firstInvalid = fieldOrder.find((field) => clientErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current || undefined,
        }),
      });

      const data = (await response.json().catch(() => null)) as ContactResponse | null;

      if (response.ok && data?.ok) {
        setStatus("success");
        setFeedback(data.message);
        setValues(emptyValues);
        setErrors({});
        setSubmitted(false);
        return;
      }

      if (data?.fieldErrors) setErrors(data.fieldErrors);
      setStatus("error");
      setFeedback(data?.message ?? `Something went wrong (HTTP ${response.status}). Please try again.`);
    } catch {
      setStatus("error");
      setFeedback("Network error — check your connection and try again.");
    }
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5" aria-busy={submitting}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={values.name}
            onChange={handleChange}
            disabled={submitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClasses(!!errors.name)}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={values.email}
            onChange={handleChange}
            disabled={submitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClasses(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Message" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={5000}
          value={values.message}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClasses(!!errors.message), "resize-y")}
          placeholder="Tell me about your project or opportunity…"
        />
      </Field>

      {/* Honeypot: visually hidden and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={submitting} className={buttonClasses("primary", "md", "sm:w-auto")}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send message
            </>
          )}
        </button>

        <div role="status" aria-live="polite" className="min-h-6 text-sm">
          {status === "success" && (
            <p className="inline-flex items-start gap-2 text-success">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {feedback}
            </p>
          )}
          {status === "error" && (
            <p className="inline-flex items-start gap-2 text-danger">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {feedback}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function inputClasses(invalid: boolean) {
  return cn(
    // text-base on mobile prevents iOS zooming into the field on focus.
    "block w-full min-w-0 rounded-xl border bg-input px-4 py-3 text-base text-foreground shadow-soft transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 disabled:opacity-60 sm:text-sm",
    invalid
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-border hover:border-accent/40 focus:border-ring focus:ring-ring/20",
  );
}

interface FieldProps {
  label: string;
  name: ContactField;
  error?: string;
  children: ReactNode;
}

function Field({ label, name, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label} <span className="text-danger" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
