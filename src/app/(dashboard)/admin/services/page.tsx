import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { ServiceClient } from "./ServiceClient";

export const metadata: Metadata = {
  title: "Layanan | SelesainAja Admin",
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" } as any,
  });

  return <ServiceClient initialServices={services} />;
}
