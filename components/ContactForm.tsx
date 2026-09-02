"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  SMS_CONSENT_MARKETING,
  SMS_CONSENT_TRANSACTIONAL,
} from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

/* Cloudflare Turnstile bot check. Skipped entirely when the site key is
   unset; the API route likewise only verifies when its secret is set. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; theme?: string; action?: string }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

/* Brand field skin over the shadcn defaults (live-site parity). */
const inputCls =
  "h-auto bg-white border-paper-200 rounded-[10px] px-4 py-3 text-[15.5px] md:text-[15.5px] text-ink-950 shadow-none placeholder:text-basalt-700/50 focus:border-red-600";
const labelCls = "block font-medium text-[14.5px] leading-normal text-ink-950 mb-1.5";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Explicit render (survives client-side navigation, unlike the implicit
  // scan the script does once on load). Polls until the script is ready.
  useEffect(() => {
    const el = turnstileRef.current;
    if (!TURNSTILE_SITE_KEY || !el) return;
    const timer = setInterval(() => {
      if (!window.turnstile) return;
      clearInterval(timer);
      widgetId.current = window.turnstile.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        action: "contact",
      });
    }, 100);
    return () => {
      clearInterval(timer);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const nextErrors: Record<string, string> = {};
    const required: Array<[string, string]> = [
      ["firstName", "Enter your first name"],
      ["lastName", "Enter your last name"],
      ["phone", "Enter your phone number"],
      ["email", "Enter your email address"],
      ["street", "Enter your street address"],
      ["city", "Enter your city"],
      ["state", "Enter your state"],
      ["country", "Enter your country"],
      ["postalCode", "Enter your postal code"],
      ["message", "Tell us what you're seeing"],
    ];
    for (const [field, msg] of required) {
      if (!data[field]?.trim()) nextErrors[field] = msg;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid 10-digit phone number";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      // Turnstile tokens are single-use; issue a fresh one for the retry.
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="perimeter-line rounded-lg bg-white/60 p-8 text-center" role="status">
        <p className="font-display font-bold text-[24px] text-ink-950 mb-2">
          Request received.
        </p>
        <p>
          A member of our team will be in touch shortly to schedule your free
          inspection.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — invisible to people, tempting to bots */}
      <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="firstName" label="First Name" autoComplete="given-name" error={errors.firstName} />
        <Field name="lastName" label="Last Name" autoComplete="family-name" error={errors.lastName} />
        <Field name="phone" label="Phone number" type="tel" autoComplete="tel" error={errors.phone} />
        <Field name="email" label="Email Address" type="email" autoComplete="email" error={errors.email} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="sm:col-span-2">
          <Field name="street" label="Street Address" autoComplete="street-address" error={errors.street} />
        </div>
        <Field name="city" label="City" autoComplete="address-level2" error={errors.city} />
        <Field name="state" label="State" autoComplete="address-level1" error={errors.state} defaultValue="Utah" />
        <Field name="country" label="Country" autoComplete="country-name" error={errors.country} defaultValue="United States" />
        <Field name="postalCode" label="Postal Code" autoComplete="postal-code" error={errors.postalCode} />
      </div>

      <div className="mt-4">
        <Label className={labelCls} htmlFor="newCustomer">
          Are you a new customer?
        </Label>
        <Select name="newCustomer" defaultValue="Yes">
          <SelectTrigger id="newCustomer" className={inputCls}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <Label className={labelCls} htmlFor="message">
          How can we help you? <span aria-hidden="true" className="text-red-600">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputCls}
          placeholder="What are you seeing, and where?"
        />
        {errors.message ? (
          <p id="message-error" className="text-[13px] text-red-700 mt-1" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* SMS consent — verbatim from the live site; do not edit */}
      <fieldset className="mt-6 grid gap-4 border-0 p-0">
        <legend className="sr-only">Text message consent</legend>
        <Consent name="consentTransactional" text={SMS_CONSENT_TRANSACTIONAL} />
        <Consent name="consentMarketing" text={SMS_CONSENT_MARKETING} />
      </fieldset>

      {TURNSTILE_SITE_KEY ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="lazyOnload"
          />
          {/* Turnstile injects its hidden cf-turnstile-response input here */}
          <div ref={turnstileRef} className="mt-6" />
        </>
      ) : null}

      <div className="mt-8">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Book my free inspection"}
        </Button>
        {status === "error" ? (
          <p className="text-[14px] text-red-700 mt-3" role="alert">
            Something went wrong sending your request. Please try again, or
            call us directly.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  error,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label className={labelCls} htmlFor={name}>
        {label} <span aria-hidden="true" className="text-red-600">*</span>
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputCls}
      />
      {error ? (
        <p id={`${name}-error`} className="text-[13px] text-red-700 mt-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Consent({ name, text }: { name: string; text: string }) {
  const id = `consent-${name}`;
  return (
    <div className="flex gap-3 items-start">
      <Checkbox
        id={id}
        name={name}
        value="yes"
        className="mt-0.5 flex-none border-paper-200 bg-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white"
      />
      <Label
        htmlFor={id}
        className="text-[13px] font-normal leading-[1.6] cursor-pointer"
      >
        {text}
      </Label>
    </div>
  );
}
