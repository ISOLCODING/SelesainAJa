import { BiBookOpen, BiFile, BiLayout, BiPen, BiNews, BiArchive, BiBookBookmark } from "react-icons/bi";
import { ServiceType, TestimonialType, FAQType, StatType, StepType } from "../types/home";

export const services: ServiceType[] = [
  {
    title: "Tugas Makalah",
    description: "Pembuatan makalah akademik dengan referensi jurnal terpercaya & format standar kampus.",
    icon: BiBookOpen,
    price: "Mulai Rp 50.000",
    href: "/services/makalah",
    color: "from-blue-500 to-cyan-400",
    fullDescription: "Layanan pembuatan makalah kami dirancang khusus untuk membantu mahasiswa dalam menyusun tugas makalah yang berkualitas, terstruktur, dan sesuai dengan pedoman penulisan akademik di Indonesia. Kami menjamin orisinalitas setiap tulisan dan memberikan referensi yang relevan dan mutakhir.",
    features: [
      "Struktur lengkap (Pendahuluan, Pembahasan, Penutup)",
      "Panjang standar 10-15 halaman (bisa disesuaikan)",
      "Referensi buku & jurnal (5-10 tahun terakhir)",
      "Format margin dan spasi sesuai standar (APA/Harvard)",
      "Pengecekan plagiasi dengan Turnitin"
    ],
    benefits: [
      "Menghemat waktu riset dan pengetikan",
      "Kualitas tulisan terjamin oleh penulis ahli",
      "Garansi revisi jika ada ketidaksesuaian dengan brief"
    ],
    deliveryTime: "1 - 3 Hari Kerja"
  },
  {
    title: "Essay & Artikel",
    description: "Essay argumentatif, opini, atau artikel populer dengan gaya bahasa yang bisa disesuaikan.",
    icon: BiFile,
    price: "Mulai Rp 75.000",
    href: "/services/essay",
    color: "from-rose-500 to-orange-400",
    fullDescription: "Kami menyediakan jasa penulisan essay dan artikel dengan kedalaman argumen yang tajam dan gaya bahasa yang memikat. Sangat cocok untuk tugas opini, lomba penulisan, atau sekadar publikasi populer. Gagasan Anda akan dikemas secara sistematis dan persuasif.",
    features: [
      "Analisis mendalam dengan metodologi terukur",
      "Gaya bahasa akademis, semi-formal, atau populer",
      "Struktur argumen yang logis dan koheren",
      "Gaya sitasi otomatis (Mendeley/Zotero)",
      "Similarity index Turnitin di bawah 15%"
    ],
    benefits: [
      "Tulisan memiliki bobot dan karakter kuat",
      "Bebas repot mengumpulkan literatur jurnal",
      "Jaminan lolos uji plagiasi kampus"
    ],
    deliveryTime: "2 - 4 Hari Kerja"
  },
  {
    title: "Desain Presentasi",
    description: "PPT profesional, elegan, dan informatif untuk sidang atau presentasi kelas.",
    icon: BiLayout,
    price: "Mulai Rp 100.000",
    href: "/services/presentasi",
    color: "from-purple-500 to-indigo-500",
    fullDescription: "Visualisasikan ide dan data Anda melalui desain presentasi PowerPoint yang estetik dan profesional. Layanan ini sangat cocok untuk sidang skripsi, presentasi tugas kelas, atau seminar. Kami akan merangkum materi Anda menjadi poin-poin yang mudah dipahami oleh audiens dan penguji.",
    features: [
      "Desain custom yang elegan dan tidak pasaran",
      "Penggunaan infografis, chart, dan ilustrasi",
      "Animasi dan transisi yang smooth & profesional",
      "Pemadatan materi (dari teks panjang ke bullet points)",
      "Tersedia dalam format .PPTX dan .PDF"
    ],
    benefits: [
      "Meningkatkan rasa percaya diri saat presentasi",
      "Membuat penguji fokus pada substansi materi",
      "Tampilan modern yang memberikan kesan profesional"
    ],
    deliveryTime: "1 - 2 Hari Kerja"
  },

  {
    title: "Pembuatan Jurnal Ilmiah",
    description: "Penulisan jurnal terstandarisasi siap publikasi untuk SINTA atau Scopus.",
    icon: BiNews,
    price: "Mulai Rp 150.000",
    href: "/services/jurnal",
    color: "from-blue-600 to-indigo-600",
    fullDescription: "Kesulitan mengubah hasil penelitian menjadi format artikel jurnal? Kami siap menyusun karya tulis ilmiah Anda sesuai dengan template jurnal tujuan (SINTA, Scopus, DOAJ, dll). Layanan kami menjamin standar penulisan tingkat tinggi, bebas plagiasi, dan sesuai dengan kaidah publikasi akademis internasional.",
    features: [
      "Penyesuaian template jurnal (SINTA/Scopus)",
      "Penyusunan abstrak bilingual (ID-EN)",
      "Manajemen referensi Mendeley/Zotero",
      "Penyusunan metodologi dan hasil secara komprehensif",
      "Uji Turnitin gratis (Similarity < 15%)"
    ],
    benefits: [
      "Peluang diterima (Accepted) lebih tinggi",
      "Hemat waktu berbulan-bulan untuk drafting",
      "Terbebas dari kendala teknis format sitasi"
    ],
    deliveryTime: "3 - 7 Hari Kerja"
  },
  {
    title: "Proposal Skripsi / Penelitian",
    description: "Penyusunan proposal komprehensif Bab 1-3 lengkap dengan metodologi.",
    icon: BiArchive,
    price: "Mulai Rp 200.000",
    href: "/services/proposal",
    color: "from-orange-500 to-amber-500",
    fullDescription: "Proposal adalah langkah awal yang paling krusial. Kami membantu Anda menyusun Proposal Skripsi, Tesis, atau Penelitian (Bab 1, 2, dan 3) yang solid. Kami memastikan rumusan masalah tajam, kerangka teori relevan, dan metodologi yang tepat sehingga meminimalisir kemungkinan ditolak oleh Dosen Pembimbing.",
    features: [
      "Bab 1: Latar Belakang & Rumusan Masalah yang tajam",
      "Bab 2: Tinjauan Pustaka terbaru (5-10 tahun terakhir)",
      "Bab 3: Metodologi Penelitian yang aplikatif",
      "Termasuk draft kuesioner atau instrumen wawancara",
      "Sesi konsultasi untuk persiapan seminar proposal"
    ],
    benefits: [
      "Proposal lebih cepat di-ACC Dosen Pembimbing",
      "Alur pemikiran penelitian yang logis dan kuat",
      "Bebas pusing memikirkan grand theory"
    ],
    deliveryTime: "3 - 5 Hari Kerja"
  },
  {
    title: "Pengerjaan Skripsi Full",
    description: "Solusi lengkap pengerjaan Skripsi/Tesis dari Bab 1 hingga Bab 5.",
    icon: BiBookBookmark,
    price: "Mulai Rp 500.000",
    href: "/services/skripsi",
    color: "from-emerald-500 to-green-600",
    fullDescription: "Layanan premium kami untuk membantu mahasiswa tingkat akhir yang kesulitan menyelesaikan Skripsi atau Tesis. Layanan ini mencakup pengerjaan lengkap dari Bab 1 (Pendahuluan) hingga Bab 5 (Kesimpulan), termasuk pengolahan data. Anda akan didampingi hingga lulus dan revisi akan diakomodir penuh sesuai arahan Dosen Pembimbing.",
    features: [
      "Pengerjaan lengkap Bab 1 sampai Bab 5",
      "Pengolahan data (SPSS, EViews, PLS) dan interpretasi",
      "Bimbingan dan penjelasan via Zoom/Chat (opsional)",
      "Daftar Pustaka, Lampiran, dan Abstrak",
      "Garansi revisi sampai lulus sidang"
    ],
    benefits: [
      "Anda bisa fokus belajar materi untuk sidang",
      "Terbebas dari rasa stres dan ancaman DO",
      "Lulus tepat waktu dengan nilai memuaskan"
    ],
    deliveryTime: "7 - 14 Hari Kerja"
  }
];

export const steps: StepType[] = [
  {
    number: "01",
    title: "Konsultasi & Pemesanan",
    description: "Hubungi admin kami dan jelaskan detail tugas Anda. Kami akan memberikan estimasi harga dan waktu pengerjaan."
  },
  {
    number: "02",
    title: "Proses Pengerjaan",
    description: "Tim ahli kami akan mengerjakan tugas Anda sesuai dengan brief dan standar akademik yang berlaku."
  },
  {
    number: "03",
    title: "Review & Revisi",
    description: "Terima draft awal untuk direview. Kami memberikan garansi revisi hingga Anda puas dengan hasilnya."
  },
  {
    number: "04",
    title: "Tugas Selesai",
    description: "Dapatkan hasil akhir tugas dengan kualitas terbaik yang siap disubmit."
  }
];

export const stats: StatType[] = [
  { value: "1250", label: "Klien Puas", suffix: "+" },
  { value: "4.8", label: "Rating Rata-rata", suffix: "/5" },
  { value: "5000", label: "Tugas Selesai", suffix: "+" },
  { value: "24", label: "Jam Layanan", suffix: "/7" }
];

export const faqs: FAQType[] = [
  {
    question: "Apakah hasil tugas dijamin bebas plagiasi?",
    answer: "Ya, kami menjamin 100% bebas plagiasi. Setiap tugas yang kami kerjakan akan dilampirkan hasil pengecekan Turnitin sebagai bukti orisinalitas."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Pembayaran dapat dilakukan melalui transfer bank atau e-wallet. Anda cukup membayar DP 50% di awal dan pelunasan setelah draft awal selesai."
  },
  {
    question: "Apakah ada garansi revisi?",
    answer: "Tentu. Kami memberikan garansi revisi gratis selama 7 hari setelah hasil dikirimkan, asalkan revisi tidak menyimpang dari brief awal."
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer: "Waktu pengerjaan bervariasi tergantung tingkat kesulitan tugas. Untuk tugas standar bisa selesai dalam 1-3 hari. Kami juga melayani pengerjaan kilat 24 jam."
  }
];

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah M.",
    role: "Mahasiswi S1 Manajemen",
    content: "Sangat terbantu dengan layanan SelesainAja. Makalah saya selesai tepat waktu dengan kualitas yang sangat baik. Nilai A sudah di tangan!",
    rating: 5
  },
  {
    name: "Budi P.",
    role: "Mahasiswa S2 Ilmu Komunikasi",
    content: "Profesional dan fast response. Artikel jurnal saya berhasil tembus SINTA 3 berkat bantuan tim SelesainAja. Terima kasih banyak!",
    rating: 5
  },
  {
    name: "Dina L.",
    role: "Mahasiswi S1 Akuntansi",
    content: "Awalnya ragu, tapi ternyata hasilnya memuaskan. PPT untuk sidang skripsi saya dibuat sangat estetik dan materinya mudah dipahami.",
    rating: 4
  }
];
