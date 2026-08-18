export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="text-[13vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[8vw]">
          Okładka, która
          <br />
          brzmi jak album.
        </h2>

        <div className="mt-20 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label">© 2026 mlvdyski</p>
          <a href="mailto:kontakt.mlvdyski@gmail.com" className="label hover:text-signal">
            kontakt.mlvdyski@gmail.com
          </a>
          <a
            href="https://instagram.com/mlvdyski.gfx"
            target="_blank"
            rel="noreferrer"
            className="label hover:text-signal"
          >
            Instagram — @mlvdyski.gfx
          </a>
        </div>
      </div>
    </footer>
  );
}
