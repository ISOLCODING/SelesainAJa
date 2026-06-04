import { Mail, Phone, MapPin, MessageCircle, LucideIcon } from "lucide-react"

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
  action: string;
}

export const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 812-3456-7890",
    href: "tel:+6281234567890",
    action: "Hubungi Kami",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
    action: "Chat Sekarang",
  },
  {
    icon: Mail,
    title: "Email",
    value: "halo@selesainaja.com",
    href: "mailto:halo@selesainaja.com",
    action: "Kirim Email",
  },
  {
    icon: MapPin,
    title: "Lokasi",
    value: "Jakarta, Indonesia",
    href: "#",
    action: "Lihat Maps",
  },
];
