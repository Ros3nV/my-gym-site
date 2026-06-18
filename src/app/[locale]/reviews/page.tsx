import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/StarRating";
import { Avatar } from "@/components/Avatar";

interface Review {
  text: string;
  rating: number;
}

function ReviewsContent() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Review[];

  return (
    <Section>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-ink-soft">{t("subtitle")}</p>
      </header>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((review, i) => (
          <li key={i}>
            <figure className="flex h-full flex-col gap-4 rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm">
              <StarRating rating={review.rating} />
              <blockquote className="text-ink-soft">“{review.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <Avatar size={40} className="shrink-0" />
                <span className="text-sm font-semibold text-ink">
                  {t("memberLabel")}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  return { title: t("title") };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReviewsContent />;
}
