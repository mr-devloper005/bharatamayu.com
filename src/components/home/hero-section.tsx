"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

export function HeroSection({ images }: { images: string[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 3) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className="relative overflow-hidden border-b border-[rgba(110,26,55,0.12)] bg-[#160912] text-white">
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Latest featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,9,18,0.92)_0%,rgba(22,9,18,0.76)_42%,rgba(22,9,18,0.78)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[rgba(247,241,230,1)] via-[rgba(247,241,230,0.68)] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#72BAA9]" />
              {siteContent.hero.badge}
            </div>

            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {siteContent.hero.title[0]}
              <span className="block text-[#D5E7B5]">{siteContent.hero.title[1]}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {siteContent.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#AE2448] px-7 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(174,36,72,0.34)] hover:bg-[#8e1b3b]"
              >
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/18 bg-white/8 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/12 hover:text-white"
              >
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/95 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <form action="/search" className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8d6b73]" />
                  <input
                    name="q"
                    placeholder={siteContent.hero.searchPlaceholder}
                    className="h-15 w-full rounded-[1.5rem] border border-[rgba(110,26,55,0.12)] bg-[#fffaf6] pl-14 pr-4 text-base text-[#32111d] outline-none transition placeholder:text-[#9d8890] focus:border-[#AE2448]/40"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-15 rounded-[1.5rem] bg-[#72BAA9] px-8 text-base font-semibold text-[#1e2020] hover:bg-[#5fa896]"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/72">
              <span className="font-semibold uppercase tracking-[0.22em] text-white/86">{siteContent.hero.focusLabel}</span>
              {SITE_CONFIG.tasks
                .filter((task) => task.enabled)
                .slice(0, 5)
                .map((task) => (
                  <Link key={task.key} href={task.route} className="transition hover:text-[#D5E7B5]">
                    {task.label}
                  </Link>
                ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="paper-panel relative overflow-hidden rounded-[2rem] p-4 md:p-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#2b0f19]">
                <ContentImage
                  src={slides[activeIndex]}
                  alt={`Featured slide ${activeIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="object-cover"
                  intrinsicWidth={960}
                  intrinsicHeight={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,9,18,0.95)] via-[rgba(22,9,18,0.3)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                  <div className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                    {siteContent.hero.featureCardBadge}
                  </div>
                  <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {siteContent.hero.featureCardTitle}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">
                    {siteContent.hero.featureCardDescription}
                  </p>
                </div>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="mt-5 flex items-center gap-2">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-10 bg-[#AE2448]" : "w-2.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
