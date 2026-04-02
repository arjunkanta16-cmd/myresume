import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg px-4 py-20 text-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-border/70 bg-surface/95 p-10 shadow-card">
        <p className="section-label">Not Found</p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.94]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
          The link may be outdated or the page may have moved. You can return to the portfolio and continue exploring the main sections from there.
        </p>
        <Link
          href="/"
          className="soft-ring mt-8 inline-flex items-center rounded-full bg-text px-5 py-3 text-sm font-semibold text-bg transition hover:-translate-y-0.5"
        >
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
