import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern use of the Antex Pest Solutions website and requests for our pest control services.",
};

export default function TermsPage() {
  return (
    <>
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-16 pb-12">
        <div className="max-w-[760px] mx-auto px-8">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display font-bold text-[38px] max-sm:text-[30px] leading-[1.15] text-ink-950 mt-5 mb-3">
            Terms of Service
          </h1>
          <p className="font-mono text-[13px] tracking-[0.08em] uppercase text-basalt-700/70">
            Please read these terms before using this website
          </p>
        </div>
      </header>

      <section className="py-16 max-md:py-12">
        <div className="max-w-[760px] mx-auto px-8 article-prose">
          <h2>1. About us</h2>
          <p>
            Antex Pest Solutions is a pest control service provider founded
            in 2014, offering professional pest management services in Utah,
            including the St. George, Salt Lake City and Vernal areas.
          </p>

          <h2>2. Acceptance of terms</h2>
          <p>
            By accessing or using this website, you agree to these terms and
            conditions. If you do not agree with any part of them, please
            discontinue use of the site.
          </p>

          <h2>3. User eligibility</h2>
          <p>
            To use this website you must be at least 18 years old, use the
            site only for lawful purposes, and provide accurate information
            when submitting forms.
          </p>

          <h2>4. Services disclaimer</h2>
          <p>
            Information on this website is provided for general informational
            purposes only. It does not guarantee specific treatment results,
            immediate service availability, or exact pricing. Final pricing
            may require an on-site inspection.
          </p>

          <h2>5. Appointments &amp; service agreements</h2>
          <p>
            When requesting service, you agree to provide accurate property
            information. Pricing may vary after inspection, and the terms of
            any specific service may be detailed in a separate service
            agreement.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You agree not to use this site for unlawful activity, attempt
            unauthorized access to any part of the site, interfere with its
            operation, or submit false or misleading information.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            All content on this website is owned by Antex Pest Solutions and
            protected by applicable law. Reproduction without written
            permission is prohibited.
          </p>

          <h2>8. Privacy &amp; communications</h2>
          <p>
            Data you share for text messaging is used only for the
            service-related communications you requested and is not used for
            unrelated marketing. See our Privacy Policy for full details on
            how we handle your information.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the extent permitted by law, Antex Pest Solutions is not
            responsible for indirect or incidental damages, or for outcomes
            beyond the scope of agreed service terms.
          </p>

          <h2>10. No guarantees of results</h2>
          <p>
            Pest control results can vary with environmental factors, and
            ongoing maintenance may be necessary for lasting control. Any
            specific guarantees are stated in your service agreement.
          </p>

          <h2>11. Third-party tools</h2>
          <p>
            This site may rely on third-party platforms and tools (for
            example, scheduling or payment providers). We are not liable for
            the operation of third-party services beyond our control.
          </p>

          <h2>12. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            site after changes are posted constitutes acceptance of the
            updated terms.
          </p>

          <h2>13. Termination</h2>
          <p>
            We may suspend or terminate access to the website for conduct
            that violates these terms.
          </p>

          <h2>14. Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Utah,
            without regard to conflict-of-law principles.
          </p>

          <h2>15. Dispute resolution</h2>
          <p>
            Any dispute arising from these terms or your use of this website
            will first be addressed through good-faith negotiation; disputes
            that cannot be resolved informally will be handled in the courts
            of the State of Utah.
          </p>

          <h2>16. Contact</h2>
          <p>
            Questions about these terms? Call{" "}
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> or reach us through the
            contact form on this site.
          </p>

          <h2>17. Disclaimer</h2>
          <p>
            These terms are provided as a general framework for use of this
            website and do not constitute legal advice.
          </p>
        </div>
      </section>
    </>
  );
}
