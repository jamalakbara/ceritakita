"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ClockIcon,
  GamepadIcon,
  SparkleIcon,
  SpeakerIcon,
  StarIcon,
} from "@/components/icons";

export default function BookDetailClient({ book, recommended }: { book: Book; recommended: Book[] }) {
  const totalSounds = book.slides.reduce(
    (sum, s) => sum + s.soundTriggers.length,
    0
  );

  const colorAccents = [
    { bg: "from-[#FF6B6B] to-[#FF8E8E]", text: "text-[#FF6B6B]" },
    { bg: "from-[#4ECDC4] to-[#7EDDD6]", text: "text-[#4ECDC4]" },
    { bg: "from-[#FFE66D] to-[#FFF0A0]", text: "text-[#FFE66D]" },
    { bg: "from-[#A78BFA] to-[#C4B5FD]", text: "text-[#A78BFA]" },
    { bg: "from-[#60A5FA] to-[#93C5FD]", text: "text-[#60A5FA]" },
  ];

  const bookIndex = (parseInt(book.id) || 1) - 1;
  const accent = colorAccents[((bookIndex % 5) + 5) % 5];

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FFF8F0]/80 backdrop-blur-md border-b border-[#F0E6FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="clay-button flex items-center gap-2 px-4 py-2 bg-white text-[#2D1B69] font-bold text-sm hover:text-[#FF6B6B] transition-colors"
            id="back-to-home"
          >
            <ChevronLeftIcon size={18} />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <BookOpenIcon className="text-[#FF6B6B]" size={20} />
            <span className="font-heading font-bold text-[#2D1B69] text-sm">
              CeritaKita
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Book Hero Section */}
        <div className="clay-card overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Cover Image */}
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px]">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-80`}
              />
              <Image
                src={book.coverUrl}
                alt={`Cover buku ${book.title}`}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Book Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${accent.bg} text-white mb-4 self-start"
                style={{
                  background: `linear-gradient(135deg, ${bookIndex % 5 === 0 ? '#FF6B6B' : bookIndex % 5 === 1 ? '#4ECDC4' : bookIndex % 5 === 2 ? '#FFE66D' : bookIndex % 5 === 3 ? '#A78BFA' : '#60A5FA'}, ${bookIndex % 5 === 0 ? '#FF8E8E' : bookIndex % 5 === 1 ? '#7EDDD6' : bookIndex % 5 === 2 ? '#FFF0A0' : bookIndex % 5 === 3 ? '#C4B5FD' : '#93C5FD'})`,
                  color: bookIndex % 5 === 2 ? '#2D1B69' : '#FFFFFF'
                }}
              >
                <BookOpenIcon size={12} />
                {book.category}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D1B69] mb-3">
                {book.title}
              </h1>

              <p className="text-[#7C6FAA] text-sm sm:text-base mb-6 leading-relaxed">
                {book.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#7C6FAA]">
                  <ClockIcon size={16} className="text-[#FF6B6B]" />
                  <span className="font-bold">
                    {book.readTimeMinutes} menit
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7C6FAA]">
                  <BookOpenIcon size={16} className="text-[#4ECDC4]" />
                  <span className="font-bold">{book.slides.length} halaman</span>
                </div>
                {totalSounds > 0 && (
                  <div className="flex items-center gap-2 text-sm text-[#7C6FAA]">
                    <SpeakerIcon size={16} className="text-[#A78BFA]" />
                    <span className="font-bold">{totalSounds} suara</span>
                  </div>
                )}
                {book.game && (
                  <div className="flex items-center gap-2 text-sm text-[#7C6FAA]">
                    <GamepadIcon size={16} className="text-[#FFE66D]" />
                    <span className="font-bold">Mini Game</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href={`/book/${book.id}/read`}
                className="clay-button inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-heading font-bold text-lg rounded-2xl transition-all hover:shadow-xl"
                id="read-now-button"
              >
                <BookOpenIcon size={24} />
                Baca Sekarang
                <SparkleIcon size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Books */}
        {recommended.length > 0 && (
          <section aria-label="Rekomendasi Buku">
            <div className="flex items-center gap-2 mb-4">
              <StarIcon className="text-[#FFE66D]" size={22} />
              <h2 className="font-heading text-xl font-bold text-[#2D1B69]">
                Cerita Lainnya
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((rec, i) => (
                <Link
                  key={rec.id}
                  href={`/book/${rec.id}`}
                  className="block group"
                  id={`recommended-book-${rec.id}`}
                >
                  <div className="clay-card overflow-hidden cursor-pointer">
                    <div className="relative aspect-[16/10]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colorAccents[(((parseInt(rec.id) || 1) - 1) % 5 + 5) % 5].bg} opacity-80`}
                      />
                      <Image
                        src={rec.coverUrl}
                        alt={`Cover buku ${rec.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-heading text-sm font-bold text-[#2D1B69] line-clamp-1 group-hover:text-[#FF6B6B] transition-colors">
                        {rec.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#7C6FAA] mt-1">
                        <ClockIcon size={12} />
                        <span>{rec.readTimeMinutes} menit</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
