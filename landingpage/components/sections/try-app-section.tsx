"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function TryAppSection() {
  const [consentChecked, setConsentChecked] = useState(false)

  return (
    <section id="try-app" className="py-12 px-6 md:py-20 bg-primary text-primary-foreground">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Get BeerBank<br></br>on your phone! 📲
        </h2>

        {/* App screenshots */}
        <div className="mb-8">
          <Image
            src="/app_all_screens.png"
            alt="BeerBank app screens"
            width={800}
            height={400}
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Features */}
        <strong> No installation needed</strong>: Just download and it will appear as a regular app (it&apos;s a PWA, if you know what it means)


        {/* Download button */}
        <div className="mt-4 text-center">
          <Button
            asChild
            size="lg"
            className="w-auto text-base font-semibold mt-4 mb-4 bg-amber-100 text-amber-900 hover:bg-amber-200"
          >
            <a
              href="https://beerbank.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-5 h-5 mr-2" />
              Download BeerBank
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
