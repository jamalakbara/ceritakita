import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect, notFound } from "next/navigation";
import { AdminBookNav } from "@/components/admin/AdminBookNav";
import GameEditor from "./GameEditor";

export const metadata = { title: "Edit Game — CeritaKita Admin" };

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createAdminClient();

  const { data: book } = await admin.from("books").select("id, title").eq("id", id).single();
  if (!book) notFound();

  const { data: game } = await admin.from("mini_games").select("id, question").eq("book_id", id).maybeSingle();
  let options: { id: string; label: string; image_url: string; is_correct: boolean; sort_order: number }[] = [];
  if (game) {
    const { data } = await admin.from("game_options").select("*").eq("game_id", game.id).order("sort_order");
    options = data ?? [];
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin" className="text-[#7C6FAA] hover:text-[#2D1B69] text-sm font-bold transition-colors">
            ← Kembali
          </a>
          <span className="text-[#C0B0E0]">/</span>
          <span className="text-[#2D1B69] text-sm font-bold truncate">{book.title}</span>
        </div>
        <AdminBookNav bookId={id} />
        <div className="clay-card p-6 sm:p-8">
          <h1 className="font-heading text-2xl font-extrabold text-[#2D1B69] mb-2">Mini Game</h1>
          <p className="text-[#7C6FAA] text-sm mb-6">
            Satu pertanyaan pilihan ganda dengan gambar. Tampil di akhir buku.
          </p>
          <GameEditor bookId={id} existingQuestion={game?.question ?? ""} existingOptions={options} />
        </div>
      </div>
    </div>
  );
}
