import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect, notFound } from "next/navigation";
import { AdminBookNav } from "@/components/admin/AdminBookNav";
import SlideManager from "./SlideManager";

export const metadata = { title: "Kelola Slide — CeritaKita Admin" };

export default async function SlidesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createAdminClient();

  const { data: book } = await admin.from("books").select("id, title").eq("id", id).single();
  if (!book) notFound();

  const { data: slides } = await admin
    .from("slides")
    .select("id, order, image_url")
    .eq("book_id", id)
    .order("order", { ascending: true });

  const slideIds = (slides ?? []).map((s) => s.id);
  let triggers: { id: string; slide_id: string; x: number; y: number; label: string; audio_url: string }[] = [];
  if (slideIds.length > 0) {
    const { data } = await admin.from("sound_triggers").select("*").in("slide_id", slideIds);
    triggers = data ?? [];
  }

  const slidesWithTriggers = (slides ?? []).map((s) => ({
    ...s,
    soundTriggers: triggers.filter((t) => t.slide_id === s.id),
  }));

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin" className="text-[#7C6FAA] hover:text-[#2D1B69] text-sm font-bold transition-colors">
            ← Kembali
          </a>
          <span className="text-[#C0B0E0]">/</span>
          <span className="text-[#2D1B69] text-sm font-bold truncate">{book.title}</span>
        </div>
        <AdminBookNav bookId={id} />
        <SlideManager bookId={id} slides={slidesWithTriggers} />
      </div>
    </div>
  );
}
