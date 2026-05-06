import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CreateBookForm from "./CreateBookForm";

export const metadata = { title: "Buat Buku Baru — CeritaKita Admin" };

export default async function NewBookPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <a
            href="/admin"
            className="text-[#7C6FAA] hover:text-[#2D1B69] text-sm font-bold transition-colors"
          >
            ← Kembali
          </a>
          <span className="text-[#C0B0E0]">/</span>
          <span className="text-[#2D1B69] text-sm font-bold">Buat Buku Baru</span>
        </div>
        <div className="clay-card p-6 sm:p-8">
          <h1 className="font-heading text-2xl font-extrabold text-[#2D1B69] mb-6">
            Buat Buku Baru
          </h1>
          <CreateBookForm />
        </div>
      </div>
    </div>
  );
}
