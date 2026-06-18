import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Concept } from "@/components/sections/Concept";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReviewsSlider } from "@/components/sections/ReviewsSlider";
import { BookCta } from "@/components/sections/BookCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Concept />
      <HowItWorks />
      <ReviewsSlider />
      <BookCta />
    </>
  );
}
