import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-slate-500 mb-6 flex-wrap gap-y-2">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-[#0066FF] flex items-center transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {isLast || !item.href ? (
                <span className="text-slate-900 font-semibold max-w-[200px] sm:max-w-xs md:max-w-md truncate" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#0066FF] transition-colors whitespace-nowrap">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
