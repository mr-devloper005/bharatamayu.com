'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)

  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.86)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 xl:gap-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(110,26,55,0.14)] bg-white p-1.5 shadow-sm">
              <img
                src="/favicon.png?v=20260401"
                alt={`${SITE_CONFIG.name} logo`}
                width="48"
                height="48"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold text-[#35131f]">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[#8a6972] sm:block">
                {siteContent.navbar.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
            {primaryNavigation.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              const isActive = pathname.startsWith(task.route)
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-[rgba(110,26,55,0.1)] text-[#6e1a37]'
                      : 'text-[#685058] hover:bg-[rgba(110,26,55,0.05)] hover:text-[#8f1f3f]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{task.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden rounded-full text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f] md:flex"
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[#72BAA9] px-5 text-[#1b2422] hover:bg-[#60aa99]">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f] lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)] lg:hidden">
          <div className="space-y-2 px-4 py-4">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-3 flex items-center gap-3 rounded-2xl border border-[rgba(110,26,55,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[#685058]"
            >
              <Search className="h-4 w-4" />
              Search the site
            </Link>

            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-[rgba(110,26,55,0.08)] text-[#6e1a37]'
                      : 'text-[#685058] hover:bg-[rgba(110,26,55,0.05)] hover:text-[#8f1f3f]'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            {!isAuthenticated ? (
              <div className="grid gap-2 pt-3 sm:grid-cols-2">
                <Button variant="outline" asChild className="rounded-full border-[rgba(110,26,55,0.12)] bg-white">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-full bg-[#72BAA9] text-[#1b2422] hover:bg-[#60aa99]">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  )
}
