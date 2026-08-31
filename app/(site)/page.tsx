import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { SITE_DESCRIPTION, SITE_NAME } from "@/app/lib/site";
import { Hero } from "./Hero/components/Hero";
import { HeroStats } from "./Hero/components/HeroStats";
import { Capabilities } from "./Hero/components/Capabilities";
import { AtosUnlocks } from "./Hero/components/AtosUnlocks";
import { InventoryControlDark } from "./Hero/components/InventoryControlDark";
import { TierPriority } from "./Hero/components/TierPriority";
import { AnalyticsLayer } from "./Hero/components/AnalyticsLayer";
import { AudienceGrid } from "./Hero/components/AudienceGrid";
import { ProvenResults } from "./Hero/components/ProvenResults";
import { LatestInsights } from "./Hero/components/LatestInsights";
import { CtaSection } from "./Hero/components/CtaSection";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Know What You Have. Know Where It Is.`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Know What You Have. Know Where It Is.`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

type Post = {
  title: string;
  summary: string;
  slug: string;
  image?: SanityImageSource;
  category?: { title: string } | null;
};

async function getLatestPosts() {
  const query = `*[_type=='blog'] | order(_createdAt desc)[0...3]{
    summary, title, image, "slug": slug.current,
    "category": category->{title}
  }`;

  return client.fetch<Post[]>(query);
}

async function LatestInsightsSection() {
  const posts = await getLatestPosts();
  return <LatestInsights posts={posts} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <HeroStats />
      <Capabilities />
      <AtosUnlocks />
      <InventoryControlDark />
      <TierPriority />
      <AnalyticsLayer />
      <AudienceGrid />
      <ProvenResults />
      <Suspense fallback={null}>
        <LatestInsightsSection />
      </Suspense>
      <CtaSection />
    </>
  );
}
