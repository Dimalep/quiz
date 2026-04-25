export default function Email() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="4"
        stroke="url(#grad)"
        stroke-width="1.8"
        fill="none"
      />

      <path
        d="M4 7L12 13L20 7"
        stroke="url(#grad)"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stop-color="#3B82F6" />
          <stop offset="100%" stop-color="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
