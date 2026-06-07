import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ | SelesainAja Admin",
};

export default async function AdminFAQPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { sortOrder: "asc" } as any,
  });

  return <FaqClient initialFaqs={faqs} />;
}
