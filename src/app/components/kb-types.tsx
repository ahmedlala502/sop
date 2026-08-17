import React, { useState, useEffect } from "react";
import {
  Check, Copy, Download, TrendingUp, ChevronDown, ChevronRight,
  AlertCircle, CheckCircle2, Clock, Info
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

// ��── TryGC Brand Colors ─────────────────────────────────────
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
  darkBg: "#100B1C",
  darkCard: "#1D1331",
  darkCardHover: "#251840",
  darkLine: "#2D1D4D",
  darkText: "#F6F2F0",
  darkMuted: "#A798BF",
  lightBg: "#ECE7EA",
  lightCard: "#F3EEEE",
  lightCardHover: "#FFFFFF",
  lightLine: "#D8D0DE",
  lightText: "#0F0A18",
  lightMuted: "#4A3573",
  success: "#39D98A",
  danger: "#FF5C7A",
  info: "#52358C",
  warning: "#E8630C",
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
  "Getting Started": "#52358C",
  "Community Team": "#52358C",
  "Operations Functions": "#4338CA",
  "Workflow Maps": "#0EA5E9",
  "Reference & Governance": "#16A34A",
  "Templates Library": "#E8630C",
};

export function getThemeVars(theme: "dark" | "light"): React.CSSProperties {
  if (theme === "dark") {
    return {
      "--bg": TRYGC.darkBg,
      "--card": TRYGC.darkCard,
      "--card-hover": TRYGC.darkCardHover,
      "--line": TRYGC.darkLine,
      "--accent": TRYGC.orange,
      "--accent2": TRYGC.purple,
      "--text": TRYGC.darkText,
      "--muted": TRYGC.darkMuted,
      "--success": TRYGC.success,
      "--danger": TRYGC.danger,
      "--info": TRYGC.info,
      "--warning": TRYGC.warning,
    } as React.CSSProperties;
  }
  return {
    "--bg": TRYGC.lightBg,
    "--card": TRYGC.lightCard,
    "--card-hover": TRYGC.lightCardHover,
    "--line": TRYGC.lightLine,
    "--accent": TRYGC.orange,
    "--accent2": TRYGC.purple,
    "--text": TRYGC.lightText,
    "--muted": TRYGC.lightMuted,
    "--success": TRYGC.success,
    "--danger": TRYGC.danger,
    "--info": TRYGC.info,
    "--warning": TRYGC.warning,
  } as React.CSSProperties;
}

// ─── Utility ──────────────────────���──────────────────────────
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
  if (mode === "EN") return <Tag className={className}>{bi.en}</Tag>;
  if (mode === "AR") return <Tag className={cx("font-ar", className)} dir="rtl" style={{ fontFamily: '"Noto Kufi Arabic", sans-serif' }}>{bi.ar}</Tag>;
  return (
    <Tag className={cx("flex flex-col gap-0.5", className)}>
      <span>{bi.en}</span>
      <span dir="rtl" className="opacity-75" style={{ fontFamily: '"Noto Kufi Arabic", sans-serif' }}>{bi.ar}</span>
    </Tag>
  );
}

// ─── Heading ─────────────────────────────────────────────────
export function H({ title, mode, subtitle }: { title: Bi; mode: LangMode; subtitle?: Bi }) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl" style={{ fontWeight: 800, background: `linear-gradient(135deg, var(--accent), var(--accent2))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        <BiText bi={title} mode={mode} />
      </h2>
      {subtitle && <p className="text-sm" style={{ color: "var(--muted)" }}><BiText bi={subtitle} mode={mode} /></p>}
    </div>
  );
}

// ─── Page Metadata ───────────────────────────────────────────
export function PageMeta({ mode, owner, approver, version, lastUpdated, nextReview }: {
  mode: LangMode; owner: Bi; approver: Bi; version: string; lastUpdated: string; nextReview: string;
}) {
  return null;
}

// ─── Card ────────────────────────────────────────────────────
export function KBCard({ title, subtitle, mode, children, actions, noPadding, glass }: {
  title?: Bi; subtitle?: Bi; mode: LangMode; children: React.ReactNode; actions?: React.ReactNode; noPadding?: boolean; glass?: boolean;
}) {
  return (
    <div 
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl" 
      style={{ 
        background: glass ? "rgba(29, 19, 49, 0.6)" : "var(--card)", 
        border: "1px solid var(--line)",
        backdropFilter: glass ? "blur(16px)" : "none",
        WebkitBackdropFilter: glass ? "blur(16px)" : "none",
      }}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 p-5" style={{ borderBottom: "1px solid var(--line)" }}>
          <div>
            {title && <h3 style={{ fontWeight: 800, color: "var(--text)" }}><BiText bi={title} mode={mode} /></h3>}
            {subtitle && <p className="text-sm mt-1" style={{ color: "var(--muted)" }}><BiText bi={subtitle} mode={mode} /></p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}

// ─── Pill ────────────────────────────────────────────────────
export function Pill({ text, tone = "neutral" }: { text: string; tone?: "neutral" | "success" | "warning" | "danger" | "info" | "purple" }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    neutral: { bg: "var(--line)", fg: "var(--text)" },
    success: { bg: TRYGC.success + "22", fg: TRYGC.success },
    warning: { bg: TRYGC.orange + "22", fg: TRYGC.orange },
    danger: { bg: TRYGC.danger + "22", fg: TRYGC.danger },
    info: { bg: TRYGC.purple + "22", fg: TRYGC.purple },
    purple: { bg: TRYGC.purple + "22", fg: TRYGC.purpleLight },
  };
  const c = colors[tone] || colors.neutral;
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs" style={{ background: c.bg, color: c.fg, fontWeight: 700 }}>
      {text}
    </span>
  );
}

// ─── SLA Badge ───────────────────────────────────────────────
export function SLABadge({ label, rag }: { label: string; rag: "Green" | "Amber" | "Red" }) {
  const colors = { Green: TRYGC.success, Amber: TRYGC.orange, Red: TRYGC.danger };
  const bg = colors[rag] || TRYGC.success;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white" style={{ background: bg, fontWeight: 700 }}>
      <span className="h-1.5 w-1.5 rounded-full bg-white opacity-80" />
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
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all"
      style={{ background: copied ? TRYGC.success + "22" : "var(--line)", color: copied ? TRYGC.success : "var(--text)", fontWeight: 600 }}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ─── Accordion ───────────────────────────────────────────────
export function Accordion({ title, mode, children, defaultOpen = false }: {
  title: Bi; mode: LangMode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm transition-all" style={{ fontWeight: 700, color: "var(--text)" }}>
        <BiText bi={title} mode={mode} />
        {open ? <ChevronDown className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} /> : <ChevronRight className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ─── QAItem ──────────────────────────────────────────────────
export function QAItem({ mode, question, symptoms, causes, fix, owner, sla, evidence, escalation }: {
  mode: LangMode; question: Bi; symptoms: Bi; causes: Bi; fix: Bi; owner: Bi; sla: string; evidence: Bi; escalation: Bi;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm transition-all" style={{ fontWeight: 700, color: "var(--text)" }}>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" style={{ color: TRYGC.orange }} />
          <BiText bi={question} mode={mode} />
        </div>
        {open ? <ChevronDown className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} /> : <ChevronRight className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2 text-sm">
          <div><span style={{ color: TRYGC.orange, fontWeight: 700 }}><BiText bi={{ en: "Symptoms: ", ar: "الأعراض: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={symptoms} mode={mode} /></span></div>
          <div><span style={{ color: TRYGC.purple, fontWeight: 700 }}><BiText bi={{ en: "Causes: ", ar: "الأسباب: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={causes} mode={mode} /></span></div>
          <div><span style={{ color: TRYGC.success, fontWeight: 700 }}><BiText bi={{ en: "Fix: ", ar: "الإصلاح: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={fix} mode={mode} /></span></div>
          <div><span style={{ color: "var(--muted)", fontWeight: 700 }}><BiText bi={{ en: "Owner: ", ar: "المالك: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={owner} mode={mode} /></span></div>
          <div className="flex items-center gap-2"><span style={{ color: "var(--muted)", fontWeight: 700 }}>SLA:</span><SLABadge label={sla} rag={sla.includes("24") || sla.includes("48") ? "Amber" : "Green"} /></div>
          <div><span style={{ color: "var(--info)", fontWeight: 700 }}><BiText bi={{ en: "Evidence: ", ar: "الدليل: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={evidence} mode={mode} /></span></div>
          <div><span style={{ color: TRYGC.danger, fontWeight: 700 }}><BiText bi={{ en: "Escalation: ", ar: "التصعيد: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={escalation} mode={mode} /></span></div>
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
          <tr style={{ background: TRYGC.purple }}>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs text-white" style={{ fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid var(--line)" }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3" style={{ color: "var(--text)" }}>{cell}</td>
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
    <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="rounded-xl p-2.5" style={{ background: color + "22", color }}>{icon}</div>
        {trend && (
          <div className="flex items-center gap-1 text-xs" style={{ color: isPositive ? TRYGC.success : TRYGC.danger, fontWeight: 700 }}>
            <TrendingUp className="h-3.5 w-3.5" style={{ transform: isPositive ? "none" : "rotate(180deg)" }} />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl" style={{ fontWeight: 900, color: "var(--text)" }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: "var(--muted)", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

// ─── Checklist ──────────────────────────────────────────────
export function Checklist({ mode, items }: { mode: LangMode; items: Bi[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: TRYGC.success }} />
          <span style={{ color: "var(--text)" }}><BiText bi={item} mode={mode} /></span>
        </div>
      ))}
    </div>
  );
}

// ─── Section Divider ─────────────────────────────────────────
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
      {label && <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)", fontWeight: 700 }}>{label}</span>}
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
  svg += `<text x="${W / 2}" y="35" text-anchor="middle" font-size="16" font-family="Inter,sans-serif" fill="${c.text}" font-weight="800">${escXml(title)}</text>`;

  steps.forEach((step, i) => {
    const x = 40 + i * sw;
    // Box
    svg += `<rect x="${x}" y="55" width="${sw - 15}" height="55" rx="12" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
    svg += `<text x="${x + (sw - 15) / 2}" y="78" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="${c.text}" font-weight="700">${escXml(step.text)}</text>`;
    if (step.sla) {
      svg += `<rect x="${x + 10}" y="88" width="${sw - 35}" height="18" rx="9" fill="${c.accent}"/>`;
      svg += `<text x="${x + (sw - 15) / 2}" y="101" text-anchor="middle" font-size="9" font-family="Inter,sans-serif" fill="#fff" font-weight="700">${escXml(step.sla)}</text>`;
    }
    // Arrow
    if (i < steps.length - 1) {
      const x1 = x + sw - 15;
      const x2 = x + sw;
      svg += `<line x1="${x1}" y1="82" x2="${x2}" y2="82" stroke="${c.accent}" stroke-width="2" marker-end="url(#fah)"/>`;
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
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
          onClick={handleDownloadSVG}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all"
          style={{ background: "var(--line)", color: "var(--text)", fontWeight: 600 }}
        >
          <Download className="h-3.5 w-3.5" />
          SVG
        </button>
      }
    >
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
    </KBCard>
  );
}