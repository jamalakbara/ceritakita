"use client";

import { useTransition, useState } from "react";
import { createBook } from "@/app/admin/actions";

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl border-2 border-[#F0E6FF] bg-[#FFF8F0] text-[#2D1B69] font-medium focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all";

const MAX_COVER_BYTES = 10 * 1024 * 1024; // 10MB

export default function CreateBookForm() {
  const [isPending, startTransition] = useTransition();
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
      await createBook(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-[#7C6FAA] mb-1">
          Judul Buku *
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="Contoh: Si Gajah Kecil yang Berani"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#7C6FAA] mb-1">
          Deskripsi
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Cerita tentang..."
          className={INPUT_CLASS}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#7C6FAA] mb-1">
            Kategori Usia
          </label>
          <select name="category" className={INPUT_CLASS}>
            <option value="4-5 tahun">4–5 tahun</option>
            <option value="5-6 tahun">5–6 tahun</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#7C6FAA] mb-1">
            Estimasi Baca (menit)
          </label>
          <input
            name="read_time_minutes"
            type="number"
            min={1}
            max={30}
            defaultValue={5}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#7C6FAA] mb-1">
          Cover Buku (PNG/JPG, maks. 10MB)
        </label>
        <input
          name="cover"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={() => setFileError(null)}
          className="w-full text-sm text-[#7C6FAA] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#FF6B6B] file:text-white hover:file:bg-[#FF4757] file:cursor-pointer"
        />
        {fileError && <p className="mt-1 text-sm text-red-500">{fileError}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="clay-button w-full py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-bold rounded-xl disabled:opacity-60 transition-all"
      >
        {isPending ? "Membuat..." : "Buat Buku & Lanjut ke Slide →"}
      </button>
    </form>
  );
}
