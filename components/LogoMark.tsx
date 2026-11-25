export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M8 83c-2 4 1 7 5 7h25L62 36 51 17c-3-6-10-6-13 0z" fill="#22a647"/><path d="M62 36 88 83c2 4-1 7-5 7H38z" fill="#17883a"/><path d="M52 90 70 50l18 33c2 4-1 7-5 7z" fill="#0f6b2c"/><path d="M62 78 74 66" stroke="#fff" strokeWidth="5" strokeLinecap="round"/><path d="M66 63h11v11" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
