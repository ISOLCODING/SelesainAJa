"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionWrapperProps {
  id?: string
  className?: string
  background?: "default" | "white" | "primary" | "dark" | "accent"
  children: React.ReactNode
  animate?: boolean
}

const bgMap = {
  default: "bg-[#FAFAFA]",
  white: "bg-white",
  primary: "bg-[#2C5EAD]",
  dark: "bg-[#0A0A0B]",
  accent: "bg-[#FF6B00]",
}

export function SectionWrapper({
  id,
  className,
  background = "default",
  children,
  animate = true,
}: SectionWrapperProps) {
  const Wrapper = animate ? motion.section : "section"

  return (
    <Wrapper
      id={id}
      className={cn("section-padding relative overflow-hidden", bgMap[background], className)}
      {...(animate && {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      })}
    >
      <div className="container-custom relative z-10">{children}</div>
    </Wrapper>
  )
}
