import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Proxy (Middleware) handles unauthenticated redirects, so we don't need to redirect to login here.
  // We only redirect if they are logged in but have the wrong role.
  // @ts-ignore
  if (session?.user && session.user.role !== "admin") {
    redirect("/writer/dashboard");
  }

  return (
    <DashboardLayout user={session?.user as any}>
      {children}
    </DashboardLayout>
  );
}
