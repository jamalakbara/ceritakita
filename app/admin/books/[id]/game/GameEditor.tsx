"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { saveGame, uploadGameImage } from "@/app/admin/actions";

interface ExistingOption {
  id: string;
  label: string;
  image_url: string;
  is_correct: boolean;
  sort_order: number;
}

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-xl border-2 border-[#F0E6FF] bg-[#FFF8F0] text-[#2D1B69] text-sm font-medium focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all";

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA"];

export default function GameEditor({
  bookId,
  existingQuestion,
  existingOptions,
}: {
  bookId: string;
  existingQuestion: string;
  existingOptions: ExistingOption[];
}) {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [optionUrls, setOptionUrls] = useState<(string | null)[]>(
    [0, 1, 2, 3].map((i) => existingOptions.find((o) => o.sort_order === i)?.image_url ?? null)
  );

  function handleUrlChange(index: number, url: string | null) {
    setOptionUrls((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    setSuccessMsg("");

    for (let i = 0; i < 4; i++) {
      formData.set(`option_${i}_url`, optionUrls[i] ?? "");
    }
    formData.set("bookId", bookId);

    startTransition(async () => {
      try {
        const result = await saveGame(formData);
        if (result && "error" in result) {
          setError(result.error ?? "Terjadi kesalahan.");
        } else {
          setSuccessMsg("Game berhasil disimpan!");
          setTimeout(() => setSuccessMsg(""), 3000);
        }
      } catch {
        setError("Gagal menyimpan game. Coba lagi.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-[#7C6FAA] mb-1">Pertanyaan *</label>
        <input
          name="question"
          type="text"
          required
          defaultValue={existingQuestion}
          placeholder="Contoh: Mana yang termasuk sayuran?"
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <p className="text-sm font-bold text-[#7C6FAA] mb-3">
          Pilihan Jawaban (maks. 4) — pilih satu jawaban benar
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <OptionCard
              key={i}
              index={i}
              existing={existingOptions.find((o) => o.sort_order === i)}
              color={COLORS[i]}
              onUrlChange={(url) => handleUrlChange(i, url)}
              onError={setError}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-[#FF4757]/10 text-[#FF4757] font-bold text-sm">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="px-4 py-3 rounded-xl bg-[#4ECDC4]/20 text-[#4ECDC4] font-bold text-sm">
          {successMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="clay-button w-full py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-bold rounded-xl disabled:opacity-60 transition-all"
      >
        {isPending ? "Menyimpan..." : "Simpan Game"}
      </button>
    </form>
  );
}

function OptionCard({
  index,
  existing,
  color,
  onUrlChange,
  onError,
}: {
  index: number;
  existing?: ExistingOption;
  color: string;
  onUrlChange: (url: string | null) => void;
  onError: (msg: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(existing?.image_url ?? null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      onError(`Gambar Pilihan ${index + 1} terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maks. 10MB.`);
      e.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    onError("");

    const fd = new FormData();
    fd.set("image", file);
    try {
      const result = await uploadGameImage(fd);
      if (result.error) {
        onError(`Pilihan ${index + 1}: ${result.error}`);
        setPreview(existing?.image_url ?? null);
        onUrlChange(existing?.image_url ?? null);
      } else {
        onUrlChange(result.url ?? null);
      }
    } catch {
      onError(`Pilihan ${index + 1}: Gagal upload gambar. Coba lagi.`);
      setPreview(existing?.image_url ?? null);
      onUrlChange(existing?.image_url ?? null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="rounded-2xl border-2 p-3 space-y-2"
      style={{ borderColor: color + "40", background: color + "10" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color }}>
          Pilihan {index + 1}
        </span>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="correct_option"
            value={String(index)}
            defaultChecked={existing?.is_correct}
            className="accent-current"
          />
          <span className="text-xs font-bold text-[#7C6FAA]">Benar</span>
        </label>
      </div>

      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/60">
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {preview ? (
          <Image src={preview} alt={`Pilihan ${index + 1}`} fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#C0B0E0] text-xs">
            Belum ada gambar
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-xs text-[#7C6FAA] file:mr-1 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-[#2D1B69] file:cursor-pointer disabled:opacity-50"
      />

      <input
        type="text"
        name={`option_${index}_label`}
        defaultValue={existing?.label ?? ""}
        placeholder="Label..."
        className="w-full px-3 py-2 rounded-xl border-2 border-white/60 bg-white/60 text-[#2D1B69] text-xs font-medium focus:border-[#FF6B6B] focus:outline-none"
      />
    </div>
  );
}
