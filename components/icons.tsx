import type { JSX } from "react";

/**
 * Line-icon set ported from the approved homepage (antex-homepage.html).
 * Stroke-based, geometric, no fills — matches the SVG illustration style.
 */

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export type ServiceIconName =
  | "ant"
  | "rodent"
  | "termite"
  | "wasp"
  | "scorpion"
  | "building";

const paths: Record<ServiceIconName, JSX.Element> = {
  ant: (
    <>
      <circle cx="12" cy="6.4" r="2" />
      <ellipse cx="12" cy="11.4" rx="1.8" ry="2.2" />
      <ellipse cx="12" cy="17.2" rx="2.6" ry="3.2" />
      <path d="M10.6 5 L8.6 3M13.4 5 L15.4 3M10.3 10.4 L7 8.8M13.7 10.4 L17 8.8M10.3 12 L7 12.6M13.7 12 L17 12.6" />
    </>
  ),
  rodent: (
    <>
      <path d="M4 15c0-4 3.4-7 8-7 3.6 0 7 2 7 5 0 2.4-2 4-4.6 4H7.5C5.5 17 4 16.3 4 15Z" />
      <circle cx="7.6" cy="9.4" r="1.8" />
      <path d="M19 13c1.6 0 2.6 1.2 2 2.6" />
      <circle cx="14.8" cy="12.6" r=".4" />
    </>
  ),
  termite: (
    <>
      <path d="M5 20 L12 4 L19 20" />
      <path d="M8.2 13 H15.8M6.8 16.5 H17.2" />
      <circle cx="12" cy="8" r=".5" />
    </>
  ),
  wasp: (
    <>
      <ellipse cx="12" cy="14" rx="3" ry="5.4" />
      <path d="M12 8.6 V6.4M11 5.4 a1 1 0 1 1 2 0M9.4 12 C5.6 10.6 4 8 4.6 6M14.6 12 C18.4 10.6 20 8 19.4 6M10 14.6 h4M10.4 16.6 h3.2" />
    </>
  ),
  scorpion: (
    <>
      <ellipse cx="10" cy="14" rx="4.4" ry="3.2" />
      <path d="M14.4 12.6 C17.4 11.4 19 9 18.6 6.4M18.6 6.4 l-1.8.6M18.6 6.4 l.5 1.9M6 12 L3.4 10M6.4 15.6 L3.6 16.4M7.4 16.9 L6 19.4M12.6 16.6 L13.6 19" />
      <circle cx="8.6" cy="13.4" r=".45" fill="currentColor" />
    </>
  ),
  building: (
    <>
      <path d="M4 20 V6 l7-3 v17M11 20 h9 V10 h-9M4 20 h16" />
      <path d="M6.6 8.5 h1.6M6.6 12 h1.6M6.6 15.5 h1.6M14 13 h1.6M17 13 h1.4M14 16.5 h1.6M17 16.5 h1.4" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className = "",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
