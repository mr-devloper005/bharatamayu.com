import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const posts = [
  {
    title: 'Why short-form bookmarking beats endless tabs',
    excerpt: 'A practical breakdown of how focused curation workflows reduce knowledge loss across teams.',
    category: 'Product',
  },
  {
    title: 'Designing for scan rhythm in content-heavy products',
    excerpt: 'How we use spacing, hierarchy, and micro-copy to make dense information feel calm.',
    category: 'Design',
  },
  {
    title: 'Community quality loops for sustainable growth',
    excerpt: 'A framework for balancing creator freedom with consistent value for readers.',
    category: 'Community',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e8eceb_0%,#f2f4f3_42%,#ffffff_100%)] text-[#283739]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#2C5D63]/18 bg-[#283739] p-8 text-[#E0E0E0] lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#A2C11C]">Blog</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Product notes, design decisions, and growth learnings.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#E0E0E0]/80">
            Fresh updates from the team building better discovery experiences for readers, creators, and communities.
          </p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-[1.8rem] border border-[#2C5D63]/18 bg-white p-6 shadow-[0_12px_30px_rgba(40,55,57,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2C5D63]">{post.category}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#283739]/72">{post.excerpt}</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5D63] hover:text-[#283739]">
                Read more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
