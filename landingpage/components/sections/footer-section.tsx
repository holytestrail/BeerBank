import { Mail, Linkedin, Beer } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="py-10 px-6 bg-foreground text-background">
      <div className="max-w-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-lg font-bold">(c) BeerBank, 2026</span>
        </div>

        <p className="text-center text-background/70 mb-6">
          Send me your feedback:
        </p>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:1134336@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Via email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/linitsky/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>Via LinkedIn</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-background/50">
          Made with questionable motivation choices
        </p>
      </div>
    </footer>
  )
}
