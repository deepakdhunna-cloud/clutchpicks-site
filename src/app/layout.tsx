import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "auto",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "CLUTCH PICKS | AI Sports Predictions",
  description:
    "AI-powered sports predictions, confidence ratings, and matchup analysis across major leagues.",
  keywords: "sports predictions, AI, NBA, NFL, MLB, NHL, MLS, EPL, NCAAF, NCAAB",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Clutch Picks",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "CLUTCH PICKS | AI Sports Predictions",
    description: "Review data-driven sports predictions, confidence ratings, and matchup analysis.",
    type: "website",
    url: "https://clutchpicksapp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLUTCH PICKS | AI Sports Predictions",
    description: "Data-driven sports predictions and matchup analysis.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
