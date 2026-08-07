import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Bebas_Neue,
  Fraunces,
  IBM_Plex_Mono,
  VT323,
} from "next/font/google";
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

/* Jersey wordmarks — same face the app renders on its jerseys */
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

/* Editorial display serif — the floodlit broadcast face */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexMono.variable} ${vt323.variable} ${bebas.variable} ${fraunces.variable}`}
    >
      <body className="noise scanlines">{children}</body>
    </html>
  );
}
