import { MotionConfig } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/app/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "RAMS Digital builds inventory location visibility, reconciliation and aging intelligence software for warehouse and 3PL operations.",
  sameAs: [],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <MotionConfig reducedMotion="user">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </MotionConfig>
    </>
  );
}
