import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import heroChrome from "@/assets/hero-chrome.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mlvdyski — okładki muzyczne i cover art" },
      {
        name: "description",
        content:
          "mlvdyski projektuje wyłącznie okładki muzyczne: albumy, EP, single i serie wydawnicze. Czerń, typografia i mocna kompozycja.",
      },
      { property: "og:title", content: "mlvdyski — okładki muzyczne i cover art" },
      {
        property: "og:description",
        content: "Okładki albumów, EP i singli. Modernistyczna siatka, mocna typografia, czerń.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const skills = [
  "Okładki albumów",
  "Okładki EP i singli",
  "Serie wydawnicze",
  "Typografia tytułów",
  "Canvas i formaty social",
];

const services = [
  { nr: "01", title: "Okładka albumu", desc: "Pełny projekt okładki LP wraz z tylną stroną i wkładką." },
  { nr: "02", title: "Okładka EP", desc: "Spójny zestaw grafik dla krótszego wydawnictwa." },
  { nr: "03", title: "Okładka singla", desc: "Jeden mocny kadr, gotowy na miniaturę w streamingu." },
  { nr: "04", title: "Seria wydawnicza", desc: "System okładek dla wytwórni lub cyklu wydań." },
  { nr: "05", title: "Projekt winyla", desc: "Koperta, label, wkładka i przygotowanie do druku." },
  { nr: "06", title: "Pakiet promocyjny", desc: "Canvas, kadry na single i formaty 9:16 na story." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 26;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20 md:px-12">
      <div
        className="pointer-events-none absolute top-1/2 right-[-18%] w-[85vw] max-w-[900px] -translate-y-1/2 opacity-70 md:right-[-6%] md:w-[46vw]"
        style={{ transform: `translate3d(${offset.x}px, calc(-50% + ${offset.y}px), 0)` }}
        aria-hidden="true"
      >
        <img
          src={heroChrome}
          alt=""
          width={1408}
          height={1408}
          className="float-slow w-full mix-blend-screen"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 md:grid-cols-12">
        <div className="md:col-span-12">
          <Reveal delay={80}>
            <h1 className="text-[19vw] leading-[0.78] font-bold tracking-[-0.06em] lowercase md:text-[13vw]">
              mlvdyski
            </h1>
          </Reveal>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-12">
            <Reveal delay={180} className="md:col-span-5">
              <p className="text-[0.7rem] tracking-[0.28em] text-silver uppercase">
                Projektuję wyłącznie okładki muzyczne
              </p>
            </Reveal>
            <Reveal delay={260} className="md:col-span-5">
              <p className="max-w-md leading-relaxed text-muted-foreground">
                Albumy, EP, single i całe serie wydawnicze. Okładka, która działa zarówno na winylu
                12 cali, jak i w miniaturze 300 px.
              </p>
            </Reveal>
          </div>
          <Reveal delay={340}>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#projekty"
                className="border border-foreground bg-foreground px-8 py-4 text-[0.7rem] tracking-[0.24em] text-background uppercase transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
                Zobacz okładki
              </a>
              <a
                href="#kontakt"
                className="border border-border px-8 py-4 text-[0.7rem] tracking-[0.24em] uppercase transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                Zamów okładkę
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="projekty" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <h2 className="text-[10vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
              Wybrane okładki
            </h2>
            <span className="label hidden md:block">{projects.length} wydawnictw</span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 90}
              className="md:col-span-6"
            >
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50, on: false });

  return (
    <Link
      ref={ref}
      to="/projekty/$slug"
      params={{ slug: project.slug }}
      className="group block"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setShine({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setShine((s) => ({ ...s, on: false }))}
    >
      <div className="relative overflow-hidden bg-graphite">
        <img
          src={project.cover}
          alt={`Okładka ${project.name} — ${project.category}`}
          loading="lazy"
          width={2160}
          height={2160}
          className="aspect-square w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: shine.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.14), transparent 60%)`,
          }}
        />
        <span className="label absolute top-5 left-5 text-foreground/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6 border-t border-border pt-5">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[clamp(1.05rem,3.6vw,1.6rem)] font-bold tracking-tight whitespace-nowrap uppercase transition-colors duration-500 group-hover:text-signal md:text-[clamp(1.1rem,1.9vw,2rem)]">
            {project.name}
          </h3>
          <p className="label mt-3">{project.category}</p>
        </div>

        <span className="label shrink-0">{project.year}</span>
      </div>
    </Link>
  );
}

function About() {
  return (
    <section id="o-mnie" className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <div className="md:col-span-12">
          <Reveal>
            <h2 className="text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
              O mnie
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-silver md:text-2xl">
              Jestem mlvdyski i zajmuję się jedną rzeczą: okładkami muzycznymi. Zaczynam od odsłuchu,
              a kończę na komplecie plików gotowych do wydania.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Pracuję z artystami niezależnymi i małymi wytwórniami, od rapu po każdy gatunek
              muzyczny, nie ma to znaczenia. Nie zajmuję się projektowaniem grafik wektorowych typu
              logotypy.
            </p>
          </Reveal>

          <ul className="mt-16 border-t border-border">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 50}>
                <li className="group flex items-baseline gap-6 border-b border-border py-4">
                  <span className="label w-10 shrink-0 text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-bold tracking-tight text-muted-foreground uppercase transition-colors duration-500 group-hover:text-foreground md:text-4xl">
                    {s}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="uslugi" className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
            Usługi
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.nr} delay={i * 60}>
              <article className="surface h-full p-8 md:p-10">
                <span className="label text-signal">{s.nr}</span>
                <h3 className="mt-8 text-xl font-bold tracking-tight uppercase md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const kontakty = [
    { label: "E-mail", value: "kontakt.mlvdyski@gmail.com", href: "mailto:kontakt.mlvdyski@gmail.com" },
    { label: "Instagram", value: "@mlvdyski.gfx", href: "https://instagram.com/mlvdyski.gfx" },
  ];

  return (
    <section id="kontakt" className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="text-[10vw] leading-[0.88] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
            Masz materiał?
            <br />
            Zrobię okładkę
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
            Wyślij demo, termin premiery i kilka słów o brzmieniu. Odpisuję zwykle w ciągu doby.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href="mailto:kontakt.mlvdyski@gmail.com"
            className="mt-12 inline-block border border-foreground bg-foreground px-10 py-5 text-[0.7rem] tracking-[0.24em] text-background uppercase transition-colors duration-300 hover:bg-transparent hover:text-foreground"
          >
            Napisz do mnie
          </a>
        </Reveal>

        <dl className="mt-20 grid gap-px bg-border md:grid-cols-2">
          {kontakty.map((k) => (
            <div key={k.label} className="surface p-8">
              <dt className="label">{k.label}</dt>
              <dd className="mt-4">
                <a
                  href={k.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-silver hover:text-signal"
                >
                  {k.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
