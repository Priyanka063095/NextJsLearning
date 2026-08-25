import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SITE_NAME, SITE_URL } from "@/app/lib/site";
import type { BlogPost } from "../templates/shared";
import { StandardTemplate } from "../templates/StandardTemplate";
import { CaseStudyTemplate } from "../templates/CaseStudyTemplate";
import { AnnouncementTemplate } from "../templates/AnnouncementTemplate";
import { GuideTemplate } from "../templates/GuideTemplate";

async function getPost(slug: string) {
  const query = `*[_type=='blog' && slug.current==$slug][0]{
    title, summary, image, content, publishedAt, template, tags,
    clientName, stats, quote, quoteAuthor, ctaLabel, ctaHref,
    "author": author->name,
    "category": category->{title, "slug": slug.current}
  }`;

  return client.fetch<(BlogPost & { slug?: string }) | null>(query, { slug });
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const ogImage = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  const Template =
    post.template === "case-study"
      ? CaseStudyTemplate
      : post.template === "announcement"
        ? AnnouncementTemplate
        : post.template === "guide"
          ? GuideTemplate
          : StandardTemplate;

  return (
    <div className="flex flex-1 flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Template post={post} />
    </div>
  );
}
