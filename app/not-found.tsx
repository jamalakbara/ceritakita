import Link from "next/link";
import { HomeIcon, BookOpenIcon, SparkleIcon, StarIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Fun 404 illustration */}
        <div className="mb-6 relative inline-block">
          <div className="text-[120px] sm:text-[160px] font-heading font-extrabold leading-none">
            <span className="text-[#FF6B6B]">4</span>
            <span className="text-[#4ECDC4]">0</span>
            <span className="text-[#FFE66D]">4</span>
          </div>
          <StarIcon
            className="absolute -top-2 -right-4 text-[#FFE66D] animate-float"
            size={32}
          />
          <SparkleIcon
            className="absolute bottom-4 -left-6 text-[#A78BFA] animate-float"
            size={24}
          />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2D1B69] mb-3">
          Oops! Halaman Tidak Ditemukan
        </h1>
        <p className="text-[#7C6FAA] text-sm sm:text-base mb-8">
          Sepertinya halaman yang kamu cari sedang bermain petak umpet. Yuk kembali ke beranda!
        </p>

        <Link
          href="/"
          className="clay-button inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-heading font-bold text-lg rounded-2xl transition-all hover:shadow-xl"
        >
          <HomeIcon size={22} />
          Kembali ke Beranda
          <BookOpenIcon size={20} />
        </Link>
      </div>
    </div>
  );
}
