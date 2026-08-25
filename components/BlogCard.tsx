import { Image } from 'next-sanity/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from "@sanity/image-url";

type BlogCardProps = {
  title: string;
  summary: string;
  slug: string;
  image?: SanityImageSource;
  category?: { title: string } | null;
};

export function BlogCard({ title, summary, slug, image, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8e8ed] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)]">
      {image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={urlFor(image).width(600).height(340).url()}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        {category?.title && (
          <p className="font-mono text-[10.5px] font-bold tracking-[0.18em] text-accent uppercase">
            {category.title}
          </p>
        )}
        <h2 className="text-[18px] leading-[1.25] font-semibold tracking-[-0.01em] text-carbon">
          {title}
        </h2>
        <p className="line-clamp-3 text-[14px] leading-[1.55] text-graphite/65">{summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-accent">
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
