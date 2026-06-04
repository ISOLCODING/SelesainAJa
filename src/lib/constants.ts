import { BiBookOpen, BiFile, BiLayout, BiPen, BiCodeAlt, BiLineChart } from "react-icons/bi";
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
    title: "Translate & Parafrase",
    description: "Terjemahan jurnal Inggris-Indonesia dan parafrase anti-plagiasi (Turnitin).",
    icon: BiPen,
    price: "Mulai Rp 35.000",
    href: "/services/translate",
    color: "from-emerald-400 to-teal-500",
    fullDescription: "Layanan eksklusif untuk menerjemahkan literatur asing dengan struktur bahasa yang natural serta memparafrase teks agar lolos uji Turnitin. Kami tidak menggunakan terjemahan mesin secara mentah, melainkan disesuaikan dengan konteks akademis.",
    features: [
      "Penerjemahan konteks akademis (Bukan sekadar Google Translate)",
      "Re-strukturisasi kalimat agar lebih mengalir",
      "Proofreading grammar & tata bahasa",
      "Parafrase tingkat tinggi untuk menekan similarity index",
      "Penyediaan laporan Turnitin sebelum dan sesudah"
    ],
    benefits: [
      "Kalimat mudah dipahami dan sesuai kaidah PUEBI",
      "Hemat waktu dalam membaca literatur asing",
      "Aman dari tuduhan plagiarisme di kampus"
    ],
    deliveryTime: "1 - 3 Hari Kerja"
  },
  {
    title: "Tugas Pemrograman",
    description: "Pengerjaan tugas koding, pembuatan website, atau aplikasi tugas akhir.",
    icon: BiCodeAlt,
    price: "Mulai Rp 150.000",
    href: "/services/programming",
    color: "from-blue-600 to-indigo-600",
    fullDescription: "Butuh bantuan memecahkan bug atau membuat aplikasi dari nol? Tim developer kami siap membantu pengerjaan tugas koding Anda. Kami menangani berbagai bahasa pemrograman mulai dari Web Development (React, Next.js, PHP), Mobile (Flutter), hingga Python.",
    features: [
      "Kode bersih (Clean Code) dan terstruktur",
      "Dokumentasi kode (comments) yang mudah dipahami",
      "Dukungan berbagai stack teknologi populer",
      "Instalasi dan setup di perangkat Anda",
      "Sesi penjelasan alur program (opsional)"
    ],
    benefits: [
      "Program dijamin berjalan tanpa error (Bug-free)",
      "Bisa dijadikan referensi belajar koding yang baik",
      "Hemat berhari-hari waktu debugging"
    ],
    deliveryTime: "3 - 7 Hari Kerja"
  },
  {
    title: "Olah Data Statistik",
    description: "Pengolahan data SPSS, Excel, R, atau Python untuk bab 4 Skripsi/Tesis.",
    icon: BiLineChart,
    price: "Mulai Rp 200.000",
    href: "/services/olah-data",
    color: "from-orange-500 to-amber-500",
    fullDescription: "Pusing dengan angka dan hasil uji statistik yang tidak signifikan? Kami membantu pengolahan data Anda dari tahap tabulasi hingga interpretasi hasil untuk Bab 4. Kami memastikan setiap tahapan uji statistik dilakukan dengan metode yang tepat dan valid.",
    features: [
      "Uji Validitas, Reliabilitas, dan Asumsi Klasik",
      "Analisis Regresi, ANOVA, SEM, PLS",
      "Output software lengkap (SPSS, EViews, SmartPLS, dll)",
      "Interpretasi dan narasi hasil secara komprehensif",
      "Konsultasi perbaikan jika data tidak normal"
    ],
    benefits: [
      "Hasil penelitian dapat dipertanggungjawabkan",
      "Tidak perlu pusing mempelajari software statistik",
      "Siap digunakan langsung untuk sidang skripsi/tesis"
    ],
    deliveryTime: "2 - 5 Hari Kerja"
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
