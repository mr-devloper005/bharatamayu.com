'use client'

import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export default function LoginDetailsPage() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Login Details</h1>
          {isAuthenticated && user ? (
            <div className="mt-6 space-y-3 text-sm">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <button
                type="button"
                onClick={logout}
                className="inline-flex rounded-full border border-border px-4 py-2 font-semibold hover:bg-muted"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3 text-sm">
              <p>You are not logged in.</p>
              <Link href="/login" className="inline-flex rounded-full border border-border px-4 py-2 font-semibold hover:bg-muted">
                Go to Login
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
