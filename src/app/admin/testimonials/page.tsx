import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { TestimonialClient } from "./TestimonialClient";

export const metadata: Metadata = {
  title: "Testimoni | SelesainAja Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" } as any,
  });

  return <TestimonialClient initialTestimonials={testimonials} />;
}
