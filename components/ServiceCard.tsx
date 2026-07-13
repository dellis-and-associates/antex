import Link from "next/link";
import { ServiceIcon, type ServiceIconName } from "./icons";

export function ServiceCard({
  icon,
  title,
  copy,
  href,
}: {
  icon: ServiceIconName;
  title: string;
  copy: string;
  href: string;
}) {
  return (
    <article className="bg-white border border-sand-200 rounded-lg px-7 pt-[30px] pb-[26px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-card hover:border-pine-100">
      <div className="w-[52px] h-[52px] rounded-[14px] bg-pine-100 grid place-items-center mb-5 text-pine-800">
        <ServiceIcon name={icon} className="w-7 h-7" />
      </div>
      <h3 className="font-body font-semibold text-[21px] text-ink-950 mb-2">
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed">{copy}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-[7px] mt-4 font-semibold text-[14.5px] text-pine-600 hover:text-clay-600"
      >
        Learn more <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
