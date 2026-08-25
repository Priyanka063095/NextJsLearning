import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/app/lib/site";

type PostRoute = {
  slug: string;
  updatedAt: string;
};

async function getPostRoutes() {
  const query = `*[_type=='blog']{
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`;

  return client.fetch<PostRoute[]>(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostRoutes();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
