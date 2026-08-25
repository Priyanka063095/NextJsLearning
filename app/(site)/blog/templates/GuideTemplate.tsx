import Link from "next/link";
import { ArrowLeft, List } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Image } from "next-sanity/image";
import { urlFor } from "@/sanity/lib/image";
import {
  type BlogPost,
  PostMeta,
  estimateReadingTime,
  extractHeadings,
  lightPortableTextComponents,
} from "./shared";

export function GuideTemplate({ post }: { post: BlogPost }) {
  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);

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
          className="pointer-events-none absolute inset-x-0 top-0 h-90"
          style={{
            background: "radial-gradient(60% 60% at 50% 20%, rgba(255,106,0,0.18), transparent 70%)",
          }}
        />
        <div className="rams-container relative pt-32 pb-20 sm:pt-40 sm:pb-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to blog
          </Link>

          <div className="mx-auto mt-10 max-w-220 text-center">
            <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-accent uppercase">
              Guide{post.category?.title ? ` · ${post.category.title}` : ""}
            </p>
            <h1 className="mt-4 text-[36px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[52px] lg:text-[64px]">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-165 text-[15px] leading-[1.6] text-white/60">
              {post.summary}
            </p>
            <div className="mt-6">
              <PostMeta
                category={null}
                publishedAt={post.publishedAt}
                readingTime={readingTime}
                author={post.author}
              />
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="rams-container relative -mt-12 sm:-mt-16">
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
        <div className="mx-auto flex max-w-260 gap-16">
          {headings.length > 0 && (
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-32 flex flex-col gap-3">
                <p className="flex items-center gap-2 font-mono text-[10.5px] font-bold tracking-[0.18em] text-graphite/45 uppercase">
                  <List className="h-3.5 w-3.5" aria-hidden />
                  On this page
                </p>
                <ul className="flex flex-col gap-2.5 border-l border-[#e8e8ed] pl-4">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={`block text-[13.5px] leading-[1.4] text-graphite/65 hover:text-accent ${
                          heading.level === "h3" ? "pl-3" : ""
                        }`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <div className="min-w-0 flex-1">
            {post.content && <PortableText value={post.content} components={lightPortableTextComponents} />}

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
      </div>
    </article>
  );
}
