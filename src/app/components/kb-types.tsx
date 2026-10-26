import React, { useState, useEffect, useId } from "react";
import {
  Check, Copy, Download, TrendingUp, ChevronDown, ChevronRight,
  AlertCircle, CheckCircle2, UserRound, ShieldCheck, CalendarDays, RefreshCw, Hash
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
export type LangMode = "BOTH" | "EN" | "AR";
export type PageKey =
  | "cover" | "ia"
  | "sop_community" | "sop_coordination" | "sop_chat" | "sop_followup" | "sop_coverage"
  | "wf_e2e" | "wf_coordination" | "wf_chat" | "wf_followup" | "wf_coverage" | "wf_community"
  | "raci" | "gsheets"
  | "sop_operations" | "sop_onboarding" | "sop_outreach" | "sop_quality" | "sop_data" | "sop_regional" | "sop_flex" | "sop_elite"
  | "templates_influencers" | "templates_clients"
  | "kpis"
  | "automation_proposal";

export type Bi = { en: string; ar: string };

// ─── TryGC Brand Colors ──────────────────────────────────────
// Light "paper" palette for workflow diagrams. Maps stay light on both themes
// so the flow reads clearly as a document rather than blending into the UI.
export const MAP_COLORS = {
  bg: "#F7F3EC",
  card: "#FFFFFF",
  line: "#E2D9CD",
  accent: "#E8630C",
  text: "#1C1428",
  muted: "#6E6678",
};

export const TRYGC = {
  purple: "#52358C",
  purpleLight: "#6B46B3",
  purpleDark: "#3D2767",
  deepPurple: "#4A3573",
  orange: "#E8630C",
  orangeLight: "#FF7A1F",
  lavender: "#A798BF",
  peach: "#E3A579",
  offWhite: "#F6F2F0",
  darkBg: "#0B0713",
  darkCard: "#151020",
  darkCardHover: "#1C1429",
  darkLine: "#2B2139",
  darkText: "#F4F0FA",
  darkMuted: "#A79FB8",
  lightBg: "#F5F3F7",
  lightCard: "#FFFFFF",
  lightCardHover: "#FBF9FD",
  lightLine: "#E1DBE9",
  lightText: "#171021",
  lightMuted: "#5C5468",
  success: "#4ADE80",
  danger: "#FB7185",
  info: "#8B7BD8",
  warning: "#FBBF24",
} as const;

// ─── Team & Group Accent Colors ──────────────────────────────
export const TEAM_COLORS: Record<string, string> = {
  sop_community: "#52358C",
  sop_coordination: "#E8630C",
  sop_chat: "#0EA5E9",
  sop_followup: "#16A34A",
  sop_coverage: "#DB2777",
  sop_onboarding: "#0891B2",
  sop_outreach: "#D97706",
  sop_operations: "#4338CA",
  sop_quality: "#DC2626",
  sop_data: "#0D9488",
  sop_regional: "#9333EA",
  sop_flex: "#EA580C",
  sop_elite: "#CA8A04",
};

export const GROUP_COLORS: Record<string, string> = {
  "Start here": "#52358C",
  "Getting Started": "#52358C",
  "Community Team": "#52358C",
  "Core functions": "#E8630C",
  "Operations Functions": "#4338CA",
  "Support functions": "#0EA5E9",
  "Workflow Maps": "#0EA5E9",
  "Workflow maps": "#0EA5E9",
  "Reference & Governance": "#16A34A",
  "Reference and governance": "#16A34A",
  "Templates Library": "#E8630C",
  "Templates library": "#E8630C",
  Automation: "#9333EA",
};

export function getThemeVars(theme: "dark" | "light"): React.CSSProperties {
  if (theme === "dark") {
    return {
      "--bg": TRYGC.darkBg,
      "--sidebar": "#100B1A",
      "--card": TRYGC.darkCard,
      "--card-hover": TRYGC.darkCardHover,
      "--surface-2": "#1A1326",
      "--line": TRYGC.darkLine,
      "--line-strong": "#3A2D4D",
      "--accent": "#FF7A1F",
      "--accent-contrast": "#1B0D03",
      "--accent-soft": "rgba(255, 122, 31, 0.14)",
      "--accent2": "#B9A6E0",
      "--purple-soft": "rgba(82, 53, 140, 0.28)",
      "--text": TRYGC.darkText,
      "--muted": TRYGC.darkMuted,
      "--success": "#4ADE80",
      "--danger": "#FB7185",
      "--info": "#A08CE8",
      "--warning": "#FBBF24",
      "--ring": "#FF9A4D",
      "--shadow-card": "0 1px 2px rgba(0,0,0,0.30), 0 18px 40px -28px rgba(0,0,0,0.85)",
    } as React.CSSProperties;
  }
  return {
    "--bg": TRYGC.lightBg,
    "--sidebar": "#FFFFFF",
    "--card": TRYGC.lightCard,
    "--card-hover": TRYGC.lightCardHover,
    "--surface-2": "#F0EDF4",
    "--line": TRYGC.lightLine,
    "--line-strong": "#CFC7DA",
    "--accent": "#C24E08",
    "--accent-contrast": "#FFFFFF",
    "--accent-soft": "rgba(232, 99, 12, 0.10)",
    "--accent2": "#52358C",
    "--purple-soft": "rgba(82, 53, 140, 0.10)",
    "--text": TRYGC.lightText,
    "--muted": TRYGC.lightMuted,
    "--success": "#157F4A",
    "--danger": "#B4233F",
    "--info": "#4A3573",
    "--warning": "#B45309",
    "--ring": "#C24E08",
    "--shadow-card": "0 1px 2px rgba(23,16,33,0.04), 0 18px 40px -30px rgba(23,16,33,0.28)",
  } as React.CSSProperties;
}

// ─── Utility ─────────────────────────────────────────────────
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "section";
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

// ─── Bilingual Text ─────────────────────────────────────────
export function BiText({ bi, mode, className, tag }: { bi: Bi; mode: LangMode; className?: string; tag?: "span" | "div" | "p" }) {
  const Tag = tag || "span";
  if (mode === "EN") return <Tag className={cx("bi-en", className)} lang="en">{bi.en}</Tag>;
  if (mode === "AR") return (
    <Tag className={cx("bi-ar font-ar", className)} dir="rtl" lang="ar">
      {bi.ar}
    </Tag>
  );
  return (
    <Tag className={cx("flex flex-col gap-0.5", className)}>
      <span className="bi-en" lang="en">{bi.en}</span>
      <span className="bi-ar font-ar opacity-80" dir="rtl" lang="ar">{bi.ar}</span>
    </Tag>
  );
}

// ─── Heading ─────────────────────────────────────────────────
export function H({ title, mode, subtitle, id }: { title: Bi; mode: LangMode; subtitle?: Bi; id?: string }) {
  const headingId = id || slugify(title.en);
  return (
    <div className="kb-section-head">
      <h2 id={headingId} className="kb-h2">
        <BiText bi={title} mode={mode} />
      </h2>
      {subtitle && (
        <p className="kb-sub">
          <BiText bi={subtitle} mode={mode} />
        </p>
      )}
    </div>
  );
}

// ─── Page Metadata ───────────────────────────────────────────
function formatDate(value: string) {
  const parsed = new Date(value + "T00:00:00");
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function PageMeta({ mode, owner, approver, version, lastUpdated, nextReview }: {
  mode: LangMode; owner: Bi; approver: Bi; version: string; lastUpdated: string; nextReview: string;
}) {
  const items: Array<{ label: Bi; icon: React.ReactNode; value: React.ReactNode }> = [
    { label: { en: "Owner", ar: "المالك" }, icon: <UserRound className="h-3.5 w-3.5" />, value: <BiText bi={owner} mode={mode} /> },
    { label: { en: "Approver", ar: "المعتمد" }, icon: <ShieldCheck className="h-3.5 w-3.5" />, value: <BiText bi={approver} mode={mode} /> },
    { label: { en: "Version", ar: "الإصدار" }, icon: <Hash className="h-3.5 w-3.5" />, value: <span className="tabular-nums">{version}</span> },
    { label: { en: "Last updated", ar: "آخر تحديث" }, icon: <CalendarDays className="h-3.5 w-3.5" />, value: <span className="tabular-nums">{formatDate(lastUpdated)}</span> },
    { label: { en: "Next review", ar: "المراجعة القادمة" }, icon: <RefreshCw className="h-3.5 w-3.5" />, value: <span className="tabular-nums">{formatDate(nextReview)}</span> },
  ];

  return (
    <div className="kb-meta" role="group" aria-label="Document control">
      {items.map((item, i) => (
        <div key={i} className="kb-meta-item">
          <span className="kb-meta-label">
            <span className="kb-meta-icon" aria-hidden="true">{item.icon}</span>
            <BiText bi={item.label} mode={mode} />
          </span>
          <span className="kb-meta-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────
export function KBCard({ title, subtitle, mode, children, actions, noPadding, glass }: {
  title?: Bi; subtitle?: Bi; mode: LangMode; children: React.ReactNode; actions?: React.ReactNode; noPadding?: boolean; glass?: boolean;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-colors duration-200"
      style={{
        background: glass ? "color-mix(in srgb, var(--card) 88%, transparent)" : "var(--card)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-card)",
        backdropFilter: glass ? "blur(16px)" : undefined,
        WebkitBackdropFilter: glass ? "blur(16px)" : undefined,
      }}
    >
      {(title || actions) && (
        <div className="kb-card-head">
          <div className="min-w-0">
            {title && <h3 className="kb-card-title"><BiText bi={title} mode={mode} /></h3>}
            {subtitle && <p className="kb-card-sub"><BiText bi={subtitle} mode={mode} /></p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "kb-card-body"}>{children}</div>
    </div>
  );
}

// ─── Pill ────────────────────────────────────────────────────
export function Pill({ text, tone = "neutral" }: { text: string; tone?: "neutral" | "success" | "warning" | "danger" | "info" | "purple" }) {
  const tones: Record<string, { fg: string; bg: string; border: string }> = {
    neutral: { fg: "var(--text)", bg: "var(--surface-2)", border: "var(--line)" },
    success: { fg: "var(--success)", bg: "color-mix(in srgb, var(--success) 12%, transparent)", border: "color-mix(in srgb, var(--success) 28%, transparent)" },
    warning: { fg: "var(--accent)", bg: "color-mix(in srgb, var(--accent) 12%, transparent)", border: "color-mix(in srgb, var(--accent) 30%, transparent)" },
    danger: { fg: "var(--danger)", bg: "color-mix(in srgb, var(--danger) 12%, transparent)", border: "color-mix(in srgb, var(--danger) 28%, transparent)" },
    info: { fg: "var(--accent2)", bg: "color-mix(in srgb, var(--accent2) 12%, transparent)", border: "color-mix(in srgb, var(--accent2) 28%, transparent)" },
    purple: { fg: "var(--accent2)", bg: "color-mix(in srgb, var(--accent2) 12%, transparent)", border: "color-mix(in srgb, var(--accent2) 28%, transparent)" },
  };
  const c = tones[tone] || tones.neutral;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] leading-5"
      style={{ background: c.bg, color: c.fg, border: `1px solid ${c.border}`, fontWeight: 700 }}
    >
      {text}
    </span>
  );
}

// ─── SLA Badge ───────────────────────────────────────────────
export function SLABadge({ label, rag }: { label: string; rag: "Green" | "Amber" | "Red" }) {
  const map = {
    Green: { fg: "var(--success)", bg: "color-mix(in srgb, var(--success) 12%, transparent)", border: "color-mix(in srgb, var(--success) 30%, transparent)" },
    Amber: { fg: "var(--warning)", bg: "color-mix(in srgb, var(--warning) 14%, transparent)", border: "color-mix(in srgb, var(--warning) 32%, transparent)" },
    Red: { fg: "var(--danger)", bg: "color-mix(in srgb, var(--danger) 12%, transparent)", border: "color-mix(in srgb, var(--danger) 30%, transparent)" },
  } as const;
  const c = map[rag] || map.Green;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] leading-5 tabular-nums"
      style={{ background: c.bg, color: c.fg, border: `1px solid ${c.border}`, fontWeight: 700 }}
      aria-label={`${label}, ${rag} status`}
      title={`${label} (${rag})`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.fg }} aria-hidden="true" />
      {label}
    </span>
  );
}

// ─── Copy Button ─────────────────────────────────────────────
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
      style={{
        background: copied ? "color-mix(in srgb, var(--success) 14%, transparent)" : "var(--surface-2)",
        color: copied ? "var(--success)" : "var(--text)",
        border: "1px solid var(--line)",
        fontWeight: 600,
      }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

// ─── Accordion ───────────────────────────────────────────────
export function Accordion({ title, mode, children, defaultOpen = false }: {
  title: Bi; mode: LangMode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="flex w-full min-h-12 items-center justify-between gap-3 p-4 text-start text-sm transition-colors"
        style={{ fontWeight: 700, color: "var(--text)" }}
      >
        <BiText bi={title} mode={mode} />
        <ChevronDown
          className={cx("h-4 w-4 shrink-0 transition-transform duration-200", !open && "rtl:rotate-90 -rotate-90")}
          style={{ color: "var(--muted)" }}
          aria-hidden="true"
        />
      </button>
      {open && <div id={panelId} role="region" aria-labelledby={buttonId} className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ─── QAItem ──────────────────────────────────────────────────
export function QAItem({ mode, question, symptoms, causes, fix, owner, sla, evidence, escalation }: {
  mode: LangMode; question: Bi; symptoms: Bi; causes: Bi; fix: Bi; owner: Bi; sla: string; evidence: Bi; escalation: Bi;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="flex w-full min-h-12 items-center justify-between gap-3 p-4 text-start text-sm transition-colors"
        style={{ fontWeight: 700, color: "var(--text)" }}
      >
        <span className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
          <BiText bi={question} mode={mode} />
        </span>
        <ChevronDown
          className={cx("h-4 w-4 shrink-0 transition-transform duration-200", !open && "rtl:rotate-90 -rotate-90")}
          style={{ color: "var(--muted)" }}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="px-4 pb-4 space-y-2 text-sm">
          <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Symptoms: ", ar: "الأعراض: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={symptoms} mode={mode} /></span></div>
          <div><span style={{ color: "var(--accent2)", fontWeight: 700 }}><BiText bi={{ en: "Causes: ", ar: "الأسباب: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={causes} mode={mode} /></span></div>
          <div><span style={{ color: "var(--success)", fontWeight: 700 }}><BiText bi={{ en: "Fix: ", ar: "الإصلاح: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={fix} mode={mode} /></span></div>
          <div><span style={{ color: "var(--muted)", fontWeight: 700 }}><BiText bi={{ en: "Owner: ", ar: "المالك: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={owner} mode={mode} /></span></div>
          <div className="flex items-center gap-2"><span style={{ color: "var(--muted)", fontWeight: 700 }}>SLA:</span><SLABadge label={sla} rag={sla.includes("24") || sla.includes("48") ? "Amber" : "Green"} /></div>
          <div><span style={{ color: "var(--info)", fontWeight: 700 }}><BiText bi={{ en: "Evidence: ", ar: "الدليل: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={evidence} mode={mode} /></span></div>
          <div><span style={{ color: "var(--danger)", fontWeight: 700 }}><BiText bi={{ en: "Escalation: ", ar: "التصعيد: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={escalation} mode={mode} /></span></div>
        </div>
      )}
    </div>
  );
}

// ─── Simple Table ────────────────────────────────────────────
export function SimpleTable({ headers, rows }: { headers: React.ReactNode[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--line)" }}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ background: "var(--surface-2)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-start align-bottom text-[11px] uppercase tracking-wider"
                style={{ fontWeight: 800, color: "var(--muted)", borderBottom: "1px solid var(--line)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="kb-table-row" style={{ borderBottom: ri === rows.length - 1 ? "none" : "1px solid var(--line)" }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top" style={{ color: "var(--text)" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────
export function StatCard({ icon, value, label, trend, color }: {
  icon: React.ReactNode; value: string; label: string; trend?: string; color: string;
}) {
  const isPositive = trend ? !trend.startsWith("-") : true;
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="rounded-xl p-2.5" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>{icon}</div>
        {trend && (
          <div className="flex items-center gap-1 text-xs tabular-nums" style={{ color: isPositive ? "var(--success)" : "var(--danger)", fontWeight: 700 }}>
            <TrendingUp className="h-3.5 w-3.5" style={{ transform: isPositive ? "none" : "rotate(180deg)" }} aria-hidden="true" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl tabular-nums" style={{ fontWeight: 800, color: "var(--text)" }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: "var(--muted)", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

// ─── Checklist ──────────────────────────────────────────────
export function Checklist({ mode, items }: { mode: LangMode; items: Bi[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--success)" }} aria-hidden="true" />
          <span style={{ color: "var(--text)" }}><BiText bi={item} mode={mode} /></span>
        </li>
      ))}
    </ul>
  );
}

// ─── Section Divider ─────────────────────────────────────────
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
      {label && <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--muted)", fontWeight: 700 }}>{label}</span>}
      <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
    </div>
  );
}

// ─── SVG Utilities ───────────────────────────────────────────
export function escXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildFlowSVG({ title, steps, colors: c }: {
  title: string;
  steps: Array<{ text: string; sla?: string }>;
  colors: { bg: string; card: string; line: string; accent: string; text: string; muted: string };
}): string {
  const W = 1000, H = 200;
  const sw = (W - 80) / steps.length;

  let svg = `<rect width="${W}" height="${H}" rx="20" fill="${c.bg}"/>`;
  svg += `<text x="${W / 2}" y="35" text-anchor="middle" font-size="16" font-family="Manrope,sans-serif" fill="${c.text}" font-weight="800">${escXml(title)}</text>`;

  steps.forEach((step, i) => {
    const x = 40 + i * sw;
    svg += `<rect x="${x}" y="55" width="${sw - 15}" height="55" rx="12" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
    const labelSize = step.text.length > 22 ? 9.5 : step.text.length > 18 ? 10 : 11;
    const fitWidth = step.text.length * labelSize * 0.6 > sw - 28;
    svg += `<text x="${x + (sw - 15) / 2}" y="78" text-anchor="middle" font-size="${labelSize}" font-family="Manrope,sans-serif" fill="${c.text}" font-weight="700"${fitWidth ? ` textLength="${sw - 30}" lengthAdjust="spacingAndGlyphs"` : ""}>${escXml(step.text)}</text>`;
    if (step.sla) {
      svg += `<rect x="${x + 10}" y="88" width="${sw - 35}" height="18" rx="9" fill="${c.accent}"/>`;
      svg += `<text x="${x + (sw - 15) / 2}" y="101" text-anchor="middle" font-size="9" font-family="Manrope,sans-serif" fill="#fff" font-weight="700">${escXml(step.sla)}</text>`;
    }
    if (i < steps.length - 1) {
      const x1 = x + sw - 15;
      const x2 = x + sw;
      svg += `<line x1="${x1}" y1="82" x2="${x2}" y2="82" stroke="${c.accent}" stroke-width="2" marker-end="url(#fah)"/>`;
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
    <defs><marker id="fah" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${c.accent}"/></marker></defs>
    ${svg}</svg>`;
}

// ─── Diagram Card ────────────────────────────────────────────
export function DiagramCard({ title, mode, svg }: { title: Bi; mode: LangMode; svg: string }) {
  const handleDownloadSVG = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <KBCard
      title={title}
      mode={mode}
      actions={
        <button
          type="button"
          onClick={handleDownloadSVG}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
          style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--line)", fontWeight: 600 }}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          SVG
        </button>
      }
    >
      <div
        className="kb-diagram"
        role="img"
        aria-label={mode === "AR" ? title.ar : title.en}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </KBCard>
  );
}
