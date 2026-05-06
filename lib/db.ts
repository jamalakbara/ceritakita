import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Book } from "./types";

// === Database row types ===
interface BookRow {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  read_time_minutes: number;
  category: string;
  status: "draft" | "published" | "unpublished";
  created_at: string;
  updated_at: string;
}

interface SlideRow {
  id: string;
  book_id: string;
  order: number;
  image_url: string;
}

interface SoundTriggerRow {
  id: string;
  slide_id: string;
  x: number;
  y: number;
  audio_url: string;
  label: string;
}

interface MiniGameRow {
  id: string;
  book_id: string;
  question: string;
}

interface GameOptionRow {
  id: string;
  game_id: string;
  image_url: string;
  label: string;
  is_correct: boolean;
  sort_order: number;
}

// === Transform DB rows to app types ===
function assembleBook(
  bookRow: BookRow,
  slideRows: SlideRow[],
  triggerRows: SoundTriggerRow[],
  gameRow: MiniGameRow | null,
  optionRows: GameOptionRow[]
): Book {
  const slides = slideRows
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      id: s.id,
      order: s.order,
      imageUrl: s.image_url,
      soundTriggers: triggerRows
        .filter((t) => t.slide_id === s.id)
        .map((t) => ({
          id: t.id,
          x: Number(t.x),
          y: Number(t.y),
          audioUrl: t.audio_url,
          label: t.label,
        })),
    }));

  return {
    id: bookRow.id,
    title: bookRow.title,
    description: bookRow.description,
    coverUrl: bookRow.cover_url,
    readTimeMinutes: bookRow.read_time_minutes,
    category: bookRow.category,
    status: bookRow.status,
    slides,
    game: gameRow
      ? {
          question: gameRow.question,
          options: optionRows
            .filter((o) => o.game_id === gameRow.id)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((o) => ({
              id: o.id,
              imageUrl: o.image_url,
              label: o.label,
              isCorrect: o.is_correct,
            })),
        }
      : null,
    createdAt: bookRow.created_at,
    updatedAt: bookRow.updated_at,
  };
}

// === Fetch a single book with all relations ===
async function fetchBookWithRelations(
  supabase: SupabaseClient,
  bookRow: BookRow
): Promise<Book> {
  const [slidesRes, gameRes] = await Promise.all([
    supabase
      .from("slides")
      .select("*")
      .eq("book_id", bookRow.id)
      .order("order"),
    supabase
      .from("mini_games")
      .select("*")
      .eq("book_id", bookRow.id)
      .maybeSingle(),
  ]);

  const slideRows = (slidesRes.data ?? []) as SlideRow[];
  const gameRow = gameRes.data as MiniGameRow | null;

  // Fetch sound triggers for all slides
  const slideIds = slideRows.map((s) => s.id);
  let triggerRows: SoundTriggerRow[] = [];
  if (slideIds.length > 0) {
    const triggersRes = await supabase
      .from("sound_triggers")
      .select("*")
      .in("slide_id", slideIds);
    triggerRows = (triggersRes.data ?? []) as SoundTriggerRow[];
  }

  // Fetch game options
  let optionRows: GameOptionRow[] = [];
  if (gameRow) {
    const optionsRes = await supabase
      .from("game_options")
      .select("*")
      .eq("game_id", gameRow.id)
      .order("sort_order");
    optionRows = (optionsRes.data ?? []) as GameOptionRow[];
  }

  return assembleBook(bookRow, slideRows, triggerRows, gameRow, optionRows);
}

// === Public API ===

export async function getPublishedBooks(): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const books = await Promise.all(
    (data as BookRow[]).map((row) => fetchBookWithRelations(supabase, row))
  );
  return books;
}

export async function getBookById(id: string): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return fetchBookWithRelations(supabase, data as BookRow);
}

export async function getAllBooks(
  supabaseOverride?: SupabaseClient
): Promise<Book[]> {
  const supabase: SupabaseClient = supabaseOverride ?? (await createClient());
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const books = await Promise.all(
    (data as BookRow[]).map((row) => fetchBookWithRelations(supabase, row))
  );
  return books;
}

export async function getRecommendedBooks(
  excludeId: string,
  limit = 3
): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("status", "published")
    .neq("id", excludeId)
    .limit(limit)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const books = await Promise.all(
    (data as BookRow[]).map((row) => fetchBookWithRelations(supabase, row))
  );
  return books;
}
