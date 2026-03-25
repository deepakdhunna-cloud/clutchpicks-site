import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLUTCH PICKS | AI Sports Predictions",
  description:
    "AI-powered sports predictions analyzing 20 factors per game across 8 leagues. Know who wins before they play.",
  keywords: "sports predictions, AI, NBA, NFL, MLB, NHL, MLS, EPL, NCAAF, NCAAB",
  openGraph: {
    title: "CLUTCH PICKS | AI Sports Predictions",
    description: "Know who wins before they play. AI analyzes 20 factors per game across 8 leagues.",
    type: "website",
    url: "https://clutchpicksapp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLUTCH PICKS | AI Sports Predictions",
    description: "Know who wins before they play.",
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
      </head>
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
