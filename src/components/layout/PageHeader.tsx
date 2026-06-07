import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string | React.ReactNode
  description?: string
  badge?: string
  breadcrumbs?: BreadcrumbItem[]
  backgroundImage?: string
  children?: React.ReactNode
  align?: "left" | "center"
  background?: "default" | "white" | "primary" | "image"
}

export function PageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  backgroundImage,
  children,
  align = "center",
  background = "default",
}: PageHeaderProps) {
  const isImageBg = background === "image" || !!backgroundImage;
  
  const bgMap = {
    default: "bg-[#FAFAFA]",
    white: "bg-white",
    primary: "bg-[#0066FF]",
    image: "bg-slate-900 text-white",
  }

  return (
    <section 
      className={cn(
        "relative pt-48 pb-16 md:pt-56 lg:pt-64 md:pb-24 overflow-hidden", 
        isImageBg ? bgMap.image : bgMap[background]
      )}
    >
      {/* Background Image & Overlay */}
      {isImageBg && backgroundImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 mix-blend-multiply" />
        </>
      )}

      <div
        className={cn(
          "container-custom relative z-10",
          align === "center" && "text-center max-w-4xl mx-auto flex flex-col items-center"
        )}
      >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm font-medium mb-6 text-white/70" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <div key={item.label} className="flex items-center">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-white font-bold" : ""}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="w-4 h-4 mx-2 text-white/40 shrink-0" />}
                </div>
              )
            })}
          </nav>
        )}

        {badge && (
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
            isImageBg ? "bg-white/20 text-white backdrop-blur-md border border-white/30" : "bg-[#E6F0FF] text-[#0066FF]"
          )}>
            {badge}
          </span>
        )}
        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight",
          isImageBg ? "text-white drop-shadow-lg" : "text-[#0A0A0B]"
        )} style={{ fontFamily: "var(--font-batica)" }}>
          {title}
        </h1>
        {description && (
          <p className={cn(
            "mt-6 text-lg md:text-xl max-w-2xl",
            align === "center" && "mx-auto",
            isImageBg ? "text-white/90 font-medium drop-shadow" : "text-[#71717A]"
          )}>
            {description}
          </p>
        )}
        {children && <div className="mt-8 w-full">{children}</div>}
      </div>
    </section>
  )
}
