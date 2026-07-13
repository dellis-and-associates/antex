/**
 * Hero illustration ported verbatim from the approved homepage:
 * a home held inside the treated perimeter, pests blocked outside the line.
 */
export function HouseScene() {
  return (
    <div className="bg-pine-800 rounded-md px-[34px] pt-[38px] pb-[30px]">
      <svg
        viewBox="0 0 440 300"
        role="img"
        aria-label="Illustration of a home protected inside a treated perimeter, with pests kept outside the line"
      >
        {/* ground */}
        <path d="M0 252 H440" stroke="#DCEDE2" strokeOpacity=".35" strokeWidth="2" />
        {/* desert sun */}
        <circle cx="376" cy="58" r="26" fill="#C2551E" opacity=".85" />
        {/* mesa horizon */}
        <path
          d="M0 252 L40 214 H108 L134 252 M296 252 L318 226 H366 L390 252"
          stroke="#DCEDE2"
          strokeOpacity=".3"
          strokeWidth="2"
          fill="none"
        />
        {/* protected perimeter */}
        <rect
          x="118"
          y="96"
          width="204"
          height="156"
          rx="14"
          fill="none"
          stroke="#FAF6EE"
          strokeWidth="2.5"
          strokeDasharray="7 8"
          strokeLinecap="round"
        />
        {/* house */}
        <g
          stroke="#FAF6EE"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M154 176 L220 126 L286 176" />
          <path d="M166 170 V236 H274 V170" />
          <rect x="206" y="196" width="28" height="40" />
          <rect x="178" y="188" width="18" height="18" />
          <rect x="244" y="188" width="18" height="18" />
          <path d="M252 142 V120 h12 v14" />
        </g>
        {/* shield check on the line */}
        <g transform="translate(302,82)">
          <path
            d="M18 0 C24 3 30 4.5 34.5 4.5 L34.5 20 C34.5 30 28 36 18 39.5 C8 36 1.5 30 1.5 20 L1.5 4.5 C6 4.5 12 3 18 0 Z"
            fill="#1F6A47"
            stroke="#FAF6EE"
            strokeWidth="2"
          />
          <path
            d="M11 19 l5 5 l10 -11"
            stroke="#FAF6EE"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* pests outside the line */}
        <g fill="#FAF6EE" opacity=".8">
          <g transform="translate(58,238)">
            <circle cx="0" cy="0" r="3.4" />
            <circle cx="8" cy="-1.5" r="2.6" />
            <circle cx="14.5" cy="-3" r="2" />
          </g>
          <g transform="translate(388,232)">
            <circle cx="0" cy="0" r="3.4" />
            <circle cx="-8" cy="-1.5" r="2.6" />
            <circle cx="-14.5" cy="-3" r="2" />
          </g>
        </g>
        {/* blocked arrows */}
        <g stroke="#C2551E" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M80 236 H108" />
          <path d="M102 230 l7 6 -7 6" />
          <path d="M368 230 H336" />
          <path d="M342 224 l-7 6 7 6" />
        </g>
      </svg>
    </div>
  );
}
