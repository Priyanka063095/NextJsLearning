import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { BlogCard } from "@/components/BlogCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE_NAME } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on warehouse inventory visibility, reconciliation, aging control and operational intelligence from " +
    SITE_NAME +
    ".",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    url: "/blog",
  },
};

type Post = {
  title: string;
  summary: string;
  slug: string;
  image?: SanityImageSource;
  category?: { title: string } | null;
  featured?: boolean;
};

async function getPosts() {
  const query = `*[_type=='blog'] | order(featured desc, _createdAt desc){
    summary, title, image, featured, "slug": slug.current,
    "category": category->{title}
  }`;

  return client.fetch<Post[]>(query);
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="rams-container py-28 sm:py-36 lg:py-44">
      <div className="mx-auto mb-16 max-w-225 text-center sm:mb-20">
        <Eyebrow className="mb-5 text-center">Resources</Eyebrow>
        <h1 className="text-[40px] leading-none font-bold tracking-[-0.04em] text-carbon sm:text-[60px] lg:text-[78px]">
          From the <span className="text-graphite/50">RAMS Digital team.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-220 text-[14px] leading-[1.55] text-graphite/65 sm:text-[15px]">
          Insights on inventory visibility, reconciliation intelligence and warehouse operations
          from the RAMS Digital team.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-sm text-graphite/50">No posts published yet — check back soon.</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
