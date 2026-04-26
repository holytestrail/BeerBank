"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { track } from '@vercel/analytics';
import { useTranslation } from 'react-i18next'

export default function TryAppSection() {
  const { t } = useTranslation('landing');

  return (
    <section id="try-app" className="py-12 px-6 md:py-20 bg-primary text-primary-foreground">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t("try_app.heading")}
        </h2>

        {/* App screenshots */}
        <div className="mb-8">
          <Image
            src="/app_all_screens.png"
            alt={t("try_app.image_alt")}
            width={800}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Features */}
        <strong>{t("try_app.no_install")}</strong> {t("try_app.no_install_description")}

        {/* Download button */}
        <div className="mt-4 text-center">
          <Button
            asChild
            size="lg"
            className="w-auto text-base font-semibold mt-4 mb-4 bg-amber-100 text-amber-900 hover:bg-amber-200"
          >
            
            <a href="https://beerbank.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('go_to_app')}
            >
              <Download className="w-5 h-5 mr-2" />
              {t("try_app.download_button")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}