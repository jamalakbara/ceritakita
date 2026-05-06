import { getBookById, getRecommendedBooks } from "@/lib/db";
import { notFound } from "next/navigation";
import BookDetailClient from "./BookDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: "Buku Tidak Ditemukan — CeritaKita" };
  return {
    title: `${book.title} — CeritaKita`,
    description: book.description,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) notFound();

  const recommended = await getRecommendedBooks(book.id, 3);

  return <BookDetailClient book={book} recommended={recommended} />;
}
