import { IconType } from "react-icons";

export interface ServiceType {
  title: string;
  description: string;
  icon: IconType;
  price: string;
  href: string;
  color: string;
  fullDescription?: string;
  features?: string[];
  benefits?: string[];
  deliveryTime?: string;
}

export interface TestimonialType {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface FAQType {
  question: string;
  answer: string;
}

export interface StatType {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface StepType {
  number: string;
  title: string;
  description: string;
}
