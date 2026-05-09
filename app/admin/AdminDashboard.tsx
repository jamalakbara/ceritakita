"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";
import { logout, deleteBook } from "./actions";
import {
  BookOpenIcon,
  SparkleIcon,
  ClockIcon,
  SpeakerIcon,
  GamepadIcon,
  HomeIcon,
  XIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";

function StatusBadge({ status }: { status: Book["status"] }) {
  const styles = {
    published: "bg-[#4ECDC4]/20 text-[#4ECDC4] border-[#4ECDC4]/30",
    draft: "bg-[#FFE66D]/20 text-[#B8A02E] border-[#FFE66D]/30",
    unpublished: "bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30",
  };

  const labels = {
    published: "Published",
    draft: "Draft",
    unpublished: "Unpublished",
  };

  return (
    <Badge
      variant="outline"
      className={`${styles[status]} font-bold text-xs px-2 py-0.5 rounded-full`}
    >
      {labels[status]}
    </Badge>
  );
}

export default function AdminDashboard({
  books,
  userEmail,
}: {
  books: Book[];
  userEmail: string;
}) {
  const [isLogoutPending, startLogoutTransition] = React.useTransition();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  async function handleDelete(bookId: string, title: string) {
    if (!confirm(`Hapus buku "${title}"?`)) return;
    setDeletingId(bookId);
    await deleteBook(bookId);
    setDeletingId(null);
  }

  const publishedCount = books.filter((b) => b.status === "published").length;
  const totalSlides = books.reduce((sum, b) => sum + b.slides.length, 0);
  const totalSounds = books.reduce(
    (sum, b) =>
      sum + b.slides.reduce((s, sl) => s + sl.soundTriggers.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#2D1B69] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center">
              <BookOpenIcon className="text-white" size={22} />
            </div>
            <div>
              <h1 className="font-heading font-bold text-white text-lg">
                CeritaKita
              </h1>
              <p className="text-white/40 text-xs font-medium">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
              id="admin-view-site"
            >
              <HomeIcon size={16} />
              <span className="hidden sm:inline">Lihat Situs</span>
            </Link>
            <button
              type="button"
              disabled={isLogoutPending}
              onClick={() => startLogoutTransition(async () => { await logout(); })}
              className="clay-button flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/20 transition-colors disabled:opacity-60"
              id="admin-logout"
            >
              {isLogoutPending ? "Keluar..." : "Keluar"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="clay-card p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6B6B] mb-1">
              {books.length}
            </div>
            <div className="text-xs sm:text-sm text-[#7C6FAA] font-bold">
              Total Buku
            </div>
          </div>
          <div className="clay-card p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#4ECDC4] mb-1">
              {publishedCount}
            </div>
            <div className="text-xs sm:text-sm text-[#7C6FAA] font-bold">
              Published
            </div>
          </div>
          <div className="clay-card p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#A78BFA] mb-1">
              {totalSlides}
            </div>
            <div className="text-xs sm:text-sm text-[#7C6FAA] font-bold">
              Total Slide
            </div>
          </div>
          <div className="clay-card p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FFE66D] mb-1">
              {totalSounds}
            </div>
            <div className="text-xs sm:text-sm text-[#7C6FAA] font-bold">
              Sound Triggers
            </div>
          </div>
        </div>

        {/* Books Table */}
        <div className="clay-card overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#F0E6FF]">
            <div className="flex items-center gap-2">
              <SparkleIcon className="text-[#FFE66D]" size={20} />
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#2D1B69]">
                Manajemen Buku
              </h2>
            </div>
            <Link
              href="/admin/books/new"
              className="clay-button flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white text-sm font-bold rounded-xl"
              id="add-book-button"
            >
              <span className="text-lg leading-none">+</span>
              Buat Buku Baru
            </Link>
          </div>

          {/* Books List */}
          <div className="divide-y divide-[#F0E6FF]">
            {books.length === 0 && (
              <div className="p-8 text-center text-[#7C6FAA]">
                <BookOpenIcon size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-heading font-bold text-lg">Belum ada buku</p>
                <p className="text-sm mt-1">Mulai buat buku cerita pertamamu!</p>
              </div>
            )}
            {books.map((book) => {
              const bookSounds = book.slides.reduce(
                (sum, s) => sum + s.soundTriggers.length,
                0
              );
              return (
                <div
                  key={book.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 hover:bg-[#FFF0E6]/50 transition-colors"
                  id={`admin-book-${book.id}`}
                >
                  {/* Cover Thumbnail */}
                  <div className="relative w-full sm:w-24 aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-[#2D1B69] text-base truncate">
                        {book.title}
                      </h3>
                      <StatusBadge status={book.status} />
                    </div>
                    <p className="text-[#7C6FAA] text-xs line-clamp-1 mb-2">
                      {book.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#7C6FAA]">
                      <span className="flex items-center gap-1">
                        <BookOpenIcon size={12} className="text-[#4ECDC4]" />
                        {book.slides.length} slide
                      </span>
                      <span className="flex items-center gap-1">
                        <SpeakerIcon size={12} className="text-[#A78BFA]" />
                        {bookSounds} suara
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon size={12} className="text-[#FF6B6B]" />
                        {book.readTimeMinutes} menit
                      </span>
                      {book.game && (
                        <span className="flex items-center gap-1">
                          <GamepadIcon size={12} className="text-[#FFE66D]" />
                          Game
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      href={`/admin/books/${book.id}/edit`}
                      className="clay-button flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-[#2D1B69] bg-[#F0E6FF] rounded-lg hover:bg-[#E0D0FF] transition-colors text-center"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/book/${book.id}`}
                      className="clay-button flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-[#4ECDC4] bg-[#4ECDC4]/10 rounded-lg hover:bg-[#4ECDC4]/20 transition-colors text-center"
                    >
                      Preview
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === book.id}
                      onClick={() => handleDelete(book.id, book.title)}
                      className="clay-button px-3 py-2 text-xs font-bold text-[#FF4757] bg-[#FF4757]/10 rounded-lg hover:bg-[#FF4757]/20 transition-colors disabled:opacity-60"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
