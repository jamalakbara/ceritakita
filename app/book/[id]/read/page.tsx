import { getBookById, getRecommendedBooks } from "@/lib/db";
import { notFound } from "next/navigation";
import SlideReader from "./SlideReader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: "Buku Tidak Ditemukan — CeritaKita" };
  return {
    title: `Membaca: ${book.title} — CeritaKita`,
    description: `Baca ${book.title} di CeritaKita. ${book.description}`,
  };
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) notFound();

  const recommended = await getRecommendedBooks(book.id, 3);

  return <SlideReader book={book} recommended={recommended} />;
}
