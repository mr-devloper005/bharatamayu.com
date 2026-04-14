import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="mb-10 rounded-[2rem] border border-[#2C5D63]/18 bg-[#283739] p-8 text-[#E0E0E0] lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#A2C11C]">Contact {SITE_CONFIG.name}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A support experience that feels consistent with the rest of the product.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#E0E0E0]/80">
            Tell us what you are trying to publish, fix, or launch. We will route it to the right lane quickly.
          </p>
        </section>
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.6rem] border border-[#2C5D63]/14 bg-[#F4F6F5] p-5">
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#283739]/72">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#2C5D63]/18 bg-white p-7 shadow-[0_18px_40px_rgba(40,55,57,0.06)]">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-[#2C5D63]/18 bg-white px-4 text-sm" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-[#2C5D63]/18 bg-white px-4 text-sm" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-[#2C5D63]/18 bg-white px-4 text-sm" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-[#2C5D63]/18 bg-white px-4 py-3 text-sm" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#A2C11C] px-6 text-sm font-semibold text-[#283739] hover:bg-[#b4cf3a]">Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
