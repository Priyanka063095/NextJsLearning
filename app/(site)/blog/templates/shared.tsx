import { Image } from "next-sanity/image";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type BlogTemplate = "standard" | "case-study" | "announcement" | "guide";

export type BlogPost = {
  title: string;
  summary: string;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
  author?: string;
  publishedAt?: string;
  category?: { title: string; slug?: string } | null;
  tags?: string[];
  template?: BlogTemplate;
  clientName?: string;
  stats?: { value: string; label: string }[];
  quote?: string;
  quoteAuthor?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blockText(block: PortableTextBlock) {
  const children = (block.children ?? []) as { text?: string }[];
  return children.map((child) => child.text ?? "").join("");
}

export function estimateReadingTime(content?: PortableTextBlock[]) {
  if (!content?.length) return 1;
  const words = content
    .filter((block) => block._type === "block")
    .map(blockText)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPublishedDate(publishedAt?: string) {
  if (!publishedAt) return null;
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export type Heading = { text: string; id: string; level: "h2" | "h3" };

export function extractHeadings(content?: PortableTextBlock[]): Heading[] {
  if (!content) return [];
  return content
    .filter((block) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
    .map((block) => {
      const text = blockText(block);
      return { text, id: slugify(text), level: block.style as "h2" | "h3" };
    })
    .filter((heading) => heading.text.length > 0);
}

export const lightPortableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={slugify(blockText(value))}
        className="mt-12 mb-4 scroll-mt-32 text-[26px] leading-[1.15] font-bold tracking-[-0.02em] text-carbon sm:text-[30px]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(blockText(value))}
        className="mt-10 mb-3 scroll-mt-32 text-[20px] leading-[1.2] font-semibold tracking-[-0.02em] text-carbon sm:text-[22px]"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 text-[17px] leading-[1.3] font-semibold text-carbon">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-5 text-[17px] leading-[1.6] text-graphite/80 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[15.5px] leading-[1.7] text-graphite/80 first:mt-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 flex list-disc flex-col gap-2 pl-5 text-[15.5px] leading-[1.7] text-graphite/80">
        {children}
      </ul>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <span className="my-8 block overflow-hidden rounded-2xl border border-[#e8e8ed]">
        <Image
          src={urlFor(value).width(1200).height(675).url()}
          alt={value?.alt ?? ""}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
        />
      </span>
    ),
  },
};

export function PostMeta({
  category,
  publishedAt,
  readingTime,
  author,
  tone = "dark",
}: {
  category?: { title: string } | null;
  publishedAt?: string;
  readingTime: number;
  author?: string;
  tone?: "dark" | "light";
}) {
  const date = formatPublishedDate(publishedAt);
  const dim = tone === "dark" ? "text-white/45" : "text-graphite/50";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase ${dim}`}
    >
      {category?.title && <span className="text-accent">{category.title}</span>}
      {category?.title && (date || author) && <span aria-hidden>·</span>}
      {author && <span>{author}</span>}
      {author && date && <span aria-hidden>·</span>}
      {date && <span>{date}</span>}
      <span aria-hidden>·</span>
      <span>{readingTime} min read</span>
    </div>
  );
}
