import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import {
  contactSchema,
  MIN_FILL_TIME_MS,
  spamSchema,
  toFieldErrors,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 10_000;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Rejects cross-site form posts. Requests without an Origin (e.g. curl) are still rate limited. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function renderEmail({ name, email, message }: ContactInput) {
  const text = `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#18181b">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>`;
  return { text, html };
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, message: "Cross-origin requests are not allowed." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, message: "Expected a JSON request body." }, 415);
  }

  const { success, reset } = await rateLimit(`ip:${clientIp(request.headers)}`);
  if (!success) {
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return json(
      {
        ok: false,
        message: "You've sent several messages recently. Please try again in a few minutes.",
      },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Your message is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "The request body is not valid JSON." }, 400);
  }

  const spam = spamSchema.safeParse(body);
  if (
    !spam.success ||
    spam.data.website ||
    (spam.data.startedAt !== undefined && Date.now() - spam.data.startedAt < MIN_FILL_TIME_MS)
  ) {
    // Respond like a success so bots get no signal, but never send anything.
    return json({ ok: true, message: "Thanks! Your message has been sent." }, 200);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      422,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");
    const fallback = siteConfig.social.email
      ? ` Please email ${siteConfig.social.email} directly instead.`
      : "";
    return json(
      {
        ok: false,
        message: `The contact form isn't set up yet, so your message was not sent.${fallback}`,
      },
      503,
    );
  }

  const { name, email } = parsed.data;
  const { text, html } = renderEmail(parsed.data);

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: email,
      subject: `Portfolio message from ${name}`.slice(0, 150),
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend rejected the email", error);
      return json(
        { ok: false, message: "The email service couldn't send your message. Please try again later." },
        502,
      );
    }
  } catch (error) {
    console.error("[contact] Failed to reach Resend", error);
    return json(
      { ok: false, message: "The email service is unavailable right now. Please try again later." },
      502,
    );
  }

  return json({ ok: true, message: "Thanks! Your message has been sent." }, 200);
}
