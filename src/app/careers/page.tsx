import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Product Designer', location: 'Remote', type: 'Full-time', level: 'Mid' },
  { title: 'Frontend Engineer', location: 'New York, NY', type: 'Full-time', level: 'Senior' },
  { title: 'Community Lead', location: 'Remote', type: 'Part-time', level: 'Mid' },
]

const benefits = [
  'Flexible schedules and remote-first culture',
  'Health, dental, and vision coverage',
  'Annual learning stipend',
  'Quarterly offsites and team retreats',
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#2C5D63]/18 bg-[#283739] p-8 text-[#E0E0E0] lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A2C11C]">Careers</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Build practical tools for creators, readers, and local discovery.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#E0E0E0]/80">
            Help us shape the next phase of {SITE_CONFIG.name} with stronger UX, cleaner publishing tools, and thoughtful community systems.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
          {roles.map((role) => (
            <article key={role.title} className="rounded-[1.5rem] border border-[#2C5D63]/18 bg-white p-6 shadow-[0_12px_30px_rgba(40,55,57,0.05)]">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-[#E0E0E0] px-3 py-1 font-semibold">{role.level}</span>
                  <span className="rounded-full border border-[#2C5D63]/25 px-3 py-1 font-semibold">{role.type}</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{role.title}</h2>
                <p className="mt-1 text-sm text-[#283739]/72">{role.location}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2C5D63]/25 px-4 py-2 text-sm font-semibold hover:bg-[#E0E0E0]/55">
                  View Role
                  <ArrowRight className="h-4 w-4" />
                </Link>
            </article>
          ))}
          </div>
          <aside className="rounded-[1.8rem] border border-[#2C5D63]/18 bg-[#F4F6F5] p-6">
            <h3 className="text-lg font-semibold">Why {SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm text-[#283739]/72">
              We are building a product that helps people discover and share the best knowledge on the web.
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#283739]/72">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-[#2C5D63]/16 bg-white px-3 py-2">
                  {benefit}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
