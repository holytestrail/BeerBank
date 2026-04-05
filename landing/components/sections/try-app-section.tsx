"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function TryAppSection() {
  const [consentChecked, setConsentChecked] = useState(false)

  return (
    <section id="try-app" className="py-12 px-6 md:py-20 bg-primary text-primary-foreground">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Get BeerBank on your phone! 📲
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
        <Button
          asChild
          size="lg"
          className="w-full text-base font-semibold mt-4 mb-4 bg-amber-100 text-amber-900 hover:bg-amber-200"
        >
          <a
            href="https://beerbank.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!consentChecked) {
                e.preventDefault()
              }
            }}
            aria-disabled={!consentChecked}
          >
            <Download className="w-5 h-5 mr-2" />
            Download BeerBank
          </a>
        </Button>


        {/* Consent checkbox */}
        <div className="bg-primary-foreground/10 rounded-xl p-4 mb-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={consentChecked}
              onCheckedChange={(checked) => setConsentChecked(checked === true)}
              className="mt-0.5 border-primary-foreground/50 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
            />
            <span className="text-sm leading-relaxed">
              By using the app, you give your consent to be addressed in creative ways, including, but not limited to,
              &quot;lazy butt&quot;, &quot;miserable user&quot;, and so on, which is done not to harm you, but to make the BeerBank experience more enjoyable (not necessarily for you).
            </span>
          </label>
        </div>


      </div>
    </section>
  )
}
