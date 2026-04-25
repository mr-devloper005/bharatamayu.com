import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Globe2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_24px_70px_rgba(40,55,57,0.12)]">
          <div className="h-3 bg-[linear-gradient(90deg,var(--bm-teal-dark),var(--bm-teal),var(--bm-lime))]" />
          <div className="grid lg:grid-cols-[320px_1fr]">
            <aside className="border-b border-border/70 bg-[linear-gradient(180deg,rgba(224,224,224,0.52),rgba(255,255,255,0.88))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl" />
                  <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-white/80 bg-muted shadow-lg shadow-secondary/10">
                    {logoUrl ? (
                      <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="160px" intrinsicWidth={160} intrinsicHeight={160} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-muted-foreground">
                        {post.title.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase text-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  Profile card
                </div>

                {domain ? (
                  <div className="mt-5 flex max-w-full items-center gap-2 rounded-lg border border-border/80 bg-white/70 px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm">
                    <Globe2 className="h-4 w-4 shrink-0 text-secondary" />
                    <span className="truncate">{domain}</span>
                  </div>
                ) : null}

                {website ? (
                  <Button asChild size="lg" className="mt-6 w-full max-w-[240px] justify-between rounded-lg px-5 text-base shadow-sm lg:max-w-none">
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-secondary">Featured profile</p>
                <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">{brandName}</h1>
              </div>

              <div className="mt-8 border-l-4 border-primary pl-5">
                <p className="text-sm font-semibold uppercase text-muted-foreground">About</p>
              </div>
              <article
                className="article-content prose prose-slate mt-4 max-w-3xl text-lg leading-8 text-foreground/90 prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
              <p className="text-sm font-semibold text-foreground">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
