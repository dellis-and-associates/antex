const ITEMS = [
  "Free re-service guarantee",
  "EPA-registered products",
  "Hospital & daycare approved",
  "Family-owned since 2014",
];

export function TrustBar() {
  return (
    <div className="bg-ink-950 py-[22px]" role="list">
      <div className="max-w-wrap mx-auto px-8 flex flex-wrap justify-between gap-6">
        {ITEMS.map((item) => (
          <span
            key={item}
            role="listitem"
            className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-sand-200"
          >
            <b aria-hidden="true" className="font-normal text-clay-600">
              ✚
            </b>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
