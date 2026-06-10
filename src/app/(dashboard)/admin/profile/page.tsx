import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil Saya | SelesainAja Admin",
};

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return <ProfileSettings user={session.user} />;
}
