import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import heroChrome from "@/assets/hero-chrome.jpg";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michał Stawski — Projektant graficzny i art director" },
      {
        name: "description",
        content:
          "Portfolio Michała Stawskiego: identyfikacje wizualne, art direction, 3D i typografia dla marek, które chcą się wyróżniać.",
      },
      { property: "og:title", content: "Michał Stawski — Projektant graficzny i art director" },
      {
        property: "og:description",
        content:
          "Identyfikacje wizualne, kampanie i cyfrowe doświadczenia. Czerń, chrom i mocna typografia.",
      },
    ],
  }),
  component: Home,
});

const skills = [
  "Projektowanie graficzne",
  "Art Direction",
  "Branding",
  "Identyfikacja wizualna",
  "3D / Motion",
  "Projektowanie cyfrowe",
  "Typografia",
];

const services = [
  { nr: "01", title: "Identyfikacja wizualna", desc: "Znak, system i księga marki gotowa do wdrożenia." },
  { nr: "02", title: "Art Direction", desc: "Spójny kierunek wizualny dla kampanii, sesji i publikacji." },
  { nr: "03", title: "Projektowanie graficzne", desc: "Materiały drukowane, publikacje, opakowania, nośniki." },
  { nr: "04", title: "Kampanie wizualne", desc: "Koncepcja, key visual i pełna adaptacja formatów." },
  { nr: "05", title: "3D & Motion", desc: "Obiekty, rendery i animacje o jakości produkcyjnej." },
  { nr: "06", title: "Typografia", desc: "Systemy typograficzne, lettering i skala wydawnicza." },
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
        className="pointer-events-none absolute top-1/2 right-[-18%] w-[85vw] max-w-[900px] -translate-y-1/2 opacity-80 md:right-[-6%] md:w-[52vw]"
        style={{ transform: `translate3d(${offset.x}px, calc(-50% + ${offset.y}px), 0)` }}
        aria-hidden="true"
      >
        <img
          src={heroChrome}
          alt=""
          width={1408}
          height={1408}
          className="float-slow w-full"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <p className="label">Portfolio — Warszawa</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="chrome-text mt-8 text-[17vw] leading-[0.82] font-bold tracking-[-0.05em] uppercase md:text-[11vw]">
            Michał
            <br />
            Stawski
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 max-w-md text-[0.7rem] tracking-[0.28em] text-silver uppercase">
            Projektant graficzny / Art Director / Artysta wizualny
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Tworzę identyfikacje wizualne, kampanie i cyfrowe doświadczenia dla marek, które chcą się
            wyróżniać.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#projekty"
              className="border border-foreground bg-foreground px-8 py-4 text-[0.7rem] tracking-[0.24em] text-background uppercase transition-colors duration-300 hover:bg-transparent hover:text-foreground"
            >
              Zobacz projekty
            </a>
            <a
              href="#kontakt"
              className="border border-border px-8 py-4 text-[0.7rem] tracking-[0.24em] uppercase transition-colors duration-300 hover:border-chrome"
            >
              Skontaktuj się
            </a>
          </div>
        </Reveal>
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
              Wybrane projekty
            </h2>
            <span className="label hidden md:block">{projects.length} realizacje</span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 90}
              className={
                p.span === "tall"
                  ? "md:col-span-5"
                  : p.span === "wide"
                    ? "md:col-span-7"
                    : "md:col-span-6 md:col-start-4"
              }
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
          alt={`Projekt ${project.name} — ${project.category}`}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
            project.span === "tall" ? "aspect-[4/5]" : "aspect-[7/5]"
          }`}
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
        <div>
          <h3 className="text-3xl font-bold tracking-tight uppercase transition-all duration-500 group-hover:[background:var(--gradient-chrome)] group-hover:bg-clip-text group-hover:text-transparent md:text-4xl">
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
        <Reveal className="md:col-span-5">
          <img
            src={portrait}
            alt="Michał Stawski — portret w czerni i bieli"
            loading="lazy"
            width={1008}
            height={1264}
            className="w-full grayscale contrast-125"
          />
        </Reveal>
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
              O mnie
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-silver md:text-2xl">
              Projektuję identyfikacje wizualne, systemy graficzne i doświadczenia cyfrowe, łącząc
              precyzyjną typografię, mocną kompozycję i eksperymentalną formę.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Pracuję samodzielnie i w zespołach interdyscyplinarnych — z markami modowymi,
              instytucjami kultury i firmami technologicznymi. Każdy projekt zaczynam od pytania o
              formę, nie o trend.
            </p>
          </Reveal>

          <ul className="mt-16 border-t border-border">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 50}>
                <li className="group border-b border-border py-4">
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
                <span className="label">{s.nr}</span>
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
    { label: "E-mail", value: "studio@stawski.design", href: "mailto:studio@stawski.design" },
    { label: "Instagram", value: "@stawski.design", href: "https://instagram.com" },
    { label: "Behance", value: "behance.net/stawski", href: "https://behance.net" },
    { label: "LinkedIn", value: "in/stawski", href: "https://linkedin.com" },
  ];

  return (
    <section id="kontakt" className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="text-[10vw] leading-[0.88] font-bold tracking-[-0.04em] uppercase md:text-[5vw]">
            Porozmawiajmy
            <br />o projekcie
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
            Masz pomysł, markę lub projekt, który potrzebuje mocnej oprawy wizualnej? Napiszmy.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href="mailto:studio@stawski.design"
            className="mt-12 inline-block border border-foreground bg-foreground px-10 py-5 text-[0.7rem] tracking-[0.24em] text-background uppercase transition-colors duration-300 hover:bg-transparent hover:text-foreground"
          >
            Napisz do mnie
          </a>
        </Reveal>

        <dl className="mt-20 grid gap-px bg-border md:grid-cols-4">
          {kontakty.map((k) => (
            <div key={k.label} className="surface p-8">
              <dt className="label">{k.label}</dt>
              <dd className="mt-4">
                <a href={k.href} target="_blank" rel="noreferrer" className="text-sm text-silver hover:text-foreground">
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
