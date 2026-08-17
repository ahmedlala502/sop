import React, { useMemo, useState } from "react";
import {
  ChevronRight,
  Search as SearchIcon,
  BookOpen,
  Users,
  Settings,
  Activity,
  Clock,
  CheckCircle2,
  Workflow,
  FileText,
  Star,
  TrendingUp,
  Zap,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
} from "lucide-react";

import {
  type LangMode,
  type PageKey,
  type Bi,
  BiText,
  cx,
  useLocalStorage,
  getThemeVars,
  Pill,
  TRYGC,
  GROUP_COLORS,
} from "./components/kb-types";

import { CoverPage } from "./components/kb-cover";
import { IAPage } from "./components/kb-ia";
import { SOPPage } from "./components/kb-sop";
import {
  WorkflowE2E,
  WorkflowCoordination,
  WorkflowChat,
  WorkflowFollowUp,
  WorkflowCoverage,
  WorkflowCommunity,
} from "./components/kb-workflows";
import { RACIPage } from "./components/kb-raci";
import { GSheetsPage } from "./components/kb-sheets";
import { InfluencerTemplatesPage, ClientTemplatesPage } from "./components/kb-templates";
import { KPIsPage } from "./components/kb-kpis";
import { AutomationProposalPage } from "./components/kb-automation-proposal";

// ─── Sidebar Navigation Items ────────────────────────────────
const SIDEBAR_ITEMS: Array<{
  key: PageKey;
  label: Bi;
  group?: Bi;
  icon: React.ReactNode;
}> = [
  {
    key: "cover",
    label: { en: "Home", ar: "الرئيسية" },
    group: { en: "Getting Started", ar: "البداية" },
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    key: "ia",
    label: { en: "How to Navigate", ar: "كيفية التنقل" },
    icon: <Layers className="h-4 w-4" />,
  },
  {
    key: "sop_community",
    label: { en: "Community Team", ar: "فريق الكوميونيتي" },
    group: { en: "Community Team", ar: "فريق الكوميونيتي" },
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "sop_coordination",
    label: { en: "Coordination Hub", ar: "مركز التنسيق" },
    group: { en: "Operations Functions", ar: "وظائف العمليات" },
    icon: <Settings className="h-4 w-4" />,
  },
  {
    key: "sop_chat",
    label: { en: "Chat & WhatsApp", ar: "الشات والواتساب" },
    icon: <Activity className="h-4 w-4" />,
  },
  {
    key: "sop_followup",
    label: { en: "Follow-Up System", ar: "نظام المتابعة" },
    icon: <Clock className="h-4 w-4" />,
  },
  {
    key: "sop_coverage",
    label: { en: "Coverage & QA", ar: "التغطية والجودة" },
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    key: "sop_onboarding",
    label: { en: "Onboarding", ar: "التأهيل" },
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "sop_outreach",
    label: { en: "Outreach", ar: "الوصول" },
    icon: <Activity className="h-4 w-4" />,
  },
  {
    key: "sop_operations",
    label: { en: "Operations Mgmt", ar: "إدارة العمليات" },
    icon: <Settings className="h-4 w-4" />,
  },
  {
    key: "sop_quality",
    label: { en: "Quality Assurance", ar: "ضمان الجودة" },
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    key: "sop_data",
    label: { en: "Data & Supply", ar: "البيانات والتوريد" },
    icon: <FileText className="h-4 w-4" />,
  },
  {
    key: "sop_regional",
    label: { en: "Regional Ops", ar: "العمليات الإقليمية" },
    icon: <Clock className="h-4 w-4" />,
  },
  {
    key: "sop_flex",
    label: { en: "Flex", ar: "فليكس" },
    icon: <Zap className="h-4 w-4" />,
  },
  {
    key: "sop_elite",
    label: { en: "Elite", ar: "النخبة" },
    icon: <Star className="h-4 w-4" />,
  },
  {
    key: "wf_e2e",
    label: { en: "End-to-End Workflow", ar: "سير العمل الكامل" },
    group: { en: "Workflow Maps", ar: "خرائط سير العمل" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "wf_coordination",
    label: { en: "Coordination Flow", ar: "تدفق التنسيق" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "wf_chat",
    label: { en: "Communication Flow", ar: "تدفق التواصل" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "wf_followup",
    label: { en: "Follow-Up Flow", ar: "تدفق المتابعة" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "wf_coverage",
    label: { en: "Coverage Flow", ar: "تدفق التغطية" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "wf_community",
    label: { en: "Community Flow", ar: "تدفق الكوميونيتي" },
    icon: <Workflow className="h-4 w-4" />,
  },
  {
    key: "raci",
    label: { en: "RACI Matrix", ar: "مصفوفة RACI" },
    group: { en: "Reference & Governance", ar: "المرجع والحوكمة" },
    icon: <FileText className="h-4 w-4" />,
  },
  {
    key: "gsheets",
    label: { en: "Sheets Blueprint", ar: "هيكلة الشيتات" },
    icon: <FileText className="h-4 w-4" />,
  },
  {
    key: "kpis",
    label: { en: "KPIs & Analytics", ar: "المؤشرات والتحليلات" },
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    key: "automation_proposal",
    label: { en: "Automation Proposal", ar: "الاقتراح الآلي" },
    group: { en: "Automation Proposal", ar: "الاقتراح الآلي" },
    icon: <Zap className="h-4 w-4" />,
  },
  {
    key: "templates_influencers",
    label: { en: "Influencer Templates", ar: "قوالب المؤثرين" },
    group: { en: "Templates Library", ar: "مكتبة القوالب" },
    icon: <Star className="h-4 w-4" />,
  },
  {
    key: "templates_clients",
    label: { en: "Client Templates", ar: "قوالب العملاء" },
    icon: <Star className="h-4 w-4" />,
  },
];

// ─── Page title map ──────────────────────────────────────────
const PAGE_TITLES: Record<PageKey, Bi> = {
  cover: { en: "System Overview & Quick Start", ar: "نظرة عامة وبداية سريعة" },
  ia: { en: "How to Navigate This KB", ar: "كيفية التنقل في قاعدة المعرفة" },
  sop_community: { en: "Community Team Procedures", ar: "إجراءات فريق الكوميونيتي" },
  sop_coordination: { en: "Coordination Hub Procedures", ar: "إجراءات مركز التنسيق" },
  sop_chat: { en: "Chat & WhatsApp Procedures", ar: "إجراءات الشات والواتساب" },
  sop_followup: { en: "Follow-Up System Procedures", ar: "إجراءات نظام المتابعة" },
  sop_coverage: { en: "Coverage & Quality Assurance", ar: "التغطية وضمان الجودة" },
  sop_operations: { en: "Operations Management", ar: "إدارة العمليات" },
  sop_onboarding: { en: "Onboarding SOP", ar: "إجراءات التأهيل" },
  sop_outreach: { en: "Outreach SOP", ar: "إجراءات الوصول" },
  sop_quality: { en: "Quality Assurance SOP", ar: "إجراءات ضمان الجودة" },
  sop_data: { en: "Data & Supply SOP", ar: "إجراءات البيانات والتوريد" },
  sop_regional: { en: "Regional Ops Support SOP", ar: "دعم العمليات الإقليمي" },
  sop_flex: { en: "Flex Operations SOP", ar: "عمليات فليكس" },
  sop_elite: { en: "Elite SOP", ar: "إجراءات النخبة" },
  wf_e2e: { en: "End-to-End Campaign Workflow", ar: "سير عمل الحملة الكامل" },
  wf_coordination: { en: "Coordination Workflow Map", ar: "خريطة سير عمل التنسيق" },
  wf_chat: { en: "Communication Workflow Map", ar: "خريطة سير عمل التواصل" },
  wf_followup: { en: "Follow-Up Workflow Map", ar: "خريطة سير عمل المتابعة" },
  wf_coverage: { en: "Coverage Workflow Map", ar: "خريطة سير عمل التغطية" },
  wf_community: { en: "Community Workflow Map", ar: "خريطة سير عمل الكوميونيتي" },
  raci: { en: "RACI Responsibility Matrix", ar: "مصفوفة المسؤوليات RACI" },
  gsheets: { en: "Google Sheets Blueprint", ar: "هيكلة جوجل شيتس" },
  templates_influencers: { en: "Influencer Communication Templates", ar: "قوالب التواصل مع المؤثرين" },
  templates_clients: { en: "Client Communication Templates", ar: "قوالب التواصل مع العملاء" },
  kpis: { en: "Key Performance Indicators & SLAs", ar: "مؤشرات الأداء الرئيسية" },
  automation_proposal: { en: "Automation & UI Improvement Proposal", ar: "مقترح تحسين وأتمتة وواجهة المستخدم" },
};

// ─── Toggle Group ───────────────────────────────────────────
function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
  right,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string; icon?: React.ReactNode }>;
  right?: boolean;
}) {
  return (
    <div
      className={cx("inline-flex rounded-xl p-1", right && "flex-row-reverse")}
      style={{ background: "var(--bg)", border: "1px solid var(--line)" }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cx(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-all duration-200",
            )}
            style={{
              fontWeight: 700,
              background: active ? TRYGC.orange : "transparent",
              color: active ? "#fff" : "var(--muted)",
            }}
          >
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Page Content Router ─────────────────────────────────────
function PageContent({
  page,
  mode,
  onNavigate,
}: {
  page: PageKey;
  mode: LangMode;
  onNavigate: (p: PageKey) => void;
}) {
  switch (page) {
    case "cover":
      return <CoverPage mode={mode} goTo={onNavigate} />;
    case "ia":
      return <IAPage mode={mode} goTo={onNavigate} />;
    case "sop_community":
    case "sop_coordination":
    case "sop_chat":
    case "sop_followup":
    case "sop_coverage":
    case "sop_operations":
    case "sop_onboarding":
    case "sop_outreach":
    case "sop_quality":
    case "sop_data":
    case "sop_regional":
    case "sop_flex":
    case "sop_elite":
      return <SOPPage mode={mode} sopKey={page} />;
    case "wf_e2e":
      return <WorkflowE2E mode={mode} />;
    case "wf_coordination":
      return <WorkflowCoordination mode={mode} />;
    case "wf_chat":
      return <WorkflowChat mode={mode} />;
    case "wf_followup":
      return <WorkflowFollowUp mode={mode} />;
    case "wf_coverage":
      return <WorkflowCoverage mode={mode} />;
    case "wf_community":
      return <WorkflowCommunity mode={mode} />;
    case "raci":
      return <RACIPage mode={mode} />;
    case "gsheets":
      return <GSheetsPage mode={mode} />;
    case "templates_influencers":
      return <InfluencerTemplatesPage mode={mode} />;
    case "templates_clients":
      return <ClientTemplatesPage mode={mode} />;
    case "kpis":
      return <KPIsPage mode={mode} />;
    case "automation_proposal":
      return <AutomationProposalPage mode={mode} />;
    default:
      return null;
  }
}

// ─── Main App ────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("trygc_kb_theme", "dark");
  const [langMode, setLangMode] = useLocalStorage<LangMode>("trygc_kb_lang", "BOTH");
  const [page, setPage] = useLocalStorage<PageKey>("trygc_kb_page", "cover");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");

  const isRTL = langMode === "AR";
  const vars = useMemo(() => getThemeVars(theme), [theme]);

  const topTitle: Bi = {
    en: "TryGC Community & Operations KB",
    ar: "قاعدة معرفة مجتمع وعمليات TryGC",
  };

  // Mock campaigns for dropdown
  const campaigns = [
    { value: "all", label: isRTL ? "كل الحملات" : "All Campaigns" },
    { value: "bnk_saudi_jan26", label: "BNK Saudi - Jan 2026" },
    { value: "luxe_uae_feb26", label: "Luxe UAE - Feb 2026" },
    { value: "tech_kw_mar26", label: "Tech KW - Mar 2026" },
  ];

  // Filter sidebar items by search
  const filteredItems = useMemo(() => {
    if (!search.trim()) return SIDEBAR_ITEMS;
    const q = search.toLowerCase();
    return SIDEBAR_ITEMS.filter(
      (it) =>
        it.label.en.toLowerCase().includes(q) ||
        it.label.ar.includes(q) ||
        it.group?.en.toLowerCase().includes(q) ||
        it.group?.ar.includes(q)
    );
  }, [search]);

  return (
    <div
      style={vars}
      dir={isRTL ? "rtl" : "ltr"}
      lang={isRTL ? "ar" : "en"}
      className="min-h-screen transition-colors duration-300"
    >
      <style>{`
        .font-en { font-family: Inter, system-ui, -apple-system, sans-serif; }
        .font-ar { font-family: "Noto Kufi Arabic", system-ui, sans-serif; line-height: 1.8; }
        * { transition: background-color 0.2s ease, border-color 0.2s ease; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--muted); }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      <div
        className="flex min-h-screen"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {/* ─── Sidebar ──────────────────────────────────── */}
        <aside
          className={cx(
            "sticky top-0 h-screen shrink-0 transition-all duration-300 overflow-hidden",
            isRTL ? "border-l" : "border-r",
            sidebarOpen ? "w-[300px]" : "w-0"
          )}
          style={{ background: "var(--card)", borderColor: "var(--line)" }}
        >
          <div className="flex h-full flex-col p-5 w-[300px]">
            {/* Logo */}
            <div className="flex items-center gap-3 pb-5">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0"
                style={{ background: `linear-gradient(135deg, ${TRYGC.purple}, ${TRYGC.orange})` }}
              >
                <span className="text-xl text-white" style={{ fontWeight: 900 }}>G</span>
              </div>
              <div className={cx("min-w-0 flex-1", isRTL && "text-right")}>
                <div className={cx("text-sm leading-tight", isRTL ? "font-ar" : "font-en")} style={{ fontWeight: 800, color: "var(--text)" }}>
                  <BiText bi={topTitle} mode={langMode} />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs" style={{ color: "var(--muted)", fontWeight: 600 }}>
                  <Zap className="h-3 w-3" />
                  <span>v3.0</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="pb-4">
              <div className="relative">
                <SearchIcon
                  className={cx("absolute top-1/2 -translate-y-1/2 h-4 w-4", isRTL ? "right-3" : "left-3")}
                  style={{ color: "var(--muted)" }}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={isRTL ? "ابحث..." : "Search..."}
                  className={cx(
                    "w-full rounded-xl py-2.5 text-sm outline-none transition-all",
                    isRTL ? "pr-3 pl-9" : "pl-9 pr-3"
                  )}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    color: "var(--text)",
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto pb-4 space-y-0.5">
              {(() => {
                const out: React.ReactNode[] = [];
                let currentGroup: string | null = null;
                filteredItems.forEach((it, idx) => {
                  if (it.group?.en && it.group.en !== currentGroup) {
                    currentGroup = it.group.en;
                    out.push(
                      <div
                        key={`grp_${idx}`}
                        className={cx(
                          "px-3 pb-1.5 pt-5 text-[10px] uppercase tracking-widest",
                          isRTL && "text-right"
                        )}
                        style={{ color: "var(--muted)", fontWeight: 800 }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: GROUP_COLORS[it.group.en] || TRYGC.purple }} />
                          <BiText bi={it.group} mode={langMode} />
                        </span>
                      </div>
                    );
                  }
                  const active = it.key === page;
                  out.push(
                    <button
                      key={it.key}
                      onClick={() => setPage(it.key)}
                      className={cx(
                        "group w-full rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200",
                        isRTL && "text-right"
                      )}
                      style={{
                        fontWeight: active ? 700 : 500,
                        background: active ? TRYGC.orange : "transparent",
                        color: active ? "#fff" : "var(--muted)",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        {it.icon}
                        <span className="flex-1 truncate">
                          <BiText bi={it.label} mode={langMode} />
                        </span>
                        {!active && (
                          <ChevronRight
                            className={cx(
                              "h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100",
                              isRTL && "rotate-180"
                            )}
                          />
                        )}
                      </div>
                    </button>
                  );
                });
                return out;
              })()}
            </nav>

            {/* Controls */}
            <div className="space-y-2.5 border-t pt-4" style={{ borderColor: "var(--line)" }}>
              <ToggleGroup<LangMode>
                value={langMode}
                onChange={setLangMode}
                right={isRTL}
                options={[
                  { value: "BOTH", label: "BOTH", icon: <Globe className="h-3.5 w-3.5" /> },
                  { value: "EN", label: "EN" },
                  { value: "AR", label: "AR" },
                ]}
              />
              <ToggleGroup<"dark" | "light">
                value={theme}
                onChange={setTheme}
                right={isRTL}
                options={[
                  { value: "dark", label: "Dark", icon: <Moon className="h-3.5 w-3.5" /> },
                  { value: "light", label: "Light", icon: <Sun className="h-3.5 w-3.5" /> },
                ]}
              />
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─────────────────────────────── */}
        <main className="min-w-0 flex-1">
          {/* Top Bar */}
          <div
            className="sticky top-0 z-10"
            style={{
              background: "var(--card)",
              borderBottom: "1px solid var(--line)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg p-2 transition-all duration-200 hover:scale-105"
                  style={{ border: "1px solid var(--line)", color: "var(--text)" }}
                >
                  {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
                <div className={cx("text-sm", isRTL ? "font-ar" : "font-en")} style={{ fontWeight: 700, color: "var(--text)" }}>
                  <BiText bi={PAGE_TITLES[page] || topTitle} mode={langMode} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Campaign Selector */}
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    color: "var(--text)",
                    fontWeight: 600,
                  }}
                >
                  {campaigns.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Pill text="v3.0" tone="purple" />
                <Pill text="Ops Lead" tone="info" />
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className={cx("px-6 py-6 max-w-6xl mx-auto", isRTL ? "font-ar" : "font-en")}>
            <PageContent page={page} mode={langMode} onNavigate={setPage} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;