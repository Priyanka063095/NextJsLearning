import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { SanityImageSource } from "@sanity/image-url";

type Post = {
  title: string;
  summary: string;
  slug: string;
  image?: SanityImageSource;
  category?: { title: string } | null;
};

type LatestInsightsProps = {
  posts: Post[];
};

export function LatestInsights({ posts }: LatestInsightsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="insights" className="rams-container bg-white py-28 sm:py-36 lg:py-44">
      <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Eyebrow>Resources</Eyebrow>
          <h2 className="text-[32px] leading-[1.1] font-bold tracking-[-0.03em] text-carbon sm:text-[40px]">
            Latest insights
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
        >
          View all posts
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08} className="h-full">
            <BlogCard {...post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
