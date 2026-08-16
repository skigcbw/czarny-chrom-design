import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Okładki", to: "/", hash: "projekty" },
  { label: "O mnie", to: "/", hash: "o-mnie" },
  { label: "Usługi", to: "/", hash: "uslugi" },
  { label: "Kontakt", to: "/", hash: "kontakt" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link
          to="/"
          className="flex items-baseline gap-3 text-sm font-bold lowercase tracking-[0.22em] transition-opacity hover:opacity-60"
        >
          <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
          mlvdyski
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                to={l.to}
                hash={l.hash}
                className="label transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="label md:hidden"
        >
          {open ? "Zamknij" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l.hash} className="py-3">
              <Link
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium uppercase tracking-tight"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
