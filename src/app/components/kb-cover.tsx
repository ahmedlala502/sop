import React from "react";
import {
  BookOpen, Users, Settings, Activity, Clock, CheckCircle2, Workflow,
  FileText, Star, TrendingUp, Zap, Shield, Target, Layers, AlertTriangle
} from "lucide-react";
import { LangMode, Bi, BiText, H, PageMeta, KBCard, Pill, SLABadge, Checklist, SectionDivider, Accordion, QAItem, SimpleTable, cx, TRYGC, TEAM_COLORS, PageKey } from "./kb-types";

export function CoverPage({ mode, goTo }: { mode: LangMode; goTo: (p: PageKey) => void }) {
  return (
    <div className="space-y-8">
      <PageMeta mode={mode} owner={{ en: "Operations Lead", ar: "قائد العمليات" }} approver={{ en: "CEO", ar: "الرئيس التنفيذي" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />

      {/* Hero */}
      <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${TRYGC.purple}, ${TRYGC.deepPurple}, ${TRYGC.darkBg})` }}>
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 80% 20%, ${TRYGC.orange}, transparent 60%)` }} />
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl p-3" style={{ background: TRYGC.orange }}>
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-white" style={{ fontWeight: 900 }}>
                <BiText bi={{ en: "TryGC Community & Operations KB", ar: "قاعدة معرفة مجتمع وعمليات TryGC" }} mode={mode} />
              </h1>
              <p className="text-sm mt-1" style={{ color: TRYGC.lavender }}>
                <BiText bi={{ en: "Grand Community — Complete Community & Operations Playbook v3.0", ar: "جراند كوميونيتي — دليل الكوميونيتي والعمليات الشامل الإصدار 3.0" }} mode={mode} />
              </p>
            </div>
          </div>
          <p className="text-sm max-w-3xl" style={{ color: TRYGC.offWhite, lineHeight: 1.8 }}>
            <BiText bi={{
              en: "This Knowledge Base is the single source of truth for every operational process at TryGC. It covers Standard Operating Procedures (SOPs), workflow maps, RACI matrices, Google Sheets blueprints, communication templates, KPI dashboards, governance cadences, troubleshooting guides, and how-to runbooks. Every team member must follow these documented procedures — no verbal exceptions.",
              ar: "قاعدة المعرفة هذه هي المصدر الوحيد للحقيقة لكل عملية تشغيلية في TryGC. تغطي إجراءات التشغيل الموحدة (SOPs)، خرائط سير العمل، مصفوفات RACI، هيكلة جوجل شيتس، قوالب التواصل، لوحات مؤشرات الأداء، إيقاعات الحوكمة، أدلة استكشاف الأخطاء، وأدلة التشغيل. يجب على كل عضو في الفريق اتباع هذه الإجراءات الموثقة — بدون استثناءات شفهية."
            }} mode={mode} />
          </p>
        </div>
      </div>

      {/* Non-Negotiables */}
      <KBCard title={{ en: "Non-Negotiable Principles", ar: "مبادئ غير قابلة للتفاوض" }} mode={mode}>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: <Shield className="h-5 w-5" />, en: "Single source of truth: the System / Task Manager. The client sheet is used only when the client requires their own tracker.", ar: "مصدر الحقيقة الوحيد: النظام / مدير المهام. شيت العميل يُستخدم فقط عندما يطلب العميل متتبّعهم الخاص." },
            { icon: <FileText className="h-5 w-5" />, en: "Zero verbal exceptions: changes must be documented.", ar: "لا استثناءات شفهياً: أي تغيير لازم يتوثّق." },
            { icon: <CheckCircle2 className="h-5 w-5" />, en: "Done = fully compliant with brief.", ar: "تم = مطابق للبرِيف بالكامل." },
            { icon: <AlertTriangle className="h-5 w-5" />, en: "Escalate early.", ar: "تصعيد مبكر." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="rounded-lg p-2 shrink-0" style={{ background: TRYGC.orange, color: "#fff" }}>{item.icon}</div>
              <span className="text-sm" style={{ color: "var(--text)" }}><BiText bi={{ en: item.en, ar: item.ar }} mode={mode} /></span>
            </div>
          ))}
        </div>
      </KBCard>

      {/* Teams & Scope */}
      <KBCard title={{ en: "Teams & Scope", ar: "الفرق ونطاق المسؤولية" }} mode={mode}>
        <div className="grid gap-3 md:grid-cols-4">
          {([
            { key: "sop_community" as PageKey, icon: <Users className="h-5 w-5" />, en: "Community", ar: "الكوميونيتي", desc: { en: "Client relations, sourcing, booking orders, campaign targets, meeting docs, yearly calendar", ar: "علاقات العملاء، الاختيار، أوامر الحجز، أهداف الحملات، محاضر الاجتماعات، التقويم السنوي" } },
            { key: "sop_coordination" as PageKey, icon: <Settings className="h-5 w-5" />, en: "Coordination", ar: "التنسيق", desc: { en: "Campaign setup, folder creation, sheets, system entries, daily governance, final reports", ar: "إعداد الحملات، إنشاء الفولدرات، الشيتات، إدخالات النظام، الحوكمة اليومية، التقارير النهائية" } },
            { key: "sop_chat" as PageKey, icon: <Activity className="h-5 w-5" />, en: "Chat/WhatsApp", ar: "الشات", desc: { en: "Contextual invitations, reply logging, reminders, brief sending, live support, data audit", ar: "الدعوات بسياق، تسجيل الردود، التذكيرات، إرسال البرِيف، الدعم المباشر، تدقيق البيانات" } },
            { key: "sop_followup" as PageKey, icon: <Clock className="h-5 w-5" />, en: "Follow-Up", ar: "المتابعة", desc: { en: "10–12 reminders, missing/need tracking, verification, rescheduling, EOD updates", ar: "10–12 تذكير، تتبع الناقص والتعديل، التحقق، إعادة الجدولة، تحديثات نهاية اليوم" } },
            { key: "sop_coverage" as PageKey, icon: <CheckCircle2 className="h-5 w-5" />, en: "Coverage", ar: "التغطية", desc: { en: "Post tracking, proof downloads, QA vs brief, pCloud archiving, Done reconciliation", ar: "تتبع المنشورات، تحميل الإثباتات، فحص مقابل البرِيف، أرشفة pCloud، مطابقة الحالات" } },
            { key: "sop_onboarding" as PageKey, icon: <Users className="h-5 w-5" />, en: "Onboarding", ar: "التأهيل", desc: { en: "Validate & prepare creators, brief acknowledgement, handover to Coordination", ar: "التحققق من المؤثرين وتجهيزهم، تأكيد استلام البرِيف، التسليم للتنسيق" } },
            { key: "sop_outreach" as PageKey, icon: <Activity className="h-5 w-5" />, en: "Outreach", ar: "الوصول", desc: { en: "First contact + 2 touches, contact queue, clean handover to Follow-Up", ar: "أول تواصل + لمستان، قائمة التواصل، تسليم نظيف للمتابعة" } },
            { key: "sop_operations" as PageKey, icon: <Shield className="h-5 w-5" />, en: "Operations Mgmt", ar: "إدارة العمليات", desc: { en: "Owns SLAs, escalation, governance cadence, cross-team coordination", ar: "تملك الـ SLAs، التصعيد، إيقاع الحوكمة، التنسيق بين الفرق" } },
            { key: "sop_quality" as PageKey, icon: <CheckCircle2 className="h-5 w-5" />, en: "Quality Assurance", ar: "ضمان الجودة", desc: { en: "Audit plan, release authority on client numbers, defect loop", ar: "خطة التدقيق، سلطة الإصدار للأرقام، حلقة معالجة العيوب" } },
            { key: "sop_data" as PageKey, icon: <FileText className="h-5 w-5" />, en: "Data & Supply", ar: "البيانات والتوريد", desc: { en: "Creator scoring, data quality, supply pipeline", ar: "تقييم المؤثرين، جودة البيانات، خط الإمداد" } },
            { key: "sop_regional" as PageKey, icon: <Layers className="h-5 w-5" />, en: "Regional Ops", ar: "العمليات الإقليمية", desc: { en: "Vendor/venue issues, regional coordination, failure-cause review", ar: "مشاكل الموردين والمواقع، التنسيق الإقليمي، مراجعة أسباب الإخفاق" } },
            { key: "sop_flex" as PageKey, icon: <Zap className="h-5 w-5" />, en: "Flex", ar: "فليكس", desc: { en: "Surge capacity, deployed to Coverage first, fluid redeployment", ar: "سعة مرنة، تُوجَّه للتغطية أولاً، إعادة انتشار سريعة" } },
            { key: "sop_elite" as PageKey, icon: <Target className="h-5 w-5" />, en: "Elite", ar: "النخبة", desc: { en: "Premium creators & campaigns, white-glove handling", ar: "المؤثرون والحملات المميزة، تعامل استثنائي" } },
          ]).map((team) => (
            <button key={team.key} onClick={() => goTo(team.key)} className="rounded-xl p-4 text-left transition-all hover:scale-[1.02]" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="rounded-lg p-2 w-fit mb-3" style={{ background: TRYGC.purple, color: "#fff" }}>{team.icon}</div>
              <div className="text-sm" style={{ fontWeight: 700, color: "var(--text)" }}><BiText bi={{ en: team.en, ar: team.ar }} mode={mode} /></div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}><BiText bi={team.desc} mode={mode} /></div>
            </button>
          ))}
        </div>
      </KBCard>

      {/* Tools & Source of Truth */}
      <KBCard title={{ en: "Tools & Source of Truth", ar: "الأدوات ومصدر الحقيقة" }} mode={mode}>
        <SimpleTable
          headers={mode === "AR" ? ["القاعدة الذهبية", "المالك", "الاستخدام", "الأداة"] : mode === "BOTH" ? ["Tool / الأداة", "Used For / الاستخدام", "Owner / المالك", "Golden Rule / القاعدة الذهبية"] : ["Tool", "Used For", "Owner", "Golden Rule"]}
          rows={[
            [<BiText bi={{ en: "System / Task Manager", ar: "النظام / مدير المهام" }} mode={mode} />, <BiText bi={{ en: "Campaign creation, status tracking, influencer assignments", ar: "إنشاء الحملات، تتبع الحالة، تعيين المؤثرين" }} mode={mode} />, <BiText bi={{ en: "Coordination", ar: "التنسيق" }} mode={mode} />, <BiText bi={{ en: "Single source of truth — other trackers align to it", ar: "مصدر الحقيقة الوحيد — المتتبعات الأخرى تتماشى معه" }} mode={mode} />],
            [<BiText bi={{ en: "WhatsApp", ar: "واتساب" }} mode={mode} />, <BiText bi={{ en: "Influencer invitations, reminders, brief delivery, live support", ar: "دعوات المؤثرين، التذكيرات، إرسال البرِيف، الدعم المباشر" }} mode={mode} />, <BiText bi={{ en: "Chat Team", ar: "فريق الشات" }} mode={mode} />, <BiText bi={{ en: "Every message logged with timestamp in tracker", ar: "كل رسالة تُسجَّل بالتاريخ والوقت في المتتبع" }} mode={mode} />],
            [<BiText bi={{ en: "Dropbox", ar: "دروب بوكس" }} mode={mode} />, <BiText bi={{ en: "Campaign folder structure, briefs, client docs", ar: "هيكلة فولدرات الحملات، البرِيفات، مستندات العملاء" }} mode={mode} />, <BiText bi={{ en: "Coordination", ar: "التنسيق" }} mode={mode} />, <BiText bi={{ en: "Standard naming: Company > Brand+Country > Year > Month+Year+Type", ar: "تسمية موحدة: الشركة > البراند+الدولة > السنة > الشهر+السنة+النوع" }} mode={mode} />],
            [<BiText bi={{ en: "pCloud", ar: "بي كلاود" }} mode={mode} />, <BiText bi={{ en: "Coverage proofs, screenshots, archiving", ar: "إثباتات التغطية، لقطات الشاشة، الأرشفة" }} mode={mode} />, <BiText bi={{ en: "Coverage", ar: "التغطية" }} mode={mode} />, <BiText bi={{ en: "One folder per influencer username — never mix", ar: "فولدر واحد لكل يوزرنيم مؤثر — ممنوع الخلط" }} mode={mode} />],
            [<BiText bi={{ en: "Google Sheets (Client Sheet)", ar: "جوجل شيتس (شيت العميل)" }} mode={mode} />, <BiText bi={{ en: "Master tracker, confirmations, daily plans, KPI logs", ar: "المتتبع الرئيسي، التأكيدات، الخطط اليومية، سجلات المؤشرات" }} mode={mode} />, <BiText bi={{ en: "All Teams", ar: "جميع الفرق" }} mode={mode} />, <BiText bi={{ en: "Working tracker — used only when the client requires their own sheet", ar: "متتبّع العمل — يُستخدم فقط عندما يطلب العميل شيتهم الخاص" }} mode={mode} />],
          ]}
        />
      </KBCard>

      {/* Quick Navigation */}
      <KBCard title={{ en: "Quick Navigation", ar: "التنقل السريع" }} mode={mode}>
        <div className="grid gap-3 md:grid-cols-3">
          {([
            { key: "raci" as PageKey, label: { en: "RACI Matrix", ar: "مصفوفة RACI" }, icon: <Layers className="h-4 w-4" />, color: TRYGC.purple },
            { key: "gsheets" as PageKey, label: { en: "Sheets Blueprint", ar: "هيكلة الشيتات" }, icon: <FileText className="h-4 w-4" />, color: TRYGC.success },
            { key: "templates_influencers" as PageKey, label: { en: "Templates Library", ar: "مكتبة القوالب" }, icon: <Star className="h-4 w-4" />, color: TRYGC.orange },
            { key: "kpis" as PageKey, label: { en: "KPIs & SLAs", ar: "المؤشرات والـ SLA" }, icon: <TrendingUp className="h-4 w-4" />, color: TRYGC.info },
            { key: "wf_e2e" as PageKey, label: { en: "E2E Workflow", ar: "سير العمل الكامل" }, icon: <Workflow className="h-4 w-4" />, color: TRYGC.purpleLight },
          ]).map((item) => (
            <button key={item.key} onClick={() => goTo(item.key)} className="flex items-center gap-3 rounded-xl p-4 text-left transition-all hover:scale-[1.02]" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="rounded-lg p-2" style={{ background: item.color, color: "#fff" }}>{item.icon}</div>
              <span className="text-sm" style={{ fontWeight: 700, color: "var(--text)" }}><BiText bi={item.label} mode={mode} /></span>
            </button>
          ))}
        </div>
      </KBCard>

      {/* Governance */}
      <KBCard title={{ en: "Governance — Operating Rhythm", ar: "الحوكمة — الإيقاع التشغيلي" }} mode={mode}>
        <div className="space-y-4">
          {[
            { freq: { en: "Daily", ar: "يومي" }, color: TRYGC.success, items: [
              { en: "Morning standup: review Today's Visits, assign tasks, surface risks", ar: "اجتماع صباحي: مراجعة زيارات اليوم، توزيع المهام، إبراز المخاطر" },
              { en: "Tomorrow Visits review: confirm schedule, identify gaps, pre-assign coverage", ar: "مراجعة زيارات بكرة: تأكيد الجدول، تحديد الفجوات، تعيين التغطية مسبقاً" },
              { en: "Risk log: document any SLA breaches, pending decisions, blockers", ar: "سجل المخاطر: توثيق أي اختراقات SLA، قرارات معلقة، عوائق" },
              { en: "EOD status: update all trackers, close resolved issues, flag carry-overs", ar: "حالة نهاية اليوم: تحديث المتتبعات، إغلاق المحلول، تحديد المؤجل" },
            ]},
            { freq: { en: "Weekly", ar: "أسبوعي" }, color: TRYGC.orange, items: [
              { en: "KPI review: dashboard metrics, conversion rates, SLA compliance", ar: "مراجعة المؤشرات: مقاييس اللوحة، معدلات التحويل، الامتثال للـ SLA" },
              { en: "Top offenders: campaigns with most issues, repeat problems", ar: "أكثر الحملات مشاكل: الحملات بأكثر مشاكل، المشاكل المتكررة" },
              { en: "Process improvement: identify fixes, update SOPs if needed", ar: "تحسين العمليات: تحديد الإصلاحات، تحديث الإجراءات عند الحاجة" },
            ]},
            { freq: { en: "Monthly", ar: "شهري" }, color: TRYGC.purple, items: [
              { en: "Full audit: cross-check system vs sheets vs folders for all active campaigns", ar: "تدقيق شامل: مطابقة النظام مع الشيتات والفولدرات لكل الحملات النشطة" },
              { en: "Playbook update: incorporate lessons learned, new templates, process changes", ar: "تحديث دليل العمليات: إدراج الدروس المستفادة، قوالب جديدة، تغييرات العمليات" },
              { en: "RACI refresh: verify role assignments, onboard new members", ar: "تحديث RACI: التحقق من توزيع الأدوار، إدماج الأعضاء الجدد" },
            ]},
          ].map((section, si) => (
            <div key={si} className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Pill text={mode === "AR" ? section.freq.ar : section.freq.en} tone={si === 0 ? "success" : si === 1 ? "warning" : "purple"} />
              </div>
              <div className="space-y-2">
                {section.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: section.color }} />
                    <span style={{ color: "var(--text)" }}><BiText bi={item} mode={mode} /></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </KBCard>

      {/* Folder & Naming Standards */}
      <KBCard title={{ en: "Folder & Naming Standards", ar: "معايير الملفات والتسمية" }} mode={mode}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            <div className="text-sm mb-3" style={{ fontWeight: 700, color: "var(--accent)" }}>Dropbox</div>
            <div className="space-y-2 text-sm" style={{ color: "var(--text)" }}>
              <BiText bi={{
                en: "All campaigns → Company → Brand+Country → Year → Month+Year+Type\nShortcut under Active Campaigns folder",
                ar: "كل الحملات → الشركة → البراند+الدولة → السنة → الشهر+السنة+النوع\nاختصار تحت فولدر الحملات النشطة"
              }} mode={mode} tag="p" />
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            <div className="text-sm mb-3" style={{ fontWeight: 700, color: "var(--accent)" }}>pCloud</div>
            <div className="space-y-2 text-sm" style={{ color: "var(--text)" }}>
              <BiText bi={{
                en: "Campaign folder → Influencer folder per username → proofs inside\nNever mix multiple influencers in one folder",
                ar: "فولدر الحملة → فولدر المؤثر حسب اليوزرنيم → الإثباتات بالداخل\nممنوع خلط أكثر من مؤثر في فولدر واحد"
              }} mode={mode} tag="p" />
            </div>
          </div>
        </div>
      </KBCard>
    </div>
  );
}
