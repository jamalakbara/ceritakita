"use client";

import { useTransition, useState } from "react";
import Image from "next/image";
import { updateBook, deleteBook, publishBook, unpublishBook } from "@/app/admin/actions";

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl border-2 border-[#F0E6FF] bg-[#FFF8F0] text-[#2D1B69] font-medium focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all";

interface BookRow {
  id: string;
  title: string;
  description: string;
  category: string;
  read_time_minutes: number;
  cover_url: string;
  status: "draft" | "published" | "unpublished";
}

const MAX_COVER_BYTES = 10 * 1024 * 1024; // 10MB

export default function EditBookForm({ book }: { book: BookRow }) {
  const [isPending, startTransition] = useTransition();
  const [isStatusPending, startStatusTransition] = useTransition();
  const [fileError, setFileError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cover = formData.get("cover") as File | null;
    if (cover && cover.size > MAX_COVER_BYTES) {
      setFileError(`File terlalu besar (${(cover.size / 1024 / 1024).toFixed(1)}MB). Maks. 10MB.`);
      return;
    }
    setFileError(null);
    startTransition(async () => {
      await updateBook(book.id, formData);
    });
  }

  function handleDelete() {
    if (!confirm(`Hapus buku "${book.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(async () => {
      await deleteBook(book.id);
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Judul Buku *</label>
          <input name="title" type="text" required defaultValue={book.title} className={INPUT_CLASS} />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Deskripsi</label>
          <textarea name="description" rows={3} defaultValue={book.description} className={INPUT_CLASS} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Kategori Usia</label>
            <select name="category" defaultValue={book.category} className={INPUT_CLASS}>
              <option value="4-5 tahun">4–5 tahun</option>
              <option value="5-6 tahun">5–6 tahun</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Estimasi Baca (menit)</label>
            <input name="read_time_minutes" type="number" min={1} max={30} defaultValue={book.read_time_minutes} className={INPUT_CLASS} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Cover Buku</label>
          {book.cover_url && (
            <div className="relative w-32 aspect-[16/10] rounded-xl overflow-hidden mb-2">
              <Image src={book.cover_url} alt="Cover saat ini" fill className="object-cover" unoptimized />
            </div>
          )}
          <input
            name="cover"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={() => setFileError(null)}
            className="w-full text-sm text-[#7C6FAA] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#FF6B6B] file:text-white hover:file:bg-[#FF4757] file:cursor-pointer"
          />
          {fileError && <p className="mt-1 text-sm text-red-500">{fileError}</p>}
          <p className="text-xs text-[#7C6FAA] mt-1">Biarkan kosong untuk tetap menggunakan cover saat ini.</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="clay-button w-full py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-bold rounded-xl disabled:opacity-60 transition-all"
        >
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>

      {/* Publish / Unpublish */}
      <div className="border-t border-[#F0E6FF] pt-5 flex flex-wrap gap-3">
        {book.status !== "published" ? (
          <button
            type="button"
            disabled={isStatusPending}
            onClick={() => startStatusTransition(async () => { await publishBook(book.id); })}
            className="clay-button px-5 py-2.5 bg-[#4ECDC4] text-white font-bold rounded-xl text-sm disabled:opacity-60"
          >
            {isStatusPending ? "Memproses..." : "Publish Buku"}
          </button>
        ) : (
          <button
            type="button"
            disabled={isStatusPending}
            onClick={() => startStatusTransition(async () => { await unpublishBook(book.id); })}
            className="clay-button px-5 py-2.5 bg-[#FFE66D] text-[#2D1B69] font-bold rounded-xl text-sm disabled:opacity-60"
          >
            {isStatusPending ? "Memproses..." : "Unpublish"}
          </button>
        )}

        <span className="ml-auto">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="clay-button px-5 py-2.5 bg-[#FF4757]/10 text-[#FF4757] font-bold rounded-xl text-sm hover:bg-[#FF4757]/20 transition-colors"
          >
            Hapus Buku
          </button>
        </span>
      </div>

      <div className="text-xs text-[#7C6FAA]">
        Status saat ini:{" "}
        <span className={`font-bold ${book.status === "published" ? "text-[#4ECDC4]" : book.status === "draft" ? "text-[#B8A02E]" : "text-[#FF6B6B]"}`}>
          {book.status}
        </span>
      </div>
    </div>
  );
}
