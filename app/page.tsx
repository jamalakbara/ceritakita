import { getPublishedBooks } from "@/lib/db";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const books = await getPublishedBooks();
  return <HomeContent books={books} />;
}
