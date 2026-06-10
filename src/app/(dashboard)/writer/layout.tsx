import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Proxy (Middleware) handles unauthenticated redirects, so we don't need to redirect to login here.

  return (
    <DashboardLayout user={session?.user as any}>
      {children}
    </DashboardLayout>
  );
}
