import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Image } from "next-sanity/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/sanity/lib/image";
import {
  type BlogPost,
  PostMeta,
  estimateReadingTime,
  lightPortableTextComponents,
} from "./shared";

export function AnnouncementTemplate({ post }: { post: BlogPost }) {
  const readingTime = estimateReadingTime(post.content);
  const ctaHref = post.ctaHref || "/#cta";
  const ctaLabel = post.ctaLabel || "Get in touch";

  return (
    <article>
      <header
        className="relative overflow-hidden text-white"
        style={{
          background: "radial-gradient(80% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 55%, #08080A 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-180"
          style={{
            background: "radial-gradient(60% 60% at 50% 20%, rgba(255,106,0,0.22), transparent 70%)",
          }}
        />
        <div className="rams-container relative pt-32 pb-24 sm:pt-40 sm:pb-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to blog
          </Link>

          <div className="mx-auto mt-10 max-w-270 text-center">
            <Badge>Announcement</Badge>
            <h1 className="mt-8 text-[44px] leading-[0.98] font-bold tracking-[-0.04em] sm:text-[64px] lg:text-[84px]">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-165 text-[15px] leading-[1.6] text-white/60 sm:text-[16px]">
              {post.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={ctaHref} icon>
                {ctaLabel}
              </Button>
              <Button href="/blog" variant="outline">
                Back to blog
              </Button>
            </div>
            <div className="mt-8">
              <PostMeta
                category={post.category}
                publishedAt={post.publishedAt}
                readingTime={readingTime}
                author={post.author}
              />
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="rams-container relative -mt-14 sm:-mt-20">
          <div className="relative mx-auto aspect-video w-full max-w-260 overflow-hidden rounded-2xl border border-black/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
            <Image
              src={urlFor(post.image).width(1400).height(788).url()}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 1040px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="rams-container py-16 sm:py-20">
        <div className="mx-auto max-w-165">
          {post.content && <PortableText value={post.content} components={lightPortableTextComponents} />}

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-[#e8e8ed] bg-[#F7F2E8]/40 p-8 text-center">
            <p className="text-[20px] leading-[1.3] font-semibold text-carbon">
              Ready to see it for yourself?
            </p>
            <Button href={ctaHref} icon>
              {ctaLabel}
            </Button>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-[#e8e8ed] pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e8e8ed] px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.1em] text-graphite/60 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
