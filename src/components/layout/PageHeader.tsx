import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  children?: React.ReactNode
  align?: "left" | "center"
  background?: "default" | "white" | "primary"
}

export function PageHeader({
  title,
  description,
  badge,
  children,
  align = "center",
  background = "default",
}: PageHeaderProps) {
  const bgMap = {
    default: "bg-[#FAFAFA]",
    white: "bg-white",
    primary: "bg-[#0066FF]",
  }

  return (
    <section className={cn("pt-32 pb-16 md:pt-40 md:pb-20", bgMap[background])}>
      <div
        className={cn(
          "container-custom",
          align === "center" && "text-center max-w-3xl mx-auto"
        )}
      >
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-[#E6F0FF] text-[#0066FF]">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0A0B]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-[#71717A] max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
