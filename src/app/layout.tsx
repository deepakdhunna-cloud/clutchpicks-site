import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, VT323 } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040608",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://clutchpicksapp.com"),
  title: "Clutch Picks — AI Sports Predictions & Live Scores",
  description:
    "AI-powered sports picks, live scores, matchup analysis, and personal pick tracking across 11 leagues. 50,000 simulations per game. Free on the App Store.",
  keywords:
    "sports, picks, predictions, football, basketball, baseball, hockey, soccer, NFL, NBA, MLB, NHL, analysis, stats",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Clutch Picks",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    title: "Clutch Picks — AI Sports Predictions & Live Scores",
    description:
      "AI-powered sports picks, live scores, matchup analysis, and personal pick tracking across 11 leagues.",
    type: "website",
    url: "https://clutchpicksapp.com",
    images: [{ url: "/app-icon.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "Clutch Picks — AI Sports Predictions & Live Scores",
    description:
      "AI-powered sports picks, live scores, and matchup analysis across 11 leagues.",
    images: ["/app-icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} ${vt323.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
