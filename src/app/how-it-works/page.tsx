import { Metadata } from "next"
import { HowItWorksClient } from "@/components/how-it-works/HowItWorksClient"

export const metadata: Metadata = {
  title: "Cara Kerja | SelesainAja",
  description: "Pelajari bagaimana proses pemesanan dan pengerjaan tugas di SelesainAja. Mudah, transparan, dan cepat.",
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
