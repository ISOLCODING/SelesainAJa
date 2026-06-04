import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  light?: boolean
  className?: string
  badge?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
  className,
  badge,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
            light
              ? "bg-white/20 text-white"
              : "bg-[#E6F0FF] text-[#0066FF]"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
          light ? "text-white" : "text-[#0A0A0B]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg",
            light ? "text-white/80" : "text-[#71717A]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
