import React from "react";
import { Zap, Bot, Target, Layers, ShieldCheck, GitBranch, ListChecks } from "lucide-react";
import {
  BiText,
  H,
  KBCard,
  Pill,
  Accordion,
  SimpleTable,
  SectionDivider,
  buildFlowSVG,
  DiagramCard,
  Bi,
  LangMode,
  TRYGC,
} from "./kb-types";

// ─── Types ─────────────────────────────────────────────────────
type Flow = { en: string; ar: string };
type Proposal = {
  id: string;
  area: Bi;
  title: Bi;
  current: Bi;
  improvement: Bi;
  how: Bi;
  value: Bi;
  effort: Bi;
  kpi: Bi;
  flow: Flow[];
};

// ─── Effort pill tone helper ───────────────────────────────────
function effortTone(e: string): "success" | "info" | "warning" | "danger" {
  const t = e.toLowerCase();
  if (t.startsWith("low") && !t.includes("medium")) return "success";
  if (t.includes("very high")) return "danger";
  if (t.includes("high")) return "danger";
  if (t.includes("medium")) return "warning";
  return "info";
}

const flowColors = {
  bg: TRYGC.darkCard,
  card: TRYGC.purpleDark,
  line: TRYGC.darkLine,
  accent: TRYGC.orange,
  text: TRYGC.offWhite,
  muted: TRYGC.lavender,
};

// ─── Proposal data (rephrased from the V4.2 proposal document) ─
const PROPOSALS: Proposal[] = [
  // ── Onboarding (P01–P10) ──
  {
    id: "P01",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Unified Influencer Intake", ar: "نقطة إدخال موحدة للمؤثرين" },
    current: { en: "Influencers arrive from scraping, links, files or manual prep; data is gathered by hand before any check.", ar: "يدخل المؤثرون عبر الاستخراج أو الروابط أو الملفات أو التجهيز اليدوي، وتُجمع بياناتهم يدويًا قبل الفحص." },
    improvement: { en: "A single intake gateway that accepts every source and normalizes it into one format before the next step.", ar: "بوابة إدخال واحدة تستقبل كل المصادر وتوحّدها إلى صيغة واحدة قبل أي خطوة تالية." },
    how: { en: "The agent uploads or pastes inputs; the system builds a batch, flags each record Valid / Invalid / Missing, then routes clean records onward after dedupe.", ar: "يرفع الموظف أو يلصق المدخلات؛ ينشئ النظام دفعة ويسمي كل سجل صالح/غير صالح/ناقص، ثم يمرر السجلات السليمة للمرحلة التالية بعد إزالة التكرار." },
    value: { en: "Less manual prep, unified journey start.", ar: "تقليل التجهيز اليدوي وتوحيد بداية الرحلة." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Avg batch prep time; % records needing manual intervention.", ar: "متوسط زمن تجهيز الدفعة؛ نسبة السجلات التي احتاجت تدخلًا يدويًا." },
    flow: [
      { en: "Collect inputs", ar: "جمع المدخلات" },
      { en: "Create batch", ar: "إنشاء دفعة" },
      { en: "Validate", ar: "التحقق" },
      { en: "Dedupe", ar: "إزالة التكرار" },
      { en: "Route", ar: "التوجيه" },
    ],
  },
  {
    id: "P02",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Automated Link Normalization", ar: "تحويل وتنظيف الروابط تلقائيًا" },
    current: { en: "Links must be converted into usernames manually, across varying formats.", ar: "تحتاج الروابط إلى تحويل يدوي لأسماء حسابات وبصيغ مختلفة." },
    improvement: { en: "Auto-detect the platform, extract the username and produce a canonical format the moment a link is entered.", ar: "يحدد النظام المنصة تلقائيًا ويستخرج اسم الحساب ويُنتج صيغة موحدة فور إدخال الرابط." },
    how: { en: "On link entry the system identifies the platform, extracts the username and outputs a canonical format reused by every later stage.", ar: "عند الإدخال يحدد النظام المنصة ويستخرج اسم الحساب ويُخرج صيغة موحدة تُستخدم في كل المراحل التالية." },
    value: { en: "Removes a full manual step and improves match quality.", ar: "يلغي خطوة يدوية كاملة ويحسّن جودة المطابقة." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "% links normalized without intervention.", ar: "نسبة الروابط التي حُوّلت بنجاح بدون تدخل." },
    flow: [
      { en: "Paste link", ar: "لصق الرابط" },
      { en: "Detect platform", ar: "تحديد المنصة" },
      { en: "Extract username", ar: "استخراج الحساب" },
      { en: "Canonical format", ar: "صيغة موحدة" },
    ],
  },
  {
    id: "P03",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Duplicate & Existing Influencer Guard", ar: "منع التكرار وفحص الموجود" },
    current: { en: "Whether an influencer already exists is checked manually before invitations.", ar: "يُفحص من هو موجود على النظام يدويًا قبل إرسال الدعوات." },
    improvement: { en: "Merge existence and duplicate checks into one rule that runs before any invite or record creation.", ar: "دمج فحص الوجود والتكرار في قاعدة واحدة تعمل قبل أي دعوة أو إنشاء سجل." },
    how: { en: "The system compares username, phone and social IDs, then flags New / Existing / Possible Duplicate — only the last needs human review.", ar: "يقارن النظام اسم الحساب والهاتف والمعرفات، ثم يصنف جديد/موجود/مكرر محتمل، ولا يحتاج للمراجعة سوى المحتمل." },
    value: { en: "Prevents duplicate outreach and improves database quality.", ar: "يمنع تكرار التواصل ويحسّن جودة قاعدة البيانات." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "# duplicates prevented; duplicate rate.", ar: "عدد السجلات المكررة التي تم منعها؛ معدل التكرار." },
    flow: [
      { en: "Incoming record", ar: "سجل وارد" },
      { en: "Compare IDs", ar: "مقارنة المعرفات" },
      { en: "New / Existing / Dup", ar: "جديد/موجود/مكرر" },
      { en: "Auto or review", ar: "تلقائي أو مراجعة" },
    ],
  },
  {
    id: "P04",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Configurable Eligibility Rules", ar: "قواعد قبول قابلة للإعداد" },
    current: { en: "The acceptance rule (e.g. >1,000 followers) is hard-coded.", ar: "القاعدة المؤكدة لقبول الطلب مثبتة داخل الكود." },
    improvement: { en: "Move the rule to an admin configuration with effective dating.", ar: "تحويل القاعدة إلى إعداد إداري بتاريخ سريان." },
    how: { en: "An admin sets the minimum followers; the system shows Pass / Fail with a reason and the final decision stays with staff.", ar: "يحدد المسؤول الحد الأدنى للمتابعين؛ يعرض النظام نجح/فشل مع السبب ويبقى القرار النهائي للموظف." },
    value: { en: "Future flexibility, fewer simple code changes.", ar: "مرونة مستقبلية وتقليل التعديلات البرمجية البسيطة." },
    effort: { en: "Low", ar: "منخفض" },
    kpi: { en: "% requests auto-evaluated without extra check.", ar: "نسبة الطلبات التي قُيّمت آليًا بدون تحقق إضافي." },
    flow: [
      { en: "Request", ar: "طلب" },
      { en: "Apply rule", ar: "تطبيق القاعدة" },
      { en: "Pass / Fail", ar: "نجح/فشل" },
      { en: "Staff decision", ar: "قرار الموظف" },
    ],
  },
  {
    id: "P05",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Invitation Queue", ar: "قائمة موحدة للدعوات" },
    current: { en: "Invitation and follow-up lists are scattered across files and tools.", ar: "قوائم الدعوات والمتابعة موزعة بين ملفات وأدوات." },
    improvement: { en: "One in-system queue showing who needs an invite, replied, or follow-up.", ar: "قائمة واحدة داخل النظام توضح من يحتاج دعوة أو رد أو متابعة." },
    how: { en: "Each record carries owner, status, last action, next action, age and priority; agents see My Queue, leads see the team queue.", ar: "كل سجل يحوي المالك والحالة وآخر إجراء والقادم والأقدمية والأولوية؛ يرى كل موظف قائمته والقائد قائمة الفريق." },
    value: { en: "No lost follow-ups, better work distribution.", ar: "منع ضياع المتابعة وتحسين توزيع العمل." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "# overdue records; avg time to first contact.", ar: "عدد السجلات المتأخرة؛ متوسط زمن أول تواصل." },
    flow: [
      { en: "New lead", ar: "مؤثر جديد" },
      { en: "Queue", ar: "قائمة" },
      { en: "Agent works", ar: "عمل الموظف" },
      { en: "Update status", ar: "تحديث الحالة" },
    ],
  },
  {
    id: "P06",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Multi-Channel Invitation Templates", ar: "قوالب دعوة متعددة القنوات" },
    current: { en: "Invites go out via IG / TikTok / WhatsApp and are written ad hoc.", ar: "تُرسل الدعوات عبر إنستجرام وتيك توك وواتساب وتُكتب كل مرة." },
    improvement: { en: "An approved template library by platform, language, country and purpose.", ar: "مكتبة قوالب معتمدة حسب المنصة واللغة والبلد والغرض." },
    how: { en: "The system suggests a template; the user previews and sends, and template performance is tracked.", ar: "يقترح النظام قالبًا مناسبًا ويعرض معاينة ويرسل ويتابع أداء كل قالب." },
    value: { en: "Consistent quality, measurable messaging.", ar: "توحيد جودة التواصل وقياس الرسائل." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "Response rate by template and channel.", ar: "معدل الرد حسب القالب والقناة." },
    flow: [
      { en: "Pick channel", ar: "اختيار القناة" },
      { en: "Suggest template", ar: "اقتراح قالب" },
      { en: "Preview", ar: "معاينة" },
      { en: "Send & track", ar: "إرسال وتتبع" },
    ],
  },
  {
    id: "P07",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Activation Journey Automation", ar: "أتمتة رحلة التفعيل" },
    current: { en: "After a reply the agent sends the line number, app link and credentials and tracks registration manually.", ar: "بعد الرد يرسل الموظف رقم الخط ورابط التطبيق وبيانات الدخول ويتابع التسجيل يدويًا." },
    improvement: { en: "Turn activation into a staged journey with pause and resume rules.", ar: "تحويل التفعيل إلى رحلة بمراحل وقواعد توقف واستئناف." },
    how: { en: "The system creates an activation task and sends Line → App Link → Credentials → Registration Check per country, closing on completion.", ar: "ينشئ النظام مهمة تفعيل ويرسل الخط ثم رابط التطبيق ثم البيانات ثم فحص التسجيل حسب البلد، ويغلق عند الاكتمال." },
    value: { en: "Less manual follow-up, higher registration completion.", ar: "تقليل المتابعة اليدوية ورفع نسبة إكمال التسجيل." },
    effort: { en: "Medium–High", ar: "متوسط إلى مرتفع" },
    kpi: { en: "Avg activation time; completion rate.", ar: "متوسط زمن التفعيل؛ نسبة الإكمال." },
    flow: [
      { en: "Mark Interested", ar: "تحديد اهتمام" },
      { en: "Line", ar: "الخط" },
      { en: "App Link", ar: "رابط التطبيق" },
      { en: "Credentials", ar: "بيانات الدخول" },
      { en: "Reg Check", ar: "فحص التسجيل" },
    ],
  },
  {
    id: "P08",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Controlled Excel Import", ar: "استيراد إكسل مضبوط" },
    current: { en: "Some registration happens via a parallel Excel channel and some direct, risking uncontrolled data.", ar: "بعض التسجيل عبر إكسل موازٍ والبعض مباشر، ما يهدد جودة البيانات." },
    improvement: { en: "Keep Excel import but as a controlled, validated channel instead of a parallel source.", ar: "إبقاء استيراد إكسل لكن كقناة مضبوطة خاضعة للتحقق بدل مصدر موازٍ." },
    how: { en: "A wizard validates columns, duplicates and values, shows a preview, then commits; each batch has an import log.", ar: "يتحقق معالج من الأعمدة والتكرار والقيم ويعرض معاينة ثم يثبّت، ول each دفعة سجل استيراد." },
    value: { en: "Keep flexibility without sacrificing data quality.", ar: "الحفاظ على المرونة دون التضحية بجودة البيانات." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Import error rate; post-import corrections.", ar: "معدل أخطاء الاستيراد؛ التصحيحات بعده." },
    flow: [
      { en: "Upload Excel", ar: "رفع إكسل" },
      { en: "Validate", ar: "التحقق" },
      { en: "Preview", ar: "معاينة" },
      { en: "Commit", ar: "تثبيت" },
    ],
  },
  {
    id: "P09",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Onboarding Workload & SLA", ar: "إدارة الحمل ووقت التنفيذ" },
    current: { en: "A weekly target exists but there is no detail on load distribution or delay.", ar: "هناك هدف أسبوعي لكن دون تفصيل لتوزيع الحمل أو التأخير." },
    improvement: { en: "Per-agent capacity and SLA with a live load board.", ar: "قدرة لكل موظف وSLA مع لوحة حمل حية." },
    how: { en: "The system computes open records, average age and overdue per agent; the lead can reassign.", ar: "يحسب النظام السجلات المفتوحة ومتوسط الأقدمية والمتأخرة لكل موظف ويمكن للقائد إعادة التوزيع." },
    value: { en: "Realistic throughput measurement instead of headcount alone.", ar: "قياس واقعي للإنجاز بدل الاعتماد على العدد فقط." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "100/week target + SLA compliance + workload balance.", ar: "هدف 100 أسبوعيًا + الالتزام بـSLA + توازن الحمل." },
    flow: [
      { en: "Compute load", ar: "حساب الحمل" },
      { en: "Show board", ar: "عرض اللوحة" },
      { en: "Reassign", ar: "إعادة توزيع" },
      { en: "Meet SLA", ar: "تحقيق SLA" },
    ],
  },
  {
    id: "P10",
    area: { en: "Onboarding", ar: "التأهيل" },
    title: { en: "Data Correction Task Queue", ar: "قائمة موحدة لتعديلات البيانات" },
    current: { en: "Correction requests arrive as side messages.", ar: "تصل طلبات تعديل البيانات كرسائل جانبية." },
    improvement: { en: "Convert data-change requests into a typed task queue.", ar: "تحويل طلبات تعديل البيانات إلى قائمة مهام محددة النوع." },
    how: { en: "Any team raises a correction (field, current, proposed, reason, priority); onboarding reviews and closes it.", ar: "يرفع أي فريق تعديلًا (الحقل والقيمة الحالية والمقترحة والسبب والأولوية) ويراجعه التأهيل ويغلقه." },
    value: { en: "Better traceability, fewer lost requests.", ar: "تتبع أفضل وتقليل فقد الطلبات." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "Avg close time; reopen rate.", ar: "متوسط زمن الإغلاق؛ معدل إعادة الفتح." },
    flow: [
      { en: "Raise correction", ar: "طلب تعديل" },
      { en: "Queue", ar: "قائمة" },
      { en: "Review", ar: "مراجعة" },
      { en: "Close", ar: "إغلاق" },
    ],
  },
  // ── Campaign Handover (P11) ──
  {
    id: "P11",
    area: { en: "Campaign Handover", ar: "تسليم الحملة" },
    title: { en: "Campaign Handover Validation Gate", ar: "بوابة تحقق قبل تسليم الحملة" },
    current: { en: "Coordination receives the Communication Sheet from WhatsApp and relies on an external handover.", ar: "يستلم التنسيق شيت التواصل من واتساب ويعتمد على تسليم خارجي." },
    improvement: { en: "A validation gate checks required data completeness before the campaign starts.", ar: "بوابة تحقق تتأكد من اكتمال البيانات المطلوبة قبل بدء الحملة." },
    how: { en: "On handover the system runs a checklist (name, dates, brief, influencers, location, contacts) and blocks start if anything is missing.", ar: "عند التسليم يشغّل النظام قائمة (الاسم والتواريخ والبريف والمؤثرين والموقع والجهات) ويمنع البدء إن نقص شيء." },
    value: { en: "Less rework from missing information.", ar: "تقليل إعادة العمل نتيجة معلومات ناقصة." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "# campaigns started incomplete; rework incidents.", ar: "عدد الحملات التي بدأت ببيانات ناقصة؛ حوادث إعادة العمل." },
    flow: [
      { en: "Handover", ar: "تسليم" },
      { en: "Auto checklist", ar: "قائمة تلقائية" },
      { en: "Complete?", ar: "مكتمل؟" },
      { en: "Ready / Blocked", ar: "جاهز/محظور" },
    ],
  },
  // ── WhatsApp (P12–P15, P17) ──
  {
    id: "P12",
    area: { en: "WhatsApp", ar: "واتساب" },
    title: { en: "WhatsApp Pro Integration", ar: "ربط واتساب برو بالنظام" },
    current: { en: "Pro collects lines and chats while operational follow-up stays manual.", ar: "يجمع برو الخطوط والمحادثات وتبقى المتابعة التشغيلية يدوية." },
    improvement: { en: "Integrate the core WhatsApp Pro events with the system via API.", ar: "ربط أحداث واتساب برو الأساسية بالنظام عبر API." },
    how: { en: "The system receives Sent / Delivered / Reply timestamps and links the conversation to the influencer and campaign — no need to move all chat content.", ar: "يستقبل النظام أوقات الإرسال والتسليم والرد ويربط المحادثة بالمؤثر والحملة دون نقل كل المحتوى." },
    value: { en: "Fewer manual updates, real-time visibility.", ar: "تقليل التحديثات اليدوية وتحسين الرؤية اللحظية." },
    effort: { en: "Medium–High", ar: "متوسط إلى مرتفع" },
    kpi: { en: "% conversations auto-linked; # manual updates removed.", ar: "نسبة المحادثات المربوطة تلقائيًا؛ عدد التحديثات اليدوية الملغاة." },
    flow: [
      { en: "WhatsApp event", ar: "حدث واتساب" },
      { en: "API", ar: "API" },
      { en: "Link record", ar: "ربط السجل" },
      { en: "Update status", ar: "تحديث الحالة" },
    ],
  },
  {
    id: "P13",
    area: { en: "WhatsApp", ar: "واتساب" },
    title: { en: "Smart Reminder Engine", ar: "محرك تذكيرات مرن" },
    current: { en: "Bulk reminders go out roughly every 6 hours, sometimes after they are no longer needed.", ar: "تُرسل تذكيرات جماعية كل ~6 ساعات أحيانًا بعد انتفاء الحاجة." },
    improvement: { en: "Flexible reminder rules per campaign with stop conditions.", ar: "قواعد تذكير مرنة لكل حملة مع شروط توقف." },
    how: { en: "The campaign owner sets interval, max attempts and stop conditions; the system schedules and auto-stops on status change.", ar: "يحدد مالك الحملة الفاصل والمحاولات وشروط التوقف؛ يبرمج النظام ويتوقف تلقائيًا عند تغير الحالة." },
    value: { en: "Less repetitive work; no stale reminders.", ar: "تقليل العمل المتكرر ومنع تذكيرات ما بعد الحاجة." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Unnecessary reminders; reminders after response.", ar: "التذكيرات غير الضرورية؛ تذكير بعد الرد." },
    flow: [
      { en: "Set policy", ar: "ضبط السياسة" },
      { en: "Schedule", ar: "جدولة" },
      { en: "Send", ar: "إرسال" },
      { en: "Auto-stop", ar: "توقف تلقائي" },
    ],
  },
  {
    id: "P14",
    area: { en: "WhatsApp", ar: "واتساب" },
    title: { en: "Structured Response Capture", ar: "التقاط الردود المنظمة" },
    current: { en: "The agent reads the reply and decides the next action manually.", ar: "يقرأ الموظف الرد ويقرر الإجراء التالي يدويًا." },
    improvement: { en: "Use quick replies, buttons or keywords to capture structured responses.", ar: "استخدام ردود سريعة أو أزرار أو كلمات مفتاحية لالتقاط ردود منظمة." },
    how: { en: "If a reply matches an approved option (Interested / Not / Need details) the system logs the type and suggests the next action.", ar: "إذا طابق الرد خيارًا معتمدًا (مهتم/لا/يحتاج تفاصيل) يسجل النظام النوع ويقترح الإجراء التالي." },
    value: { en: "Faster reading and classification of repetitive replies.", ar: "تسريع قراءة وتصنيف الردود المتكررة." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "% replies classified without intervention.", ar: "نسبة الردود المصنفة بدون تدخل." },
    flow: [
      { en: "Influencer reply", ar: "رد المؤثر" },
      { en: "Match option", ar: "مطابقة الخيار" },
      { en: "Log type", ar: "تسجيل النوع" },
      { en: "Suggest action", ar: "اقتراح إجراء" },
    ],
  },
  {
    id: "P15",
    area: { en: "WhatsApp", ar: "واتساب" },
    title: { en: "Next Best Action", ar: "الإجراء التالي المقترح" },
    current: { en: "The agent relies on memory to know what to do next.", ar: "يعتمد الموظف على ذاكرته لمعرفة الخطوة التالية." },
    improvement: { en: "The system shows the next best action from status, last action and deadline.", ar: "يعرض النظام الإجراء التالي الأنسب حسب الحالة وآخر إجراء والموعد." },
    how: { en: "The queue shows Send Reminder / Create RFA / Send Brief / Follow-up Visit / Review Coverage / Escalate.", ar: "تعرض القائمة إرسال تذكير أو إنشاء طلب عميل أو إرسال بريف أو متابعة زيارة أو مراجعة تغطية أو تصعيد." },
    value: { en: "Standardized work, less reliance on individual memory.", ar: "توحيد طريقة العمل وتقليل الاعتماد على الخبرة الفردية." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "% overdue tasks; avg handling time.", ar: "نسبة المهام المتأخرة؛ متوسط زمن المعالجة." },
    flow: [
      { en: "Record status", ar: "حالة السجل" },
      { en: "Compute action", ar: "حساب الإجراء" },
      { en: "Show in queue", ar: "عرض في القائمة" },
      { en: "Agent acts", ar: "إجراء الموظف" },
    ],
  },
  {
    id: "P17",
    area: { en: "WhatsApp", ar: "واتساب" },
    title: { en: "Confirmation & Brief Automation", ar: "تنظيم التأكيد وإرسال البريف" },
    current: { en: "After approval the brief and appointment details are sent and tracked separately.", ar: "بعد الموافقة يُرسل البريف وتفاصيل الموعد ويتابعان بشكل منفصل." },
    improvement: { en: "Confirmation and brief become one automated checklist after requirements are met.", ar: "يصبح التأكيد والبريف قائمة مؤتمتة واحدة بعد استيفاء المتطلبات." },
    how: { en: "On Approved the system sends or prepares the brief with date/time/location/instructions and requests acknowledgement.", ar: "عند الاعتماد يرسل النظام البريف بتاريخ ومكان وتعليمات ويطلب إقرارًا." },
    value: { en: "Fewer information errors, better documentation.", ar: "تقليل أخطاء المعلومات وتحسين التوثيق." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Brief error rate; reconfirmation rate.", ar: "معدل أخطاء البريف؛ معدل إعادة التأكيد." },
    flow: [
      { en: "Approved", ar: "معتمد" },
      { en: "Confirm checklist", ar: "قائمة تأكيد" },
      { en: "Send brief", ar: "إرسال البريف" },
      { en: "Acknowledge", ar: "إقرار" },
    ],
  },
  // ── Approval (P16) ──
  {
    id: "P16",
    area: { en: "Approval", ar: "الموافقة" },
    title: { en: "Approval SLA & Escalation", ar: "وقت للموافقة وتصعيد تلقائي" },
    current: { en: "The request for approval waits on the client with no clear trigger and may delay.", ar: "ينتظر طلب الموافقة قرار العميل دون سقف واضح وربما يتأخر." },
    improvement: { en: "Define an SLA for approval with alert and escalation based on deadline and impact.", ar: "تعريف SLA للموافقة مع تنبيه وتصعيد حسب الموعد والتأثير." },
    how: { en: "A timer starts at RFA creation; an alert fires before SLA; escalation carries full context to the owner.", ar: "يبدأ مؤقت عند إنشاء الطلب وتنبيه قبل انتهاء SLA وتصعيد بسياق كامل للمسؤول." },
    value: { en: "Less delay, better escalation quality.", ar: "تقليل التأخير وتحسين جودة التصعيد." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "Approval turnaround; SLA breach rate.", ar: "زمن الموافقة؛ معدل تجاوز SLA." },
    flow: [
      { en: "Create RFA", ar: "إنشاء طلب" },
      { en: "Start timer", ar: "بدء المؤقت" },
      { en: "Alert", ar: "تنبيه" },
      { en: "Escalate", ar: "تصعيد" },
    ],
  },
  // ── Visit (P18) ──
  {
    id: "P18",
    area: { en: "Visit", ar: "الزيارة" },
    title: { en: "Visit Exception Management", ar: "إدارة حالات عدم الحضور والاستثناءات" },
    current: { en: "A missed visit flips automatically after the QR / appointment time and the scenario ends.", ar: "تتحول الزيارة المفقودة تلقائيًا بعد الموعد وتنتهي السيناريو." },
    improvement: { en: "Add a clear post-missed-visit workflow.", ar: "إضافة مسار واضح لما بعد الزيارة المفقودة." },
    how: { en: "On Missed Visit the system creates a task (reason capture, contact, reschedule / client decision / close); the reason becomes structured data.", ar: "عند الضياع ينشئ النظام مهمة (سبب واتصال وإعادة جدولة أو قرار عميل أو إغلاق) ويصبح السبب بيانات منظمة." },
    value: { en: "Distinguish real no-show from operational error.", ar: "تمييز الغياب الحقيقي عن أخطاء التشغيل." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "Missed-visit reasons; resolution time.", ar: "أسباب الغياب؛ زمن الحل." },
    flow: [
      { en: "Missed Visit", ar: "زيارة مفقودة" },
      { en: "Capture reason", ar: "التقاط السبب" },
      { en: "Reschedule / Decide", ar: "إعادة جدولة/قرار" },
      { en: "Close", ar: "إغلاق" },
    ],
  },
  // ── Coverage (P19–P21) ──
  {
    id: "P19",
    area: { en: "Coverage", ar: "التغطية" },
    title: { en: "Automated Coverage Candidate Collection", ar: "جمع المحتوى المحتمل تلقائيًا" },
    current: { en: "The agent manually browses Reels / Stories to find campaign content.", ar: "يدخل الموظف يدويًا على الريلز والستوريز للبحث عن المحتوى." },
    improvement: { en: "Auto-collect available content within the campaign window and show candidates.", ar: "جمع المحتوى المتاح تلقائيًا ضمن نافذة الحملة وعرض المرشحين." },
    how: { en: "A system or service scrapes within the time window and saves thumbnails, links and metadata.", ar: "يجمع النظام أو خدمة المحتوى ضمن الفترة ويحفظ الصور والم links والبيانات." },
    value: { en: "Removes a large part of manual search.", ar: "إلغاء جزء كبير من البحث اليدوي." },
    effort: { en: "High", ar: "مرتفع" },
    kpi: { en: "Content retrieval success; coverage review time per influencer.", ar: "معدل نجاح جمع المحتوى؛ زمن مراجعة التغطية لكل مؤثر." },
    flow: [
      { en: "Campaign window", ar: "نافذة الحملة" },
      { en: "Auto scrape", ar: "جمع تلقائي" },
      { en: "Collect candidates", ar: "جمع المرشحين" },
      { en: "Review", ar: "مراجعة" },
    ],
  },
  {
    id: "P20",
    area: { en: "Coverage", ar: "التغطية" },
    title: { en: "Campaign Content Matching", ar: "ترشيح المحتوى المرتبط بالحملة" },
    current: { en: "The agent manually decides which video belongs to the campaign.", ar: "يقرر الموظف يدويًا أي فيديو يخص الحملة." },
    improvement: { en: "After collection the system suggests matches with reasons.", ar: "بعد الجمع يقترح النظام المطابقات مع الأسباب." },
    how: { en: "Each item shows a match score and reason (date, brand mention, hashtag); the agent chooses Match / Not / Review.", ar: "يعرض كل عنصر درجة مطابقة وسببًا (تاريخ أو ذكر البراند أو هاشتاق) ويختار الموظف مطابق/لا/مراجعة." },
    value: { en: "Turns review from manual search into a guided task.", ar: "تحويل المراجعة من بحث يدوي إلى موجّه." },
    effort: { en: "High", ar: "مرتفع" },
    kpi: { en: "Match precision; review time.", ar: "دقة المطابقة؛ زمن المراجعة." },
    flow: [
      { en: "Collect", ar: "جمع" },
      { en: "Score & reason", ar: "درجة وسسب" },
      { en: "Agent decision", ar: "قرار الموظف" },
    ],
  },
  {
    id: "P21",
    area: { en: "Coverage", ar: "التغطية" },
    title: { en: "Coverage Requirement Tracker", ar: "تتبع المطلوب مقابل المنفذ" },
    current: { en: "Tracking depends on post-execution review.", ar: "المتابعة تعتمد على مراجعة بعد التنفيذ." },
    improvement: { en: "Show required vs completed vs remaining per influencer live.", ar: "عرض المطلوب مقابل المنفذ والمتبقي لكل مؤثر لحظيًا." },
    how: { en: "The campaign defines the requirement (e.g. 2 Reels + Stories); the counter updates on validation and shows remaining.", ar: "تعرّف الحملة المطلوب (مثل 2 ريلز + ستوريز) ويتحدث العداد عند التحقق ويعرض المتبقي." },
    value: { en: "Instant view of gaps instead of zero-based manual review.", ar: "رؤية فورية للناقص بدل مراجعة يدوية." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Coverage completion rate; remaining aging.", ar: "نسبة إكمال التغطية؛ أقدمية المتبقي." },
    flow: [
      { en: "Define requirement", ar: "تحديد المطلوب" },
      { en: "Validate content", ar: "تحقق المحتوى" },
      { en: "Update counter", ar: "تحديث العداد" },
      { en: "Show remaining", ar: "عرض المتبقي" },
    ],
  },
  // ── Reporting (P22) ──
  {
    id: "P22",
    area: { en: "Reporting", ar: "التقارير" },
    title: { en: "Client Report Content Assistant", ar: "مساعد اختيار محتوى التقرير" },
    current: { en: "The agent manually picks the videos added to the report.", ar: "يختار الموظف يدويًا الفيديوهات التي تُضاف للتقرير." },
    improvement: { en: "Auto-suggest qualified content for the report with human review.", ar: "اقتراح تلقائي للمحتوى المؤهل للتقرير مع مراجعة بشرية." },
    how: { en: "The report queue shows a preview (influencer, type, date, metrics) with Include / Exclude; only validated coverage enters.", ar: "تعرض قائمة التقرير معاينة (مؤثر ونوع وتاريخ ومؤشرات) مع تضمين/استبعاد ولا يدخل سوى المحتوى المعتمد." },
    value: { en: "Less report prep time, more consistency.", ar: "تقليل وقت الإعداد وزيادة الاتساق." },
    effort: { en: "Medium–High", ar: "متوسط إلى مرتفع" },
    kpi: { en: "Report prep time; post-review edits.", ar: "زمن تجهيز التقرير؛ التعديلات بعد المراجعة." },
    flow: [
      { en: "Validated content", ar: "محتوى معتمد" },
      { en: "Suggest", ar: "اقتراح" },
      { en: "Include / Exclude", ar: "تضمين/استبعاد" },
      { en: "Build report", ar: "بناء التقرير" },
    ],
  },
  // ── Analytics (P23–P26) ──
  {
    id: "P23",
    area: { en: "Analytics", ar: "التحليلات" },
    title: { en: "Operational Funnel Dashboard", ar: "لوحة تحويل تشغيلية" },
    current: { en: "There is no funnel; management discusses the need for better KPIs.", ar: "لا توجد لوحة تحويل وتتحدث الإدارة عن الحاجة لمؤشرات أفضل." },
    improvement: { en: "A funnel dashboard: Contacted → Responded → RFA → Approved → Confirmed → Visit → Coverage.", ar: "لوحة تحويل: تم التواصل ← رد ← طلب عميل ← اعتماد ← تأكيد ← زيارة ← تغطية." },
    how: { en: "Management selects campaign / period / team, reads counts, ratios and aging, and drills down to records.", ar: "تختار الإدارة الحملة والفترة والفريق وتقرأ الأعداد والنسب والأقدمية وتنزل للسجلات." },
    value: { en: "Find the real drop-off instead of relying on impression.", ar: "تحديد مكان التسرب الحقيقي بدل الانطباع." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Dashboard adoption; data completeness; conversion rates.", ar: "اعتماد اللوحة؛ اكتمال البيانات؛ معدلات التحويل." },
    flow: [
      { en: "Select filter", ar: "اختيار الفلتر" },
      { en: "Show funnel", ar: "عرض التحويل" },
      { en: "Drill down", ar: "تفصيل" },
      { en: "Act", ar: "إجراء" },
    ],
  },
  {
    id: "P24",
    area: { en: "Analytics", ar: "التحليلات" },
    title: { en: "Data Reconciliation", ar: "مطابقة بيانات النظام مع الشيتات" },
    current: { en: "Moving from Sheets to the dashboard risks mismatched numbers.", ar: "الانتقال من الشيتات للوحة يخاطر باختلاف الأرقام." },
    improvement: { en: "A transitional tracker comparing system totals against the tracker.", ar: "متتبع انتقالي يقارن إجماليات النظام بالمتتبع." },
    how: { en: "The dashboard shows system count, tracker count, difference and last reconciliation; a threshold breach creates a data-quality task.", ar: "تعرض اللوحة عدد النظام وعدد المتتبع والفرق وآخر مطابقة؛ وتجاوز الفارق يولد مهمة جودة بيانات." },
    value: { en: "Build management trust before dropping the sheets.", ar: "بناء ثقة الإدارة قبل إلغاء الشيتات." },
    effort: { en: "Low–Medium", ar: "منخفض إلى متوسط" },
    kpi: { en: "Reconciliation difference %.", ar: "نسبة فرق المطابقة." },
    flow: [
      { en: "System vs tracker", ar: "النظام مقابل المتتبع" },
      { en: "Difference", ar: "الفرق" },
      { en: "Threshold?", ar: "تجاوز؟" },
      { en: "Quality task", ar: "مهمة جودة" },
    ],
  },
  {
    id: "P25",
    area: { en: "Analytics", ar: "التحليلات" },
    title: { en: "Influencer Operational Performance Score", ar: "تقييم الالتزام التشغيلي" },
    current: { en: "Response, confirmation, visit and coverage data exists but is not unified.", ar: "توجد بيانات الرد والتأكيد والزيارة والتغطية لكن غير موحدة." },
    improvement: { en: "An internal score measuring operational reliability across campaigns.", ar: "درجة داخلية تقيس الالتزام التشغيلي عبر الحملات." },
    how: { en: "The profile shows a breakdown (response, confirmation, visit, coverage reliability); weights are set by management and reasons are shown, not just a number.", ar: "يعرض الملف تفصيلًا (موثوقية الرد والتأكيد والزيارة والتغطية) وتحدد الإدارة الأوزان وتظهر الأسباب لا الرقم فقط." },
    value: { en: "Help teams choose and follow up without relying on memory.", ar: "مساعدة الفرق في الاختيار والمتابعة دون الذاكرة." },
    effort: { en: "High", ar: "مرتفع" },
    kpi: { en: "Score vs execution success correlation.", ar: "ارتباط الدرجة بنجاح التنفيذ." },
    flow: [
      { en: "Gather signals", ar: "جمع الإشارات" },
      { en: "Compute score", ar: "حساب الدرجة" },
      { en: "Show breakdown", ar: "عرض التفصيل" },
      { en: "Use in selection", ar: "استخدام في الاختيار" },
    ],
  },
  {
    id: "P26",
    area: { en: "Analytics", ar: "التحليلات" },
    title: { en: "Recommendation Engine", ar: "محرك ترشيح للحملات" },
    current: { en: "Influencers are recommended via past participation and team knowledge.", ar: "يُرشح المؤثرون عبر المشاركات السابقة ومعرفة الفريق." },
    improvement: { en: "A ranked recommendation list based on performance, history and criteria.", ar: "قائمة ترشيحات مرتبة حسب الأداء والتاريخ والمعايير." },
    how: { en: "The user enters requirements; the system generates recommendations with reasons (country, past success, visit rate).", ar: "يدخل المستخدم المتطلبات فيولّد النظام ترشيحات مع أسباب (البلد والنجاح السابق ومعدل الزيارة)." },
    value: { en: "Faster selection, codified knowledge.", ar: "تسريع الاختيار وتحويل المعرفة إلى بيانات." },
    effort: { en: "Very High", ar: "مرتفع جدًا" },
    kpi: { en: "Recommendation acceptance; vs manual success.", ar: "معدل قبول الترشيحات؛ مقارنة بالاختيار اليدوي." },
    flow: [
      { en: "Enter requirements", ar: "إدخال المتطلبات" },
      { en: "Generate list", ar: "توليد القائمة" },
      { en: "Review", ar: "مراجعة" },
      { en: "Adopt", ar: "اعتماد" },
    ],
  },
  // ── Governance (P27–P28) ──
  {
    id: "P27",
    area: { en: "Governance", ar: "الحوكمة" },
    title: { en: "Full Audit Trail", ar: "تدقيق سجل موحد" },
    current: { en: "With more automation, knowing who changed what, when and why matters.", ar: "مع زيادة الأتمتة يصبح معرفة من غيّر ماذا ومتى ولماذا مهمًا." },
    improvement: { en: "A unified timeline logging every key event.", ar: "خط زمني موحد يسجل كل حدث مهم." },
    how: { en: "The log captures status change, owner change, message, approval, override, import, coverage validation and report selection.", ar: "يسجل الخط تغيير الحالة والمالك والرسالة والموافقة والتجاوز والاستيراد وتحقق التغطية واختيار التقرير." },
    value: { en: "Operational protection, easy error investigation.", ar: "حماية تشغيلية وسهولة التحقيق في الأخطاء." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "% changes traceable; incident analysis time.", ar: "نسبة التغييرات القابلة للتتبع؛ زمن تحليل الحوادث." },
    flow: [
      { en: "Event occurs", ar: "حدوث حدث" },
      { en: "Log to timeline", ar: "تسجيل في الخط" },
      { en: "Available for audit", ar: "متاح للتدقيق" },
    ],
  },
  {
    id: "P28",
    area: { en: "Governance", ar: "الحوكمة" },
    title: { en: "Automation Monitoring & Exception Center", ar: "مركز متابعة الأتمتة والاستثناءات" },
    current: { en: "More automation and integrations mean silent failures can cause bigger errors.", ar: "زيادة الأتمتة والتكاملات تعني فشلًا صامتًا قد يسبب أخطاء أكبر." },
    improvement: { en: "A center collecting automation and integration errors that need intervention.", ar: "مركز يجمع أخطاء الأتمتة والتكامل التي تحتاج تدخلًا." },
    how: { en: "It shows error type, affected record, retry count, last attempt, owner and suggested action; you can retry or assign.", ar: "يعرض نوع الخطأ والسجل المتأثر وعدد المحاولات وآخر محاولة والمسؤول والإجراء المقترح ويمكن إعادة المحاولة أو الإسناد." },
    value: { en: "Make automation manageable, not an invisible background process.", ar: "جعل الأتمتة قابلة للإدارة لا عملية خلفية غير مرئية." },
    effort: { en: "Medium", ar: "متوسط" },
    kpi: { en: "Automation success rate; mean time to resolve.", ar: "معدل نجاح الأتمتة؛ متوسط زمن الحل." },
    flow: [
      { en: "Failure detected", ar: "رصد فشل" },
      { en: "Log to center", ar: "تسجيل في المركز" },
      { en: "Suggest action", ar: "اقتراح إجراء" },
      { en: "Retry / Assign", ar: "إعادة/إسناد" },
    ],
  },
];

// Area ordering for section rendering
const AREA_ORDER: Bi[] = [
  { en: "Onboarding", ar: "التأهيل" },
  { en: "Campaign Handover", ar: "تسليم الحملة" },
  { en: "WhatsApp", ar: "واتساب" },
  { en: "Approval", ar: "الموافقة" },
  { en: "Visit", ar: "الزيارة" },
  { en: "Coverage", ar: "التغطية" },
  { en: "Reporting", ar: "التقارير" },
  { en: "Analytics", ar: "التحليلات" },
  { en: "Governance", ar: "الحوكمة" },
];

const PRINCIPLES: { icon: React.ReactNode; en: string; ar: string }[] = [
  { icon: <Layers className="h-5 w-5" />, en: "Enter data once, reuse it everywhere instead of re-copying.", ar: "إدخال البيانات مرة واحدة وإعادة استخدامها بدل تكرار النقل." },
  { icon: <Bot className="h-5 w-5" />, en: "Keep the human decision where acceptance and key reviews matter.", ar: "إبقاء القرار البشري في القبول والمراجعات المهمة." },
  { icon: <Zap className="h-5 w-5" />, en: "Automate the repetitive steps that need no human judgment.", ar: "أتمتة الخطوات المتكررة التي لا تحتاج حكمًا بشريًا." },
  { icon: <GitBranch className="h-5 w-5" />, en: "Every team sees current status, last action and next step in one place.", ar: "كل فريق يرى الحالة وآخر إجراء والخطوة التالية من مكان واضح." },
  { icon: <ShieldCheck className="h-5 w-5" />, en: "Every important change carries history, source and owner.", ar: "كل تغي±ر مهم له تاريخ ومصدر ومسؤول." },
  { icon: <Target className="h-5 w-5" />, en: "Measure the impact of any change before and after rollout.", ar: "قياس أثر أي تطوير قبل وبعد التنفيذ." },
  { icon: <ListChecks className="h-5 w-5" />, en: "Each proposal is an option for discussion, not a final execution decision.", ar: "كل اقتراح هنا هو بديل للنقاش وليس قرار تنفيذ نهائي." },
];

function Field({ label, bi, mode }: { label: { en: string; ar: string }; bi: Bi; mode: LangMode }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: TRYGC.lavender }}>
        <BiText bi={label} mode={mode} />
      </div>
      <div className="text-sm" style={{ color: "var(--text)" }}>
        <BiText bi={bi} mode={mode} />
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export function AutomationProposalPage({ mode }: { mode: LangMode }) {
  const isRTL = mode === "AR";

  const summaryRows: React.ReactNode[][] = PROPOSALS.map((p) => [
    <span key={p.id} style={{ fontWeight: 800, color: TRYGC.orange }}>{p.id}</span>,
    <BiText key="a" bi={p.area} mode={mode} />,
    <BiText key="t" bi={p.title} mode={mode} />,
    <span key="v">{p.value.en}</span>,
    <Pill key="e" text={p.effort.en} tone={effortTone(p.effort.en)} />,
  ]);

  const summaryHeaders: React.ReactNode[] = [
    "#",
    isRTL ? "المجال" : "Area",
    isRTL ? "الاقتراح" : "Proposal",
    isRTL ? "القيمة" : "Value",
    isRTL ? "المجهود" : "Effort",
  ];

  return (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-xl p-2" style={{ background: TRYGC.orange + "22", color: TRYGC.orange }}>
            <Zap className="h-6 w-6" />
          </div>
          <H
            title={{ en: "Automation & UI Improvement Proposal", ar: "مقترح تحسين وأتمتة وواجهة المستخدم" }}
            mode={mode}
            subtitle={{ en: "3GC | Influencer Onboarding & WhatsApp — Automation & UI Proposal | V4.2 (rephrased)", ar: "3GC | تأهيل المؤثرين وواتساب — مقترح الأتمتة والواجهة | V4.2 (بصياغة معاد صياغتها)" }}
          />
        </div>
        <KBCard mode={mode} title={{ en: "Document Context", ar: "سياق المستند" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ color: "var(--text)" }}>
            <Field label={{ en: "Prepared for", ar: "مُعَدّ لـ" }} bi={{ en: "Management Review", ar: "لمراجعة الإدارة" }} mode={mode} />
            <Field label={{ en: "Scope", ar: "النطاق" }} bi={{ en: "Influencer Onboarding + WhatsApp + Coverage / Reporting", ar: "تأهيل المؤثرين + واتساب + التغطية/التقارير" }} mode={mode} />
            <Field label={{ en: "Version", ar: "الإصدار" }} bi={{ en: "V4.2 — Improvement-Focused Draft", ar: "V4.2 — مسودة محورها التحسين" }} mode={mode} />
            <Field label={{ en: "Date", ar: "التاريخ" }} bi={{ en: "15 August 2026", ar: "15 أغسطس 2026" }} mode={mode} />
          </div>
          <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>
            <BiText
              bi={{
                en: "Method: the current state is described only to the extent needed to understand the problem. The focus is on proposed improvements and how they would operate in future. Every proposal here is an option for discussion, not a final execution decision.",
                ar: "المنهج: يُذكر الوضع الحالي بالقدر اللازم لفهم المشكلة، والتركيز على التحسينات المقترحة وطريقة تشغيلها مستقبلًا. أي اقتراح هنا بديل للنقاش وليس قرار تنفيذ نهائي.",
              }}
              mode={mode}
            />
          </p>
        </KBCard>
      </div>

      {/* Objective & Scope */}
      <div className="space-y-3">
        <H title={{ en: "Objective & Scope", ar: "الهدف والنطاق" }} mode={mode} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KBCard mode={mode} title={{ en: "Objective", ar: "الهدف" }}>
            <p className="text-sm" style={{ color: "var(--text)" }}>
              <BiText
                bi={{
                  en: "Provide management with a clear executive picture of the key improvement points across influencer onboarding, activation and campaign communication — with operational and technical solutions at varying cost levels. The aim is not to describe the current system in detail, but to define what should improve, why, and how the proposed solution could work.",
                  ar: "تقديم صورة تنفيذية واضحة للإدارة عن أهم نقاط التحسين في رحلة تسجيل وتفعيل المؤثرين والتواصل معهم، مع حلول تشغيلية وتقنية بدرجات تكلفة مختلفة. الهدف ليس وصف النظام الحالي بالتفصيل بل تحديد ما الذي يجب تحسينه ولماذا وكيف يعمل الحل.",
                }}
                mode={mode}
              />
            </p>
          </KBCard>
          <KBCard mode={mode} title={{ en: "In Scope", ar: "ضمن النطاق" }}>
            <ul className="text-sm space-y-1" style={{ color: "var(--text)" }}>
              {[
                { en: "Influencer onboarding & activation", ar: "تأهيل وتفعيل المؤثرين" },
                { en: "WhatsApp communication & response handling", ar: "تواصل واتساب ومعالجة الردود" },
                { en: "Campaign handover & approvals", ar: "تسليم الحملة والموافقات" },
                { en: "Coverage, reporting & analytics", ar: "التغطية والتقارير والتحليلات" },
                { en: "Governance & automation monitoring", ar: "الحوكمة ومتابعة الأتمتة" },
              ].map((s, i) => (
                <li key={i}>• <BiText bi={s} mode={mode} /></li>
              ))}
            </ul>
            <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
              <BiText
                bi={{
                  en: "Out of scope: employee onboarding (company-wide) and re-distributing Community / Operations roles — handled as separate tracks.",
                  ar: "خارج النطاق: تأهيل الموظفين (على مستوى الشركة) وإعادة توزيع أدوار الكوميونيتي والعمليات — تُعالج كمسارات منفصلة.",
                }}
                mode={mode}
              />
            </p>
          </KBCard>
        </div>
      </div>

      {/* Principles */}
      <div className="space-y-3">
        <H title={{ en: "Solution Principles", ar: "مبادئ الحل المقترح" }} mode={mode} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="rounded-2xl p-4 flex gap-3" style={{ background: "var(--card)", border: "1px solid var(--line)" }}>
              <div style={{ color: TRYGC.orange }}>{p.icon}</div>
              <p className="text-sm" style={{ color: "var(--text)" }}>
                {mode === "AR" ? p.ar : mode === "EN" ? p.en : `${p.en} · ${p.ar}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div className="space-y-3">
        <H title={{ en: "Proposal Summary (P01–P28)", ar: "ملخص المقترحات (P01–P28)" }} mode={mode} />
        <KBCard mode={mode} noPadding>
          <div className="overflow-x-auto">
            <SimpleTable headers={summaryHeaders} rows={summaryRows} />
          </div>
        </KBCard>
      </div>

      {/* Detailed proposals by area */}
      <div className="space-y-6">
        <H title={{ en: "Detailed Proposals & Regenerated Flows", ar: "المقترحات التفصيلية والعمليات المولّدة من جديد" }} mode={mode} />
        {AREA_ORDER.map((area) => {
          const items = PROPOSALS.filter((p) => p.area.en === area.en);
          if (!items.length) return null;
          return (
            <div key={area.en} className="space-y-3">
              <SectionDivider label={isRTL ? area.ar : area.en} />
              {items.map((p) => {
                const flowSteps = (mode === "AR" ? p.flow.map((f) => f.ar) : p.flow.map((f) => f.en)).map((t) => ({ text: t }));
                const svg = buildFlowSVG({ title: `${p.id} · ${mode === "AR" ? p.title.ar : p.title.en}`, steps: flowSteps, colors: flowColors });
                return (
                  <Accordion
                    key={p.id}
                    mode={mode}
                    title={{ en: `${p.id} — ${p.title.en}`, ar: `${p.id} — ${p.title.ar}` }}
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label={{ en: "Current state", ar: "الوضع الحالي" }} bi={p.current} mode={mode} />
                        <Field label={{ en: "Proposed improvement", ar: "التحسين المقترح" }} bi={p.improvement} mode={mode} />
                        <Field label={{ en: "How it works", ar: "كيف سيعمل" }} bi={p.how} mode={mode} />
                        <Field label={{ en: "Expected value", ar: "القيمة المتوقعة" }} bi={p.value} mode={mode} />
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: TRYGC.lavender }}>
                            <BiText bi={{ en: "Effort / Cost", ar: "المجهود/التكلفة" }} mode={mode} />
                          </div>
                          <Pill text={p.effort.en} tone={effortTone(p.effort.en)} />
                        </div>
                        <Field label={{ en: "Success KPI", ar: "مؤشر النجاح" }} bi={p.kpi} mode={mode} />
                      </div>
                      <DiagramCard
                        title={{ en: `${p.id} Regenerated Flow`, ar: `مسار ${p.id} المولّد من جديد` }}
                        mode={mode}
                        svg={svg}
                      />
                    </div>
                  </Accordion>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Priorities */}
      <div className="space-y-3">
        <H title={{ en: "Priorities", ar: "الأولويات" }} mode={mode} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: "Priority 1 — Operational Base", ar: "الأولوية 1 — أساس التشغيل", ids: "P27, P23, P16, P13, P11, P05, P03", d: "Reduces chaos and duplication; proves status, follow-up and measurement." },
            { t: "Priority 2 — Reduce Manual Work", ar: "الأولوية 2 — تقليل الشغل اليدوي", ids: "P01, P02, P06, P07, P08, P10, P12, P14, P18, P17, P15", d: "Cuts transfer and manual follow-up, improves speed." },
            { t: "Priority 3 — Coverage & Reporting", ar: "الأولوية 3 — التغطية والتقارير", ids: "P19, P20, P21, P22", d: "Highest effort but biggest chance to reduce rework post-execution." },
            { t: "Priority 4 — Advanced Analytics", ar: "الأولوية 4 — تحليلات متقدمة", ids: "P28, P26, P25, P24", d: "Needs stable data and mature integrations before full investment." },
          ].map((pr, i) => (
            <KBCard key={i} mode={mode} title={{ en: pr.t, ar: pr.t }}>
              <p className="text-sm mb-2" style={{ color: "var(--text)" }}>{pr.d}</p>
              <Pill text={pr.ids} tone="info" />
            </KBCard>
          ))}
        </div>
      </div>

      {/* Investment options */}
      <div className="space-y-3">
        <H title={{ en: "Investment Options for Management", ar: "خيارات الاستثمار للإدارة" }} mode={mode} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Option A — Quick Wins", ar: "الخيار أ — مكاسب سريعة", d: "P23, P18, P16, P13, P11, P05, P03", note: "Fast results at lowest cost and technical change." },
            { t: "Option B — Transformation", ar: "الخيار ب — تحول متوسط", d: "Option A + P01, P02, P06, P07, P08, P10, P27, P21, P17, P15, P14, P12", note: "Management wants to cut most manual work and connect tools." },
            { t: "Option C — Advanced Automation", ar: "الخيار ج — أتمتة متقدمة", d: "Option B + P19, P20, P22, P24, P25, P26, P28", note: "Company targets scale and is ready for higher automation investment." },
          ].map((o, i) => (
            <KBCard key={i} mode={mode} title={{ en: o.t, ar: o.t }}>
              <p className="text-sm mb-2" style={{ color: "var(--text)" }}>{o.note}</p>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                <BiText bi={{ en: "Includes: ", ar: "يشمل: " }} mode={mode} />{o.d}
              </div>
            </KBCard>
          ))}
        </div>
      </div>

      {/* Success metrics */}
      <div className="space-y-3">
        <H title={{ en: "Proposed Success Metrics", ar: "مؤشرات النجاح المقترحة" }} mode={mode} />
        <KBCard mode={mode} noPadding>
          <div className="overflow-x-auto">
            <SimpleTable
              headers={[isRTL ? "المؤشر" : "Metric", isRTL ? "التعريف" : "Definition"]}
              rows={[
                [<BiText key="m1" bi={{ en: "Completed registrations / week", ar: "التسجيلات المكتملة أسبوعيًا" }} mode={mode} />, <span key="d1">Onboarding · keep 100/week target</span>],
                [<BiText key="m2" bi={{ en: "Invitation response rate", ar: "معدل رد الدعوات" }} mode={mode} />, <span key="d2">Onboarding</span>],
                [<BiText key="m3" bi={{ en: "Activation completion rate", ar: "نسبة إكمال التفعيل" }} mode={mode} />, <span key="d3">Onboarding</span>],
                [<BiText key="m4" bi={{ en: "Duplicates prevented", ar: "التكرار الممنوع" }} mode={mode} />, <span key="d4">Before outreach</span>],
                [<BiText key="m5" bi={{ en: "Avg time to first contact", ar: "متوسط زمن أول تواصل" }} mode={mode} />, <span key="d5">Queue</span>],
                [<BiText key="m6" bi={{ en: "Approval turnaround", ar: "زمن الموافقة" }} mode={mode} />, <span key="d6">Approval SLA</span>],
                [<BiText key="m7" bi={{ en: "Coverage completion rate", ar: "نسبة إكمال التغطية" }} mode={mode} />, <span key="d7">Coverage</span>],
                [<BiText key="m8" bi={{ en: "Automation success rate", ar: "معدل نجاح الأتمتة" }} mode={mode} />, <span key="d8">Governance</span>],
              ]}
            />
          </div>
        </KBCard>
      </div>

      {/* Next steps */}
      <div className="space-y-3">
        <H title={{ en: "Next Steps After Approval", ar: "الخطوة التالية بعد الاعتماد" }} mode={mode} />
        <KBCard mode={mode} title={{ en: "Four States per Proposal", ar: "أربع حالات لكل مقترح" }}>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            <BiText
              bi={{
                en: "After management review, each proposal moves to one of four states: Approved for execution now, Pilot (limited trial), Later phase, or Rejected. Only then are selected proposals converted into detailed Requirements, Workflows and Wireframes for final System Design.",
                ar: "بعد مراجعة الإدارة ينتقل كل مقترح إلى إحدى أربع حالات: معتمد للتنفيذ الآن، تجربة محدودة، مرحلة لاحقة، أو مرفوض. فقط بعدها تُحوَّل المقترحات المختارة إلى متطلبات وتدفقات ورسومات واجهة مفصلة لتصميم النظام النهائي.",
              }}
              mode={mode}
            />
          </p>
        </KBCard>
      </div>
    </div>
  );
}
