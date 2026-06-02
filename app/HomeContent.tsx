"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";
import { BookOpenIcon, ClockIcon, SparkleIcon, StarIcon } from "@/components/icons";

// Floating decoration component
function FloatingDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Floating circles */}
      <div
        className="absolute w-20 h-20 rounded-full opacity-20 animate-float"
        style={{
          background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
          top: "10%",
          left: "5%",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute w-14 h-14 rounded-full opacity-15 animate-float"
        style={{
          background: "linear-gradient(135deg, #4ECDC4, #7EDDD6)",
          top: "20%",
          right: "8%",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute w-10 h-10 rounded-full opacity-20 animate-float"
        style={{
          background: "linear-gradient(135deg, #FFE66D, #FFF0A0)",
          bottom: "30%",
          left: "3%",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full opacity-15 animate-float"
        style={{
          background: "linear-gradient(135deg, #A78BFA, #C4B5FD)",
          bottom: "15%",
          right: "5%",
          animationDelay: "0.5s",
        }}
      />
      {/* Stars */}
      <StarIcon
        className="absolute text-[#FFE66D] opacity-30 animate-float"
        size={20}
        style={{ top: "15%", left: "20%", animationDelay: "1.5s" }}
      />
      <SparkleIcon
        className="absolute text-[#FF6B6B] opacity-25 animate-float"
        size={16}
        style={{ top: "40%", right: "15%", animationDelay: "0.8s" }}
      />
      <StarIcon
        className="absolute text-[#4ECDC4] opacity-20 animate-float"
        size={14}
        style={{ bottom: "40%", left: "12%", animationDelay: "2.2s" }}
      />
    </div>
  );
}

// Book card component
function BookCard({
  book,
  index,
}: {
  book: Book;
  index: number;
}) {
  const colorAccents = [
    "from-[#FF6B6B] to-[#FF8E8E]",
    "from-[#4ECDC4] to-[#7EDDD6]",
    "from-[#FFE66D] to-[#FFF0A0]",
    "from-[#A78BFA] to-[#C4B5FD]",
    "from-[#60A5FA] to-[#93C5FD]",
  ];

  const borderColors = [
    "border-[#FF6B6B]/30",
    "border-[#4ECDC4]/30",
    "border-[#FFE66D]/30",
    "border-[#A78BFA]/30",
    "border-[#60A5FA]/30",
  ];

  return (
    <Link href={`/book/${book.id}`} className="block group" id={`book-card-${book.id}`}>
      <div
        className={`clay-card overflow-hidden ${borderColors[index % 5]} cursor-pointer`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${colorAccents[index % 5]} opacity-80`}
          />
          {book.coverUrl && (
            <Image
              src={book.coverUrl}
              alt={`Cover buku ${book.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          {/* Read time badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-[#2D1B69] shadow-md">
            <ClockIcon size={14} />
            <span>{book.readTimeMinutes} menit</span>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 sm:p-5">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#2D1B69] mb-1.5 line-clamp-2 group-hover:text-[#FF6B6B] transition-colors">
            {book.title}
          </h2>
          <p className="text-sm text-[#7C6FAA] line-clamp-2 mb-3">
            {book.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${colorAccents[index % 5]} text-white`}
            >
              <BookOpenIcon size={12} />
              {book.category}
            </span>
            <span className="text-xs font-bold text-[#7C6FAA]">
              {book.slides.length} halaman
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomeContent({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0] bg-dots relative">
      <FloatingDecoration />

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo area */}
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center shadow-lg clay-button">
              <BookOpenIcon className="text-white" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold">
              <span className="gradient-text">CeritaKita</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[#7C6FAA] font-medium max-w-md mx-auto">
            Buku cerita interaktif untuk anak-anak Indonesia
          </p>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-6" aria-label="Banner">
        <div className="max-w-6xl mx-auto">
          <div className="clay-card overflow-hidden bg-gradient-to-r from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10 p-6 sm:p-10 text-center relative">
            <div className="absolute top-4 left-4 opacity-30">
              <SparkleIcon className="text-[#FFE66D]" size={32} />
            </div>
            <div className="absolute bottom-4 right-4 opacity-30">
              <StarIcon className="text-[#FF6B6B]" size={28} />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D1B69] mb-3">
              Ayo Baca Cerita Seru! ✨
            </h2>
            <p className="text-[#7C6FAA] text-sm sm:text-base max-w-lg mx-auto mb-6">
              Sentuh gambar untuk mendengar suara yang seru, dan mainkan game di
              akhir setiap cerita!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FF6B6B]">
                  {books.length}
                </span>
                <span className="text-xs sm:text-sm text-[#7C6FAA] font-medium">
                  Cerita Seru
                </span>
              </div>
              <div className="w-px h-12 bg-[#F0E6FF]" />
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#4ECDC4]">
                  {books.reduce(
                    (sum, b) =>
                      sum +
                      b.slides.reduce(
                        (s, sl) => s + sl.soundTriggers.length,
                        0
                      ),
                    0
                  )}
                </span>
                <span className="text-xs sm:text-sm text-[#7C6FAA] font-medium">
                  Suara Interaktif
                </span>
              </div>
              <div className="w-px h-12 bg-[#F0E6FF]" />
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FFE66D]">
                  {books.filter((b) => b.game).length}
                </span>
                <span className="text-xs sm:text-sm text-[#7C6FAA] font-medium">
                  Mini Game
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Catalog Grid */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <SparkleIcon className="text-[#FFE66D]" size={24} />
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#2D1B69]">
              Semua Cerita
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <div className="clay-card inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B]/5 to-[#4ECDC4]/5">
            <BookOpenIcon className="text-[#FF6B6B]" size={18} />
            <span className="text-sm font-bold text-[#7C6FAA]">
              CeritaKita © 2026 — Dibuat dengan cinta untuk anak Indonesia
            </span>
            <SparkleIcon className="text-[#FFE66D]" size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
}
