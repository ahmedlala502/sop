import React from "react";
import { LangMode, BiText, H, PageMeta, KBCard, SimpleTable, Pill, TRYGC } from "./kb-types";

function RACICell({ value }: { value: string }) {
  if (!value) return <span style={{ color: "var(--line)" }}>—</span>;
  const colors: Record<string, string> = { R: TRYGC.orange, A: TRYGC.purple, C: TRYGC.lavender, I: TRYGC.peach };
  return (
    <div className="flex gap-1">
      {value.split("/").map((v, i) => (
        <span key={i} className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-xs text-white" style={{ background: colors[v.trim()] || "var(--line)", fontWeight: 800 }}>
          {v.trim()}
        </span>
      ))}
    </div>
  );
}

export function RACIPage({ mode }: { mode: LangMode }) {
  const roles = ["Community", "Coordination", "Chat", "Follow-Up", "Coverage", "Ops Lead", "Client"];
  const rows: Array<{ activity: { en: string; ar: string }; values: string[] }> = [
    { activity: { en: "Booking order creation", ar: "إنشاء أمر الحجز" }, values: ["R/A", "C", "", "", "", "C", "C"] },
    { activity: { en: "List sourcing & client approval", ar: "اختيار القائمة وموافقة العميل" }, values: ["R/A", "", "", "", "", "", "A/C"] },
    { activity: { en: "Campaign setup (folders/sheets/system)", ar: "إعداد الحملة (فولدرات/شيتات/نظام)" }, values: ["C", "R/A", "", "", "", "", ""] },
    { activity: { en: "Invitations & reminders", ar: "الدعوات والتذكيرات" }, values: ["", "C", "R/A", "C", "", "", ""] },
    { activity: { en: "Today visit reminders", ar: "تذكيرات زيارات اليوم" }, values: ["", "", "", "R/A", "", "", ""] },
    { activity: { en: "Coverage QA & archiving", ar: "مراجعة التغطية والأرشفة" }, values: ["", "", "", "", "R/A", "", ""] },
    { activity: { en: "Missing/Need resolution", ar: "حل الناقص/التعديل" }, values: ["", "", "C", "R/A", "C", "", ""] },
    { activity: { en: "Daily client update", ar: "التحديث اليومي للعميل" }, values: ["R/A", "", "", "", "", "C", ""] },
    { activity: { en: "Final report delivery", ar: "تسليم التقرير النهائي" }, values: ["R", "R/A", "", "", "", "", ""] },
  ];

  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }} approver={{ en: "CEO", ar: "الرئيس التنفيذي" }} version="3.0" lastUpdated="2026-09-15" nextReview="2027-03-15" />
      <H title={{ en: "04 — RACI Matrix", ar: "04 — مصفوفة RACI" }} mode={mode}
        subtitle={{ en: "Responsibility Assignment Matrix — who does what for every key activity", ar: "مصفوفة توزيع المسؤوليات — من يفعل ماذا لكل نشاط رئيسي" }} />

      {/* Legend */}
      <KBCard title={{ en: "RACI Legend", ar: "دليل RACI" }} mode={mode}>
        <div className="flex flex-wrap gap-4">
          {[
            { code: "R", label: { en: "Responsible — does the work", ar: "مسؤول — ينفذ العمل" }, color: TRYGC.orange },
            { code: "A", label: { en: "Accountable — owns the outcome", ar: "معتمد — يملك النتيجة" }, color: TRYGC.purple },
            { code: "C", label: { en: "Consulted — provides input", ar: "مستشار — يقدم مدخلات" }, color: TRYGC.lavender },
            { code: "I", label: { en: "Informed — kept in the loop", ar: "مُبلَّغ — يُبقى على اطلاع" }, color: TRYGC.peach },
          ].map((item) => (
            <div key={item.code} className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-xs text-white" style={{ background: item.color, fontWeight: 800 }}>{item.code}</span>
              <span className="text-sm" style={{ color: "var(--text)" }}><BiText bi={item.label} mode={mode} /></span>
            </div>
          ))}
        </div>
      </KBCard>

      {/* RACI Table */}
      <KBCard title={{ en: "RACI Matrix", ar: "المصفوفة" }} mode={mode} noPadding>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ background: TRYGC.purple }}>
                <th className="px-4 py-3 text-left text-xs text-white" style={{ fontWeight: 700 }}>
                  <BiText bi={{ en: "Activity", ar: "النشاط" }} mode={mode} />
                </th>
                {roles.map((r) => (
                  <th key={r} className="px-3 py-3 text-center text-xs text-white" style={{ fontWeight: 700 }}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--text)", fontWeight: 600 }}>
                    <BiText bi={row.activity} mode={mode} />
                  </td>
                  {row.values.map((v, j) => (
                    <td key={j} className="px-3 py-3 text-center">
                      <RACICell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </KBCard>

      {/* Key Rules */}
      <KBCard title={{ en: "Key Rules", ar: "القواعد الأساسية" }} mode={mode}>
        <div className="space-y-2 text-sm">
          {[
            { en: "Every activity must have exactly one Accountable (A) person.", ar: "كل نشاط يجب أن يكون له شخص معتمد (A) واحد بالضبط." },
            { en: "The Responsible (R) person does the work; multiple R's are allowed.", ar: "الشخص المسؤول (R) ينفذ العمل؛ يُسمح بعدة R." },
            { en: "Consulted (C) people must be asked before decisions are made.", ar: "الأشخاص المستشارون (C) يجب سؤالهم قبل اتخاذ القرارات." },
            { en: "Informed (I) people are notified after the fact.", ar: "الأشخاص المُبلَّغون (I) يُخطَرون بعد الحدث." },
            { en: "RACI is refreshed monthly during governance audit.", ar: "RACI تُحدّث شهرياً أثناء تدقيق الحوكمة." },
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.success }} />
              <BiText bi={rule} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}
