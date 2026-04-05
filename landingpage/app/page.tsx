"use client"

import { useState } from "react"
import AgeGate from "@/components/age-gate"
import LandingPage from "@/components/landing-page"

export default function Page() {
  const [isAgeVerified, setIsAgeVerified] = useState(false)

  if (!isAgeVerified) {
    return <AgeGate onVerify={() => setIsAgeVerified(true)} />
  }

  return <LandingPage />
}
