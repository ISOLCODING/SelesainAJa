"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHeader 
          title="Kebijakan Privasi" 
          description="Komitmen kami dalam melindungi data dan kerahasiaan identitas Anda."
        />
        <div className="container-custom py-16 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-slate prose-lg max-w-none bg-[#FAFAFA] p-8 md:p-12 rounded-[2rem] border border-[#E4E4E7]"
          >
            <h3 className="text-2xl font-black text-[#0A0A0B] mb-4">1. Kerahasiaan Identitas</h3>
            <p className="text-[#71717A] mb-8 font-medium leading-relaxed">
              Kami menjamin kerahasiaan identitas (nama, asal kampus, nomor HP, email) seluruh klien SelesainAja. Informasi pribadi Anda tidak akan pernah kami publikasikan, bagikan, atau jual kepada pihak ketiga dengan alasan apa pun.
            </p>

            <h3 className="text-2xl font-black text-[#0A0A0B] mb-4">2. Pengumpulan Data</h3>
            <p className="text-[#71717A] mb-8 font-medium leading-relaxed">
              Data yang kami kumpulkan saat Anda berinteraksi dengan kami hanya digunakan untuk keperluan komunikasi (WhatsApp/Email), penagihan pembayaran (Invoice), dan distribusi hasil pengerjaan (Document Delivery).
            </p>

            <h3 className="text-2xl font-black text-[#0A0A0B] mb-4">3. Keamanan File & Tugas</h3>
            <p className="text-[#71717A] mb-8 font-medium leading-relaxed">
              Seluruh file tugas, data mentah (raw data), dan bahan penelitian yang Anda serahkan akan disimpan dengan aman. File tersebut akan kami hapus secara permanen dari server dan database kami selambat-lambatnya 30 (tiga puluh) hari setelah status *project* dinyatakan selesai.
            </p>

            <h3 className="text-2xl font-black text-[#0A0A0B] mb-4">4. Privasi Penulis (Writer)</h3>
            <p className="text-[#71717A] mb-0 font-medium leading-relaxed">
              Demi menjaga profesionalisme, kami mengatur dan membatasi komunikasi langsung antara klien dengan tim *writer/author*. Segala proses tanya-jawab, revisi, dan *briefing* hanya dilakukan melalui kanal Admin/Customer Service yang tersentralisasi.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
