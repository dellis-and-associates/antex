import Link from "next/link";

type LogoVariant = "default" | "reversed";

/**
 * Inline-SVG logo lockup (mark + wordmark), per necessary-files/logos/.
 * `default` = Juniper shield on light surfaces; `reversed` = Bone shield for
 * dark surfaces (footer).
 */
export function Logo({
  variant = "default",
  href = "/",
}: {
  variant?: LogoVariant;
  href?: string;
}) {
  const reversed = variant === "reversed";
  return (
    <Link
      href={href}
      className="flex items-center gap-[13px]"
      aria-label="Antex Pest Solutions home"
    >
      <ShieldMark reversed={reversed} className="h-[44px] w-[40px]" />
      <span className="leading-none">
        <b
          className={`block font-display text-2xl font-extrabold tracking-[0.02em] ${
            reversed ? "text-sand-50" : "text-ink-950"
          }`}
        >
          ANTEX
        </b>
        <span
          className={`font-mono text-[9.5px] tracking-[0.42em] ${
            reversed ? "text-pine-100" : "text-pine-600"
          }`}
        >
          PEST SOLUTIONS
        </span>
      </span>
    </Link>
  );
}

/** The crest shield with geometric ant and dashed perimeter ring. */
export function ShieldMark({
  reversed = false,
  className,
}: {
  reversed?: boolean;
  className?: string;
}) {
  const shield = reversed ? "#FAF6EE" : "#1F6A47";
  const ant = reversed ? "#17402F" : "#FAF6EE";
  return (
    <svg viewBox="0 0 120 132" className={className} aria-hidden="true">
      <path
        d="M60 6 C 78 14, 95 18, 108 18 L108 70 C108 100 88 118 60 127 C32 118 12 100 12 70 L12 18 C25 18 42 14 60 6 Z"
        fill={shield}
      />
      <path
        d="M60 13 C 75 19.5, 90 23, 101 23.5 L101 69 C101 95 84 111 60 119.5 C36 111 19 95 19 69 L19 23.5 C30 23 45 19.5 60 13 Z"
        fill="none"
        stroke={ant}
        strokeOpacity={reversed ? 0.45 : 0.35}
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
      <g stroke={ant} strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M55 37 Q49 27 42 24" />
        <path d="M65 37 Q71 27 78 24" />
        <path d="M54 57 L38 47" />
        <path d="M66 57 L82 47" />
        <path d="M53 64 L35 65" />
        <path d="M67 64 L85 65" />
        <path d="M54 71 L38 84" />
        <path d="M66 71 L82 84" />
      </g>
      <circle cx="60" cy="44" r="8.5" fill={ant} />
      <ellipse cx="60" cy="63.5" rx="7.5" ry="9.5" fill={ant} />
      <ellipse cx="60" cy="91" rx="12" ry="15" fill={ant} />
    </svg>
  );
}
