const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="chrome-text text-[13vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[8vw]">
          Stwórzmy coś
          <br />
          wyjątkowego.
        </h2>

        <div className="mt-20 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label">© 2026 Michał Stawski</p>
          <a href="mailto:studio@stawski.design" className="label hover:text-foreground">
            studio@stawski.design
          </a>
          <ul className="flex gap-8">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
