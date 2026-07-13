import Image from "next/image";
import Link from "next/link";

type LogoVariant = "default" | "reversed";

/**
 * Brand lockup (ant mark + ANTEX wordmark + PEST SOLUTIONS bar), per
 * public/logo.webp. `default` = red/black on light surfaces; `reversed` =
 * red/white for dark surfaces (footer).
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
      className="inline-flex items-center"
      aria-label="Antex Pest Solutions home"
    >
      <Image
        src={reversed ? "/logo-reversed.webp" : "/logo.webp"}
        alt="Antex Pest Solutions"
        width={486}
        height={260}
        priority={!reversed}
        className="h-[58px] w-auto"
      />
    </Link>
  );
}
