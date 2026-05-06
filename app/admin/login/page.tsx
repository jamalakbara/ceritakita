"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { login } from "../actions";
import {
  BookOpenIcon,
  HomeIcon,
  XIcon,
} from "@/components/icons";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#2D1B69] bg-dots flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center shadow-lg">
              <BookOpenIcon className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-white">
              CeritaKita
            </h1>
          </div>
          <p className="text-white/60 text-sm font-medium">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="clay-card p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-[#2D1B69] mb-6 text-center">
            Masuk ke Admin
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-bold text-[#7C6FAA] mb-1.5"
              >
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#F0E6FF] bg-[#FFF8F0] text-[#2D1B69] font-medium focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all"
                placeholder="admin@ceritakita.id"
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-bold text-[#7C6FAA] mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#F0E6FF] bg-[#FFF8F0] text-[#2D1B69] font-medium focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all"
                placeholder="Masukkan password"
                required
                disabled={isPending}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#FF4757] text-sm font-bold bg-[#FF4757]/10 px-4 py-2 rounded-xl">
                <XIcon size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full clay-button px-6 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-heading font-bold text-lg rounded-xl transition-all disabled:opacity-60"
              id="admin-login-button"
            >
              {isPending ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-xs text-[#7C6FAA]/60 mt-4">
              admin@ceritakita.id / admin123
            </p>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            <HomeIcon size={16} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
