# 📚 CeritaKita — Product Requirements Document (PRD)
**Platform Buku Cerita Interaktif untuk Anak TK Indonesia**
> Versi 3.1 | Mei 2026 | Status: Draft

---

## Metadata

| Field | Detail |
|---|---|
| Nama Aplikasi | CeritaKita |
| Versi Dokumen | 3.1 |
| Tanggal | Mei 2026 |
| Status | Draft |
| Target Pengguna | Anak-anak TK (4–6 tahun) |
| Platform | Web (Mobile-first, Responsive) |
| Bahasa Utama | Bahasa Indonesia |
| Budget | Rp 7.000.000 |

> **Catatan Revisi v3.1:** Fitur "Word Tap" diubah menjadi "Sound Triggers" — fokus pada suara, bukan pada penandaan visual kata. Admin cukup klik titik di atas gambar slide dan assign file MP3. Satu slide bisa punya beberapa sound trigger. Visual word marking (underline/highlight) dihapus. Fitur free maintenance dihapus. Timeline dipersingkat menjadi 1 bulan (full-time), fase desain formal diskip.

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Tujuan & Metrik Sukses](#2-tujuan--metrik-sukses)
3. [User Persona](#3-user-persona)
4. [Core Features](#4-core-features)
5. [App Flow](#5-app-flow)
6. [Prioritas Fitur & Roadmap](#6-prioritas-fitur--roadmap)
7. [Spesifikasi Teknis](#7-spesifikasi-teknis)
8. [Keputusan Desain & Produk](#8-keputusan-desain--produk)

---

## 1. Ringkasan Eksekutif

### 1.1 Visi Produk

CeritaKita adalah platform buku cerita interaktif berbasis web untuk anak-anak TK (usia 4–6 tahun). Platform ini dikelola oleh satu creator (pemilik platform) yang mempublikasikan cerita bergambar buatannya. Setiap buku terdiri dari slide bergambar penuh yang dibuat di tool desain seperti Canva, kemudian diupload ke platform sebagai PNG. Pembaca dapat mengetuk area tertentu di slide untuk mendengar suara yang relevan (misal: tap gambar gajah → suara gajah), serta memainkan satu game sederhana di halaman terakhir setiap buku.

### 1.2 Masalah yang Diselesaikan

Anak TK membutuhkan media belajar yang visual, menarik, dan interaktif. Buku digital yang ada kebanyakan berupa PDF statis tanpa interaksi. CeritaKita menghadirkan pengalaman membaca yang lebih hidup melalui sound triggers interaktif dan game edukatif sederhana — tanpa kompleksitas teknis bagi creator maupun pembaca.

### 1.3 Solusi

CeritaKita dibangun di atas tiga pilar sederhana:
- **Slide Reader:** Tampilkan buku sebagai slide PNG bergambar penuh, navigasi mudah untuk anak.
- **Sound Triggers:** Area-area tertentu di slide bisa diketuk untuk memainkan suara yang relevan. Satu slide bisa memiliki beberapa sound trigger.
- **Mini-Game di Akhir Buku:** Satu game sederhana (pilihan ganda bergambar) di halaman terakhir setiap buku.

---

## 2. Tujuan & Metrik Sukses

| Metric | Target 6 Bulan |
|---|---|
| Jumlah Buku Diterbitkan | 5–10 |
| Monthly Active Readers (MAR) | 200–500 |
| Avg. Session Duration | 5–10 menit |
| Buku Selesai Dibaca (%) | 50% |

---

## 3. User Persona

### Persona 1: Pembaca (Anak TK, 4–6 Tahun)
- **Profil:** Anak usia dini yang sedang belajar, biasanya didampingi guru atau orang tua. Sangat visual, tertarik dengan ilustrasi warna-warni dan suara.
- **Kebutuhan:** Buku bergambar menarik, tombol yang besar dan mudah diklik, ada suara saat mengetuk area gambar, game seru di akhir.
- **Frustrasi:** Navigasi yang membingungkan, tidak ada feedback saat berinteraksi.
- **Goal:** Menikmati cerita sambil mengenal suara objek-objek di sekitarnya.

### Persona 2: Guru / Orang Tua (Pendamping)
- **Profil:** Guru TK atau orang tua yang mendampingi anak membaca. Mengakses platform via tablet atau laptop di kelas/rumah.
- **Kebutuhan:** Platform yang mudah dibuka (tidak perlu install), konten aman untuk anak, bisa dipakai langsung tanpa setup.
- **Goal:** Menggunakan CeritaKita sebagai media pembelajaran yang menyenangkan.

### Persona 3: Creator / Admin (Pemilik Platform)
- **Profil:** Satu orang yang membuat dan mengelola seluruh konten. Sudah terbiasa menggunakan Canva untuk membuat ilustrasi dan slide.
- **Kebutuhan:** Cara mudah untuk upload slide PNG, tandai titik-titik suara di atas gambar, isi konten game, dan publish — tanpa coding.
- **Goal:** Mempublikasikan buku cerita bergambar interaktif dengan cepat dan mudah.

---

## 4. Core Features

### 4.1 Slide Reader

#### 4.1.1 Tampilan Slide
- Setiap halaman buku ditampilkan sebagai gambar PNG full-screen (format landscape 16:9).
- Teks sudah menjadi bagian dari gambar PNG yang dibuat creator — platform tidak mengelola teks.
- Layout bersih, fokus ke konten gambar.

#### 4.1.2 Navigasi Halaman
- Tombol panah kiri/kanan untuk pindah halaman.
- Swipe kiri/kanan di mobile/tablet.
- Progress bar sederhana di bawah slide (menunjukkan posisi halaman saat ini).
- Tidak ada fitur bookmark atau simpan progres — setiap sesi dimulai dari awal.

#### 4.1.3 Sound Triggers
- Creator menandai satu atau beberapa titik suara di atas slide PNG melalui admin panel, dengan cara **klik pada area gambar** (tidak perlu drag-resize).
- Setiap titik suara memiliki file MP3 yang di-assign oleh creator.
- Saat pembaca mengetuk/mengklik area titik suara, MP3 yang relevan diputar.
- Titik suara ditandai dengan ikon kecil (misal: ikon speaker atau sparkle) agar anak tahu area mana yang interaktif.
- Satu slide bisa memiliki lebih dari satu sound trigger.
- Slide yang tidak memiliki sound trigger ditampilkan sebagai slide statis biasa.

### 4.2 Mini-Game di Akhir Buku

- Satu game disisipkan sebagai halaman terakhir setiap buku.
- Template game: **Pilih Gambar yang Benar** — ditampilkan sebuah pertanyaan, pembaca memilih satu dari beberapa gambar sebagai jawaban (maksimal 4 pilihan).
- Contoh: "Mana yang termasuk sayuran?" → pilih dari gambar brokoli, mobil, buku, jeruk.
- Konten game (soal + gambar pilihan + jawaban benar) diisi oleh creator melalui form di admin panel.
- Feedback langsung: animasi bintang/konfeti jika benar, shake/tanda X jika salah.
- Tombol "Baca Lagi" dan rekomendasi buku lain setelah game selesai.
- Tombol "Skip" tersedia untuk melewati game.

### 4.3 Katalog Buku (Beranda)

- Grid buku: cover, judul, estimasi waktu baca.
- Tidak ada filter atau pencarian — katalog menampilkan semua buku yang sudah published.
- Klik cover buku → halaman detail buku.
- Halaman detail: cover besar, judul, deskripsi singkat, tombol "Baca Sekarang".
- Tidak ada login atau profil pembaca.

### 4.4 Admin Panel

Panel khusus creator, diakses via URL tersendiri (contoh: ceritakita.id/admin). Dilindungi dengan login sederhana (username + password).

#### 4.4.1 Manajemen Buku
- Buat buku baru: isi judul, deskripsi singkat, upload cover, pilih kategori usia.
- Lihat semua buku: status (draft/published), jumlah slide, tanggal terakhir edit.
- Edit atau hapus buku.

#### 4.4.2 Upload & Kelola Slide
- Upload gambar PNG per slide (bisa batch upload sekaligus).
- Urutkan slide dengan drag-and-drop atau tombol atas/bawah.
- Per slide: klik titik di atas preview gambar untuk menambah sound trigger → assign file MP3. Bisa beberapa titik per slide.
- Hapus atau ganti gambar slide kapan saja.

#### 4.4.3 Isi Konten Game
- Tandai slide terakhir sebagai halaman game.
- Form isian: teks pertanyaan, upload gambar untuk setiap pilihan (maks. 4), tandai jawaban benar.

#### 4.4.4 Publishing
- **Draft:** Tersimpan, tidak terlihat publik.
- **Published:** Buku tayang di katalog publik.
- **Unpublish:** Tarik dari publik tanpa menghapus.

---

## 5. App Flow

### 5.1 Reader Flow

| Langkah | Screen | Aksi | Hasil |
|---|---|---|---|
| 1 | Beranda | Buka ceritakita.id | Grid katalog buku |
| 2 | Beranda | Klik cover buku | Halaman detail buku |
| 3 | Detail Buku | Tekan "Baca Sekarang" | Slide pertama muncul, full-screen |
| 4 | Reader | Tap ikon speaker/area di slide | Suara relevan berbunyi |
| 5 | Reader | Tekan panah / swipe | Pindah ke slide berikutnya |
| 6 | Mini-Game | Tiba di slide terakhir | Game muncul otomatis |
| 7 | Mini-Game | Pilih jawaban | Feedback benar/salah + animasi |
| 8 | Selesai | Setelah game | Pesan selamat + rekomendasi buku lain |

### 5.2 Admin Flow

| Tahap | Aktivitas |
|---|---|
| 1. Login | Masuk ke ceritakita.id/admin |
| 2. Buat Buku Baru | Isi judul, deskripsi, upload cover |
| 3. Upload Slides | Batch upload PNG semua slide |
| 4. Set Sound Triggers | Per slide: klik titik di gambar → upload MP3. Ulangi untuk tiap titik suara |
| 5. Isi Game | Tandai slide terakhir sebagai game, isi soal + gambar pilihan + jawaban benar |
| 6. Publish | Buku tayang di katalog publik |

---

## 6. Prioritas Fitur & Roadmap

### 6.1 MoSCoW Prioritization

| Fitur | MoSCoW | Fase |
|---|---|---|
| Slide Reader (navigasi + progress bar) | Must Have | MVP |
| Sound Triggers per Slide | Must Have | MVP |
| Katalog Buku (grid sederhana) | Must Have | MVP |
| Admin Panel — Upload PNG + Sound Trigger Editor | Must Have | MVP |
| Mini-Game di Akhir Buku (1 template) | Must Have | MVP |
| Publishing Workflow (draft/publish) | Must Have | MVP |
| Halaman Detail Buku | Must Have | MVP |
| Filter katalog berdasarkan kategori | Could Have | v1.1 |
| Profil Pembaca + Simpan Progress | Could Have | v1.1 |
| Template game tambahan | Could Have | v1.1 |
| Statistik pembaca di admin | Won't Have Now | v2.0 |
| Native Mobile App (iOS/Android) | Won't Have Now | v2.0 |
| Multi-creator / marketplace | Won't Have Now | v2.0 |

### 6.2 Milestone Timeline

| Fase | Periode | Target Deliverable |
|---|---|---|
| Setup & Fondasi | Minggu 1 | Setup project, infrastruktur, komponen dasar UI |
| MVP Build | Minggu 2–3 | Reader, sound triggers, admin panel, game template |
| QA & Go-Live | Minggu 4 | Bug fixing, testing, 3 buku seed, deploy |

---

## 7. Spesifikasi Teknis

### 7.1 Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Frontend + Backend | Next.js (React + API Routes) | SSR untuk performa, satu codebase, satu deploy |
| Styling | Tailwind CSS | Cepat, ringan, mudah untuk responsive |
| Animasi | CSS Transitions | Transisi slide dan feedback game — ringan tanpa library besar |
| Audio | HTML5 Audio API | Playback MP3 sound triggers, tanpa library tambahan |
| Database | Supabase (PostgreSQL) | Free tier, managed, terintegrasi Auth |
| Auth | Supabase Auth | Hanya untuk admin panel |
| File Storage | Cloudflare R2 | Free tier 10GB, tanpa biaya egress — untuk PNG dan MP3 |
| Hosting | Vercel | Free tier, optimal untuk Next.js |

> **Catatan biaya infrastruktur:** Seluruh stack menggunakan free tier. Biaya baru muncul setelah skala signifikan.

> **Catatan Supabase free tier:** Project pause otomatis setelah 1 minggu tidak aktif. Disiasati dengan cron job gratis (cron-job.org) yang ping database setiap 5 hari.

### 7.2 Non-Functional Requirements

- **Performa:** Slide pertama load < 3 detik pada koneksi 4G. PNG dioptimasi dan lazy-load untuk slide berikutnya.
- **Responsivitas:** Berfungsi penuh di tablet (768px+), mobile (360px+), dan desktop. Touch target cukup besar untuk jari anak.
- **Keamanan:** Admin panel hanya diakses dengan login. Pembaca tidak perlu login.
- **Uptime:** Target 99% uptime.

### 7.3 Format File yang Didukung

| Tipe Konten | Format | Batas Ukuran |
|---|---|---|
| Slide / Ilustrasi | PNG, JPG, WebP | Maks. 3 MB per file |
| Cover Buku | PNG, JPG, WebP | Maks. 1 MB |
| Sound Trigger Audio | MP3 | Maks. 1 MB per file |
| Gambar Pilihan Game | PNG, JPG | Maks. 1 MB per file |

> **Catatan:** Creator sebaiknya mengekspor slide dari Canva dalam format PNG resolusi 1920×1080 (16:9) untuk kualitas optimal di semua perangkat.

---

## 8. Keputusan Desain & Produk

| # | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Format slide buku? | Landscape 16:9 (1920×1080) — sesuai output Canva dan layar tablet/laptop |
| 2 | Apakah teks dikelola platform? | Tidak — teks sudah di dalam PNG. Platform hanya mengelola sound trigger sebagai overlay |
| 3 | Bagaimana sound trigger ditandai? | Ikon kecil (speaker/sparkle) di posisi titik suara agar anak tahu area yang interaktif |
| 4 | Apakah pembaca perlu login? | Tidak — tidak ada login untuk pembaca |
| 5 | Berapa banyak template game? | Satu: Pilih Gambar yang Benar (pilihan ganda bergambar) |
| 6 | Apakah game bisa di-skip? | Ya — ada tombol skip |
| 7 | Di mana posisi game? | Selalu di slide terakhir |
| 8 | Apakah ada free maintenance? | Tidak — tidak termasuk dalam scope |
| 9 | Apakah ada fitur komentar atau rating? | Tidak |

---

*CeritaKita — PRD v3.1 | Revisi dari v3.0: Word Tap diganti Sound Triggers, timeline dipersingkat 1 bulan full-time, fase desain formal diskip. Mei 2026.*
