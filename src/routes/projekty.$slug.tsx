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
    const title = `${project.name} — okładka | mlvdyski`;
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
              ← Wszystkie okładki
            </Link>
            <h1 className="mt-10 text-[18vw] leading-[0.82] font-bold tracking-[-0.05em] uppercase md:text-[12vw]">
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
              alt={`${project.name} — okładka wydawnictwa`}
              width={2160}
                height={2160}
                className="mx-auto aspect-square w-full max-w-[900px] object-cover"
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

      

        <section className="border-t border-border px-6 py-24 md:px-12">
          <div className="mx-auto max-w-[1600px]">
            <p className="label">Następna okładka</p>
            <Link
              to="/projekty/$slug"
              params={{ slug: next.slug }}
              className="group mt-6 inline-block"
            >
              <span className="text-[14vw] leading-[0.85] font-bold tracking-[-0.05em] uppercase transition-opacity duration-500 group-hover:opacity-60 md:text-[8vw]">
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


