export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-black focus:text-white focus:font-bold focus:border-2 focus:border-white"
    >
      Skip to main content
    </a>
  );
}
