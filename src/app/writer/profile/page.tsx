import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil Saya | SelesainAja Writer",
};

export default async function WriterProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/writer/login");

  return <ProfileSettings user={session.user} />;
}
