import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — CeritaKita",
  description: "Panel admin untuk mengelola buku cerita interaktif CeritaKita",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
