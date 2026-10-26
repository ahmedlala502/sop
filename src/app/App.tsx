import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Compass,
  Users,
  Settings2,
  MessageSquare,
  Clock,
  ClipboardCheck,
  UserPlus,
  Send,
  SlidersHorizontal,
  ShieldCheck,
  Database,
  MapPin,
  Zap,
  Gem,
  Workflow,
  GitBranch,
  MessagesSquare,
  RefreshCw,
  Image,
  Handshake,
  Network,
  Table2,
  BarChart3,
  Sparkles,
  Star,
  Search as SearchIcon,
  Menu,
  X,
  PanelLeft,
  Moon,
  Sun,
  Globe,
  ChevronRight,
  ChevronDown,
  ArrowUp,
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
} from "./components/kb-types";

import {
  type NavItem,
  PageHeader,
  ReadingProgress,
  TableOfContents,
  MobileToc,
  CommandPalette,
  usePageToc,
} from "./components/kb-shell";
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

// ─── Navigation groups ───────────────────────────────────────
const NAV_GROUPS: Array<{ id: string; label: Bi }> = [
  { id: "start", label: { en: "Start here", ar: "ابدأ من هنا" } },
  { id: "core", label: { en: "Core functions", ar: "الوظائف الأساسية" } },
  { id: "support", label: { en: "Support functions", ar: "الوظائف المساندة" } },
  { id: "workflows", label: { en: "Workflow maps", ar: "خرائط سير العمل" } },
  { id: "reference", label: { en: "Reference and governance", ar: "المرجع والحوكمة" } },
  { id: "templates", label: { en: "Templates library", ar: "مكتبة القوالب" } },
  { id: "automation", label: { en: "Automation", ar: "الأتمتة" } },
];

const GROUP_LABELS: Record<string, Bi> = Object.fromEntries(
  NAV_GROUPS.map((group) => [group.id, group.label])
);

// ─── Navigation registry ─────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    key: "cover",
    label: { en: "Home", ar: "الرئيسية" },
    group: "start",
    icon: <BookOpen className="h-4 w-4" />,
    description: {
      en: "Purpose, principles, and the fastest paths into the knowledge base.",
      ar: "الهدف والمبادئ وأسرع الطرق للدخول إلى قاعدة المعرفة.",
    },
    keywords: ["overview", "principles", "start", "home"],
  },
  {
    key: "ia",
    label: { en: "How to navigate", ar: "كيفية التنقل" },
    group: "start",
    icon: <Compass className="h-4 w-4" />,
    description: {
      en: "How the knowledge base is organised and how to move through it.",
      ar: "كيف تُنظَّم قاعدة المعرفة وكيف تتنقل بين أقسامها.",
    },
    keywords: ["structure", "sitemap", "navigation", "guide"],
  },

  {
    key: "sop_community",
    label: { en: "Community team", ar: "فريق الكوميونيتي" },
    group: "core",
    icon: <Users className="h-4 w-4" />,
    description: {
      en: "Client relationships, sourcing, bookings, and campaign targets.",
      ar: "علاقات العملاء والاختيار والحجوزات وأهداف الحملات.",
    },
    keywords: ["clients", "sourcing", "bookings", "targets"],
  },
  {
    key: "sop_coordination",
    label: { en: "Coordination hub", ar: "مركز التنسيق" },
    group: "core",
    icon: <Settings2 className="h-4 w-4" />,
    description: {
      en: "Campaign setup, folders, sheets, system entries, and reporting.",
      ar: "إعداد الحملات والفولدرات والشيتات وإدخالات النظام والتقارير.",
    },
    keywords: ["setup", "folders", "system", "reports"],
  },
  {
    key: "sop_chat",
    label: { en: "Chat and WhatsApp", ar: "الشات والواتساب" },
    group: "core",
    icon: <MessageSquare className="h-4 w-4" />,
    description: {
      en: "Invitations, reply logging, reminders, briefs, and live support.",
      ar: "الدعوات وتسجيل الردود والتذكيرات والبرِيفات والدعم المباشر.",
    },
    keywords: ["whatsapp", "messages", "invites", "briefs"],
  },
  {
    key: "sop_followup",
    label: { en: "Follow-up system", ar: "نظام المتابعة" },
    group: "core",
    icon: <Clock className="h-4 w-4" />,
    description: {
      en: "Reminder cadence, confirmations, rescheduling, and end of day updates.",
      ar: "إيقاع التذكيرات والتأكيدات وإعادة الجدولة وتحديثات نهاية اليوم.",
    },
    keywords: ["reminders", "confirmations", "reschedule", "eod"],
  },
  {
    key: "sop_coverage",
    label: { en: "Coverage and QA", ar: "التغطية والجودة" },
    group: "core",
    icon: <ClipboardCheck className="h-4 w-4" />,
    description: {
      en: "Post tracking, proof capture, quality checks, and archiving.",
      ar: "تتبع المنشورات وحفظ الإثباتات وفحوص الجودة والأرشفة.",
    },
    keywords: ["proof", "qa", "archive", "pcloud", "posts"],
  },

  {
    key: "sop_onboarding",
    label: { en: "Onboarding", ar: "التأهيل" },
    group: "support",
    icon: <UserPlus className="h-4 w-4" />,
    description: {
      en: "Creator validation, briefing, and handover into coordination.",
      ar: "التحقق من المؤثرين وتجهيزهم وتسليمهم إلى التنسيق.",
    },
    keywords: ["creators", "briefing", "validation"],
  },
  {
    key: "sop_outreach",
    label: { en: "Outreach", ar: "الوصول" },
    group: "support",
    icon: <Send className="h-4 w-4" />,
    description: {
      en: "First contact, follow-up touches, and a clean handover.",
      ar: "أول تواصل ولمسات المتابعة وتسليم نظيف.",
    },
    keywords: ["first contact", "handover", "queue"],
  },
  {
    key: "sop_operations",
    label: { en: "Operations management", ar: "إدارة العمليات" },
    group: "support",
    icon: <SlidersHorizontal className="h-4 w-4" />,
    description: {
      en: "SLAs, escalation paths, and the operating cadence.",
      ar: "اتفاقيات مستوى الخدمة ومسارات التصعيد والإيقاع التشغيلي.",
    },
    keywords: ["sla", "escalation", "governance", "cadence"],
  },
  {
    key: "sop_quality",
    label: { en: "Quality assurance", ar: "ضمان الجودة" },
    group: "support",
    icon: <ShieldCheck className="h-4 w-4" />,
    description: {
      en: "Audit plan, release authority, and the defect loop.",
      ar: "خطة التدقيق وسلطة الإصدار ودورة معالجة العيوب.",
    },
    keywords: ["audit", "defect", "release"],
  },
  {
    key: "sop_data",
    label: { en: "Data and supply", ar: "البيانات والتوريد" },
    group: "support",
    icon: <Database className="h-4 w-4" />,
    description: {
      en: "Creator scoring, data quality, and the supply pipeline.",
      ar: "تقييم المؤثرين وجودة البيانات وخط الإمداد.",
    },
    keywords: ["scoring", "supply", "data quality"],
  },
  {
    key: "sop_regional",
    label: { en: "Regional operations", ar: "العمليات الإقليمية" },
    group: "support",
    icon: <MapPin className="h-4 w-4" />,
    description: {
      en: "Vendor and venue issues, regional coordination, and failure review.",
      ar: "مشاكل الموردين والمواقع والتنسيق الإقليمي ومراجعة الإخفاقات.",
    },
    keywords: ["vendor", "venue", "regions"],
  },
  {
    key: "sop_flex",
    label: { en: "Flex", ar: "فليكس" },
    group: "support",
    icon: <Zap className="h-4 w-4" />,
    description: {
      en: "Surge capacity, deployment order, and redeployment rules.",
      ar: "السعة الإضافية وترتيب الانتشار وقواعد إعادة التوزيع.",
    },
    keywords: ["surge", "capacity", "deployment"],
  },
  {
    key: "sop_elite",
    label: { en: "Elite", ar: "النخبة" },
    group: "support",
    icon: <Gem className="h-4 w-4" />,
    description: {
      en: "Premium creators, white-glove handling, and campaign controls.",
      ar: "المؤثرون المميزون والتعامل الاستثنائي وضوابط الحملات.",
    },
    keywords: ["premium", "white glove", "vip"],
  },

  {
    key: "wf_e2e",
    label: { en: "End-to-end workflow", ar: "سير العمل الكامل" },
    group: "workflows",
    icon: <Workflow className="h-4 w-4" />,
    description: {
      en: "The full campaign lifecycle from brief to final report.",
      ar: "دورة الحملة الكاملة من البرِيف إلى التقرير النهائي.",
    },
    keywords: ["lifecycle", "process", "campaign"],
  },
  {
    key: "wf_coordination",
    label: { en: "Coordination flow", ar: "تدفق التنسيق" },
    group: "workflows",
    icon: <GitBranch className="h-4 w-4" />,
    description: {
      en: "How coordination moves a campaign from setup to close.",
      ar: "كيف ينقل التنسيق الحملة من الإعداد إلى الإغلاق.",
    },
    keywords: ["flow", "setup", "close"],
  },
  {
    key: "wf_chat",
    label: { en: "Communication flow", ar: "تدفق التواصل" },
    group: "workflows",
    icon: <MessagesSquare className="h-4 w-4" />,
    description: {
      en: "Message flow from invitation to live support.",
      ar: "تدفق الرسائل من الدعوة إلى الدعم المباشر.",
    },
    keywords: ["communication", "messages", "support"],
  },
  {
    key: "wf_followup",
    label: { en: "Follow-up flow", ar: "تدفق المتابعة" },
    group: "workflows",
    icon: <RefreshCw className="h-4 w-4" />,
    description: {
      en: "Reminder and confirmation flow, including exceptions.",
      ar: "تدفق التذكير والتأكيد بما في ذلك الاستثناءات.",
    },
    keywords: ["reminders", "exceptions", "flow"],
  },
  {
    key: "wf_coverage",
    label: { en: "Coverage flow", ar: "تدفق التغطية" },
    group: "workflows",
    icon: <Image className="h-4 w-4" />,
    description: {
      en: "Proof capture and quality flow through to archive.",
      ar: "تدفق حفظ الإثباتات والجودة حتى الأرشفة.",
    },
    keywords: ["proof", "quality", "archive"],
  },
  {
    key: "wf_community",
    label: { en: "Community flow", ar: "تدفق الكوميونيتي" },
    group: "workflows",
    icon: <Handshake className="h-4 w-4" />,
    description: {
      en: "Client request flow from intake to delivery.",
      ar: "تدفق طلبات العملاء من الاستلام إلى التسليم.",
    },
    keywords: ["clients", "requests", "delivery"],
  },

  {
    key: "raci",
    label: { en: "RACI matrix", ar: "مصفوفة RACI" },
    group: "reference",
    icon: <Network className="h-4 w-4" />,
    description: {
      en: "Who is responsible, accountable, consulted, and informed.",
      ar: "من المسؤول ومن المحاسب ومن يُستشار ومن يُبلَّغ.",
    },
    keywords: ["roles", "responsibility", "accountability"],
  },
  {
    key: "gsheets",
    label: { en: "Sheets blueprint", ar: "هيكلة الشيتات" },
    group: "reference",
    icon: <Table2 className="h-4 w-4" />,
    description: {
      en: "Sheet structure, tabs, fields, and ownership.",
      ar: "هيكلة الشيتات والتبويبات والحقول والمالك.",
    },
    keywords: ["sheets", "tracker", "fields", "google"],
  },
  {
    key: "kpis",
    label: { en: "KPIs and analytics", ar: "المؤشرات والتحليلات" },
    group: "reference",
    icon: <BarChart3 className="h-4 w-4" />,
    description: {
      en: "Targets, definitions, and reporting cadence.",
      ar: "الأهداف والتعريفات وإيقاع التقارير.",
    },
    keywords: ["metrics", "targets", "sla", "analytics"],
  },

  {
    key: "templates_influencers",
    label: { en: "Influencer templates", ar: "قوالب المؤثرين" },
    group: "templates",
    icon: <Star className="h-4 w-4" />,
    description: {
      en: "Ready message templates for creator communication.",
      ar: "قوالب رسائل جاهزة للتواصل مع المؤثرين.",
    },
    keywords: ["messages", "copy", "creators", "templates"],
  },
  {
    key: "templates_clients",
    label: { en: "Client templates", ar: "قوالب العملاء" },
    group: "templates",
    icon: <BookOpen className="h-4 w-4" />,
    description: {
      en: "Ready message templates for client communication.",
      ar: "قوالب رسائل جاهزة للتواصل مع العملاء.",
    },
    keywords: ["messages", "copy", "clients", "templates"],
  },

  {
    key: "automation_proposal",
    label: { en: "Automation proposal", ar: "مقترح الأتمتة" },
    group: "automation",
    icon: <Sparkles className="h-4 w-4" />,
    description: {
      en: "Proposed automation and interface improvements.",
      ar: "مقترحات الأتمتة وتحسين الواجهة.",
    },
    keywords: ["automation", "ai", "proposal", "improvements"],
  },
];

const NAV_BY_KEY = new Map<PageKey, NavItem>(NAV_ITEMS.map((item) => [item.key, item]));
const PAGE_KEYS = new Set<PageKey>(NAV_ITEMS.map((item) => item.key));

// ─── Page content router ─────────────────────────────────────
function PageContent({
  page,
  mode,
  onNavigate,
  onSearch,
}: {
  page: PageKey;
  mode: LangMode;
  onNavigate: (p: PageKey) => void;
  onSearch: () => void;
}) {
  switch (page) {
    case "cover":
      return <CoverPage mode={mode} goTo={onNavigate} onSearch={onSearch} />;
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

// ─── Hash routing helpers ────────────────────────────────────
function pageFromHash(): PageKey | null {
  try {
    const raw = decodeURIComponent(window.location.hash.replace(/^#\/?/, "")).trim();
    return PAGE_KEYS.has(raw as PageKey) ? (raw as PageKey) : null;
  } catch {
    return null;
  }
}

function storedPage(): PageKey | null {
  try {
    const raw = localStorage.getItem("trygc_kb_page");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return PAGE_KEYS.has(parsed) ? (parsed as PageKey) : null;
  } catch {
    return null;
  }
}

// ─── Language control ────────────────────────────────────────
function LanguageControl({
  value,
  onChange,
}: {
  value: LangMode;
  onChange: (mode: LangMode) => void;
}) {
  const options: Array<{ value: LangMode; label: string; title: string }> = [
    { value: "BOTH", label: "EN+AR", title: "Show English and Arabic" },
    { value: "EN", label: "EN", title: "Show English only" },
    { value: "AR", label: "AR", title: "Show Arabic only" },
  ];
  return (
    <div className="kb-seg" role="group" aria-label="Language">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          title={option.title}
          className={cx("kb-seg-btn", value === option.value && "is-active")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────
function Sidebar({
  page,
  onNavigate,
  onSearch,
  collapsedGroups,
  onToggleGroup,
  onClose,
  isMac,
  langMode,
}: {
  page: PageKey;
  onNavigate: (page: PageKey) => void;
  onSearch: () => void;
  collapsedGroups: string[];
  onToggleGroup: (groupId: string) => void;
  onClose: () => void;
  isMac: boolean;
  langMode: LangMode;
}) {
  return (
    <aside className="kb-sidebar" aria-label="Knowledge base navigation">
      <div className="kb-sidebar-head">
        <button type="button" onClick={() => onNavigate("cover")} className="kb-brand" aria-label="TryGC Knowledge Base home">
          <img
            src="/trygc-logo.png"
            alt=""
            className="kb-brand-mark"
            width={38}
            height={38}
            decoding="async"
          />
          <span className="min-w-0 text-start">
            <span className="kb-brand-name">TryGC</span>
            <span className="kb-brand-sub">Knowledge Base</span>
          </span>
        </button>
        <button type="button" onClick={onClose} className="kb-icon-btn lg:hidden" aria-label="Close navigation">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="px-3 pb-3">
        <button type="button" onClick={onSearch} className="kb-sidebar-search">
          <SearchIcon className="h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
          <span className="flex-1 text-start">Search</span>
          <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
        </button>
      </div>

      <nav className="kb-sidebar-nav" aria-label="Pages">
        {NAV_GROUPS.map((group) => {
          const groupItems = NAV_ITEMS.filter((item) => item.group === group.id);
          const isOpen = !collapsedGroups.includes(group.id);
          return (
            <div key={group.id} className="kb-nav-group">
              <button
                type="button"
                onClick={() => onToggleGroup(group.id)}
                aria-expanded={isOpen}
                className="kb-nav-group-btn"
              >
                <span className="flex-1 text-start">
                  {langMode === "AR" ? group.label.ar : group.label.en}
                </span>
                <span className="kb-nav-count">{groupItems.length}</span>
                <ChevronDown
                  className={cx("h-3.5 w-3.5 shrink-0 transition-transform duration-200", !isOpen && "-rotate-90 rtl:rotate-90")}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="kb-nav-items">
                  {groupItems.map((item) => {
                    const active = item.key === page;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => onNavigate(item.key)}
                        className={cx("kb-nav-item", active && "is-active")}
                        aria-current={active ? "page" : undefined}
                        title={langModeTitle(item.label)}
                      >
                        <span className="kb-nav-icon" aria-hidden="true">{item.icon}</span>
                        <span className="min-w-0 flex-1">
                          {langMode !== "AR" && <span className="kb-nav-label">{item.label.en}</span>}
                          {langMode !== "EN" && (
                            <span
                              className="kb-nav-label-ar"
                              lang="ar"
                              dir="rtl"
                              style={langMode === "AR" ? { fontSize: 12, opacity: 0.9, fontWeight: 600 } : undefined}
                            >
                              {item.label.ar}
                            </span>
                          )}
                        </span>
                        <ChevronRight
                          className={cx("kb-nav-chevron", active && "opacity-100")}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="kb-sidebar-foot">
        <div className="flex items-center gap-2">
          <Pill text="v3.0" tone="purple" />
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>Updated 15 Sep 2026</span>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
          Maintained by Operations. Every change is documented.
        </p>
      </div>
    </aside>
  );
}

function langModeTitle(label: Bi) {
  return `${label.en} / ${label.ar}`;
}

// ─── Main App ────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("trygc_kb_theme", "dark");
  const [langMode, setLangMode] = useLocalStorage<LangMode>("trygc_kb_lang", "BOTH");
  const [sidebarHidden, setSidebarHidden] = useLocalStorage<boolean>("trygc_kb_sidebar_hidden", false);
  const [collapsedGroups, setCollapsedGroups] = useLocalStorage<string[]>("trygc_kb_closed_groups", []);

  const [page, setPage] = useState<PageKey>(() => pageFromHash() ?? storedPage() ?? "cover");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const isRTL = langMode === "AR";
  const vars = useMemo(() => getThemeVars(theme), [theme]);
  const currentItem = NAV_BY_KEY.get(page) || NAV_ITEMS[0];
  const currentGroup = GROUP_LABELS[currentItem.group] || currentItem.group;
  const tocItems = usePageToc(contentRef, page, langMode);
  const hasToc = tocItems.length > 1;

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  // Theme on the document so native surfaces and overscroll match.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.background = theme === "dark" ? "#0B0713" : "#F5F3F7";
  }, [theme]);

  // URL, persistence, title, and scroll reset.
  useEffect(() => {
    try {
      localStorage.setItem("trygc_kb_page", JSON.stringify(page));
    } catch {}
    document.title = `${currentItem.label.en} · TryGC Knowledge Base`;
    const target = `#/${page}`;
    if (window.location.hash !== target) {
      window.history.replaceState(null, "", target);
    }
    window.scrollTo(0, 0);
  }, [page, currentItem.label.en]);

  // Back and forward support.
  useEffect(() => {
    const onHashChange = () => {
      const next = pageFromHash();
      if (next) setPage(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Keep the active group open.
  useEffect(() => {
    setCollapsedGroups((previous) =>
      previous.includes(currentItem.group)
        ? previous.filter((id) => id !== currentItem.group)
        : previous
    );
  }, [currentItem.group, setCollapsedGroups]);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Body scroll lock for the mobile drawer.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const navigate = useCallback(
    (next: PageKey) => {
      setMobileOpen(false);
      setSearchOpen(false);
      if (next === page) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (pageFromHash() === next) {
        setPage(next);
        return;
      }
      window.location.hash = `#/${next}`;
    },
    [page]
  );

  const toggleGroup = useCallback(
    (groupId: string) => {
      setCollapsedGroups((previous) =>
        previous.includes(groupId)
          ? previous.filter((id) => id !== groupId)
          : [...previous, groupId]
      );
    },
    [setCollapsedGroups]
  );

  return (
    <div
      style={vars}
      dir={isRTL ? "rtl" : "ltr"}
      lang={isRTL ? "ar" : "en"}
      className={cx("kb-app min-h-[100dvh]", isRTL ? "font-ar" : "font-en")}
    >
      <a href="#kb-main" className="kb-skip-link">Skip to content</a>

      <div className="flex min-h-[100dvh]">
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          className={cx(
            "kb-sidebar-shell",
            mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
            "lg:translate-x-0 rtl:lg:translate-x-0",
            sidebarHidden && "lg:hidden"
          )}
        >
          <Sidebar
            page={page}
            onNavigate={navigate}
            onSearch={() => setSearchOpen(true)}
            collapsedGroups={collapsedGroups}
            onToggleGroup={toggleGroup}
            onClose={() => setMobileOpen(false)}
            isMac={isMac}
            langMode={langMode}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="kb-topbar">
            <ReadingProgress />
            <div className="kb-topbar-inner">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="kb-icon-btn lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setSidebarHidden((hidden) => !hidden)}
                className="kb-icon-btn hidden lg:inline-flex"
                aria-label={sidebarHidden ? "Show navigation" : "Hide navigation"}
                title={sidebarHidden ? "Show navigation" : "Hide navigation"}
              >
                <PanelLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="kb-crumbs">
                <span className="kb-crumb-group hidden sm:inline">
                  {langMode === "AR" ? currentGroup.ar : currentGroup.en}
                </span>
                <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 opacity-50 sm:block rtl:rotate-180" aria-hidden="true" />
                <span className="kb-crumb-current">
                  {langMode === "AR" ? currentItem.label.ar : currentItem.label.en}
                </span>
              </div>

              <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="kb-search-trigger"
                  aria-label="Search the knowledge base"
                >
                  <SearchIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="hidden md:inline">Search</span>
                  <kbd className="hidden md:inline-flex">{isMac ? "⌘K" : "Ctrl K"}</kbd>
                </button>

                <LanguageControl value={langMode} onChange={setLangMode} />

                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="kb-icon-btn"
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                  title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </header>

          <main id="kb-main" tabIndex={-1} className="flex-1">
            <div className="kb-main-wrap">
              <div className={cx("kb-layout", hasToc && "has-toc")}>
                <div ref={contentRef} className="min-w-0">
                  {page !== "cover" && (
                    <PageHeader item={currentItem} groupLabel={currentGroup} mode={langMode} />
                  )}

                  <MobileToc items={tocItems} langMode={langMode} />

                  <div key={page} className="kb-page-enter">
                    <PageContent
                      page={page}
                      mode={langMode}
                      onNavigate={navigate}
                      onSearch={() => setSearchOpen(true)}
                    />
                  </div>

                  <footer className="kb-footer">
                    <div className="min-w-0">
                      <p style={{ fontWeight: 700, color: "var(--text)" }}>TryGC Knowledge Base</p>
                      <p>Community and operations. Version 3.0. Last reviewed 15 Sep 2026.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden items-center gap-1.5 sm:flex">
                        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                        {langMode === "AR" ? "العربية" : langMode === "EN" ? "English" : "English + العربية"}
                      </span>
                      <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="kb-footer-top"
                      >
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                        {langMode === "AR" ? "إلى الأعلى" : "Back to top"}
                      </button>
                    </div>
                  </footer>

                  <p className="sr-only" aria-live="polite">
                    {currentItem.label.en}
                  </p>
                </div>

                <TableOfContents items={tocItems} langMode={langMode} />
              </div>
            </div>
          </main>
        </div>
      </div>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={NAV_ITEMS}
        groupLabels={GROUP_LABELS}
        langMode={langMode}
        onNavigate={navigate}
        currentPage={page}
      />

      <style>{`
        .kb-brand-mark {
          background: linear-gradient(140deg, ${TRYGC.purple} 0%, ${TRYGC.purpleDark} 62%, ${TRYGC.orange} 160%);
        }
      `}</style>
    </div>
  );
}

export default App;
