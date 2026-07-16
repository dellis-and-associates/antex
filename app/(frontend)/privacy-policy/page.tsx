import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import {
  EMAIL,
  EMAIL_MAILTO,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Antex Pest Solutions collects, uses and protects your information, including our SMS/text messaging privacy commitments.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-16 pb-12">
        <div className="max-w-[760px] mx-auto px-8">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display font-bold text-[38px] max-sm:text-[30px] leading-[1.15] text-ink-950 mt-5 mb-3">
            Privacy Policy
          </h1>
          <p className="font-mono text-[13px] tracking-[0.08em] uppercase text-basalt-700/70">
            Effective date: July 16, 2026
          </p>
        </div>
      </header>

      <section className="py-16 max-md:py-12">
        <div className="max-w-[760px] mx-auto px-8 article-prose">
          <h2>Overview</h2>
          <p>
            At Antex Pest Solutions, we value your trust. This Privacy Policy
            explains how we collect, use, and protect your information when
            you visit our website.
          </p>
          <p>
            Our goal is simple: keep your information safe and be clear about
            how it&rsquo;s used.
          </p>

          <h2>About our business</h2>
          <p>
            Antex Pest Solutions provides professional pest control services
            across Utah, helping homeowners and businesses protect their
            properties with safe, effective solutions.
          </p>

          <h2>1. Information we collect</h2>
          <p>
            We collect only the information necessary to serve you better,
            including:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Service address</li>
            <li>
              Information you provide through contact forms or quote requests
            </li>
            <li>
              IP address (automatically collected for security and analytics)
            </li>
            <li>
              Cookies and similar technologies used to improve website
              performance and user experience
            </li>
          </ul>

          <h2>2. How we use your information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to your questions or service requests</li>
            <li>Schedule and provide pest control services</li>
            <li>Improve our website and customer experience</li>
            <li>Monitor website performance and security</li>
            <li>Communicate with you about services you requested</li>
            <li>
              Send service reminders, appointment notifications, promotional
              offers, and updates about our services where permitted by law
            </li>
            <li>
              Measure advertising performance and communicate with existing
              customers through trusted service providers and advertising
              platforms, including Google, in accordance with applicable laws
              and platform policies
            </li>
          </ul>

          <h2>3. Text messaging &amp; mobile information</h2>
          <p>If you opt in to receive text messages from us:</p>
          <ul>
            <li>
              We do not sell your mobile information or share it with third
              parties or affiliates for their own marketing or promotional
              purposes.
            </li>
            <li>
              Text messaging originator opt-in data and consent will not be
              shared with any parties except aggregators and providers of the
              text message services necessary to deliver SMS communications.
            </li>
            <li>Message and data rates may apply. Message frequency may vary.</li>
            <li>You can opt out at any time by replying STOP.</li>
            <li>For help, reply HELP or contact us directly.</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Improve site functionality</li>
            <li>Understand how visitors use our website</li>
            <li>Enhance your browsing experience</li>
            <li>
              Measure advertising effectiveness and improve our marketing
              efforts
            </li>
          </ul>
          <p>
            You can disable cookies in your browser settings at any time. Some
            portions of the website may not function properly if cookies are
            disabled.
          </p>

          <h2>5. Data protection</h2>
          <p>
            We take reasonable steps to protect your information, including:
          </p>
          <ul>
            <li>Secure systems and platforms</li>
            <li>Limited access to personal data</li>
            <li>Ongoing monitoring for potential security risks</li>
          </ul>

          <h2>6. Your rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request updates or corrections</li>
            <li>
              Request deletion of your personal information where applicable
            </li>
          </ul>
          <p>To make a request, contact us using the information below.</p>

          <h2>7. Updates to this policy</h2>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>
            Any changes will be reflected by updating the Effective Date at
            the top of this page.
          </p>

          <h2>Contact us</h2>
          <p>Antex Pest Solutions</p>
          <p>
            Website:{" "}
            <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>
            <br />
            Email: <a href={EMAIL_MAILTO}>{EMAIL}</a>
            <br />
            Phone: <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </p>
        </div>
      </section>
    </>
  );
}
