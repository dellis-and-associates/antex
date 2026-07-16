import Link from "next/link";
import { Logo } from "./Logo";
import { SERVICES } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";
import { CUSTOMER_LOGIN_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-paper-200 pt-[72px] pb-9">
      <div className="max-w-wrap mx-auto px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] pb-[52px] border-b border-dashed border-[rgba(255,255,255,0.25)]">
          <div>
            <Logo variant="reversed" />
            <p className="text-[14.5px] leading-[1.7] mt-[18px] max-w-[34ch] text-[#A6A6A6]">
              Family-owned pest control protecting Utah homes and businesses
              since 2014. Licensed, insured, and guaranteed.
            </p>
          </div>

          <FooterCol title="Services">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white hover:underline">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <li>
              <Link href="/#why" className="hover:text-white hover:underline">
                About Antex
              </Link>
            </li>
            <li>
              <Link href="/#guarantee" className="hover:text-white hover:underline">
                Our guarantee
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <a href={CUSTOMER_LOGIN_URL} className="hover:text-white hover:underline">
                Customer login
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">
                Contact us
              </Link>
            </li>
          </FooterCol>

          <FooterCol title="Locations">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link href="/locations" className="hover:text-white hover:underline">
                  {l.addressLocality}: {l.streetAddress}
                </Link>
              </li>
            ))}
            <li>
              <a href={PHONE_TEL} className="font-mono hover:text-white hover:underline">
                {PHONE_DISPLAY}
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="flex flex-wrap justify-between gap-5 pt-7 text-[13px] text-[#8C8C8C]">
          <span>© {new Date().getFullYear()} Antex Pest Solutions. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white hover:underline">
              Terms of Service
            </Link>
            <span>Licensed & insured · Serving Utah since 2014</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-[12px] tracking-[0.2em] uppercase text-paper-200/80 mb-[18px]">
        {title}
      </h2>
      <ul className="grid gap-[11px] text-[15px] list-none">{children}</ul>
    </div>
  );
}
