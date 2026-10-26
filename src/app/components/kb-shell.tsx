import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowRight, X, ListTree, CornerDownLeft, FileText } from "lucide-react";
import { type Bi, type LangMode, type PageKey, BiText, cx, slugify } from "./kb-types";

export type NavItem = {
  key: PageKey;
  label: Bi;
  group: string;
  icon: React.ReactNode;
  description: Bi;
  keywords?: string[];
};

export type TocItem = { id: string; label: string };

// ─── Page header ─────────────────────────────────────────────
export function PageHeader({
  item,
  groupLabel,
  mode,
}: {
  item: NavItem;
  groupLabel: Bi;
  mode: LangMode;
}) {
  return (
    <header className="kb-page-header">
      <div className="kb-page-mark" aria-hidden="true">
        {item.icon}
      </div>
      <div className="min-w-0">
        <p className="kb-eyebrow">
          {mode === "AR" ? groupLabel.ar : groupLabel.en}
        </p>
        <h1 className="kb-page-title">
          {mode !== "AR" && <span lang="en">{item.label.en}</span>}
          {mode === "BOTH" && (
            <span lang="ar" dir="rtl" className="kb-page-title-ar">{item.label.ar}</span>
          )}
          {mode === "AR" && <span lang="ar" dir="rtl">{item.label.ar}</span>}
        </h1>
        <p className="kb-page-desc">
          {mode !== "AR" && <span lang="en">{item.description.en}</span>}
          {mode === "BOTH" && (
            <span lang="ar" dir="rtl" className="kb-page-desc-ar">{item.description.ar}</span>
          )}
          {mode === "AR" && <span lang="ar" dir="rtl">{item.description.ar}</span>}
        </p>
      </div>
    </header>
  );
}

// ─── Reading progress (CSS scroll driven, no JS) ─────────────
export function ReadingProgress() {
  return (
    <div className="kb-progress" aria-hidden="true">
      <span />
    </div>
  );
}

// ─── Table of contents ───────────────────────────────────────
export function usePageToc(
  rootRef: React.RefObject<HTMLElement>,
  page: PageKey,
  langMode: LangMode
) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      setItems([]);
      return;
    }
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2"));
      const used = new Set<string>();
      const next: TocItem[] = [];

      headings.forEach((el, index) => {
        const en = el.querySelector(".bi-en")?.textContent?.trim() || "";
        const ar = el.querySelector(".bi-ar")?.textContent?.trim() || "";
        const raw = langMode === "AR" ? ar || en : en || ar || el.textContent || "";
        if (!raw) return;

        let id = el.id;
        if (!id) {
          id = `${slugify(en || raw)}-${index}`;
          el.id = id;
        }
        if (used.has(id)) {
          id = `${id}-${index}`;
          el.id = id;
        }
        used.add(id);
        next.push({ id, label: raw });
      });

      setItems(next);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [rootRef, page, langMode]);

  return items;
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

function useActiveHeading(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) {
      setActive(null);
      return;
    }
    setActive((current) => (current && items.some((i) => i.id === current) ? current : items[0].id));

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return [active, setActive] as const;
}

export function TableOfContents({
  items,
  langMode,
}: {
  items: TocItem[];
  langMode: LangMode;
}) {
  const [active, setActive] = useActiveHeading(items);

  if (items.length < 2) return null;

  return (
    <nav className="kb-toc" aria-label={langMode === "AR" ? "في هذه الصفحة" : "On this page"}>
      <p className="kb-toc-title">{langMode === "AR" ? "في هذه الصفحة" : "On this page"}</p>
      <ul className="kb-toc-list">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  scrollToHeading(item.id);
                  setActive(item.id);
                }}
                className={cx("kb-toc-link", isActive && "is-active")}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileToc({ items, langMode }: { items: TocItem[]; langMode: LangMode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useActiveHeading(items);

  if (items.length < 2) return null;

  return (
    <details ref={detailsRef} className="kb-mobile-toc">
      <summary>
        <span className="inline-flex items-center gap-2">
          <ListTree className="h-4 w-4" aria-hidden="true" />
          {langMode === "AR" ? "في هذه الصفحة" : "On this page"}
        </span>
        <span className="kb-mobile-toc-count">{items.length}</span>
      </summary>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                scrollToHeading(item.id);
                setActive(item.id);
                detailsRef.current?.removeAttribute("open");
              }}
              className={cx("kb-toc-link", active === item.id && "is-active")}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

// ─── Search palette ──────────────────────────────────────────
export function CommandPalette({
  open,
  onClose,
  items,
  groupLabels,
  langMode,
  onNavigate,
  currentPage,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  groupLabels: Record<string, Bi>;
  langMode: LangMode;
  onNavigate: (page: PageKey) => void;
  currentPage: PageKey;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items.filter((item) => item.key !== currentPage).slice(0, 8);
    }
    const scored = items
      .map((item) => {
        const en = item.label.en.toLowerCase();
        const ar = item.label.ar;
        const group = (groupLabels[item.group]?.en || item.group).toLowerCase();
        const desc = `${item.description.en} ${item.description.ar}`.toLowerCase();
        const keys = (item.keywords || []).join(" ").toLowerCase();
        let score = 0;
        if (en.startsWith(q) || ar.startsWith(q)) score += 8;
        if (en.includes(q) || ar.includes(q)) score += 5;
        if (group.includes(q)) score += 2;
        if (desc.includes(q)) score += 2;
        if (keys.includes(q)) score += 3;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    return scored.map((entry) => entry.item);
  }, [items, query, groupLabels, currentPage]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(results.length - 1, 0)));
  }, [results.length]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = results[activeIndex];
      if (target) {
        onNavigate(target.key);
        onClose();
      }
      return;
    }
    if (event.key === "Tab") {
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      className="kb-palette-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={panelRef}
        className="kb-palette"
        role="dialog"
        aria-modal="true"
        aria-label={langMode === "AR" ? "البحث في قاعدة المعرفة" : "Search the knowledge base"}
      >
        <div className="kb-palette-search">
          <Search className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={langMode === "AR" ? "ابحث عن إجراء أو فريق أو مؤشر..." : "Search procedures, teams, metrics..."}
            aria-label={langMode === "AR" ? "البحث" : "Search"}
            aria-controls="kb-search-results"
            aria-activedescendant={results[activeIndex] ? `kb-search-result-${results[activeIndex].key}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" onClick={onClose} className="kb-palette-close" aria-label="Close search">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="kb-palette-hint" aria-live="polite">
          {query.trim()
            ? `${results.length} ${langMode === "AR" ? "نتيجة" : results.length === 1 ? "result" : "results"}`
            : langMode === "AR"
              ? "صفحات مقترحة"
              : "Suggested pages"}
        </div>

        <ul id="kb-search-results" className="kb-palette-results" role="listbox" aria-label="Search results">
          {results.map((item, index) => {
            const isActive = index === activeIndex;
            const group = groupLabels[item.group];
            return (
              <li key={item.key} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  id={`kb-search-result-${item.key}`}
                  tabIndex={-1}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => {
                    onNavigate(item.key);
                    onClose();
                  }}
                  className={cx("kb-palette-item", isActive && "is-active")}
                >
                  <span className="kb-palette-icon" aria-hidden="true">{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm" style={{ fontWeight: 700, color: "var(--text)" }}>
                      {langMode === "AR" ? item.label.ar : item.label.en}
                    </span>
                    <span className="block truncate text-xs" style={{ color: "var(--muted)" }}>
                      {langMode === "AR" ? item.label.en : item.label.ar}
                    </span>
                  </span>
                  {group && (
                    <span className="kb-palette-group">
                      {langMode === "AR" ? group.ar : group.en}
                    </span>
                  )}
                  <CornerDownLeft
                    className={cx("h-3.5 w-3.5 shrink-0", isActive ? "opacity-100" : "opacity-0")}
                    style={{ color: "var(--muted)" }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {results.length === 0 && (
          <div className="kb-palette-empty">
            <FileText className="h-5 w-5" aria-hidden="true" />
            <p style={{ fontWeight: 700 }}>
              {langMode === "AR" ? "لا توجد صفحات مطابقة" : "No matching pages"}
            </p>
            <p>{langMode === "AR" ? "جرّب كلمات مثل SLA أو RACI أو التغطية." : "Try SLA, RACI, coverage, onboarding, or templates."}</p>
          </div>
        )}

        <div className="kb-palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> {langMode === "AR" ? "للتنقل" : "to move"}</span>
          <span><kbd>↵</kbd> {langMode === "AR" ? "للفتح" : "to open"}</span>
          <span><kbd>esc</kbd> {langMode === "AR" ? "للإغلاق" : "to close"}</span>
          <span className="ms-auto inline-flex items-center gap-1">
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
            {langMode === "AR" ? "قاعدة معرفة TryGC" : "TryGC KB"}
          </span>
        </div>
      </div>
    </div>
  );
}
