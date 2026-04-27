import { Mail, Linkedin } from "lucide-react"
import { useTranslation } from 'react-i18next'

export default function FooterSection() {
  const { t } = useTranslation('landing');

  return (
    <footer className="py-10 px-6 bg-foreground text-background">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-lg font-bold">{t("footer.copyright")}</span>
        </div>

        <p className="text-center text-background/70 mb-6">
          {t("footer.feedback")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <a  href="mailto:1134336@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{t("footer.email_link")}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/linitsky/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>{t("footer.linkedin_link")}</span>
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-background/50">
          {t("footer.tagline")}
        </p>
      </div>
    </footer>
  )
}