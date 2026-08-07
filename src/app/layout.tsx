import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const SITE_URL = "https://clutchpicksapp.com";
const APP_STORE_URL = "https://apps.apple.com/us/app/clutch-picks/id6759183746";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Clutch Picks — Live Sports Intelligence",
    template: "%s — Clutch Picks",
  },
  description:
    "AI-powered sports intelligence for live scores, matchup context, confidence-rated picks, and personal tracking across 11 leagues.",
  keywords:
    "sports predictions, AI, NBA, NFL, MLB, NHL, MLS, EPL, UCL, T20 cricket, tennis, college football, college basketball",
  alternates: { canonical: "/" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Clutch Picks",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: "Clutch Picks — Live Sports Intelligence",
    description:
      "Follow live games, compare matchup context, and track your picks across 11 leagues.",
    type: "website",
    url: SITE_URL,
    siteName: "Clutch Picks",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Clutch Picks — Live Sports Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clutch Picks — Live Sports Intelligence",
    description:
      "Live scores, confidence-rated picks, matchup context, and personal tracking.",
    images: ["/og.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Clutch Picks",
      url: SITE_URL,
      logo: `${SITE_URL}/app-icon.png`,
      sameAs: [
        "https://www.instagram.com/clutchpicksapp/",
        "https://www.tiktok.com/@clutchpicksapp",
        "https://x.com/clutchpicksapp",
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Clutch Picks",
      operatingSystem: "iOS",
      applicationCategory: "SportsApplication",
      url: APP_STORE_URL,
      description:
        "Live scores, matchup context, confidence-rated picks, and personal tracking across 11 leagues.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
