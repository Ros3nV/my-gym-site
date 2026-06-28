import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ContactSlideshow } from "@/components/ContactSlideshow";
import { SOCIAL } from "@/config/nav";

function ContactsContent() {
  const t = useTranslations("contacts");
  const phone = t("phone");
  const email = t("email");

  // Corrections §6: contact details pinned left, a vertical image filling the
  // empty space on the right (stacks below the details on small screens).
  // corrections3 §5: add Instagram + Facebook links, drop the physical address.
  return (
    <Section containerClassName="max-w-5xl">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-ink-soft">{t("intro")}</p>

          <dl className="mt-8 space-y-5">
            <div className="flex items-center gap-3">
              <Phone className="shrink-0 text-brand" size={20} aria-hidden />
              <dt className="sr-only">{t("labels.phone")}</dt>
              <dd>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {phone}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="shrink-0 text-brand" size={20} aria-hidden />
              <dt className="sr-only">{t("labels.email")}</dt>
              <dd>
                <a href={`mailto:${email}`} className="hover:text-brand">
                  {email}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="shrink-0 text-brand" size={20} aria-hidden />
              <dt className="sr-only">{t("labels.instagram")}</dt>
              <dd>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand"
                >
                  {t("labels.instagram")}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="shrink-0 text-brand" size={20} aria-hidden />
              <dt className="sr-only">{t("labels.facebook")}</dt>
              <dd>
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand"
                >
                  {t("labels.facebook")}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-sm">
          <ContactSlideshow alt={t("imageAlt")} />
        </div>
      </div>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  return { title: t("title") };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactsContent />;
}
