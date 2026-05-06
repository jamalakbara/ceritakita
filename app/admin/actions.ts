"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToR2, r2Key } from "@/lib/r2";

// === Auth ===

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// === Helpers ===

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

async function uploadFile(
  file: File,
  folder: "covers" | "slides" | "audio"
): Promise<string> {
  const ext = file.name.split(".").pop() ?? (folder === "audio" ? "mp3" : "jpg");
  const key = r2Key(folder, ext);
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadToR2(key, buffer, file.type);
}

// === Book CRUD ===

export async function createBook(formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const readTimeMinutes = parseInt(formData.get("read_time_minutes") as string) || 5;
  const coverFile = formData.get("cover") as File | null;

  let coverUrl = "";
  if (coverFile && coverFile.size > 0) {
    coverUrl = await uploadFile(coverFile, "covers");
  }

  const { data, error } = await supabase
    .from("books")
    .insert({
      title,
      description,
      category,
      read_time_minutes: readTimeMinutes,
      cover_url: coverUrl,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create book" };

  revalidatePath("/admin");
  redirect(`/admin/books/${data.id}/slides`);
}

export async function updateBook(id: string, formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const readTimeMinutes = parseInt(formData.get("read_time_minutes") as string) || 5;
  const coverFile = formData.get("cover") as File | null;

  const updates: Record<string, unknown> = { title, description, category, read_time_minutes: readTimeMinutes };

  if (coverFile && coverFile.size > 0) {
    updates.cover_url = await uploadFile(coverFile, "covers");
  }

  const { error } = await supabase.from("books").update(updates).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath(`/book/${id}`);
  revalidatePath(`/admin/books/${id}/edit`);
  return {};
}

export async function deleteBook(id: string) {
  const supabase = await requireAuth();
  await supabase.from("books").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function publishBook(id: string) {
  const supabase = await requireAuth();
  await supabase.from("books").update({ status: "published" }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/book/${id}`);
}

export async function unpublishBook(id: string) {
  const supabase = await requireAuth();
  await supabase.from("books").update({ status: "unpublished" }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/book/${id}`);
}

// === Slide CRUD ===

export async function addSlide(bookId: string, formData: FormData) {
  const supabase = await requireAuth();

  const imageFile = formData.get("image") as File | null;
  if (!imageFile || imageFile.size === 0) return { error: "No file provided" };

  const imageUrl = await uploadFile(imageFile, "slides");

  const { data: existing } = await supabase
    .from("slides")
    .select("order")
    .eq("book_id", bookId)
    .order("order", { ascending: false })
    .limit(1);

  const maxOrder = existing?.[0]?.order ?? 0;

  const { error } = await supabase.from("slides").insert({
    book_id: bookId,
    order: maxOrder + 1,
    image_url: imageUrl,
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/books/${bookId}/slides`);
  revalidatePath(`/book/${bookId}/read`);
  return {};
}

export async function deleteSlide(id: string, bookId: string) {
  const supabase = await requireAuth();
  await supabase.from("slides").delete().eq("id", id);
  revalidatePath(`/admin/books/${bookId}/slides`);
  revalidatePath(`/book/${bookId}/read`);
}

export async function reorderSlide(id: string, bookId: string, direction: "up" | "down") {
  const supabase = await requireAuth();

  const { data: slides } = await supabase
    .from("slides")
    .select("id, order")
    .eq("book_id", bookId)
    .order("order", { ascending: true });

  if (!slides) return;

  const idx = slides.findIndex((s) => s.id === id);
  if (idx < 0) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= slides.length) return;

  const current = slides[idx];
  const swap = slides[swapIdx];

  await Promise.all([
    supabase.from("slides").update({ order: swap.order }).eq("id", current.id),
    supabase.from("slides").update({ order: current.order }).eq("id", swap.id),
  ]);

  revalidatePath(`/admin/books/${bookId}/slides`);
  revalidatePath(`/book/${bookId}/read`);
}

// === Sound Trigger CRUD ===

export async function addSoundTrigger(
  slideId: string,
  bookId: string,
  x: number,
  y: number,
  formData: FormData
) {
  const supabase = await requireAuth();

  const audioFile = formData.get("audio") as File | null;
  const label = (formData.get("label") as string) || "Suara";

  if (!audioFile || audioFile.size === 0) return { error: "No audio file provided" };

  const audioUrl = await uploadFile(audioFile, "audio");

  const { error } = await supabase.from("sound_triggers").insert({
    slide_id: slideId,
    x,
    y,
    audio_url: audioUrl,
    label,
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/books/${bookId}/slides`);
  revalidatePath(`/book/${bookId}/read`);
  return {};
}

export async function deleteSoundTrigger(id: string, bookId: string) {
  const supabase = await requireAuth();
  await supabase.from("sound_triggers").delete().eq("id", id);
  revalidatePath(`/admin/books/${bookId}/slides`);
  revalidatePath(`/book/${bookId}/read`);
}

// === Game CRUD ===

export async function saveGame(
  bookId: string,
  formData: FormData
) {
  const supabase = await requireAuth();

  const question = formData.get("question") as string;

  // Upsert mini_game
  const { data: gameData, error: gameError } = await supabase
    .from("mini_games")
    .upsert({ book_id: bookId, question }, { onConflict: "book_id" })
    .select("id")
    .single();

  if (gameError || !gameData) return { error: gameError?.message ?? "Failed to save game" };

  const gameId = gameData.id;

  // Delete old options
  await supabase.from("game_options").delete().eq("game_id", gameId);

  // Insert new options
  for (let i = 0; i < 4; i++) {
    const label = formData.get(`option_${i}_label`) as string;
    const isCorrect = formData.get("correct_option") === String(i);
    const imageFile = formData.get(`option_${i}_image`) as File | null;
    const existingUrl = formData.get(`option_${i}_existing_url`) as string | null;

    let imageUrl = existingUrl ?? "";
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile, "slides");
    }

    if (!label) continue;

    await supabase.from("game_options").insert({
      game_id: gameId,
      label,
      image_url: imageUrl,
      is_correct: isCorrect,
      sort_order: i,
    });
  }

  revalidatePath(`/admin/books/${bookId}/game`);
  revalidatePath(`/book/${bookId}/read`);
  return {};
}
