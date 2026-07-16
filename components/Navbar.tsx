"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Button as UIButton } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  // Close the mobile menu on navigation (Escape/overlay handled by Sheet)
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* top bar */}
      <div className="bg-ink-950 text-paper-200 font-mono text-[12.5px] tracking-[0.08em]">
        <div className="max-w-wrap mx-auto px-8 flex items-center justify-between py-[9px] gap-4">
          <span className="max-sm:hidden">
            SERVING ST GEORGE · VERNAL · NORTHERN UTAH
          </span>
          <a href={PHONE_TEL} className="hover:text-white hover:underline">
            CALL TODAY: {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="sticky top-0 z-50 bg-paper-50/[.92] backdrop-blur-[10px] border-b border-paper-200"
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
              className="hidden md:block font-mono text-[14px] text-red-700"
              href={PHONE_TEL}
            >
              {PHONE_DISPLAY}
            </a>
            <span className="hidden sm:inline-flex">
              <Button href="/contact">Get a free inspection</Button>
            </span>

            {/* mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <UIButton
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-11 h-11 -mr-2 text-ink-950 [&_svg]:size-6"
                >
                  <Menu aria-hidden="true" />
                  <span className="sr-only">Open menu</span>
                </UIButton>
              </SheetTrigger>
              <SheetContent side="right" className="bg-paper-50 border-paper-200 w-[320px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">Main menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-1 mt-2">
                  {LINKS.map((l) =>
                    l.external ? (
                      <SheetClose asChild key={l.label}>
                        <a
                          href={l.href}
                          className="py-3 font-medium text-ink-950 border-b border-paper-200 last:border-0"
                        >
                          {l.label}
                        </a>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild key={l.label}>
                        <Link
                          href={l.href}
                          className="py-3 font-medium text-ink-950 border-b border-paper-200 last:border-0"
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                  <div className="pt-4">
                    <SheetClose asChild>
                      <span className="block">
                        <Button href="/contact" className="w-full justify-center">
                          Get a free inspection
                        </Button>
                      </span>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
        className="absolute left-0 right-full bottom-0 border-t-2 border-red-600 transition-[right] duration-200 group-hover:right-0"
      />
    </>
  );
}
