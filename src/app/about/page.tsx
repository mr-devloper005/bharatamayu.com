import Link from 'next/link'
import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const principles = [
  {
    title: 'Scan fast, decide faster',
    body: 'Every surface is built for quick understanding so users can move from browse to action without friction.',
  },
  {
    title: 'Curation over clutter',
    body: 'We prioritize useful entries, cleaner metadata, and shorter cognitive paths instead of infinite noisy feeds.',
  },
  {
    title: 'Community with utility',
    body: 'The platform supports creators and readers while still staying practical for discovery and publishing.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#2C5D63]/16 bg-[#283739] text-[#E0E0E0]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A2C11C]">
              <Compass className="h-4 w-4" />
              About {SITE_CONFIG.name}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Built to help people discover better information with less noise.
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-8 text-[#E0E0E0]/78">
              {SITE_CONFIG.name} combines social bookmarking, profiles, and content publishing into a calmer product
              system where utility stays first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/team" className="inline-flex items-center gap-2 rounded-full bg-[#A2C11C] px-5 py-3 text-sm font-semibold text-[#283739] hover:bg-[#b4cf3a]">
                Meet the Team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0]/28 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {['12k+ active contributors', '180k+ curated resources', '95% repeat weekly readers'].map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-[#2C5D63]/18 bg-white/90 p-5 text-sm font-semibold shadow-[0_10px_30px_rgba(40,55,57,0.05)]">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="rounded-[1.8rem] border border-[#2C5D63]/18 bg-[#F4F6F5] p-6">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2C5D63]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Principle
                </p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#283739]/72">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
