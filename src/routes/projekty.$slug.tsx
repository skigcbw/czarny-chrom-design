import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projekty/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Projekt niedostępny" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — case study | Michał Stawski`;
    const description = project.opis.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="px-6 pt-36 pb-12 md:px-12 md:pt-48">
          <div className="mx-auto max-w-[1600px]">
            <Link to="/" hash="projekty" className="label hover:text-foreground">
              ← Wszystkie projekty
            </Link>
            <h1 className="chrome-text mt-10 text-[18vw] leading-[0.82] font-bold tracking-[-0.05em] uppercase md:text-[12vw]">
              {project.name}
            </h1>
            <div className="mt-10 flex flex-wrap gap-x-16 gap-y-6 border-t border-border pt-6">
              <div>
                <p className="label">Kategoria</p>
                <p className="mt-2 text-sm text-silver">{project.category}</p>
              </div>
              <div>
                <p className="label">Rok realizacji</p>
                <p className="mt-2 text-sm text-silver">{project.year}</p>
              </div>
              <div className="max-w-md">
                <p className="label">Zakres prac</p>
                <p className="mt-2 text-sm text-silver">{project.zakres.join(" · ")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-[1600px]">
            <img
              src={project.cover}
              alt={`${project.name} — zdjęcie otwierające`}
              className="max-h-[85vh] w-full object-cover"
            />
          </div>
        </section>

        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <h2 className="label">Krótki opis</h2>
            </Reveal>
            <Reveal delay={80} className="md:col-span-8">
              <p className="text-xl leading-relaxed text-silver md:text-3xl md:leading-[1.35]">
                {project.opis}
              </p>
            </Reveal>
          </div>
        </section>

        <Block title="Kierunek kreatywny">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.kierunek}
          </p>
        </Block>

        <Block title="Moodboard">
          <img
            src={project.moodboard}
            alt={`Moodboard projektu ${project.name}`}
            loading="lazy"
            className="w-full"
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.moodboardOpis}
          </p>
        </Block>

        <Block title="Typografia">
          <ul className="border-t border-border">
            {project.typografia.map((t) => (
              <li key={t.nazwa} className="grid gap-4 border-b border-border py-8 md:grid-cols-12">
                <span className="text-3xl font-bold tracking-tight uppercase md:col-span-5 md:text-5xl">
                  {t.nazwa}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground md:col-span-7">
                  {t.opis}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Kolorystyka">
          <div className="grid gap-px bg-border sm:grid-cols-2 md:grid-cols-4">
            {project.kolory.map((k) => (
              <div key={k.nazwa} className="bg-background p-6">
                <div
                  className="h-32 w-full border border-border"
                  style={{ background: k.hex }}
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm uppercase">{k.nazwa}</p>
                <p className="label mt-1">{k.hex}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Proces projektowy">
          <ol className="grid gap-px bg-border md:grid-cols-2">
            {project.proces.map((p) => (
              <li key={p.krok} className="surface p-8 md:p-10">
                <span className="label">{p.krok}</span>
                <h3 className="mt-6 text-xl font-bold tracking-tight uppercase">{p.tytul}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.opis}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Mockupy">
          <div className="grid gap-8 md:grid-cols-2">
            {project.mockupy.map((m, i) => (
              <img
                key={i}
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            ))}
          </div>
        </Block>

        <Block title="Finalne materiały">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.finalne}
          </p>
        </Block>

        <section className="border-t border-border px-6 py-24 md:px-12">
          <div className="mx-auto max-w-[1600px]">
            <p className="label">Następny projekt</p>
            <Link
              to="/projekty/$slug"
              params={{ slug: next.slug }}
              className="group mt-6 inline-block"
            >
              <span className="text-[14vw] leading-[0.85] font-bold tracking-[-0.05em] uppercase transition-all duration-500 group-hover:[background:var(--gradient-chrome)] group-hover:bg-clip-text group-hover:text-transparent md:text-[8vw]">
                {next.name}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <h2 className="label">{title}</h2>
        </Reveal>
        <Reveal delay={80} className="md:col-span-9">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
