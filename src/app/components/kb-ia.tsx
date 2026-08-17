import React from "react";
import { BookOpen, Users, Settings, Activity, Clock, CheckCircle2, Workflow, FileText, Star, TrendingUp, Zap, ChevronRight } from "lucide-react";
import { LangMode, BiText, H, PageMeta, KBCard, cx, TRYGC, PageKey } from "./kb-types";

const IA_TREE = [
  { id: "cover", label: { en: "00 — Cover & System Overview", ar: "00 — نظرة عامة على النظام" }, icon: <BookOpen className="h-4 w-4" />, children: [] },
  { id: "ia", label: { en: "01 — KB UI + Navigation (IA)", ar: "01 — واجهة قاعدة المعرفة + التنقل" }, icon: <Settings className="h-4 w-4" />, children: [] },
  { id: "sops", label: { en: "02 — Team SOP Pages", ar: "02 — صفحات إجراءات الفرق" }, icon: <Users className="h-4 w-4" />, children: [
    { id: "sop_community", label: { en: "Community / الكوميونيتي", ar: "الكوميونيتي" } },
    { id: "sop_coordination", label: { en: "Coordination / التنسيق", ar: "التنسيق" } },
    { id: "sop_chat", label: { en: "Chat/WhatsApp / الشات", ar: "الشات/واتساب" } },
    { id: "sop_followup", label: { en: "Follow-Up / المتابعة", ar: "المتابعة" } },
    { id: "sop_coverage", label: { en: "Coverage / التغطية", ar: "التغطية" } },
    { id: "sop_onboarding", label: { en: "Onboarding / التأهيل", ar: "التأهيل" } },
    { id: "sop_outreach", label: { en: "Outreach / الوصول", ar: "الوصول" } },
    { id: "sop_operations", label: { en: "Operations Mgmt / إدارة العمليات", ar: "إدارة العمليات" } },
    { id: "sop_quality", label: { en: "Quality Assurance / ضمان الجودة", ar: "ضمان الجودة" } },
    { id: "sop_data", label: { en: "Data & Supply / البيانات والتوريد", ar: "البيانات والتوريد" } },
    { id: "sop_regional", label: { en: "Regional Ops / العمليات الإقليمية", ar: "العمليات الإقليمية" } },
    { id: "sop_flex", label: { en: "Flex / فليكس", ar: "فليكس" } },
    { id: "sop_elite", label: { en: "Elite / النخبة", ar: "النخبة" } },
  ]},
  { id: "workflows", label: { en: "03 — Workflow Maps", ar: "03 — خرائط سير العمل" }, icon: <Workflow className="h-4 w-4" />, children: [
    { id: "wf_e2e", label: { en: "E2E Workflow Map (Swimlanes)", ar: "خريطة سير العمل الكاملة" } },
    { id: "wf_coordination", label: { en: "Coordination Workflow", ar: "سير عمل التنسيق" } },
    { id: "wf_chat", label: { en: "Chat/WhatsApp Workflow", ar: "سير عمل الشات" } },
    { id: "wf_followup", label: { en: "Follow-Up Workflow", ar: "سير عمل المتابعة" } },
    { id: "wf_coverage", label: { en: "Coverage Workflow", ar: "سير عمل التغطية" } },
    { id: "wf_community", label: { en: "Community Workflow", ar: "سير عمل الكوميونيتي" } },
  ]},
  { id: "raci", label: { en: "04 — RACI Matrix", ar: "04 — مصفوفة RACI" }, icon: <FileText className="h-4 w-4" />, children: [] },
  { id: "gsheets", label: { en: "05 — GSheets Blueprint", ar: "05 — هيكلة جوجل شيتس" }, icon: <FileText className="h-4 w-4" />, children: [] },
  { id: "templates", label: { en: "06 — Templates Library", ar: "06 — مكتبة القوالب" }, icon: <Star className="h-4 w-4" />, children: [
    { id: "templates_influencers", label: { en: "Influencers", ar: "المؤثرين" } },
    { id: "templates_clients", label: { en: "Clients", ar: "العملاء" } },
  ]},
  { id: "kpis", label: { en: "07 — KPIs & SLAs", ar: "07 — المؤشرات والـ SLA" }, icon: <TrendingUp className="h-4 w-4" />, children: [] },
];

export function IAPage({ mode, goTo }: { mode: LangMode; goTo: (p: PageKey) => void }) {
  return (
    <div className="space-y-8">
      <PageMeta mode={mode} owner={{ en: "Operations Lead", ar: "قائد العمليات" }} approver={{ en: "CEO", ar: "الرئيس التنفيذي" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />

      <H title={{ en: "01 — KB UI + Navigation (Information Architecture)", ar: "01 — واجهة قاعدة المعرفة + التنقل (هيكلة المعلومات)" }} mode={mode}
        subtitle={{ en: "Complete sitemap and component reference for the Community & Operations Knowledge Base", ar: "خريطة الموقع الكاملة ومرجع المكونات لقاعدة معرفة مجتمع وعمليات" }} />

      {/* Sidebar IA */}
      <KBCard title={{ en: "Sidebar Information Architecture", ar: "هيكلة الشريط الجانبي" }} mode={mode}>
        <div className="space-y-1">
          {IA_TREE.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => { if (!item.children.length) goTo(item.id as PageKey); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:scale-[1.01]"
                style={{ background: "var(--bg)", border: "1px solid var(--line)" }}
              >
                <div className="rounded-lg p-1.5" style={{ background: TRYGC.purple, color: "#fff" }}>{item.icon}</div>
                <span className="text-sm" style={{ fontWeight: 700, color: "var(--text)" }}><BiText bi={item.label} mode={mode} /></span>
                {item.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" style={{ color: "var(--muted)" }} />}
              </button>
              {item.children.length > 0 && (
                <div className="ml-10 mt-1 mb-2 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => goTo(child.id as PageKey)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all"
                      style={{ color: "var(--muted)" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: TRYGC.orange }} />
                      <BiText bi={child.label} mode={mode} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </KBCard>

      {/* Required UI Components */}
      <KBCard title={{ en: "Required UI Components", ar: "مكونات الواجهة المطلوبة" }} mode={mode}>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { en: "Cards with header, metadata, and actions", ar: "بطاقات بعنوان وبيانات وأزرار" },
            { en: "Tables (RACI, tools, tracker schemas)", ar: "جداول (RACI، أدوات، مخططات المتتبعات)" },
            { en: "Status pills and scenario tags", ar: "شارات الحالة وعلامات السيناريو" },
            { en: "Dropdowns + search bar", ar: "قوائم منسدلة + شريط بحث" },
            { en: "Timeline chips", ar: "شرائح الجدول الزمني" },
            { en: "SLA badges (Green/Amber/Red)", ar: "شارات SLA (أخضر/برتقالي/أحمر)" },
            { en: "Accordions for SOP sections + Q&A", ar: "أكورديون لأقسام الإجراءات والأسئلة" },
            { en: "Copy-to-clipboard buttons", ar: "أزرار نسخ للحافظة" },
            { en: "Export buttons (SVG/PNG)", ar: "أزرار تصدير (SVG/PNG)" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg p-3 text-sm" style={{ background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)" }}>
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: TRYGC.success }} />
              <BiText bi={item} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>

      {/* Layout Description */}
      <KBCard title={{ en: "Layout Structure", ar: "هيكلة التخطيط" }} mode={mode}>
        <div className="space-y-3 text-sm" style={{ color: "var(--text)" }}>
          <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            <div style={{ fontWeight: 700, color: "var(--accent)" }}>
              <BiText bi={{ en: "Sidebar Navigation", ar: "الشريط الجانبي" }} mode={mode} />
            </div>
            <p className="mt-1"><BiText bi={{ en: "Collapsible sidebar with grouped navigation items. In AR mode, sidebar appears on the right side with RTL layout.", ar: "شريط جانبي قابل للطي مع عناصر تنقل مجمّعة. في وضع العربية، يظهر على اليمين مع تخطيط RTL." }} mode={mode} /></p>
          </div>
          <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            <div style={{ fontWeight: 700, color: "var(--accent)" }}>
              <BiText bi={{ en: "Top Bar", ar: "الشريط العلوي" }} mode={mode} />
            </div>
            <p className="mt-1"><BiText bi={{ en: "Search field + Language toggle (BOTH/EN/AR) + Theme toggle (Dark/Light). Sticky at the top of the content area.", ar: "حقل بحث + مفتاح اللغة (الكل/EN/AR) + مفتاح المظهر (داكن/فاتح). ثابت أعلى منطقة المحتوى." }} mode={mode} /></p>
          </div>
          <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            <div style={{ fontWeight: 700, color: "var(--accent)" }}>
              <BiText bi={{ en: "Main Content", ar: "المحتوى الرئيسي" }} mode={mode} />
            </div>
            <p className="mt-1"><BiText bi={{ en: "Section cards with anchors, accordions, tables, checklists, and metadata blocks. Each page shows Owner, Approver, Last Updated, Version, and Next Review.", ar: "بطاقات الأقسام مع مراسي، أكورديون، جداول، قوائم تحقق، وكتل البيانات الوصفية. كل صفحة تعرض المالك، المعتمد، آخر تحديث، الإصدار، والمراجعة القادمة." }} mode={mode} /></p>
          </div>
        </div>
      </KBCard>
    </div>
  );
}
