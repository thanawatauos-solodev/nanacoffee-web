/** Top-down latte on a saucer. The rosetta slowly turns; steam wisps drift over the cup. */
export function LatteArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="crema" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#d39a5d" />
          <stop offset="55%" stopColor="#a86a3a" />
          <stop offset="88%" stopColor="#6e4124" />
          <stop offset="100%" stopColor="#4f2d18" />
        </radialGradient>
        <radialGradient id="saucer" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="80%" stopColor="#f3ebde" />
          <stop offset="100%" stopColor="#e4d6c1" />
        </radialGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#2a1a12" floodOpacity="0.28" />
        </filter>
        <filter id="steam-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Saucer */}
      <circle cx="200" cy="205" r="186" fill="url(#saucer)" filter="url(#soft-shadow)" />
      <circle cx="200" cy="205" r="150" fill="none" stroke="#e7dccb" strokeWidth="2" />

      {/* Spoon */}
      <g transform="rotate(-38 200 205)">
        <rect x="192" y="18" width="16" height="92" rx="8" fill="#d8c7ad" />
        <ellipse cx="200" cy="38" rx="20" ry="26" fill="#e7d9c3" />
      </g>

      {/* Handle */}
      <path d="M318 168c38-8 56 18 50 44-6 25-34 34-58 24" fill="none" stroke="#fffaf2" strokeWidth="26" strokeLinecap="round" />
      <path d="M318 168c38-8 56 18 50 44-6 25-34 34-58 24" fill="none" stroke="#eadfcd" strokeWidth="2" strokeLinecap="round" />

      {/* Cup */}
      <circle cx="200" cy="205" r="134" fill="#fffaf2" />
      <circle cx="200" cy="205" r="134" fill="none" stroke="#eadfcd" strokeWidth="2" />
      <circle cx="200" cy="205" r="116" fill="url(#crema)" />

      {/* Rosetta latte art */}
      <g className="origin-[200px_205px] animate-spin-slow" style={{ animationDuration: "60s" }}>
        <path
          d="M200 305c-58-34-84-74-78-112 5-30 30-46 54-40 13 3 21 13 24 24 3-11 11-21 24-24 24-6 49 10 54 40 6 38-20 78-78 112Z"
          fill="#f8ecda"
        />
        <path
          d="M200 282c-40-25-57-53-53-79 3-19 19-29 35-25 9 2 15 9 18 17 3-8 9-15 18-17 16-4 32 6 35 25 4 26-13 54-53 79Z"
          fill="#c98e57"
          opacity="0.75"
        />
        <path
          d="M200 262c-26-17-37-35-34-52 2-12 12-19 22-16 6 1 10 6 12 11 2-5 6-10 12-11 10-3 20 4 22 16 3 17-8 35-34 52Z"
          fill="#f8ecda"
        />
        <path d="M200 120v190" stroke="#f8ecda" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Steam */}
      <g filter="url(#steam-blur)" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round">
        <path className="animate-steam" d="M150 180c-14-22 14-34 0-58" opacity="0.6" />
        <path className="animate-steam" style={{ animationDelay: "1.1s" }} d="M205 160c-14-22 14-34 0-58" opacity="0.6" />
        <path className="animate-steam" style={{ animationDelay: "2.2s" }} d="M255 182c-14-22 14-34 0-58" opacity="0.6" />
      </g>
    </svg>
  );
}
