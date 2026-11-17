import type { Metadata, Viewport } from "next";
import { Caveat, Nunito, Rubik } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import { ru } from "@/lib/i18n/ru";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "Super Kinder",
  keywords: [
    "Super Kinder",
    "Super kinder балабақшасы",
    "балабақша Алматы",
    "балабақша Нұр-Алатау",
    "Бостандық ауданы балабақша",
    "қазақ тілді балабақша",
    "детский сад Алматы",
    "детский сад Нур-Алатау",
    "детский сад Бостандыкский район",
    "Таңжарық 14",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: kk.meta.title,
    description: kk.meta.description,
    siteName: "«Super kinder» балабақшасы",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: kk.meta.title, description: ru.meta.description },
  robots: { index: true, follow: true },
  other: { "geo.region": "KZ-75", "geo.placename": "Алматы" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#bfe9ff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "«Super kinder» балабақшасы",
  url: SITE_URL,
  telephone: "+77789859796",
  openingHours: "08:00-18:30",
  sameAs: ["https://www.instagram.com/invites/contact/?utm_content=n07vjvm&dlrf=17nqur8dsyv4e"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Таңжарық көшесі, 14",
    addressLocality: "Алматы",
    addressRegion: "Бостандық ауданы, Нұр-Алатау шағынауданы",
    addressCountry: "KZ",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${nunito.variable} ${rubik.variable} ${caveat.variable} antialiased`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Анимации появления включаются только при работающем JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
