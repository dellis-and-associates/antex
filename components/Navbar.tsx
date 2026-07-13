"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { CUSTOMER_LOGIN_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: CUSTOMER_LOGIN_URL, label: "Customer login", external: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* top bar */}
      <div className="bg-ink-950 text-sand-200 font-mono text-[12.5px] tracking-[0.08em]">
        <div className="max-w-wrap mx-auto px-8 flex items-center justify-between py-[9px] gap-4">
          <span className="max-sm:hidden">
            SERVING ST GEORGE · VERNAL · NORTHERN UTAH
          </span>
          <a href={PHONE_TEL} className="hover:text-white hover:underline">
            CALL TODAY — {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="sticky top-0 z-50 bg-sand-50/[.92] backdrop-blur-[10px] border-b border-sand-200"
      >
        <div className="max-w-wrap mx-auto px-8 flex items-center justify-between h-[78px]">
          <Logo />

          <div className="hidden lg:flex gap-[34px] font-medium text-[15.5px]">
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="group relative py-1.5 text-ink-950"
                >
                  <NavUnderline label={l.label} />
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="group relative py-1.5 text-ink-950"
                >
                  <NavUnderline label={l.label} />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-[18px]">
            <a
              className="hidden md:block font-mono text-[14px] text-pine-800"
              href={PHONE_TEL}
            >
              {PHONE_DISPLAY}
            </a>
            <span className="hidden sm:inline-flex">
              <Button href="/contact">Get a free inspection</Button>
            </span>

            {/* mobile hamburger */}
            <button
              type="button"
              className="lg:hidden grid place-items-center w-11 h-11 -mr-2 text-ink-950"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          hidden={!open}
          className="lg:hidden border-t border-sand-200 bg-sand-50"
        >
          <div className="max-w-wrap mx-auto px-8 py-6 grid gap-1">
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="py-3 font-medium text-ink-950 border-b border-sand-200 last:border-0"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="py-3 font-medium text-ink-950 border-b border-sand-200 last:border-0"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="pt-4">
              <Button href="/contact" className="w-full justify-center">
                Get a free inspection
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

/** Label with the clay slide-in underline from the approved homepage. */
function NavUnderline({ label }: { label: string }) {
  return (
    <>
      {label}
      <span
        aria-hidden="true"
        className="absolute left-0 right-full bottom-0 border-t-2 border-clay-600 transition-[right] duration-200 group-hover:right-0"
      />
    </>
  );
}
