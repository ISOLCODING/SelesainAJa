export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Panduan Lengkap Menulis Pendahuluan Makalah yang Menarik",
    excerpt: "Pelajari cara menyusun latar belakang, rumusan masalah, dan tujuan penelitian yang akan membuat dosen Anda terkesan sejak halaman pertama.",
    content: `
      <p>Pendahuluan adalah pintu gerbang menuju keseluruhan makalah Anda. Di sinilah Anda meyakinkan pembaca (dan dosen penilai) bahwa topik yang Anda angkat penting dan relevan.</p>
      
      <h2>1. Latar Belakang yang Kuat</h2>
      <p>Mulailah dengan hal yang umum sebelum mengerucut ke permasalahan spesifik. Gunakan data atau fenomena terbaru untuk menunjukkan bahwa topik tersebut sangat relevan saat ini.</p>
      
      <h2>2. Rumusan Masalah yang Tajam</h2>
      <p>Jangan hanya membuat daftar pertanyaan. Pastikan rumusan masalah Anda berkorelasi langsung dengan latar belakang dan menunjukkan celah (gap) yang akan Anda bahas.</p>
      
      <h2>3. Tujuan yang Jelas</h2>
      <p>Tujuan harus sinkron dengan rumusan masalah. Gunakan kata kerja operasional seperti 'menganalisis', 'mengevaluasi', atau 'mendeskripsikan'.</p>
    `,
    category: "Tips Menulis",
    date: "12 Okt 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop",
    slug: "panduan-lengkap-menulis-pendahuluan",
    author: "Tim Akademik"
  },
  {
    id: 2,
    title: "5 Kesalahan Fatal dalam Penulisan Daftar Pustaka APA Style",
    excerpt: "Hindari pengurangan nilai karena kesalahan format referensi. Berikut adalah kesalahan umum yang sering dilakukan mahasiswa.",
    content: `<p>Daftar pustaka sering diremehkan, namun format yang salah dapat berakibat fatal pada nilai Anda.</p>
      <h2>1. Kesalahan Format Nama Penulis</h2>
      <p>Banyak mahasiswa yang masih salah dalam menulis nama pengarang, terutama jika pengarang lebih dari satu orang. APA style memiliki aturan spesifik mengenai penggunaan et al. dan urutan nama.</p>
      <h2>2. Penulisan Tahun dan Judul yang Tidak Konsisten</h2>
      <p>Tahun terbit harus diletakkan dalam tanda kurung setelah nama penulis. Judul buku atau jurnal harus dicetak miring (italic). Ketidakkonsistenan ini sering menjadi target coretan dosen penguji.</p>
      <h2>3. Lupa Mencantumkan DOI atau URL</h2>
      <p>Untuk referensi dari sumber elektronik atau jurnal online, Digital Object Identifier (DOI) atau URL wajib dicantumkan di akhir sitasi.</p>
      <h2>4. Urutan Alfabetis yang Berantakan</h2>
      <p>Pastikan seluruh entri dalam daftar pustaka diurutkan secara alfabetis berdasarkan nama belakang penulis pertama.</p>
      <h2>5. Indentasi Menggantung (Hanging Indent)</h2>
      <p>Ini adalah kesalahan teknis yang paling umum. Baris kedua dan seterusnya dari sebuah referensi harus menjorok ke dalam sebesar 0.5 inci.</p>`,
    category: "Akademik",
    date: "28 Sep 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2000&auto=format&fit=crop",
    slug: "kesalahan-fatal-daftar-pustaka-apa-style",
    author: "Tim Penulis"
  },
  {
    id: 3,
    title: "Cara Lolos Uji Turnitin di Bawah 15% Tanpa Mengurangi Kualitas",
    excerpt: "Teknik parafrase yang benar dan aman untuk menurunkan tingkat kesamaan (similarity index) pada Turnitin.",
    content: `<p>Plagiarisme adalah dosa besar di dunia akademik. Berikut adalah cara legal dan etis untuk melakukan parafrase.</p>
      <h2>1. Pahami Konsep, Bukan Sekadar Mengganti Kata</h2>
      <p>Jangan menggunakan teknik 'spin' atau sekadar mencari sinonim per kata. Bacalah paragraf tersebut, pahami maknanya, lalu tutup sumber aslinya dan tulis kembali menggunakan gaya bahasa Anda sendiri.</p>
      <h2>2. Ubah Struktur Kalimat (Aktif ke Pasif)</h2>
      <p>Salah satu cara paling efektif adalah mengubah struktur kalimat dari aktif menjadi pasif atau sebaliknya. Ini akan mengubah susunan kalimat secara drastis di mata mesin Turnitin.</p>
      <h2>3. Gabungkan Beberapa Sumber</h2>
      <p>Sintesis adalah kunci. Jangan hanya bergantung pada satu sumber untuk sebuah paragraf. Gabungkan ide dari 2-3 jurnal berbeda ke dalam satu paragraf yang solid.</p>
      <h2>4. Gunakan Kutipan Langsung Secara Bijak</h2>
      <p>Jika ada kalimat yang sangat sulit diparafrase (seperti definisi ahli atau peraturan undang-undang), gunakan kutipan langsung dengan tanda kutip ("...") dan format sitasi yang tepat. Turnitin dapat diatur untuk mengecualikan kutipan.</p>`,
    category: "Anti-Plagiasi",
    date: "15 Sep 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    slug: "cara-lolos-uji-turnitin",
    author: "Tim Kreatif"
  },
  {
    id: 4,
    title: "Tips Membuat Presentasi Sidang Skripsi yang Elegan & Profesional",
    excerpt: "Desain PPT sangat mempengaruhi psikologi penguji. Simak cara memilih warna, font, dan layout yang tepat untuk sidang.",
    content: `<p>Jangan pindahkan isi skripsi Anda ke dalam PowerPoint. Slide harus menjadi pendukung, bukan naskah yang dibaca ulang.</p>
      <h2>1. Aturan 6x6</h2>
      <p>Batasi teks pada slide. Maksimal 6 baris per slide dan 6 kata per baris. Gunakan poin-poin singkat (bullet points) untuk memandu presentasi Anda.</p>
      <h2>2. Desain Minimalis dan Konsisten</h2>
      <p>Hindari animasi berlebihan dan transisi yang mengganggu. Gunakan 2-3 warna utama yang profesional (seperti biru tua, abu-abu, dan putih) serta font yang mudah dibaca seperti sans-serif (Inter, Roboto, atau Arial).</p>
      <h2>3. Visualisasi Data</h2>
      <p>Ubah tabel yang membosankan menjadi grafik atau diagram yang menarik. Penguji lebih mudah mencerna data visual dibandingkan deretan angka yang padat.</p>
      <h2>4. Slide Cadangan (Backup Slides)</h2>
      <p>Siapkan slide ekstra di akhir presentasi (setelah slide 'Terima Kasih') yang berisi detail metodologi, tabel lengkap, atau landasan teori tambahan untuk menjawab pertanyaan spesifik dari dosen penguji saat sesi tanya jawab.</p>`,
    category: "Presentasi",
    date: "02 Sep 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
    slug: "tips-presentasi-sidang-skripsi",
    author: "Tim Akademik"
  }
];
