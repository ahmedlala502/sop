import React from "react";
import {
  BookOpen, Users, Settings2, MessageSquare, Clock, ClipboardCheck,
  UserPlus, Send, SlidersHorizontal, ShieldCheck, Database, MapPin,
  Zap, Gem, Workflow, Network, Table2, BarChart3, Star, Sparkles,
  Search, ArrowRight, CheckCircle2, Shield, FileText, AlertTriangle,
  Target, Compass, GitBranch, MessagesSquare, RefreshCw, Image, Handshake,
} from "lucide-react";
import {
  type LangMode, type Bi, type PageKey, BiText, H, KBCard, PageMeta,
  Pill, SimpleTable, TRYGC, cx,
} from "./kb-types";

type Team = {
  key: PageKey;
  icon: React.ReactNode;
  name: Bi;
  desc: Bi;
};

const CORE_TEAMS: Team[] = [
  {
    key: "sop_community",
    icon: <Users className="h-4 w-4" />,
    name: { en: "Community", ar: "الكوميونيتي" },
    desc: {
      en: "Client relationships, sourcing, bookings, campaign targets, and meeting notes.",
      ar: "علاقات العملاء والاختيار والحجوزات وأهداف الحملات ومحاضر الاجتماعات.",
    },
  },
  {
    key: "sop_coordination",
    icon: <Settings2 className="h-4 w-4" />,
    name: { en: "Coordination", ar: "التنسيق" },
    desc: {
      en: "Campaign setup, folders, sheets, system entries, daily governance, and final reports.",
      ar: "إعداد الحملات والفولدرات والشيتات وإدخالات النظام والحوكمة اليومية والتقارير النهائية.",
    },
  },
  {
    key: "sop_chat",
    icon: <MessageSquare className="h-4 w-4" />,
    name: { en: "Chat and WhatsApp", ar: "الشات والواتساب" },
    desc: {
      en: "Contextual invitations, reply logging, reminders, briefs, live support, and data audits.",
      ar: "الدعوات بسياق وتسجيل الردود والتذكيرات والبرِيفات والدعم المباشر وتدقيق البيانات.",
    },
  },
  {
    key: "sop_followup",
    icon: <Clock className="h-4 w-4" />,
    name: { en: "Follow-up", ar: "المتابعة" },
    desc: {
      en: "Reminder cadence, missing and pending tracking, verification, rescheduling, and EOD updates.",
      ar: "إيقاع التذكيرات وتتبع الناقص والمعلق والتحقق وإعادة الجدولة وتحديثات نهاية اليوم.",
    },
  },
  {
    key: "sop_coverage",
    icon: <ClipboardCheck className="h-4 w-4" />,
    name: { en: "Coverage and QA", ar: "التغطية والجودة" },
    desc: {
      en: "Post tracking, proof downloads, quality checks against the brief, archive, and Done reconciliation.",
      ar: "تتبع المنشورات وتحميل الإثباتات وفحص الجودة مقابل البرِيف والأرشفة ومطابقة الحالات.",
    },
  },
];

const SUPPORT_TEAMS: Team[] = [
  {
    key: "sop_onboarding",
    icon: <UserPlus className="h-4 w-4" />,
    name: { en: "Onboarding", ar: "التأهيل" },
    desc: { en: "Creator validation, briefing, and handover.", ar: "التحقق من المؤثرين وتجهيزهم وتسليمهم." },
  },
  {
    key: "sop_outreach",
    icon: <Send className="h-4 w-4" />,
    name: { en: "Outreach", ar: "الوصول" },
    desc: { en: "First contact, two touches, and a clean handover.", ar: "أول تواصل ولمستان وتسليم نظيف." },
  },
  {
    key: "sop_operations",
    icon: <SlidersHorizontal className="h-4 w-4" />,
    name: { en: "Operations management", ar: "إدارة العمليات" },
    desc: { en: "SLAs, escalation, and the governance cadence.", ar: "اتفاقيات الخدمة والتصعيد وإيقاع الحوكمة." },
  },
  {
    key: "sop_quality",
    icon: <ShieldCheck className="h-4 w-4" />,
    name: { en: "Quality assurance", ar: "ضمان الجودة" },
    desc: { en: "Audit plan, release authority, and the defect loop.", ar: "خطة التدقيق وسلطة الإصدار ودورة العيوب." },
  },
  {
    key: "sop_data",
    icon: <Database className="h-4 w-4" />,
    name: { en: "Data and supply", ar: "البيانات والتوريد" },
    desc: { en: "Creator scoring, data quality, and supply pipeline.", ar: "تقييم المؤثرين وجودة البيانات وخط الإمداد." },
  },
  {
    key: "sop_regional",
    icon: <MapPin className="h-4 w-4" />,
    name: { en: "Regional operations", ar: "العمليات الإقليمية" },
    desc: { en: "Vendor and venue issues, regional coordination, and failure review.", ar: "مشاكل الموردين والمواقع والتنسيق الإقليمي ومراجعة الإخفاقات." },
  },
  {
    key: "sop_flex",
    icon: <Zap className="h-4 w-4" />,
    name: { en: "Flex", ar: "فليكس" },
    desc: { en: "Surge capacity, coverage first, then fluid redeployment.", ar: "سعة مرنة تبدأ بالتغطية ثم إعادة انتشار سريعة." },
  },
  {
    key: "sop_elite",
    icon: <Gem className="h-4 w-4" />,
    name: { en: "Elite", ar: "النخبة" },
    desc: { en: "Premium creators and campaigns with white-glove handling.", ar: "مؤثرون وحملات مميزة بتعامل استثنائي." },
  },
];

const QUICK_LINKS: Array<{ key: PageKey; label: Bi; icon: React.ReactNode }> = [
  { key: "sop_coordination", label: { en: "Coordination hub", ar: "مركز التنسيق" }, icon: <Settings2 className="h-3.5 w-3.5" /> },
  { key: "sop_coverage", label: { en: "Coverage and QA", ar: "التغطية والجودة" }, icon: <ClipboardCheck className="h-3.5 w-3.5" /> },
  { key: "raci", label: { en: "RACI matrix", ar: "مصفوفة RACI" }, icon: <Network className="h-3.5 w-3.5" /> },
  { key: "kpis", label: { en: "KPIs and SLAs", ar: "المؤشرات والـ SLA" }, icon: <BarChart3 className="h-3.5 w-3.5" /> },
  { key: "templates_influencers", label: { en: "Message templates", ar: "قوالب الرسائل" }, icon: <Star className="h-3.5 w-3.5" /> },
];

const PRINCIPLES: Array<{ icon: React.ReactNode; title: Bi; body: Bi }> = [
  {
    icon: <Shield className="h-4 w-4" />,
    title: { en: "One source of truth", ar: "مصدر حقيقة واحد" },
    body: {
      en: "The system or task manager is the record. A client sheet is used only when the client requires their own tracker.",
      ar: "النظام أو مدير المهام هو السجل. شيت العميل يُستخدم فقط عندما يطلب العميل متتبعه الخاص.",
    },
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: { en: "No verbal exceptions", ar: "لا استثناءات شفهية" },
    body: {
      en: "Any change to a process, brief, or deadline must be written down and reflected in the tracker.",
      ar: "أي تغيير في إجراء أو برِيف أو موعد يجب أن يُكتب ويظهر في المتتبع.",
    },
  },
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: { en: "Done means compliant", ar: "تم تعني مطابق" },
    body: {
      en: "A task is complete only when it meets the brief, the evidence bar, and the definition of done.",
      ar: "المهمة تكتمل فقط عندما تطابق البرِيف ومستوى الإثبات وتعريف الإنجاز.",
    },
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    title: { en: "Escalate early", ar: "صعّد مبكراً" },
    body: {
      en: "Raise risks before they breach an SLA. Silent delays are treated as process failures.",
      ar: "ارفع المخاطر قبل اختراق أي SLA. التأخير الصامت يُعامل كإخفاق في الإجراء.",
    },
  },
];

const REFERENCE_MODULES: Array<{ key: PageKey; icon: React.ReactNode; title: Bi; desc: Bi }> = [
  {
    key: "raci",
    icon: <Network className="h-4 w-4" />,
    title: { en: "RACI matrix", ar: "مصفوفة RACI" },
    desc: { en: "Responsibility and accountability by function and activity.", ar: "المسؤولية والمحاسبة حسب الوظيفة والنشاط." },
  },
  {
    key: "gsheets",
    icon: <Table2 className="h-4 w-4" />,
    title: { en: "Sheets blueprint", ar: "هيكلة الشيتات" },
    desc: { en: "Tabs, fields, owners, and the rules for working trackers.", ar: "التبويبات والحقول والمالكون وقواعد متتبعات العمل." },
  },
  {
    key: "kpis",
    icon: <BarChart3 className="h-4 w-4" />,
    title: { en: "KPIs and SLAs", ar: "المؤشرات والـ SLA" },
    desc: { en: "Targets, definitions, reporting cadence, and thresholds.", ar: "الأهداف والتعريفات وإيقاع التقارير والحدود." },
  },
  {
    key: "templates_influencers",
    icon: <Star className="h-4 w-4" />,
    title: { en: "Influencer templates", ar: "قوالب المؤثرين" },
    desc: { en: "Invitations, reminders, briefs, and confirmation messages.", ar: "الدعوات والتذكيرات والبرِيفات ورسائل التأكيد." },
  },
  {
    key: "templates_clients",
    icon: <BookOpen className="h-4 w-4" />,
    title: { en: "Client templates", ar: "قوالب العملاء" },
    desc: { en: "Updates, escalations, reports, and closure messages.", ar: "التحديثات والتصعيد والتقارير ورسائل الإغلاق." },
  },
  {
    key: "automation_proposal",
    icon: <Sparkles className="h-4 w-4" />,
    title: { en: "Automation proposal", ar: "مقترح الأتمتة" },
    desc: { en: "Proposed interface and workflow improvements for the team.", ar: "تحسينات مقترحة للواجهة وسير العمل للفريق." },
  },
];

const GOVERNANCE: Array<{ label: Bi; tone: "success" | "warning" | "purple"; accent: string; items: Bi[] }> = [
  {
    label: { en: "Daily", ar: "يومي" },
    tone: "success",
    accent: "var(--success)",
    items: [
      { en: "Morning standup on today's visits, owners, and risks.", ar: "اجتماع صباحي حول زيارات اليوم والمالكين والمخاطر." },
      { en: "Tomorrow review to confirm the schedule and close gaps.", ar: "مراجعة الغد لتأكيد الجدول وسد الفجوات." },
      { en: "Risk log for SLA breaches, pending decisions, and blockers.", ar: "سجل مخاطر لاختراقات SLA والقرارات المعلقة والعوائق." },
      { en: "End of day tracker update and carry-over list.", ar: "تحديث المتتبعات نهاية اليوم وقائمة المؤجل." },
    ],
  },
  {
    label: { en: "Weekly", ar: "أسبوعي" },
    tone: "warning",
    accent: "var(--accent)",
    items: [
      { en: "KPI review covering conversion, coverage, and SLA compliance.", ar: "مراجعة المؤشرات للتحويل والتغطية والامتثال للـ SLA." },
      { en: "Top offender review for repeat issues and weak campaigns.", ar: "مراجعة أكثر الحملات مشاكل والمشاكل المتكررة." },
      { en: "Process fixes, with SOP updates where the fix is permanent.", ar: "إصلاحات الإجراءات مع تحديث الـ SOP عند الحاجة." },
    ],
  },
  {
    label: { en: "Monthly", ar: "شهري" },
    tone: "purple",
    accent: "var(--accent2)",
    items: [
      { en: "Full audit across system, sheets, and folders for active campaigns.", ar: "تدقيق شامل على النظام والشيتات والفولدرات للحملات النشطة." },
      { en: "Playbook update with lessons, templates, and process changes.", ar: "تحديث الدليل بالدروس والقوالب وتغييرات العمليات." },
      { en: "RACI refresh and onboarding check for new team members.", ar: "تحديث RACI والتحقق من تأهيل الأعضاء الجدد." },
    ],
  },
];

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function CoverPage({
  mode,
  goTo,
  onSearch,
}: {
  mode: LangMode;
  goTo: (p: PageKey) => void;
  onSearch?: () => void;
}) {
  const primary = mode === "AR" ? "ar" : "en";

  return (
    <div className="kb-home">
      <PageMeta
        mode={mode}
        owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }}
        approver={{ en: "CEO", ar: "الرئيس التنفيذي" }}
        version="3.0"
        lastUpdated="2026-09-15"
        nextReview="2027-03-15"
      />

      {/* Hero */}
      <section className="kb-home-hero" aria-labelledby="kb-home-title">
        <div className="kb-home-hero-copy">
          <p className="kb-home-kicker">
            {mode === "AR" ? "الكوميونيتي والعمليات" : "Community and operations"}
          </p>
          <h1 id="kb-home-title" className="kb-home-title">
            {mode !== "AR" && <span lang="en">Run every campaign from one source of truth.</span>}
            {mode === "BOTH" && (
              <span className="kb-home-title-ar" lang="ar" dir="rtl">
                أدر كل حملة من مصدر حقيقة واحد.
              </span>
            )}
            {mode === "AR" && <span lang="ar" dir="rtl">أدر كل حملة من مصدر حقيقة واحد.</span>}
          </h1>
          <p className="kb-home-lead">
            {mode !== "AR" && (
              <span lang="en">
                The procedures, workflows, and templates behind every TryGC campaign.
              </span>
            )}
            {mode === "BOTH" && (
              <span className="kb-home-lead-ar" lang="ar" dir="rtl">
                الإجراءات وخرائط سير العمل والقوالب التي تقف خلف كل حملة في TryGC.
              </span>
            )}
            {mode === "AR" && (
              <span lang="ar" dir="rtl">
                الإجراءات وخرائط سير العمل والقوالب التي تقف خلف كل حملة في TryGC.
              </span>
            )}
          </p>
          <div className="kb-home-actions">
            <button type="button" onClick={() => jumpTo("functions")} className="kb-btn-primary">
              {mode === "AR" ? "استعرض الإجراءات" : "Browse procedures"}
              <ArrowRight className="kb-arrow h-4 w-4" aria-hidden="true" />
            </button>
            {onSearch && (
              <button type="button" onClick={onSearch} className="kb-btn-secondary">
                <Search className="h-4 w-4" aria-hidden="true" />
                {mode === "AR" ? "ابحث في قاعدة المعرفة" : "Search the knowledge base"}
              </button>
            )}
          </div>
        </div>

        <div className="kb-home-panel">
          <div className="kb-home-panel-head">
            <img
              src="/trygc-logo.png"
              alt=""
              className="kb-home-panel-mark"
              width={32}
              height={32}
              decoding="async"
            />
            <span className="min-w-0">
              <span className="kb-home-panel-name">TryGC Knowledge Base</span>
              <span className="kb-home-panel-sub">Community and operations</span>
            </span>
          </div>
          <dl className="kb-home-stats">
            {[
              { value: "27", en: "Pages", ar: "صفحة" },
              { value: "13", en: "Functions", ar: "وظيفة" },
              { value: "6", en: "Workflows", ar: "خريطة" },
              { value: "3", en: "Cadences", ar: "إيقاع" },
            ].map((stat) => (
              <div key={stat.en}>
                <dd className="kb-home-stat-value">{stat.value}</dd>
                <dt className="kb-home-stat-label">
                  {mode === "AR" ? stat.ar : `${stat.en} / ${stat.ar}`}
                </dt>
              </div>
            ))}
          </dl>
          <div className="kb-home-panel-foot">
            <span>Version 3.0</span>
            <span>{mode === "AR" ? "مراجعة 15 سبتمبر 2026" : "Reviewed 15 Sep 2026"}</span>
          </div>
        </div>
      </section>

      {/* Start here */}
      <section aria-labelledby="start-here">
        <H
          title={{ en: "Start here", ar: "ابدأ من هنا" }}
          subtitle={{
            en: "Three pages that make the rest of the base easier to use.",
            ar: "ثلاث صفحات تجعل بقية قاعدة المعرفة أسهل في الاستخدام.",
          }}
          mode={mode}
        />
        <div className="kb-home-start">
          <div className="kb-home-start-main">
            <p className="kb-home-start-label">
              {mode === "AR" ? "إذا كنت جديداً" : "If you are new"}
            </p>
            {[
              {
                page: "ia" as PageKey,
                icon: <Compass className="h-4 w-4" />,
                title: { en: "Read the navigation guide", ar: "اقرأ دليل التنقل" },
                desc: {
                  en: "Understand how the base is organised and where each function sits.",
                  ar: "افهم كيف تُنظَّم قاعدة المعرفة وأين تقع كل وظيفة.",
                },
              },
              {
                page: "sop_onboarding" as PageKey,
                icon: <UserPlus className="h-4 w-4" />,
                title: { en: "Work through onboarding", ar: "أكمل إجراءات التأهيل" },
                desc: {
                  en: "Creator validation, briefing, and the handover into coordination.",
                  ar: "التحقق من المؤثرين والتجهيز والتسليم إلى التنسيق.",
                },
              },
              {
                page: "wf_e2e" as PageKey,
                icon: <Workflow className="h-4 w-4" />,
                title: { en: "Follow the end-to-end workflow", ar: "اتبع سير العمل الكامل" },
                desc: {
                  en: "See how a campaign moves from brief to final report.",
                  ar: "شاهد كيف تنتقل الحملة من البرِيف إلى التقرير النهائي.",
                },
              },
            ].map((step, index) => (
              <button key={step.page} type="button" onClick={() => goTo(step.page)} className="kb-step">
                <span className="kb-step-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="kb-step-title"><BiText bi={step.title} mode={mode} /></span>
                  <span className="kb-step-desc"><BiText bi={step.desc} mode={mode} /></span>
                </span>
                <span className="kb-step-icon" aria-hidden="true">{step.icon}</span>
                <ArrowRight className="kb-arrow h-4 w-4 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="kb-home-side">
            <p className="kb-home-start-label">
              {mode === "AR" ? "الأكثر استخداماً" : "Most used"}
            </p>
            {QUICK_LINKS.map((link) => (
              <button key={link.key} type="button" onClick={() => goTo(link.key)} className="kb-quick-link">
                <span className="inline-flex items-center gap-2 min-w-0">
                  <span style={{ color: "var(--accent)" }} aria-hidden="true">{link.icon}</span>
                  <span className="truncate"><BiText bi={link.label} mode={mode} /></span>
                </span>
                <ArrowRight className="kb-arrow h-3.5 w-3.5 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles">
        <H
          title={{ en: "Operating principles", ar: "مبادئ التشغيل" }}
          subtitle={{
            en: "Four rules that apply to every team and every campaign.",
            ar: "أربع قواعد تنطبق على كل فريق وكل حملة.",
          }}
          mode={mode}
        />
        <div className="kb-principles">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title.en} className="kb-principle">
              <span className="kb-principle-icon" aria-hidden="true">{principle.icon}</span>
              <div className="min-w-0">
                <p className="kb-principle-title"><BiText bi={principle.title} mode={mode} /></p>
                <p className="kb-principle-text"><BiText bi={principle.body} mode={mode} /></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Functions */}
      <section aria-labelledby="functions">
        <H
          title={{ en: "Operations functions", ar: "وظائف العمليات" }}
          subtitle={{
            en: "Thirteen documented functions, grouped by core delivery and support.",
            ar: "ثلاث عشرة وظيفة موثقة، مقسمة بين التسليم الأساسي والدعم.",
          }}
          id="functions"
          mode={mode}
        />

        <div className="kb-team-block">
          <p className="kb-home-start-label">
            {mode === "AR" ? "التسليم الأساسي" : "Core delivery"}
          </p>
          <div className="kb-core-grid">
            {CORE_TEAMS.map((team) => (
              <button key={team.key} type="button" onClick={() => goTo(team.key)} className="kb-team-card">
                <span className="kb-team-icon" aria-hidden="true">{team.icon}</span>
                <span className="min-w-0">
                  <span className="kb-team-name">{mode === "AR" ? team.name.ar : team.name.en}</span>
                  {mode === "BOTH" && (
                    <span className="kb-team-name-ar" lang="ar" dir="rtl">{team.name.ar}</span>
                  )}
                  <span className="kb-team-desc">
                    <BiText bi={team.desc} mode={mode} />
                  </span>
                </span>
                <span className="kb-team-arrow" aria-hidden="true">
                  <ArrowRight className="kb-arrow h-4 w-4" />
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => goTo("wf_e2e")}
              className="kb-team-card kb-team-cta"
            >
              <span className="kb-team-cta-icon" aria-hidden="true">
                <Workflow className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="kb-team-cta-title">
                  {mode === "AR" ? "شاهد سير العمل الكامل" : "See the end-to-end workflow"}
                </span>
                <span className="kb-team-cta-desc">
                  {mode === "AR"
                    ? "من البرِيف إلى التقرير النهائي في خريطة واحدة."
                    : "From brief to final report in one map."}
                </span>
              </span>
              <span className="kb-team-arrow" aria-hidden="true">
                <ArrowRight className="kb-arrow h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="kb-team-block">
          <p className="kb-home-start-label">
            {mode === "AR" ? "الدعم والتوسع" : "Support and scale"}
          </p>
          <div className="kb-support-grid">
            {SUPPORT_TEAMS.map((team) => (
              <button key={team.key} type="button" onClick={() => goTo(team.key)} className="kb-support-item">
                <span className="kb-support-icon" aria-hidden="true">{team.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="kb-support-name">
                    {mode === "AR" ? team.name.ar : team.name.en}
                    {mode === "BOTH" && <span className="kb-support-name-ar" lang="ar" dir="rtl"> / {team.name.ar}</span>}
                  </span>
                  <span className="kb-support-desc"><BiText bi={team.desc} mode={mode} /></span>
                </span>
                <ArrowRight className="kb-arrow h-3.5 w-3.5 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reference */}
      <section aria-labelledby="reference">
        <H
          title={{ en: "Reference and governance", ar: "المرجع والحوكمة" }}
          subtitle={{
            en: "The shared references that keep ownership, reporting, and messaging consistent.",
            ar: "المراجع المشتركة التي تحافظ على اتساق الملكية والتقارير والرسائل.",
          }}
          mode={mode}
        />
        <div className="kb-ref-grid">
          {REFERENCE_MODULES.map((module) => (
            <button key={module.key} type="button" onClick={() => goTo(module.key)} className="kb-ref-item">
              <span className="kb-ref-icon" aria-hidden="true">{module.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="kb-ref-title"><BiText bi={module.title} mode={mode} /></span>
                <span className="kb-ref-desc"><BiText bi={module.desc} mode={mode} /></span>
              </span>
              <ArrowRight className="kb-arrow h-3.5 w-3.5 shrink-0" style={{ color: "var(--muted)" }} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools">
        <H
          title={{ en: "Tools and source of truth", ar: "الأدوات ومصدر الحقيقة" }}
          subtitle={{
            en: "Each tool has one owner and one rule that keeps it reliable.",
            ar: "لكل أداة مالك واحد وقاعدة واحدة تحافظ على موثوقيتها.",
          }}
          mode={mode}
        />
        <SimpleTable
          headers={
            mode === "AR"
              ? ["القاعدة الذهبية", "المالك", "الاستخدام", "الأداة"]
              : mode === "BOTH"
                ? [
                    <BiText bi={{ en: "Tool", ar: "الأداة" }} mode={mode} />,
                    <BiText bi={{ en: "Used for", ar: "الاستخدام" }} mode={mode} />,
                    <BiText bi={{ en: "Owner", ar: "المالك" }} mode={mode} />,
                    <BiText bi={{ en: "Golden rule", ar: "القاعدة الذهبية" }} mode={mode} />,
                  ]
                : ["Tool", "Used for", "Owner", "Golden rule"]
          }
          rows={[
            [
              <BiText bi={{ en: "System or task manager", ar: "النظام أو مدير المهام" }} mode={mode} />,
              <BiText bi={{ en: "Campaign creation, status tracking, creator assignments", ar: "إنشاء الحملات وتتبع الحالة وتعيين المؤثرين" }} mode={mode} />,
              <BiText bi={{ en: "Coordination", ar: "التنسيق" }} mode={mode} />,
              <BiText bi={{ en: "The single source of truth. Other trackers align to it.", ar: "مصدر الحقيقة الوحيد. المتتبعات الأخرى تتماشى معه." }} mode={mode} />,
            ],
            [
              <BiText bi={{ en: "WhatsApp", ar: "واتساب" }} mode={mode} />,
              <BiText bi={{ en: "Invitations, reminders, briefs, live support", ar: "الدعوات والتذكيرات والبرِيفات والدعم المباشر" }} mode={mode} />,
              <BiText bi={{ en: "Chat team", ar: "فريق الشات" }} mode={mode} />,
              <BiText bi={{ en: "Every message is logged with a timestamp.", ar: "كل رسالة تُسجَّل بالتاريخ والوقت." }} mode={mode} />,
            ],
            [
              <BiText bi={{ en: "Dropbox", ar: "دروب بوكس" }} mode={mode} />,
              <BiText bi={{ en: "Campaign folders, briefs, client documents", ar: "فولدرات الحملات والبرِيفات ومستندات العملاء" }} mode={mode} />,
              <BiText bi={{ en: "Coordination", ar: "التنسيق" }} mode={mode} />,
              <BiText bi={{ en: "Standard naming: company, brand and country, year, month and type.", ar: "تسمية موحدة: الشركة، البراند والدولة، السنة، الشهر والنوع." }} mode={mode} />,
            ],
            [
              <BiText bi={{ en: "pCloud", ar: "بي كلاود" }} mode={mode} />,
              <BiText bi={{ en: "Coverage proofs, screenshots, archiving", ar: "إثباتات التغطية ولقطات الشاشة والأرشفة" }} mode={mode} />,
              <BiText bi={{ en: "Coverage", ar: "التغطية" }} mode={mode} />,
              <BiText bi={{ en: "One folder per creator username. Never mix creators.", ar: "فولدر واحد لكل يوزرنيم مؤثر. ممنوع خلط المؤثرين." }} mode={mode} />,
            ],
            [
              <BiText bi={{ en: "Google Sheets (client sheet)", ar: "جوجل شيتس (شيت العميل)" }} mode={mode} />,
              <BiText bi={{ en: "Master tracker, confirmations, daily plans, KPI logs", ar: "المتتبع الرئيسي والتأكيدات والخطط اليومية وسجلات المؤشرات" }} mode={mode} />,
              <BiText bi={{ en: "All teams", ar: "جميع الفرق" }} mode={mode} />,
              <BiText bi={{ en: "Use only when the client requires their own sheet.", ar: "يُستخدم فقط عندما يطلب العميل شيتهم الخاص." }} mode={mode} />,
            ],
          ]}
        />
      </section>

      {/* Governance */}
      <section aria-labelledby="rhythm">
        <H
          title={{ en: "Governance rhythm", ar: "إيقاع الحوكمة" }}
          subtitle={{
            en: "The recurring checks that keep delivery, SLAs, and reporting honest.",
            ar: "الفحوص المتكررة التي تحافظ على التسليم والـ SLA والتقارير.",
          }}
          mode={mode}
        />
        <div className="kb-rhythm">
          {GOVERNANCE.map((cycle) => (
            <div key={cycle.label.en} className="kb-rhythm-col" style={{ borderTopColor: cycle.accent }}>
              <Pill text={mode === "AR" ? cycle.label.ar : cycle.label.en} tone={cycle.tone} />
              <ul className="kb-rhythm-list">
                {cycle.items.map((item) => (
                  <li key={item.en}>
                    <span className="kb-rhythm-dot" style={{ background: cycle.accent }} aria-hidden="true" />
                    <span><BiText bi={item} mode={mode} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Naming */}
      <section aria-labelledby="naming">
        <H
          title={{ en: "Folder and naming standards", ar: "معايير الملفات والتسمية" }}
          subtitle={{
            en: "Consistent structure is what makes proof, reporting, and audits possible.",
            ar: "الهيكلة المتسقة هي ما يجعل الإثبات والتقارير والتدقيق ممكناً.",
          }}
          mode={mode}
        />
        <div className="kb-naming">
          <div className="kb-naming-panel">
            <div className="kb-naming-head">
              <span className="kb-naming-icon" aria-hidden="true"><FileText className="h-4 w-4" /></span>
              <span>Dropbox</span>
            </div>
            <pre>{`Campaigns
  Company
    Brand + Country
      Year
        Month + Year + Type`}</pre>
            <p className="kb-naming-note">
              {mode === "AR"
                ? "اختصار تحت فولدر الحملات النشطة."
                : "Shortcut under the Active Campaigns folder."}
            </p>
          </div>
          <div className="kb-naming-panel">
            <div className="kb-naming-head">
              <span className="kb-naming-icon" aria-hidden="true"><Image className="h-4 w-4" /></span>
              <span>pCloud</span>
            </div>
            <pre>{`Campaign
  Influencer username
    Proofs and screenshots`}</pre>
            <p className="kb-naming-note">
              {mode === "AR"
                ? "فولدر واحد لكل مؤثر. لا تخلط أكثر من مؤثر في فولدر واحد."
                : "One folder per creator. Never mix creators in one folder."}
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="kb-home-close" aria-label="Search or open a procedure">
        <div className="min-w-0">
          <p className="kb-home-close-title">
            {mode === "AR" ? "لم تجد ما تحتاجه؟" : "Cannot find what you need?"}
          </p>
          <p className="kb-home-close-desc">
            {mode === "AR"
              ? "ابحث في كل صفحة، أو افتح دليل التنقل لرؤية الهيكلة كاملة."
              : "Search every page, or open the navigation guide to see the full structure."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onSearch && (
            <button type="button" onClick={onSearch} className="kb-btn-primary">
              <Search className="h-4 w-4" aria-hidden="true" />
              {mode === "AR" ? "ابحث" : "Search"}
            </button>
          )}
          <button type="button" onClick={() => goTo("ia")} className="kb-btn-secondary-dark">
            {mode === "AR" ? "دليل التنقل" : "Navigation guide"}
            <ArrowRight className="kb-arrow h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
