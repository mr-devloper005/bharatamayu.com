import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const team = [
  { name: 'Aditya Sharma', role: 'Founder & Product Lead', focus: 'Product direction, growth, and platform quality.' },
  { name: 'Riya Verma', role: 'Content Systems', focus: 'Editorial quality, taxonomy, and publication standards.' },
  { name: 'Nikhil Rao', role: 'Discovery UX', focus: 'Search flow, card systems, and faster scanning experiences.' },
  { name: 'Meera Nair', role: 'Community Partnerships', focus: 'Creator onboarding, collaborations, and user programs.' },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#2C5D63]/18 bg-[#283739] p-8 text-[#E0E0E0] lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A2C11C]">Core Team</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">People building the next version of focused discovery.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#E0E0E0]/80">
            We are a compact team designing better publishing and bookmarking workflows that stay useful at scale.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="rounded-[1.8rem] border border-[#2C5D63]/18 bg-white p-6 shadow-[0_12px_30px_rgba(40,55,57,0.05)]">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="mt-1 text-sm font-medium text-[#2C5D63]">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-[#283739]/72">{member.focus}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[1.8rem] border border-[#2C5D63]/18 bg-[#F4F6F5] p-6">
          <h3 className="text-xl font-semibold">Want to work with us?</h3>
          <p className="mt-2 text-sm text-[#283739]/72">We collaborate with writers, curators, and operators who care about signal over noise.</p>
          <Link href="/careers" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#A2C11C] px-5 py-3 text-sm font-semibold text-[#283739] hover:bg-[#b4cf3a]">
            View Careers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
