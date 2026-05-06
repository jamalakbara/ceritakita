"use client";

import { useTransition, useState, useRef } from "react";
import Image from "next/image";
import { addSlide, deleteSlide, reorderSlide, addSoundTrigger, deleteSoundTrigger } from "@/app/admin/actions";

interface SoundTrigger {
  id: string;
  slide_id: string;
  x: number;
  y: number;
  label: string;
  audio_url: string;
}

interface Slide {
  id: string;
  order: number;
  image_url: string;
  soundTriggers: SoundTrigger[];
}

export default function SlideManager({ bookId, slides }: { bookId: string; slides: Slide[] }) {
  const [isPending, startTransition] = useTransition();
  const [expandedSlide, setExpandedSlide] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAddSlide(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;
    if (!file || file.size === 0) return alert("Pilih file gambar terlebih dahulu.");
    if (file.size > 3 * 1024 * 1024) return alert("File terlalu besar. Maks. 3MB.");
    startTransition(async () => {
      await addSlide(bookId, formData);
    });
    e.currentTarget.reset();
  }

  function handleDeleteSlide(id: string) {
    if (!confirm("Hapus slide ini? Sound triggers-nya juga akan terhapus.")) return;
    startTransition(async () => {
      await deleteSlide(id, bookId);
    });
  }

  return (
    <div className="space-y-4">
      <div className="clay-card p-5">
        <h2 className="font-heading text-lg font-bold text-[#2D1B69] mb-4">
          Slide ({slides.length})
        </h2>

        {slides.length === 0 && (
          <p className="text-[#7C6FAA] text-sm text-center py-4">
            Belum ada slide. Upload slide pertama di bawah.
          </p>
        )}

        <div className="space-y-3">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="border border-[#F0E6FF] rounded-2xl overflow-hidden">
              {/* Slide row */}
              <div className="flex items-center gap-3 p-3 bg-white">
                <div className="relative w-20 aspect-[16/9] rounded-lg overflow-hidden flex-shrink-0 bg-[#F0E6FF]">
                  <Image src={slide.image_url} alt={`Slide ${slide.order}`} fill className="object-cover" unoptimized />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#2D1B69] text-sm">Slide {slide.order}</p>
                  <p className="text-xs text-[#7C6FAA]">
                    {slide.soundTriggers.length} sound trigger
                    {slide.soundTriggers.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Reorder */}
                  <form action={reorderSlide.bind(null, slide.id, bookId, "up")}>
                    <button
                      type="submit"
                      disabled={idx === 0 || isPending}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F0E6FF] text-[#7C6FAA] hover:bg-[#E0D0FF] disabled:opacity-30 text-sm font-bold"
                      aria-label="Naik"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={reorderSlide.bind(null, slide.id, bookId, "down")}>
                    <button
                      type="submit"
                      disabled={idx === slides.length - 1 || isPending}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F0E6FF] text-[#7C6FAA] hover:bg-[#E0D0FF] disabled:opacity-30 text-sm font-bold"
                      aria-label="Turun"
                    >
                      ↓
                    </button>
                  </form>

                  {/* Sound trigger toggle */}
                  <button
                    onClick={() => setExpandedSlide(expandedSlide === slide.id ? null : slide.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#FFE66D]/30 text-[#2D1B69] text-xs font-bold hover:bg-[#FFE66D]/50 transition-colors"
                  >
                    🔊 Trigger
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    disabled={isPending}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF4757]/10 text-[#FF4757] hover:bg-[#FF4757]/20 transition-colors text-sm"
                    aria-label="Hapus slide"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Sound Trigger Editor (expanded) */}
              {expandedSlide === slide.id && (
                <SoundTriggerEditor slide={slide} bookId={bookId} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Slide */}
      <div className="clay-card p-5">
        <h2 className="font-heading text-lg font-bold text-[#2D1B69] mb-4">
          Tambah Slide
        </h2>
        <form onSubmit={handleAddSlide} className="flex flex-col sm:flex-row gap-3">
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required
            className="flex-1 text-sm text-[#7C6FAA] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#4ECDC4] file:text-white hover:file:bg-[#3DBDB5] file:cursor-pointer"
          />
          <button
            type="submit"
            disabled={isPending}
            className="clay-button px-6 py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] text-white font-bold rounded-xl disabled:opacity-60 whitespace-nowrap"
          >
            {isPending ? "Mengupload..." : "Upload Slide"}
          </button>
        </form>
        <p className="text-xs text-[#7C6FAA] mt-2">PNG/JPG/WebP, maks. 3MB. Resolusi 1920×1080 (16:9) disarankan.</p>
      </div>
    </div>
  );
}

function SoundTriggerEditor({ slide, bookId }: { slide: Slide; bookId: string }) {
  const [isPending, startTransition] = useTransition();
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPendingPos({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  }

  function handleAddTrigger(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pendingPos) return;
    const formData = new FormData(e.currentTarget);
    const audio = formData.get("audio") as File;
    if (!audio || audio.size === 0) return alert("Pilih file MP3 terlebih dahulu.");
    if (audio.size > 1024 * 1024) return alert("File audio terlalu besar. Maks. 1MB.");

    startTransition(async () => {
      await addSoundTrigger(slide.id, bookId, pendingPos.x, pendingPos.y, formData);
      setPendingPos(null);
    });
    e.currentTarget.reset();
  }

  function handleDeleteTrigger(id: string) {
    if (!confirm("Hapus sound trigger ini?")) return;
    startTransition(async () => {
      await deleteSoundTrigger(id, bookId);
    });
  }

  return (
    <div className="bg-[#FFF8F0] border-t border-[#F0E6FF] p-4 space-y-4">
      <p className="text-xs font-bold text-[#7C6FAA]">
        Klik area pada gambar untuk menempatkan sound trigger baru.
      </p>

      {/* Image with trigger markers */}
      <div
        ref={imageRef}
        className="relative w-full cursor-crosshair select-none rounded-xl overflow-hidden"
        style={{ aspectRatio: "16/9" }}
        onClick={handleImageClick}
      >
        <Image src={slide.image_url} alt={`Slide ${slide.order}`} fill className="object-contain bg-black/10" unoptimized />

        {/* Existing trigger markers */}
        {slide.soundTriggers.map((t) => (
          <div
            key={t.id}
            className="absolute z-10 group"
            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-[#FFE66D] border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-[#2D1B69]">
                🔊
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center gap-1 min-w-max">
                <div className="bg-[#2D1B69] text-white text-xs rounded-lg px-2 py-1 max-w-[140px] text-center">
                  {t.label}
                </div>
                <button
                  onClick={() => handleDeleteTrigger(t.id)}
                  disabled={isPending}
                  className="bg-[#FF4757] text-white text-xs rounded-lg px-2 py-0.5 font-bold"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Pending position marker */}
        {pendingPos && (
          <div
            className="absolute z-20 w-7 h-7 rounded-full bg-[#4ECDC4] border-2 border-white shadow-md flex items-center justify-center pointer-events-none"
            style={{ left: `${pendingPos.x}%`, top: `${pendingPos.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <span className="text-white text-xs font-bold">+</span>
          </div>
        )}
      </div>

      {/* Add trigger form */}
      {pendingPos && (
        <form onSubmit={handleAddTrigger} className="flex flex-wrap items-end gap-3 p-3 bg-[#4ECDC4]/10 rounded-xl border border-[#4ECDC4]/30">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-bold text-[#7C6FAA] mb-1">Label</label>
            <input
              name="label"
              type="text"
              placeholder="Contoh: Suara gajah"
              required
              className="w-full px-3 py-2 rounded-xl border-2 border-[#F0E6FF] bg-white text-[#2D1B69] text-sm font-medium focus:border-[#4ECDC4] focus:outline-none"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-bold text-[#7C6FAA] mb-1">File MP3 (maks. 1MB)</label>
            <input
              name="audio"
              type="file"
              accept="audio/mpeg,audio/mp3"
              required
              className="w-full text-xs text-[#7C6FAA] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#4ECDC4] file:text-white file:cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="clay-button px-4 py-2 bg-[#4ECDC4] text-white text-sm font-bold rounded-xl disabled:opacity-60"
            >
              {isPending ? "..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => setPendingPos(null)}
              className="px-4 py-2 text-sm font-bold text-[#7C6FAA] hover:text-[#2D1B69]"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {slide.soundTriggers.length > 0 && (
        <div className="text-xs text-[#7C6FAA]">
          {slide.soundTriggers.length} trigger aktif. Hover marker untuk hapus.
        </div>
      )}
    </div>
  );
}
