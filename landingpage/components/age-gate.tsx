"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation, Trans } from 'react-i18next'

interface AgeGateProps {
  onVerify: () => void
}

export default function AgeGate({ onVerify }: AgeGateProps) {
  const { t } = useTranslation('landing');
  const [isChecked, setIsChecked] = useState(false)

  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 bg-secondary">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center gap-2 mb-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BeerBank_icon-ckSheVuB165QXocNYFgQNoBV2SFh5U.png"
            alt={t("age_gate.image_alt")}
            className="w-48 h-48"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 text-left cursor-pointer mb-2 p-4 rounded-lg bg-secondary hover:bg-muted transition-colors">
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
            className="mt-0.5 border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
          />
          <span className="text-sm text-foreground leading-relaxed">
            <Trans
              i18nKey="age_gate.checkbox_label"
              ns="landing"
              components={{ strong: <strong /> }}
            />
          </span>
        </label>

        {/* Enter button */}
        <Button
          onClick={onVerify}
          disabled={!isChecked}
          size="lg"
          className="text-base font-semibold"
        >
          {t("age_gate.enter_button")}
        </Button>
      </div>
    </main>
  )
}