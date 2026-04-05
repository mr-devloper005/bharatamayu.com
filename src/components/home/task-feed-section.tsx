import Link from "next/link";
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, Users } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import type { TaskConfig } from "@/lib/site-config";
import { TaskFeedCarousel } from "@/components/home/task-feed-carousel";
import { siteContent } from "@/config/site.content";

const taskIcons: Record<string, any> = {
  listing: Building2,
  classified: Tag,
  article: FileText,
  image: ImageIcon,
  profile: Users,
  social: LayoutGrid,
  sbm: LayoutGrid,
  pdf: FileText,
};

export function TaskFeedSection({
  task,
  posts,
}: {
  task: TaskConfig;
  posts: SitePost[];
}) {
  if (!posts.length) return null;

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 border-b border-[rgba(110,26,55,0.14)] pb-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="editorial-label">
              {(() => {
                const Icon = taskIcons[task.key] || LayoutGrid;
                return <Icon className="h-3.5 w-3.5" />;
              })()}
              {task.label}
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-[#35131f] sm:text-[2.15rem]">
              {siteContent.taskSectionHeading.replace("{label}", task.label)}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6e555d] sm:text-[15px]">
              {task.description || siteContent.taskSectionDescriptionSuffix}
            </p>
          </div>
          <Link
            href={task.route}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8f1f3f] transition hover:text-[#6e1a37]"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <TaskFeedCarousel task={task} posts={posts} />
      </div>
    </section>
  );
}
