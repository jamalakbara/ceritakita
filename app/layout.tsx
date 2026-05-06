import type { Metadata } from "next";
import { Baloo_2, Comic_Neue } from "next/font/google";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const comicNeue = Comic_Neue({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CeritaKita — Buku Cerita Interaktif untuk Anak",
  description:
    "Platform buku cerita interaktif berbasis web untuk anak-anak TK Indonesia. Baca cerita bergambar penuh dengan suara interaktif dan game edukatif!",
  keywords: [
    "cerita anak",
    "buku interaktif",
    "TK",
    "pendidikan",
    "anak-anak",
    "buku cerita",
    "Indonesia",
  ],
  openGraph: {
    title: "CeritaKita — Buku Cerita Interaktif untuk Anak",
    description:
      "Platform buku cerita interaktif untuk anak TK Indonesia. Baca, dengar, dan mainkan!",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${baloo2.variable} ${comicNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
