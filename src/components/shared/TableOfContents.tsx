"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ contentSelector = ".prose", className = "" }: { contentSelector?: string, className?: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const checkAndSetHeadings = () => {
      const elements = Array.from(document.querySelectorAll(`${contentSelector} h2, ${contentSelector} h3`));
      
      const items: TOCItem[] = elements.map((elem, index) => {
        // Ensure each heading has an ID
        if (!elem.id) {
          elem.id = `toc-heading-${index}`;
        }
        return {
          id: elem.id,
          text: elem.textContent || "",
          level: elem.tagName.toLowerCase() === "h2" ? 2 : 3,
        };
      });

      setHeadings(items);
    };

    // Run initially
    checkAndSetHeadings();

    // Setup an observer to watch for DOM changes in case content loads dynamically
    const container = document.querySelector(contentSelector);
    if (container) {
      const mutationObserver = new MutationObserver(checkAndSetHeadings);
      mutationObserver.observe(container, { childList: true, subtree: true });
      return () => mutationObserver.disconnect();
    }
  }, [contentSelector]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Use a smaller root margin so it only triggers when heading reaches top 20% of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the first one (top-most)
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className={`bg-slate-50 border border-slate-100 rounded-xl p-6 ${className}`}>
      <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 font-serif italic border-b border-slate-200 pb-2">
        <List className="w-5 h-5 text-[#0066FF]" />
        Daftar Isi
      </h4>
      <nav className="flex flex-col gap-3">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(heading.id);
              if (element) {
                // Smooth scroll with offset for sticky header
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
            className={`text-sm transition-colors block leading-snug ${
              heading.level === 3 ? "pl-4" : "font-medium"
            } ${
              activeId === heading.id
                ? "text-[#0066FF] font-bold"
                : "text-slate-600 hover:text-[#0066FF]"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
