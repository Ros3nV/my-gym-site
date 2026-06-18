import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { IMAGES } from "@/data/images";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InitialLoader } from "@/components/InitialLoader";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"], // Cyrillic required for Bulgarian copy
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://mygym.bg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  // BG is default → canonical "/"; EN → "/en"
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s · MyGym" },
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        bg: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: "MyGym",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
      images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "MyGym" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [IMAGES.hero],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as ReadonlyArray<string>).includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <InitialLoader />
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
