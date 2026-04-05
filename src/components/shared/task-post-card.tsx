import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { ExternalLink, FileText, Mail, MapPin, Tag } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";

type ListingContent = {
  location?: string;
  category?: string;
  description?: string;
  email?: string;
};

const stripHtml = (value?: string | null) =>
  (value || "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as ListingContent;
};

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaUrl = media[0]?.url;
  if (mediaUrl) return mediaUrl;

  const contentAny = content as Record<string, unknown>;
  const contentImage = typeof contentAny.image === "string" ? contentAny.image : null;
  if (contentImage) return contentImage;

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : [];
  const firstImage = contentImages.find((value) => typeof value === "string");
  if (firstImage) return firstImage as string;

  const contentLogo = typeof contentAny.logo === "string" ? contentAny.logo : null;
  if (contentLogo) return contentLogo;

  return "/placeholder.svg?height=640&width=960";
};

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost;
  href: string;
  taskKey?: TaskKey;
  compact?: boolean;
}) {
  const content = getContent(post);
  const image = getImageUrl(post, content);
  const rawCategory = content.category || post.tags?.[0] || "Post";
  const normalizedCategory = normalizeCategory(rawCategory);
  const category =
    CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory;

  const variant = taskKey || "listing";
  const isBookmarkVariant = variant === "sbm" || variant === "social";
  const imageAspect =
    variant === "image"
      ? "aspect-[4/5]"
      : variant === "article"
        ? "aspect-[16/10]"
        : variant === "pdf"
          ? "aspect-[4/5]"
          : variant === "classified"
            ? "aspect-[16/11]"
            : "aspect-[4/3]";

  const altText = `${post.title} ${category} ${variant === "listing" ? "business listing" : variant} image`;
  const imageSizes =
    variant === "article"
      ? "(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px"
      : variant === "image"
        ? "(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px"
        : "(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px";

  if (isBookmarkVariant) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-row items-start gap-4 overflow-hidden rounded-[1.75rem] border border-[rgba(110,26,55,0.12)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(255,247,239,0.92))] p-5 shadow-[0_18px_48px_rgba(85,35,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(85,35,42,0.12)]"
      >
        <div className="mt-1 rounded-full bg-[rgba(110,26,55,0.08)] p-2.5 text-[#6e1a37] transition group-hover:bg-[#6e1a37] group-hover:text-white">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(110,26,55,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e1a37]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#7b5f66]">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[#32111d] group-hover:text-[#8f1f3f]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-[#71565d]">
            {getExcerpt(content.description || post.summary, compact ? 120 : 180) || "Explore this bookmark."}
          </p>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#7b5f66]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-[rgba(110,26,55,0.12)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(255,247,239,0.92))] shadow-[0_20px_60px_rgba(85,35,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(110,26,55,0.18)] hover:shadow-[0_24px_70px_rgba(85,35,42,0.14)]"
    >
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage
          src={image}
          alt={altText}
          fill
          sizes={imageSizes}
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          intrinsicWidth={960}
          intrinsicHeight={720}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,12,17,0.46)] via-transparent to-transparent opacity-80" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[rgba(22,9,18,0.72)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === "pdf" && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[rgba(255,252,247,0.88)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#32111d] shadow">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? "py-4" : ""}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug text-[#32111d] ${variant === "article" ? "text-[1.35rem]" : "text-lg"}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-sm leading-7 text-[#70545d] ${variant === "article" ? "line-clamp-4" : "line-clamp-3"}`}>
          {getExcerpt(content.description || post.summary) || "Explore this post."}
        </p>
        <div className="mt-auto pt-4">
          {content.location && (
            <div className="inline-flex items-center gap-1 text-xs text-[#7b5f66]">
              <MapPin className="h-3.5 w-3.5" />
              {content.location}
            </div>
          )}
          {content.email && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#7b5f66]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
