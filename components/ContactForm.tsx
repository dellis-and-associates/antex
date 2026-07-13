"use client";

import { useState } from "react";
import { Button } from "./Button";
import {
  SMS_CONSENT_MARKETING,
  SMS_CONSENT_TRANSACTIONAL,
} from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full bg-white border border-sand-200 rounded-[10px] px-4 py-3 text-[15.5px] text-ink-950 placeholder:text-basalt-700/50 focus:border-pine-600";
const labelCls = "block font-medium text-[14.5px] text-ink-950 mb-1.5";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        <label className={labelCls} htmlFor="newCustomer">
          Are you a new customer?
        </label>
        <select id="newCustomer" name="newCustomer" className={inputCls} defaultValue="Yes">
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="message">
          How can we help you? <span aria-hidden="true" className="text-clay-600">*</span>
        </label>
        <textarea
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
          <p id="message-error" className="text-[13px] text-clay-700 mt-1" role="alert">
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

      <div className="mt-8">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Book my free inspection"}
        </Button>
        {status === "error" ? (
          <p className="text-[14px] text-clay-700 mt-3" role="alert">
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
      <label className={labelCls} htmlFor={name}>
        {label} <span aria-hidden="true" className="text-clay-600">*</span>
      </label>
      <input
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
        <p id={`${name}-error`} className="text-[13px] text-clay-700 mt-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Consent({ name, text }: { name: string; text: string }) {
  return (
    <label className="flex gap-3 items-start text-[13px] leading-[1.6] cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value="yes"
        className="mt-0.5 w-4 h-4 flex-none accent-[#1F6A47]"
      />
      <span>{text}</span>
    </label>
  );
}
