import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect, notFound } from "next/navigation";
import { AdminBookNav } from "@/components/admin/AdminBookNav";
import EditBookForm from "./EditBookForm";

export const metadata = { title: "Edit Buku — CeritaKita Admin" };

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createAdminClient();
  const { data: book } = await admin.from("books").select("*").eq("id", id).single();
  if (!book) notFound();

  return (
    <div className="min-h-screen bg-[#FFF8F0] bg-dots">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin" className="text-[#7C6FAA] hover:text-[#2D1B69] text-sm font-bold transition-colors">
            ← Kembali
          </a>
          <span className="text-[#C0B0E0]">/</span>
          <span className="text-[#2D1B69] text-sm font-bold truncate">{book.title}</span>
        </div>
        <AdminBookNav bookId={id} />
        <div className="clay-card p-6 sm:p-8">
          <h1 className="font-heading text-2xl font-extrabold text-[#2D1B69] mb-6">Edit Detail Buku</h1>
          <EditBookForm book={book} />
        </div>
      </div>
    </div>
  );
}
