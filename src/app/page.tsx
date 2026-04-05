import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CTASection } from "@/components/home/cta-section";
import { TaskFeedSection } from "@/components/home/task-feed-section";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { fetchTaskPosts, getPostImages } from "@/lib/task-data";
import { siteContent } from "@/config/site.content";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/",
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  });
}

export default async function HomePage() {
  const taskFeed = (
    await Promise.all(
      SITE_CONFIG.tasks
        .filter((task) => task.enabled)
        .map(async (task) => ({
          task,
          posts: await fetchTaskPosts(task.key, 4, { allowMockFallback: false, fresh: true }),
        }))
    )
  ).filter(({ posts }) => posts.length);

  const heroImages = taskFeed
    .flatMap(({ posts }) => posts.flatMap((post) => getPostImages(post)))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <HeroSection images={heroImages} />
        <SchemaJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${SITE_CONFIG.defaultOgImage}`,
              sameAs: [],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <span className="editorial-label">{siteContent.home.introBadge}</span>
              <h2 className="editorial-divider mt-5 pb-5 text-4xl font-semibold text-[#3a1622] sm:text-5xl">
                {siteContent.home.introTitle}
              </h2>
              <div className="space-y-5 text-[15px] leading-8 text-[#5a4148] sm:text-base">
                {siteContent.home.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="paper-panel rounded-[2rem] p-6 sm:p-8">
              <span className="editorial-label">{siteContent.home.sideBadge}</span>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#553941]">
                {siteContent.home.sidePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={siteContent.home.primaryLink.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#AE2448] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8e1b3b]"
                >
                  {siteContent.home.primaryLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={siteContent.home.secondaryLink.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(110,26,55,0.15)] bg-white/70 px-5 py-3 text-sm font-semibold text-[#521a2d] transition hover:bg-white"
                >
                  {siteContent.home.secondaryLink.label}
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {taskFeed.map(({ task, posts }) => (
          <TaskFeedSection key={task.key} task={task} posts={posts} />
        ))}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
