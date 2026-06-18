import { Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SOCIAL } from "@/config/nav";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-surface-2">
      <Container>
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold">{tf("tagline")}</p>
            <p className="mt-1 text-sm text-ink-soft">
              © {year} MyGym. {tf("rights")}
            </p>
          </div>

          <nav className="flex gap-6" aria-label="Footer">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm hover:text-brand">
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tf("social.instagram")}
              className="text-brand transition-colors hover:text-brand-600"
            >
              <Instagram />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tf("social.facebook")}
              className="text-brand transition-colors hover:text-brand-600"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
