import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, Layers3, LayoutGrid, Sparkles, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { CTASection } from '@/components/home/cta-section'
import { TaskFeedSection } from '@/components/home/task-feed-section'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts, getPostImages } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function sectionTone(homeLayout: ReturnType<typeof getFactoryState>['recipe']['homeLayout']) {
  if (homeLayout === 'image-profile-home') {
    return {
      section: 'bg-[linear-gradient(180deg,rgba(5,10,20,0.88),rgba(8,15,28,0.98))] text-white',
      badge: 'border border-white/10 bg-[#8df0c8] text-[#07111f]',
      muted: 'text-slate-300',
      card: 'border border-white/10 bg-white/6 text-white',
      softCard: 'border border-white/10 bg-white/5 text-slate-200',
      button: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      secondary: 'border border-white/10 bg-white/7 text-white hover:bg-white/10',
    }
  }
  if (homeLayout === 'classified-home') {
    return {
      section: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f7f9f2_100%)] text-[#1f2617]',
      badge: 'border border-[#d4dcc6] bg-white text-[#1f2617]',
      muted: 'text-[#56604b]',
      card: 'border border-[#d4dcc6] bg-white text-[#1f2617]',
      softCard: 'border border-[#d4dcc6] bg-[#f4f6ef] text-[#56604b]',
      button: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      secondary: 'border border-[#d4dcc6] bg-white text-[#1f2617] hover:bg-[#ebefdf]',
    }
  }
  if (homeLayout === 'article-home') {
    return {
      section: 'bg-[linear-gradient(180deg,#fff8ee_0%,#fff1df_100%)] text-[#2f1d16]',
      badge: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
      muted: 'text-[#72594a]',
      card: 'border border-[#dbc6b6] bg-white/90 text-[#2f1d16]',
      softCard: 'border border-[#dbc6b6] bg-[#fff8ef] text-[#72594a]',
      button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
      secondary: 'border border-[#dbc6b6] bg-white text-[#2f1d16] hover:bg-[#f5ead9]',
    }
  }
  return {
    section: 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)] text-slate-950',
    badge: 'border border-slate-200 bg-white text-slate-950',
    muted: 'text-slate-600',
    card: 'border border-slate-200 bg-white text-slate-950',
    softCard: 'border border-slate-200 bg-slate-50 text-slate-600',
    button: 'bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

export default async function HomePage() {
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const taskFeed = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 4, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const heroImages = taskFeed.flatMap(({ posts }) => posts.flatMap((post) => getPostImages(post))).filter(Boolean).slice(0, 6)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key).slice(0, 3)
  const leadPosts = taskFeed[0]?.posts.slice(0, 3) || []
  const tone = sectionTone(recipe.homeLayout)

  const articleHome = recipe.homeLayout === 'article-home'
  const listingHome = recipe.homeLayout === 'listing-home'
  const imageProfileHome = recipe.homeLayout === 'image-profile-home'
  const classifiedHome = recipe.homeLayout === 'classified-home'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <SchemaJsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
              sameAs: [],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
          ]}
        />

        <section className={tone.section}>
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            {articleHome ? (
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Editor's note
                  </span>
                  <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">A richer editorial surface for stories, essays, and curated reading.</h1>
                  <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={primaryTask?.route || '/'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.button}`}>Start reading <ArrowRight className="h-4 w-4" /></Link>
                    {supportTasks[0] ? <Link href={supportTasks[0].route} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.secondary}`}>Browse {supportTasks[0].label}</Link> : null}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {leadPosts.slice(0, 2).map((post, index) => (
                    <article key={post.id || post.slug || index} className={`rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(80,42,17,0.08)] ${index === 0 ? tone.card : tone.softCard}`}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Featured {index + 1}</p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{post.title}</h2>
                      <p className="mt-3 text-sm leading-7 opacity-75">{post.summary || 'Long-form reading with stronger visual hierarchy and slower editorial pacing.'}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {listingHome ? (
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${tone.card}`}>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                    <Building2 className="h-3.5 w-3.5" />
                    Discovery layer
                  </span>
                  <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Structured discovery for listings, services, and business surfaces.</h1>
                  <p className={`mt-5 max-w-xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {enabledTasks.slice(0, 4).map((task) => {
                      const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                      return (
                        <Link key={task.key} href={task.route} className={`flex items-start gap-3 rounded-[1.5rem] p-4 ${tone.softCard}`}>
                          <div className="rounded-xl bg-black/5 p-2"><Icon className="h-4 w-4" /></div>
                          <div>
                            <p className="text-sm font-semibold">{task.label}</p>
                            <p className="mt-1 text-xs opacity-70">{task.description}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className={`rounded-[2rem] p-6 ${tone.softCard}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary surface</p>
                    <h2 className="mt-3 text-2xl font-semibold">{primaryTask?.label}</h2>
                    <p className="mt-3 text-sm leading-7 opacity-75">Built with a cleaner scan rhythm, tighter metadata blocks, and a stronger call-to-action system.</p>
                  </div>
                  <div className={`rounded-[2rem] p-6 ${tone.card}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Balanced layout</p>
                    <p className="mt-3 text-sm leading-7 opacity-75">Each surface gets its own section type so business-style discovery does not collapse into one repeated homepage rhythm.</p>
                  </div>
                  <div className={`rounded-[2rem] p-6 md:col-span-2 ${tone.card}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Fast actions</p>
                      <Link href={primaryTask?.route || '/'} className="text-sm font-semibold underline-offset-4 hover:underline">Open feed</Link>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href={primaryTask?.route || '/'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.button}`}>Browse listings <ArrowRight className="h-4 w-4" /></Link>
                      {supportTasks[0] ? <Link href={supportTasks[0].route} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.secondary}`}>See {supportTasks[0].label}</Link> : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {imageProfileHome ? (
              <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                <div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                    <ImageIcon className="h-3.5 w-3.5" />
                    Visual-first studio
                  </span>
                  <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Visual publishing and profile-driven discovery with more energy and contrast.</h1>
                  <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={primaryTask?.route || '/'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.button}`}>Open visuals <ArrowRight className="h-4 w-4" /></Link>
                    {supportTasks[0] ? <Link href={supportTasks[0].route} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.secondary}`}>Meet creators</Link> : null}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`row-span-2 min-h-[320px] rounded-[2rem] p-4 ${tone.card}`}>
                    {heroImages[0] ? <div className="h-full rounded-[1.5rem] bg-cover bg-center" style={{ backgroundImage: `url(${heroImages[0]})` }} /> : <div className="h-full rounded-[1.5rem] bg-white/8" />}
                  </div>
                  {supportTasks.concat(primaryTask ? [primaryTask] : []).slice(0, 3).map((task, index) => {
                    const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                    return (
                      <Link key={`${task.key}-${index}`} href={task.route} className={`rounded-[1.6rem] p-5 ${index === 2 ? tone.card : tone.softCard}`}>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] opacity-70"><Icon className="h-3.5 w-3.5" /> Lane {index + 1}</div>
                        <h2 className="mt-3 text-2xl font-semibold">{task.label}</h2>
                        <p className="mt-2 text-sm leading-7 opacity-75">{task.description}</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {classifiedHome ? (
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div className={`rounded-[2rem] p-7 ${tone.card}`}>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                    <Tag className="h-3.5 w-3.5" />
                    Utility board
                  </span>
                  <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A tighter surface for alerts, classified posts, and quick-response discovery.</h1>
                  <p className={`mt-5 text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {enabledTasks.slice(0, 6).map((task) => {
                    const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                    return (
                      <Link key={task.key} href={task.route} className={`rounded-[1.4rem] p-5 ${task.key === recipe.primaryTask ? tone.card : tone.softCard}`}>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] opacity-70"><Icon className="h-3.5 w-3.5" /> Surface</div>
                        <h2 className="mt-3 text-xl font-semibold">{task.label}</h2>
                        <p className="mt-2 text-sm leading-6 opacity-75">{task.description}</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {taskFeed.map(({ task, posts }, index) => (
          <TaskFeedSection key={task.key} task={task} posts={posts} featured={index === 0} />
        ))}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
