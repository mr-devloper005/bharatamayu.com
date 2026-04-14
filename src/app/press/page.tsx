import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#2C5D63]/18 bg-[#283739] p-8 text-[#E0E0E0] lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A2C11C]">Press</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Media resources and official platform updates.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#E0E0E0]/80">
            Journalists and partners can use these materials for feature stories, product notes, and announcements.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.8rem] border border-[#2C5D63]/18 bg-white p-6 shadow-[0_12px_30px_rgba(40,55,57,0.05)]">
            <h2 className="text-lg font-semibold">Press Kit</h2>
            <p className="mt-2 text-sm text-[#283739]/72">Download logos, screenshots, and platform overviews.</p>
            <div className="mt-4 space-y-3">
              {['Brand logo pack (PNG, SVG)', 'Product screenshots (Web)', 'Company fact sheet (PDF)'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-[#2C5D63]/14 bg-[#F4F6F5] px-4 py-3">
                  <p className="text-sm font-medium">{item}</p>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#2C5D63]/24 px-3 py-1.5 text-xs font-semibold hover:bg-white">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              'Platform reaches major milestone with curation-first redesign',
              'How bharatamayu.com is reducing discovery friction for readers',
              'New creator workflows launched across profile and bookmarking lanes',
            ].map((headline) => (
              <article key={headline} className="rounded-[1.6rem] border border-[#2C5D63]/16 bg-[#F4F6F5] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2C5D63]">Press coverage</p>
                <h3 className="mt-2 text-base font-semibold">{headline}</h3>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5D63] hover:text-[#283739]">
                  Request full story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
