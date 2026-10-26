import React from "react";
import { FileText, Database, CheckCircle2, AlertTriangle } from "lucide-react";
import { LangMode, BiText, H, PageMeta, KBCard, Pill, SimpleTable, Accordion, TRYGC } from "./kb-types";

const TABS = [
  { name: "People_List", desc: { en: "Master list of all influencers in the TryGC network", ar: "القائمة الرئيسية لكل المؤثرين في شبكة TryGC" }, cols: "Username, Platform, Followers, Engagement Rate, Location, Niche, Contact, Status, Last Campaign, Score" },
  { name: "Campaign_Master", desc: { en: "Overview of all campaigns with key metadata", ar: "نظرة عامة على كل الحملات بالبيانات الرئيسية" }, cols: "Campaign ID, Name, Client, Brand, Country, Start Date, End Date, Status, Budget, Target Count, Confirmed Count, Coverage %" },
  { name: "Cam_Info", desc: { en: "Detailed campaign setup information", ar: "معلومات إعداد الحملة التفصيلية" }, cols: "Campaign ID, Brief Link, Dropbox Folder, pCloud Folder, Sheet Link, System Link, Created By, Created At, Last Modified" },
  { name: "Influencer_List", desc: { en: "Per-campaign influencer assignments and deliverables", ar: "تعيينات المؤثرين لكل حملة والمخرجات" }, cols: "Campaign ID, Username, Assigned Deliverables, Visit Date, Visit Time, Location, Brief Sent, Confirmed, Status" },
  { name: "Confirmations", desc: { en: "Reply tracking for invitations and reminders", ar: "تتبع الردود على الدعوات والتذكيرات" }, cols: "Campaign ID, Username, Invitation Sent At, Reply Status, Reply At, Reminder 1 Sent, Reminder 2 Sent, Notes" },
  { name: "Daily_Plan", desc: { en: "Day-by-day execution plan", ar: "خطة التنفيذ يوم بيوم" }, cols: "Date, Campaign ID, Influencer, Visit Time, Location, Tasks, Assigned To, Status, Notes" },
  { name: "Today_Visits", desc: { en: "Filtered view of today's scheduled visits", ar: "عرض مفلتر لزيارات اليوم المجدولة" }, cols: "Campaign, Influencer, Time, Location, Brief Sent?, Reminder Sent?, Live Support Assigned?, Status" },
  { name: "Missing_Need_Tracker", desc: { en: "Tracking missing items and needed edits/fixes", ar: "تتبع العناصر المفقودة والتعديلات/الإصلاحات المطلوبة" }, cols: "Campaign ID, Username, Issue Type, Description, Owner, SLA Due, Status, Resolution, Resolved At" },
  { name: "Coverage_QA", desc: { en: "QA results for coverage proofs vs brief", ar: "نتائج مراجعة الجودة لإثباتات التغطية مقابل البرِيف" }, cols: "Campaign ID, Username, Content Type, QA Status, Issues Found, pCloud Link, Proof Count, Brief Match %, Notes" },
  { name: "Client_Comm_Log", desc: { en: "All client communications log", ar: "سجل كل اتصالات العملاء" }, cols: "Date, Time, Campaign, Direction (In/Out), Channel, Summary, Action Items, Sent By" },
  { name: "Influencer_Comm_Log", desc: { en: "All influencer communications log", ar: "سجل كل اتصالات المؤثرين" }, cols: "Date, Time, Campaign, Username, Direction, Channel, Message Type, Summary, Sent By" },
  { name: "Templates", desc: { en: "Reference copy of all message templates", ar: "نسخة مرجعية لكل قوالب الرسائل" }, cols: "Template ID, Category (Influencer/Client), Scenario, EN Text, AR Text, Variables, Last Updated" },
  { name: "KPI_Dashboard", desc: { en: "Aggregated KPI calculations and trends", ar: "حسابات المؤشرات المجمّعة والاتجاهات" }, cols: "Metric, Campaign, Period, Value, Target, RAG, Trend, Last Updated" },
];

const VALIDATIONS = [
  { field: "Status", values: "Planned / Running / Closed / On Hold" },
  { field: "Reply Status", values: "Yes / No / Maybe / No Response" },
  { field: "Issue Type", values: "Missing Visit / Missing Coverage / Need Edit / Reschedule / Other" },
  { field: "QA Status", values: "Done / Need Edit / Missing / Pending" },
  { field: "Case Status", values: "Open / In Progress / Waiting / Closed" },
];

export function GSheetsPage({ mode }: { mode: LangMode }) {
  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }} approver={{ en: "Operations Lead", ar: "قائد العمليات" }} version="3.0" lastUpdated="2026-09-15" nextReview="2027-03-15" />
      <H title={{ en: "05 — GSheets Blueprint (Workbook Structure)", ar: "05 — هيكلة جوجل شيتس (هيكلة الملف)" }} mode={mode}
        subtitle={{ en: "Complete data model with tabs, columns, validations, and SLA logic", ar: "نموذج بيانات كامل بالتبويبات والأعمدة والتحققات ومنطق SLA" }} />

      {/* Tab Cards */}
      <KBCard title={{ en: "Workbook Tabs", ar: "تبويبات الملف" }} mode={mode}>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {TABS.map((tab) => (
            <div key={tab.name} className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4" style={{ color: TRYGC.purple }} />
                <span className="text-sm" style={{ fontWeight: 800, color: "var(--accent)" }}>{tab.name}</span>
              </div>
              <div className="text-xs mb-2" style={{ color: "var(--text)" }}>
                <BiText bi={tab.desc} mode={mode} />
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                <span style={{ fontWeight: 700 }}>Columns: </span>{tab.cols}
              </div>
            </div>
          ))}
        </div>
      </KBCard>

      {/* Dropdown Validations */}
      <KBCard title={{ en: "Dropdown Validations", ar: "تحققات القوائم المنسدلة" }} mode={mode}>
        <div className="space-y-3">
          {VALIDATIONS.map((v, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-3" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <span className="text-sm shrink-0" style={{ fontWeight: 700, color: "var(--accent)" }}>{v.field}:</span>
              <div className="flex flex-wrap gap-1.5">
                {v.values.split(" / ").map((val) => (
                  <Pill key={val} text={val} tone="neutral" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </KBCard>

      {/* SLA Logic */}
      <KBCard title={{ en: "SLA Breach Logic", ar: "منطق اختراق SLA" }} mode={mode}>
        <div className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5" style={{ color: TRYGC.orange }} />
            <span className="text-sm" style={{ fontWeight: 800, color: "var(--text)" }}>
              <BiText bi={{ en: "SLA Breach Formula", ar: "صيغة اختراق SLA" }} mode={mode} />
            </span>
          </div>
          <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--card)", border: "1px solid var(--line)", color: TRYGC.orange, fontWeight: 700 }}>
            SLA_Breach = NOW() &gt; Due_At AND Status != "Closed"
          </div>
          <div className="mt-3 text-xs space-y-1" style={{ color: "var(--muted)" }}>
            <BiText bi={{
              en: "Apply this formula to every row in Missing_Need_Tracker, Coverage_QA, and any tab with SLA deadlines. Use conditional formatting: Red background when SLA_Breach = TRUE. This enables the KPI_Dashboard to aggregate breach counts per campaign, team, and time period.",
              ar: "طبّق هذه الصيغة على كل صف في Missing_Need_Tracker، Coverage_QA، وأي تبويب بمواعيد SLA. استخدم التنسيق الشرطي: خلفية حمراء عندما SLA_Breach = TRUE. هذا يمكّن KPI_Dashboard من تجميع عدد الاختراقات لكل حملة وفريق وفترة زمنية."
            }} mode={mode} />
          </div>
        </div>
      </KBCard>

      {/* Data Relationships */}
      <KBCard title={{ en: "Data Relationships", ar: "علاقات البيانات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "Campaign_Master.Campaign_ID → links to all other tabs via Campaign_ID column", ar: "Campaign_Master.Campaign_ID → يربط بكل التبويبات الأخرى عبر عمود Campaign_ID" },
            { en: "People_List.Username → referenced in Influencer_List, Confirmations, Coverage_QA", ar: "People_List.Username → مرجع في Influencer_List، Confirmations، Coverage_QA" },
            { en: "Influencer_List → feeds Daily_Plan and Today_Visits via date filtering", ar: "Influencer_List → يغذي Daily_Plan و Today_Visits عبر فلترة التاريخ" },
            { en: "Coverage_QA → feeds Missing_Need_Tracker for QA failures", ar: "Coverage_QA → يغذي Missing_Need_Tracker لإخفاقات المراجعة" },
            { en: "All comm logs → feed KPI_Dashboard for response time metrics", ar: "كل سجلات الاتصالات → تغذي KPI_Dashboard لمقاييس وقت الاستجابة" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.purple }} />
              <BiText bi={r} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>

      {/* Golden Rules */}
      <KBCard title={{ en: "Golden Rules for Sheets", ar: "القواعد الذهبية للشيتات" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "One workbook per campaign — never mix campaigns in one file", ar: "ملف واحد لكل حملة — ممنوع خلط الحملات في ملف واحد" },
            { en: "All dropdowns must use Data Validation — no free text in status fields", ar: "كل القوائم المنسدلة تستخدم التحقق من البيانات — لا نص حر في حقول الحالة" },
            { en: "Timestamps must include date AND time — never just date", ar: "الأوقات يجب أن تتضمن التاريخ والوقت — ليس فقط التاريخ" },
            { en: "Never delete rows — mark as archived/cancelled instead", ar: "ممنوع حذف الصفوف — حددها كمؤرشفة/ملغية بدلاً من ذلك" },
            { en: "Sheet data must match System data at all times", ar: "بيانات الشيت يجب أن تطابق بيانات النظام دائماً" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: TRYGC.success }} />
              <BiText bi={r} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}
