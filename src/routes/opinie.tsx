import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/lib/supabase";

type Opinion = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
};

export const Route = createFileRoute("/opinie")({
  component: OpinionsPage,
});

function OpinionsPage() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function loadOpinions() {
    const { data, error } = await supabase
      .from("opinions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("Nie udało się pobrać opinii.");
    } else {
      setOpinions(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOpinions();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanNickname = nickname.trim();
    const cleanContent = content.trim();

    if (cleanNickname.length < 2) {
      setMessage("Ksywka musi mieć minimum 2 znaki.");
      return;
    }

    if (cleanNickname.length > 30) {
      setMessage("Ksywka może mieć maksymalnie 30 znaków.");
      return;
    }

    if (cleanContent.length < 3) {
      setMessage("Opinia jest za krótka.");
      return;
    }

    if (cleanContent.length > 500) {
      setMessage("Opinia może mieć maksymalnie 500 znaków.");
      return;
    }

    setSending(true);
    setMessage("");

    const { error } = await supabase.from("opinions").insert({
      nickname: cleanNickname,
      content: cleanContent,
    });

    if (error) {
      console.error(error);
      setMessage("Nie udało się dodać opinii.");
      setSending(false);
      return;
    }

    setNickname("");
    setContent("");
    setMessage("Opinia została dodana.");

    await loadOpinions();

    setSending(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main>
        <section className="px-6 pt-36 pb-16 md:px-12 md:pt-48">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <h1 className="text-[16vw] leading-[0.82] font-bold tracking-[-0.05em] uppercase md:text-[10vw]">
                Opinie
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-2xl">
                Zobacz, co mówią osoby, z którymi pracowałem.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">

            <div className="md:col-span-5">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tight uppercase md:text-5xl">
                  Zostaw opinię
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <form onSubmit={handleSubmit} className="mt-10 space-y-6">

                  <div>
                    <label className="label">
                      Ksywka
                    </label>

                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="np. kabe"
                      maxLength={30}
                      className="mt-3 w-full border border-border bg-transparent px-4 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="label">
                      Opinia
                    </label>

                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Napisz kilka słów..."
                      maxLength={500}
                      rows={6}
                      className="mt-3 w-full resize-none border border-border bg-transparent px-4 py-4 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="border border-foreground bg-foreground px-8 py-4 text-[0.7rem] font-medium tracking-[0.24em] text-background uppercase transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending ? "Wysyłanie..." : "Dodaj opinię"}
                  </button>

                  {message && (
                    <p className="text-sm text-muted-foreground">
                      {message}
                    </p>
                  )}
                </form>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal>
                <div className="flex items-end justify-between border-b border-border pb-6">
                  <h2 className="text-3xl font-bold tracking-tight uppercase md:text-5xl">
                    Opinie
                  </h2>

                  <span className="label">
                    {opinions.length}
                  </span>
                </div>
              </Reveal>

              <div className="mt-10">
                {loading ? (
                  <p className="text-sm text-muted-foreground">
                    Ładowanie opinii...
                  </p>
                ) : opinions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nie ma jeszcze żadnych opinii. Bądź pierwszy.
                  </p>
                ) : (
                  <div className="border-t border-border">
                    {opinions.map((opinion) => (
                      <article
                        key={opinion.id}
                        className="border-b border-border py-8"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <h3 className="text-lg font-bold uppercase">
                            {opinion.nickname}
                          </h3>

                          <time className="label shrink-0">
                            {new Date(
                              opinion.created_at
                            ).toLocaleDateString("pl-PL")}
                          </time>
                        </div>

                        <p className="mt-5 max-w-2xl leading-relaxed text-silver">
                          {opinion.content}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
