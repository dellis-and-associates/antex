import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Antex Pest Solutions collects, uses and protects your information — including our SMS/text messaging privacy commitments.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="bg-gradient-to-b from-sand-50 to-[#F4EEE1] pt-16 pb-12">
        <div className="max-w-[760px] mx-auto px-8">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display font-bold text-[38px] max-sm:text-[30px] leading-[1.15] text-ink-950 mt-5 mb-3">
            Privacy Policy
          </h1>
          <p className="font-mono text-[13px] tracking-[0.08em] uppercase text-basalt-700/70">
            Effective date: January 1, 2020
          </p>
        </div>
      </header>

      <section className="py-16 max-md:py-12">
        <div className="max-w-[760px] mx-auto px-8 article-prose">
          <p>
            Antex Pest Solutions provides pest control services throughout
            Utah. We value the trust our customers place in us, and this
            policy explains what information we collect through this website,
            how we use it, and how we protect it.
          </p>

          <h2>1. Information we collect</h2>
          <p>
            When you use our website or submit our contact form, we may
            collect: your contact details (such as your name, email address,
            phone number and service address) that you provide through forms;
            your IP address, which we use for security and analytics
            purposes; and cookies, which help the site perform properly.
          </p>

          <h2>2. How we use your information</h2>
          <p>
            We use the information we collect to respond to your questions or
            service requests, improve how the website operates, monitor site
            performance and security, and maintain communications related to
            services you have requested.
          </p>

          <h2>3. Text messaging (SMS)</h2>
          <p>
            If you opt in to receive text messages from us, your consent
            applies only to the messaging you agreed to. No mobile
            information will be shared with third parties or affiliates for
            marketing or promotional purposes. You can opt out of text
            messages at any time by replying STOP, or reply HELP for help.
            Message frequency may vary, and message and data rates may apply.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Cookies are small files stored by your browser. We use them to
            enhance site functionality, understand how visitors use the site,
            and improve your browsing experience. You can disable cookies in
            your browser settings; parts of the site may work differently
            with cookies disabled.
          </p>

          <h2>5. How we protect your data</h2>
          <p>
            We protect the information you share with us using secure
            systems, restricted access to personal data, and ongoing
            monitoring for security risks.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You may request access to the personal information we hold about
            you, and ask us to update, correct or delete it. Contact us using
            the details below and we will respond to your request.
          </p>

          <h2>7. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will
            update the effective date shown at the top of this page.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy or your information? Call us at{" "}
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>, use the contact form on
            this site, or visit us at{" "}
            <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
