export default function Game() {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* корпус */}
      <path
        d="M7.5 9.5C5 9.5 3 11.5 3 14v1c0 1.9 1.6 3.5 3.5 3.5h1.2l1.6-1.6h5.4l1.6 1.6h1.2C19.4 18.5 21 16.9 21 15v-1c0-2.5-2-4.5-4.5-4.5h-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* крестовина */}
      <path
        d="M8 13h3M9.5 11.5v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* кнопки */}
      <circle cx="15.5" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="17.8" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="17.8" cy="13.8" r="0.8" fill="currentColor" />

      {/* маленькая центральная деталь */}
      <circle cx="12" cy="12.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
