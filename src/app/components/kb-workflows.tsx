import React from "react";
import { LangMode, BiText, H, PageMeta, KBCard, DiagramCard, buildFlowSVG, TRYGC, escXml } from "./kb-types";

function getColors(isDark = true) {
  return isDark
    ? { bg: TRYGC.darkBg, card: TRYGC.darkCard, line: TRYGC.darkLine, accent: TRYGC.orange, text: TRYGC.darkText, muted: TRYGC.darkMuted }
    : { bg: TRYGC.lightBg, card: TRYGC.lightCard, line: TRYGC.lightLine, accent: TRYGC.orange, text: TRYGC.lightText, muted: TRYGC.lightMuted };
}

function makeE2ESVG(c: ReturnType<typeof getColors>): string {
  const W = 1200, H = 400;
  const phases = [
    { label: "Intake", sla: "Same Day", owner: "Community" },
    { label: "Setup", sla: "≤4h", owner: "Coordination" },
    { label: "Invite", sla: "24h", owner: "Chat" },
    { label: "Execute", sla: "Per Schedule", owner: "All Teams" },
    { label: "Coverage QA", sla: "Same Day", owner: "Coverage" },
    { label: "Fix Gaps", sla: "≤24h", owner: "Follow-Up" },
    { label: "Report", sla: "24–48h", owner: "Coordination" },
  ];
  const pw = (W - 80) / phases.length;

  let svg = `<rect width="${W}" height="${H}" rx="20" fill="${c.bg}"/>`;
  svg += `<text x="${W / 2}" y="40" text-anchor="middle" font-size="20" font-family="Inter,sans-serif" fill="${c.text}" font-weight="800">E2E Campaign Workflow (Swimlanes)</text>`;

  // Phase headers
  phases.forEach((p, i) => {
    const x = 40 + i * pw;
    svg += `<rect x="${x}" y="60" width="${pw - 10}" height="40" rx="12" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
    svg += `<text x="${x + pw / 2 - 5}" y="85" text-anchor="middle" font-size="13" font-family="Inter,sans-serif" fill="${c.text}" font-weight="700">${escXml(p.label)}</text>`;
  });

  // Lane: Owner row
  svg += `<rect x="40" y="115" width="${W - 80}" height="60" rx="14" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  svg += `<text x="50" y="150" font-size="11" font-family="Inter,sans-serif" fill="${c.muted}" font-weight="700">OWNER</text>`;
  phases.forEach((p, i) => {
    const x = 40 + i * pw;
    svg += `<text x="${x + pw / 2 - 5}" y="150" text-anchor="middle" font-size="12" font-family="Inter,sans-serif" fill="${c.text}" font-weight="600">${escXml(p.owner)}</text>`;
  });

  // Lane: SLA row
  svg += `<rect x="40" y="185" width="${W - 80}" height="60" rx="14" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  svg += `<text x="50" y="220" font-size="11" font-family="Inter,sans-serif" fill="${c.muted}" font-weight="700">SLA</text>`;
  phases.forEach((p, i) => {
    const x = 40 + i * pw;
    svg += `<rect x="${x + 15}" y="200" width="${pw - 40}" height="26" rx="13" fill="${c.accent}"/>`;
    svg += `<text x="${x + pw / 2 - 5}" y="218" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#fff" font-weight="700">${escXml(p.sla)}</text>`;
  });

  // Arrows
  phases.forEach((_, i) => {
    if (i < phases.length - 1) {
      const x1 = 40 + i * pw + pw - 10;
      const x2 = 40 + (i + 1) * pw;
      svg += `<line x1="${x1}" y1="80" x2="${x2}" y2="80" stroke="${c.accent}" stroke-width="2" marker-end="url(#ah)"/>`;
    }
  });

  // Description area
  svg += `<rect x="40" y="260" width="${W - 80}" height="120" rx="14" fill="${c.card}" stroke="${c.line}" stroke-width="1.5"/>`;
  const desc = [
    "Intake: Client brief → sourced list → client approval → booking order",
    "Setup: Validate BO → folders → sheets → system entry (≤4h)",
    "Invite: Contextual invitations → log replies → reminders → send brief",
    "Execute: Visits happen → live support → post tracking",
    "Coverage QA: Download proofs → QA vs brief → archive pCloud",
    "Fix Gaps: Missing/Need resolution → reschedule → verify fixes",
    "Report: Compile data → reconcile → QA → deliver to client",
  ];
  desc.forEach((d, i) => {
    svg += `<text x="60" y="${280 + i * 14}" font-size="10" font-family="Inter,sans-serif" fill="${c.muted}" font-weight="500">${escXml(d)}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><marker id="ah" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="${c.accent}"/></marker></defs>
    ${svg}</svg>`;
}

// ─── Workflow Pages ──────────────────────────────────────────
export function WorkflowE2E({ mode }: { mode: LangMode }) {
  const c = getColors();
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Operations Lead", ar: "قائد العمليات" }} approver={{ en: "CEO", ar: "الرئيس التنفيذي" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "E2E Workflow Map (Swimlanes)", ar: "خريطة سير العمل من البداية للنهاية" }} mode={mode} subtitle={{ en: "Full campaign lifecycle from intake to final report", ar: "دورة حياة الحملة الكاملة من الاستلام إلى التقرير النهائي" }} />
      <DiagramCard title={{ en: "E2E Swimlane Diagram", ar: "مخطط السويملين الكامل" }} mode={mode} svg={makeE2ESVG(c)} />
      <KBCard title={{ en: "Phase Details", ar: "تفاصيل المراحل" }} mode={mode}>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { phase: "Intake", sla: "Same day", desc: { en: "Client brief received → influencer sourcing → list approved → booking order created and handed to Coordination.", ar: "برِيف العميل مستلم → اختيار المؤثرين → القائمة معتمدة → أمر الحجز منشأ ومسلّم للتنسيق." } },
            { phase: "Setup", sla: "≤4h", desc: { en: "Validate booking order → create Dropbox folders + shortcuts → build cam.info + sheets → create campaign in system/dashboard.", ar: "مراجعة أمر الحجز → إنشاء فولدرات دروب بوكس + اختصارات → تجهيز cam.info + الشيتات → إنشاء الحملة على النظام." } },
            { phase: "Invite", sla: "Within 24h", desc: { en: "Send contextual invitations → log all replies → send reminders (48h, 24h) → deliver campaign brief to confirmed influencers.", ar: "إرسال دعوات بسياق → تسجيل كل الردود → إرسال تذكيرات (48 ساعة، 24 ساعة) → تسليم برِيف الحملة للمؤثرين المؤكدين." } },
            { phase: "Execute", sla: "Per schedule", desc: { en: "Visits happen per Daily_Plan → live WhatsApp support → post tracking begins → today visit reminders sent by Follow-Up.", ar: "الزيارات تتم حسب Daily_Plan → دعم واتساب مباشر → بدء تتبع المنشورات → تذكيرات زيارات اليوم من المتابعة." } },
            { phase: "Coverage QA", sla: "Same day", desc: { en: "Track posts → download proofs → QA against brief → archive to pCloud → update Coverage_QA status.", ar: "تتبع المنشورات → تحميل الإثباتات → فحص مقابل البرِيف → أرشفة في pCloud → تحديث حالة Coverage_QA." } },
            { phase: "Fix Gaps", sla: "≤24h", desc: { en: "Review Missing/Need tracker → contact influencers for fixes → verify resolutions → reschedule if needed → update all systems.", ar: "مراجعة متتبع الناقص/التعديل → التواصل مع المؤثرين للإصلاح → التحقق من الحلول → إعادة الجدولة إذا لزم → تحديث كل الأنظمة." } },
            { phase: "Report", sla: "24–48h", desc: { en: "Compile final report → reconcile Done vs pCloud → QA all numbers → deliver to Community for client presentation.", ar: "تجميع التقرير النهائي → مطابقة تم مع pCloud → مراجعة كل الأرقام → التسليم للكوميونيتي لعرضه على العميل." } },
          ].map((p, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm" style={{ fontWeight: 800, color: "var(--accent)" }}>{p.phase}</span>
                <span className="rounded-full px-2 py-0.5 text-xs text-white" style={{ background: TRYGC.purple, fontWeight: 700 }}>{p.sla}</span>
              </div>
              <div className="text-sm" style={{ color: "var(--text)" }}><BiText bi={p.desc} mode={mode} /></div>
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}

export function WorkflowCoordination({ mode }: { mode: LangMode }) {
  const c = getColors();
  const svg = buildFlowSVG({
    title: "Coordination Workflow",
    steps: [
      { text: "Validate Booking Order", sla: "2h" },
      { text: "Create Dropbox Folders", sla: "4h" },
      { text: "Build cam.info + Sheets", sla: "4h" },
      { text: "Create Campaign in System", sla: "Same Day" },
      { text: "Daily Governance", sla: "Daily" },
      { text: "Final Report Delivery", sla: "24-48h" },
    ],
    colors: c,
  });
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Coordination Lead", ar: "قائد التنسيق" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "Coordination Workflow Map", ar: "خريطة سير عمل التنسيق" }} mode={mode} />
      <DiagramCard title={{ en: "Coordination Flow", ar: "تدفق التنسيق" }} mode={mode} svg={svg} />
      <KBCard title={{ en: "Step Details", ar: "تفاصيل الخطوات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "1. Validate booking order — check all fields, reject if incomplete", ar: "1. مراجعة أمر الحجز — فحص كل الحقول، رفض إذا ناقص" },
            { en: "2. Create Dropbox folders + shortcuts — standard naming convention", ar: "2. إنشاء فولدرات دروب بوكس + اختصارات — اتفاقية تسمية موحدة" },
            { en: "3. Build cam.info + base sheets — populate from BO data", ar: "3. تجهيز cam.info + الشيتات — تعبئة من بيانات أمر الحجز" },
            { en: "4. Create campaign in system/dashboard — verify data matches", ar: "4. إنشاء الحملة على النظام — التحقق من تطابق البيانات" },
            { en: "5. Daily governance (Tomorrow Visits + risks) — proactive monitoring", ar: "5. حوكمة يومية (زيارات بكرة + مخاطر) — مراقبة استباقية" },
            { en: "6. Final report delivery — compile, QA, deliver", ar: "6. تسليم التقرير النهائي — تجميع، مراجعة جودة، تسليم" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.orange }} />
              <BiText bi={s} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}

export function WorkflowChat({ mode }: { mode: LangMode }) {
  const c = getColors();
  const svg = buildFlowSVG({
    title: "Chat/WhatsApp Workflow",
    steps: [
      { text: "Contextual Invitations", sla: "24h" },
      { text: "Log Replies", sla: "1h" },
      { text: "Reminders", sla: "48h/24h" },
      { text: "Send Brief", sla: "24h before" },
      { text: "Live Support", sla: "15min" },
      { text: "Audit/Fix Data", sla: "EOD" },
    ],
    colors: c,
  });
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Chat Team Lead", ar: "قائد فريق الشات" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "Chat/WhatsApp Workflow Map", ar: "خريطة سير عمل الشات" }} mode={mode} />
      <DiagramCard title={{ en: "Chat Flow", ar: "تدفق الشات" }} mode={mode} svg={svg} />
      <KBCard title={{ en: "Step Details (EN/AR)", ar: "تفاصيل الخطوات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "Contextual invitations — personalized per influencer", ar: "دعوات بسياق — مخصصة لكل مؤثر" },
            { en: "Log replies — timestamp + status in Confirmations tab", ar: "تسجيل الردود — التاريخ والوقت + الحالة في تبويب التأكيدات" },
            { en: "Reminders — escalating (48h, 24h before visit)", ar: "تذكيرات — تصاعدية (48 ساعة، 24 ساعة قبل الزيارة)" },
            { en: "Send brief — full campaign details 24h before", ar: "إرسال البرِيف — تفاصيل الحملة الكاملة قبل 24 ساعة" },
            { en: "Live support — real-time assistance during visits", ar: "دعم مباشر — مساعدة في الوقت الحقيقي أثناء الزيارات" },
            { en: "Audit/fix data — EOD reconciliation across all systems", ar: "تدقيق وتصحيح بيانات — مطابقة نهاية اليوم عبر كل الأنظمة" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.orange }} />
              <BiText bi={s} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}

export function WorkflowFollowUp({ mode }: { mode: LangMode }) {
  const c = getColors();
  const svg = buildFlowSVG({
    title: "Follow-Up Workflow",
    steps: [
      { text: "10-12 Reminders", sla: "Per Schedule" },
      { text: "Check Missing/Need", sla: "2h" },
      { text: "Verify System/Social", sla: "Same Day" },
      { text: "Fix/Reschedule", sla: "≤24h" },
      { text: "Update Tracker", sla: "Immediate" },
      { text: "EOD Follow-Up", sla: "Before EOD" },
    ],
    colors: c,
  });
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Follow-Up Lead", ar: "قائد المتابعة" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "Follow-Up Workflow Map", ar: "خريطة سير عمل المتابعة" }} mode={mode} />
      <DiagramCard title={{ en: "Follow-Up Flow", ar: "تدفق المتابعة" }} mode={mode} svg={svg} />
      <KBCard title={{ en: "Step Details (EN/AR)", ar: "تفاصيل الخطوات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "10–12 reminders — strategic spacing, varied tone", ar: "10–12 تذكير — توزيع استراتيجي، تنويع النبرة" },
            { en: "Check missing/need — categorize and assign owners", ar: "فحص الناقص/التعديل — تصنيف وتعيين مالكين" },
            { en: "Verify system/social — cross-check posts vs brief", ar: "تحقق من النظام/السوشيال — مطابقة المنشورات مع البرِيف" },
            { en: "Fix/reschedule — coordinate resolution across teams", ar: "إصلاح/إعادة جدولة — تنسيق الحل بين الفرق" },
            { en: "Update tracker — real-time status after every action", ar: "تحديث المتتبع — حالة فورية بعد كل إجراء" },
            { en: "EOD follow-up — summary of resolved/pending/breached items", ar: "متابعة نهاية اليوم — ملخص المحلول/المعلق/المخترق" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.orange }} />
              <BiText bi={s} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}

export function WorkflowCoverage({ mode }: { mode: LangMode }) {
  const c = getColors();
  const svg = buildFlowSVG({
    title: "Coverage Workflow",
    steps: [
      { text: "Track Posts", sla: "Same Day" },
      { text: "Download Proofs", sla: "4h" },
      { text: "QA vs Brief", sla: "Same Day" },
      { text: "Archive pCloud", sla: "4h" },
      { text: "Update Status", sla: "Immediate" },
      { text: "Reconcile Done vs pCloud", sla: "EOD" },
    ],
    colors: c,
  });
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Coverage Lead", ar: "قائد التغطية" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "Coverage Workflow Map", ar: "خريطة سير عمل التغطية" }} mode={mode} />
      <DiagramCard title={{ en: "Coverage Flow", ar: "تدفق التغطية" }} mode={mode} svg={svg} />
      <KBCard title={{ en: "Step Details (EN/AR)", ar: "تفاصيل الخطوات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "Track posts — monitor influencer social accounts for campaign content", ar: "تتبع المنشورات — مراقبة حسابات المؤثرين لمحتوى الحملة" },
            { en: "Download proofs — screenshot/save all posts with correct naming", ar: "تحميل الإثباتات — لقطة/حفظ كل المنشورات بالتسمية الصحيحة" },
            { en: "QA vs brief — verify hashtags, mentions, content type, quality", ar: "فحص مقابل البرِيف — التحقق من الهاشتاقات، الإشارات، نوع المحتوى، الجودة" },
            { en: "Archive pCloud — one folder per influencer username", ar: "أرشفة pCloud — فولدر واحد لكل يوزرنيم مؤثر" },
            { en: "Update status — Coverage_QA tab + system alignment", ar: "تحديث الحالة — تبويب Coverage_QA + تناسق النظام" },
            { en: "Reconcile Done vs pCloud — count match verification", ar: "مطابقة (تم) مع pCloud — التحقق من تطابق العدد" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.orange }} />
              <BiText bi={s} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}

export function WorkflowCommunity({ mode }: { mode: LangMode }) {
  const c = getColors();
  const svg = buildFlowSVG({
    title: "Community Workflow",
    steps: [
      { text: "Client Goals" },
      { text: "Sourcing + List", sla: "48h" },
      { text: "Client Approval" },
      { text: "Booking Order", sla: "Same Day" },
      { text: "Track Targets", sla: "Daily" },
      { text: "Meetings + MOMs", sla: "24h" },
    ],
    colors: c,
  });
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Community Lead", ar: "قائد الكوميونيتي" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />
      <H title={{ en: "Community Workflow Map", ar: "خريطة سير عمل الكوميونيتي" }} mode={mode} />
      <DiagramCard title={{ en: "Community Flow", ar: "تدفق الكوميونيتي" }} mode={mode} svg={svg} />
      <KBCard title={{ en: "Step Details (EN/AR)", ar: "تفاصيل الخطوات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "Client goals — define objectives, scope, KPIs, deliverables", ar: "أهداف العميل — تحديد الأهداف، النطاق، المؤشرات، المخرجات" },
            { en: "Sourcing + list — build scored influencer list matching brief criteria", ar: "اختيار + قائمة — بناء قائمة مؤثرين مقيّمة تطابق معايير البرِيف" },
            { en: "Client approval — documented sign-off on final list", ar: "موافقة العميل — مصادقة موثّقة على القائمة النهائية" },
            { en: "Booking order — create and hand off to Coordination", ar: "أمر الحجز — إنشاء وتسليم للتنسيق" },
            { en: "Track targets — daily progress monitoring against campaign goals", ar: "متابعة الأهداف — مراقبة التقدم اليومي مقابل أهداف الحملة" },
            { en: "Meetings + MOMs — agenda, notes, sign-off within 24h + yearly calendar", ar: "اجتماعات + محاضر — أجندة، ملاحظات، مصادقة خلال 24 ساعة + تقويم سنوي" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.orange }} />
              <BiText bi={s} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}
