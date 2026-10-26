import React from "react";
import { Star, Copy, Users, AlertTriangle, Search } from "lucide-react";
import { LangMode, Bi, BiText, H, PageMeta, KBCard, Pill, CopyButton, Accordion, TRYGC, cx } from "./kb-types";

interface Template {
  id: number;
  scenario: Bi;
  tags: string[];
  en: string;
  ar: string;
  variables: string[];
}

const INFLUENCER_TEMPLATES: Template[] = [
  {
    id: 1,
    scenario: { en: "Invitation", ar: "الدعوة" },
    tags: ["Invite", "Kickoff"],
    en: `Hi {{InfluencerName}},
We're inviting you to participate in {{CampaignName}} on {{VisitDate}}.
Please confirm availability so we can share full details.
Thank you 🙏`,
    ar: `مرحبًا {{InfluencerName}}،
نحب نشاركك في حملة {{CampaignName}} بتاريخ {{VisitDate}}.
نرجو تأكيد التوفر لإرسال التفاصيل كاملة.
شكرًا 🙏`,
    variables: ["InfluencerName", "CampaignName", "VisitDate"],
  },
  {
    id: 2,
    scenario: { en: "Reminder #2 (Final)", ar: "تذكير #2 (نهائي)" },
    tags: ["Reminder", "Final"],
    en: `Hi {{InfluencerName}},
This is our final reminder regarding {{CampaignName}}.
If we don't hear back today, we'll proceed with alternatives.
Thanks for understanding.`,
    ar: `مرحبًا {{InfluencerName}}،
هذا آخر تذكير بخصوص حملة {{CampaignName}}.
في حال عدم الرد اليوم سنضطر للمتابعة بخيارات أخرى.
شكرًا لتفهمك.`,
    variables: ["InfluencerName", "CampaignName"],
  },
  {
    id: 3,
    scenario: { en: "Missing Coverage", ar: "تغطية مفقودة" },
    tags: ["Missing", "Coverage", "Escalation"],
    en: `Hi {{InfluencerName}},
We noticed the coverage for {{VisitDate}} hasn't been received yet.
Please share it today to avoid escalation.
{{BriefLink}}`,
    ar: `مرحبًا {{InfluencerName}}،
لاحظنا عدم استلام التغطية الخاصة بتاريخ {{VisitDate}}.
نرجو إرسالها اليوم لتفادي التصعيد.
{{BriefLink}}`,
    variables: ["InfluencerName", "VisitDate", "BriefLink"],
  },
  {
    id: 4,
    scenario: { en: "Confirmation Request", ar: "طلب تأكيد" },
    tags: ["Confirmation", "Follow-up"],
    en: `Hi {{InfluencerName}},
We're checking if you're still available for {{CampaignName}} on {{VisitDate}}.
Please confirm within 24h.`,
    ar: `مرحبًا {{InfluencerName}}،
نتحقق من توفرك لحملة {{CampaignName}} بتاريخ {{VisitDate}}.
نرجو التأكيد خلال 24 ساعة.`,
    variables: ["InfluencerName", "CampaignName", "VisitDate"],
  },
];

const CLIENT_TEMPLATES: Template[] = [
  {
    id: 1,
    scenario: { en: "Daily Update (Risk)", ar: "تحديث يومي (مخاطر)" },
    tags: ["Daily", "Risk", "Update"],
    en: `Hello {{ClientName}},
Today's update for {{CampaignName}}:
⚠️ Risk identified: {{Issue}}
Impact: {{Impact}}
Decision needed: {{DecisionNeeded}}
ETA upon approval: {{ETA}}`,
    ar: `أهلًا {{ClientName}}،
تحديث اليوم لحملة {{CampaignName}}:
⚠️ خطر قائم: {{Issue}}
التأثير: {{Impact}}
القرار المطلوب: {{DecisionNeeded}}
وقت التنفيذ بعد الموافقة: {{ETA}}`,
    variables: ["ClientName", "CampaignName", "Issue", "Impact", "DecisionNeeded", "ETA"],
  },
  {
    id: 2,
    scenario: { en: "Escalation Notice", ar: "إشعار تصعيد" },
    tags: ["Escalation", "Client"],
    en: `Hello {{ClientName}},
We're escalating an issue affecting {{CampaignName}}.
Evidence: {{ProofLink}}
Proposed solution: {{Solution}}
Expected resolution: {{ETA}}`,
    ar: `أهلًا {{ClientName}}،
نرفع لكم مشكلة تؤثر على حملة {{CampaignName}}.
الدليل: {{ProofLink}}
الحل المقترح: {{Solution}}
وقت الحل المتوقع: {{ETA}}`,
    variables: ["ClientName", "CampaignName", "ProofLink", "Solution", "ETA"],
  },
];

function TemplateCard({ template, mode }: { template: Template; mode: LangMode }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ background: "var(--card)", border: "1px solid var(--line)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm text-white"
            style={{ background: TRYGC.orange, fontWeight: 800 }}
          >
            {template.id}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "var(--text)" }}>
              <BiText bi={template.scenario} mode={mode} />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {template.tags.map((tag) => (
                <Pill key={tag} text={tag} tone="neutral" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EN Block */}
      {(mode === "EN" || mode === "BOTH") && (
        <div className="p-5" style={{ borderBottom: mode === "BOTH" ? "1px solid var(--line)" : undefined }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)", fontWeight: 800 }}>English</span>
            <CopyButton text={template.en} />
          </div>
          <pre
            className="whitespace-pre-wrap text-sm rounded-lg p-4"
            style={{ background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontFamily: "Inter, sans-serif" }}
          >
            {template.en}
          </pre>
        </div>
      )}

      {/* AR Block */}
      {(mode === "AR" || mode === "BOTH") && (
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)", fontWeight: 800 }}>العربية</span>
            <CopyButton text={template.ar} />
          </div>
          <pre
            className="whitespace-pre-wrap text-sm rounded-lg p-4"
            dir="rtl"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              fontFamily: '"Noto Kufi Arabic", sans-serif',
              lineHeight: 1.8,
            }}
          >
            {template.ar}
          </pre>
        </div>
      )}

      {/* Variables */}
      <div className="px-5 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs" style={{ color: "var(--muted)", fontWeight: 700 }}>Variables:</span>
          {template.variables.map((v) => (
            <span
              key={v}
              className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono"
              style={{ background: TRYGC.purple + "22", color: TRYGC.purple, fontWeight: 700, border: `1px solid ${TRYGC.purple}44` }}
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InfluencerTemplatesPage({ mode }: { mode: LangMode }) {
  return (
    <div className="space-y-6">
      <PageMeta
        mode={mode}
        owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }}
        approver={{ en: "Operations Lead", ar: "قائد العمليات" }}
        version="3.0"
        lastUpdated="2026-09-15"
        nextReview="2027-03-15"
      />
      <H
        title={{ en: "Influencer Communication Templates", ar: "قوالب التواصل مع المؤثرين" }}
        mode={mode}
        subtitle={{
          en: "Ready-to-send bilingual templates for influencer communication",
          ar: "قوالب ثنائية اللغة جاهزة للإرسال للتواصل مع المؤثرين",
        }}
      />

      <KBCard
        title={{ en: "Usage Rules", ar: "قواعد الاستخدام" }}
        mode={mode}
      >
        <div className="space-y-2 text-sm">
          {[
            { en: "Always personalize — replace all {{variables}} before sending.", ar: "خصص دائماً — استبدل كل {{المتغيرات}} قبل الإرسال." },
            { en: "Log every sent message with timestamp in Influencer_Comm_Log.", ar: "سجّل كل رسالة مرسلة بالتاريخ والوقت في Influencer_Comm_Log." },
            { en: "Maximum 10–12 reminders per influencer. Final reminder must be explicitly labeled.", ar: "حد أقصى 10–12 تذكير لكل مؤثر. التذكير النهائي يجب أن يكون مصنّفاً بوضوح." },
            { en: "Spread reminders across different times of day.", ar: "وزّع التذكيرات على أوقات مختلفة من اليوم." },
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.success }} />
              <BiText bi={rule} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>

      <div className="space-y-4">
        {INFLUENCER_TEMPLATES.map((t) => (
          <TemplateCard key={t.id} template={t} mode={mode} />
        ))}
      </div>
    </div>
  );
}

export function ClientTemplatesPage({ mode }: { mode: LangMode }) {
  return (
    <div className="space-y-6">
      <PageMeta
        mode={mode}
        owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }}
        approver={{ en: "Operations Lead", ar: "قائد العمليات" }}
        version="3.0"
        lastUpdated="2026-09-15"
        nextReview="2027-03-15"
      />
      <H
        title={{ en: "Client Communication Templates", ar: "قوالب التواصل مع العملاء" }}
        mode={mode}
        subtitle={{
          en: "Professional client-facing templates for updates and escalations",
          ar: "قوالب احترافية للعملاء للتحديثات والتصعيدات",
        }}
      />

      <KBCard
        title={{ en: "Usage Rules", ar: "قواعد الاستخدام" }}
        mode={mode}
      >
        <div className="space-y-2 text-sm">
          {[
            { en: "Daily updates are mandatory when a campaign is running.", ar: "التحديثات اليومية إلزامية عندما تكون الحملة جارية." },
            { en: "Risk-based escalation — use the Risk template when issues are identified.", ar: "تصعيد مبني على المخاطر — استخدم قالب المخاطر عند تحديد المشاكل." },
            { en: "Always include evidence links and proposed solutions.", ar: "ضمّن دائماً روابط الأدلة والحلول المقترحة." },
            { en: "Log all client communications in Client_Comm_Log.", ar: "سجّل كل اتصالات العملاء في Client_Comm_Log." },
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.success }} />
              <BiText bi={rule} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>

      <div className="space-y-4">
        {CLIENT_TEMPLATES.map((t) => (
          <TemplateCard key={t.id} template={t} mode={mode} />
        ))}
      </div>
    </div>
  );
}