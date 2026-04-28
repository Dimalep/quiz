export default function First({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* фон */}
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#1e3a8a" />

      {/* обводка */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* голова */}
      <circle cx="32" cy="26" r="9" fill="#60a5fa" />

      {/* тело */}
      <rect x="23" y="36" width="18" height="10" rx="5" fill="#60a5fa" />

      {/* наушники */}
      <rect x="14" y="22" width="5" height="12" rx="3" fill="#93c5fd" />
      <rect x="45" y="22" width="5" height="12" rx="3" fill="#93c5fd" />

      {/* дуга */}
      <path
        d="M14 24 Q32 10 50 24"
        stroke="#93c5fd"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* микрофон */}
      <circle cx="47" cy="38" r="2" fill="#93c5fd" />

      {/* блик */}
      <circle cx="26" cy="22" r="2" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
