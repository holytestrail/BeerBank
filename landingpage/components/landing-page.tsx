"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import HeroSection from "@/components/sections/hero-section"
import IntroSection from "@/components/sections/intro-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import MotivationSection from "@/components/sections/motivation-section"
import TryAppSection from "@/components/sections/try-app-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import FutureSection from "@/components/sections/future-section"
import FinalBannerSection from "@/components/sections/final-banner-section"
import FooterSection from "@/components/sections/footer-section"
import { I18nProvider } from "@/components/I18nProvider";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
]

function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <I18nProvider>
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium
                   bg-white/10 backdrop-blur-sm border border-white/20 text-white
                   hover:bg-white/20 transition-colors duration-200 focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <Globe size={16} strokeWidth={1.75} />
        <span>{selected.label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden
                     bg-white/95 backdrop-blur-md shadow-xl border border-black/10
                     py-1 z-50"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={selected.code === lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setOpen(false)
              }}
              className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer
                          transition-colors duration-150
                          ${selected.code === lang.code
                            ? "bg-black/5 text-black font-medium"
                            : "text-gray-700 hover:bg-black/5"
                          }`}
            >
              <span>{lang.label}</span>
              {selected.code === lang.code && (
                <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </I18nProvider>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-svh">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      <HeroSection />
      <IntroSection />
      <HowItWorksSection />
      <MotivationSection />
      <TryAppSection />
      <TestimonialsSection />
      <FutureSection />
      <FinalBannerSection />
      <FooterSection />
    </main>
  )
}