export default function Progress() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* outer frame */}
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.8"
      />

      {/* bars */}
      <path
        d="M7 16V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 16V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* glow dot (bet-style accent) */}
      <circle cx="17" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}
