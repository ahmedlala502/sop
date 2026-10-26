import React from "react";
import { CheckCircle2, Clock, Users, Activity, FileText, Star, TrendingUp, Zap, Filter, Calendar } from "lucide-react";
import { LangMode, BiText, H, PageMeta, KBCard, Pill, SLABadge, SimpleTable, StatCard, TRYGC, cx } from "./kb-types";

export function KPIsPage({ mode }: { mode: LangMode }) {
  const [trendPeriod, setTrendPeriod] = React.useState<"today" | "week" | "month">("today");
  const [teamFilter, setTeamFilter] = React.useState<string>("all");

  return (
    <div className="space-y-6">
      <PageMeta
        mode={mode}
        owner={{ en: "Core Team Sept Workshop", ar: "الفريق الأساسي لورشة سبتمبر" }}
        approver={{ en: "CEO", ar: "الرئيس التنفيذي" }}
        version="3.0"
        lastUpdated="2026-09-15"
        nextReview="2027-03-15"
      />
      <div className="flex items-start justify-between gap-4">
        <H
          title={{ en: "07 — KPIs & SLAs", ar: "07 — المؤشرات والـ SLA" }}
          mode={mode}
          subtitle={{
            en: "Key performance indicators, service level agreements, and team metrics",
            ar: "مؤشرات الأداء الرئيسية، اتفاقيات مستوى الخدمة، ومقاييس الفرق",
          }}
        />

        {/* Filters */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Trend Period Toggle */}
          <div className="inline-flex rounded-xl p-1" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
            {(["today", "week", "month"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setTrendPeriod(p)}
                className="rounded-lg px-3 py-2 text-xs transition-all duration-200"
                style={{
                  fontWeight: 700,
                  background: trendPeriod === p ? TRYGC.orange : "transparent",
                  color: trendPeriod === p ? "#fff" : "var(--muted)",
                }}
              >
                {p === "today" ? "Today" : p === "week" ? "Week" : "Month"}
              </button>
            ))}
          </div>

          {/* Team Filter */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="rounded-lg px-3 py-2 text-xs outline-none transition-all"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              fontWeight: 600,
            }}
          >
            <option value="all">All Teams</option>
            <option value="community">Community</option>
            <option value="coordination">Coordination</option>
            <option value="chat">Chat</option>
            <option value="followup">Follow-Up</option>
            <option value="coverage">Coverage</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<CheckCircle2 className="h-6 w-6" />} value="98.5%" label="SLA Compliance Rate" trend="+2.3%" color={TRYGC.success} />
        <StatCard icon={<Clock className="h-6 w-6" />} value="3.2h" label="Avg Response Time" trend="-15%" color={TRYGC.purple} />
        <StatCard icon={<Users className="h-6 w-6" />} value="156" label="Active Influencers" trend="+8%" color={TRYGC.orange} />
        <StatCard icon={<Activity className="h-6 w-6" />} value="94%" label="Quality Score" trend="+1.5%" color={TRYGC.info} />
      </div>

      {/* SLA Table */}
      <KBCard
        title={{ en: "Service Level Agreements", ar: "اتفاقيات مستوى الخدمة" }}
        subtitle={{ en: "Response time and delivery commitments by operation type", ar: "وقت الاستجابة والتزامات التسليم حسب نوع العملية" }}
        mode={mode}
      >
        <SimpleTable
          headers={
            mode === "AR"
              ? ["الحالة", "المتوسط الحالي", "SLA المستهدف", "العملية"]
              : ["Operation", "Target SLA", "Current Avg", "Status"]
          }
          rows={[
            ["Client Response", "≤2 hours", "1.8 hours", <SLABadge key="1" label="On Track" rag="Green" />],
            ["Influencer Invitation", "≤24 hours", "18 hours", <SLABadge key="2" label="On Track" rag="Green" />],
            ["Campaign Setup", "≤4 hours", "3.5 hours", <SLABadge key="3" label="On Track" rag="Green" />],
            ["Fix Setup Error", "≤2 hours", "1.8 hours", <SLABadge key="4" label="On Track" rag="Green" />],
            ["Coverage QA Review", "Same Day", "6 hours", <SLABadge key="5" label="Excellent" rag="Green" />],
            ["Missing Content Follow-up", "≤24 hours", "22 hours", <SLABadge key="6" label="At Risk" rag="Amber" />],
            ["Final Report Delivery", "24–48 hours", "36 hours", <SLABadge key="7" label="On Track" rag="Green" />],
            ["MOM Delivery", "≤24 hours", "18 hours", <SLABadge key="8" label="On Track" rag="Green" />],
            ["Risk Escalation", "Within 2h", "1.5 hours", <SLABadge key="9" label="On Track" rag="Green" />],
          ]}
        />
      </KBCard>

      {/* Team Performance */}
      <KBCard
        title={{ en: "Team Performance Metrics", ar: "مقاييس أداء الفرق" }}
        mode={mode}
      >
        <div className="space-y-3">
          {[
            { team: "Community", score: 96, tasks: 245, avgTime: "4.2h", owner: { en: "Community Lead", ar: "قائد الكوميونيتي" } },
            { team: "Coordination", score: 98, tasks: 312, avgTime: "2.8h", owner: { en: "Coordination Lead", ar: "قائد التنسيق" } },
            { team: "Chat/WhatsApp", score: 94, tasks: 1453, avgTime: "1.2h", owner: { en: "Chat Lead", ar: "قائد الشات" } },
            { team: "Follow-Up", score: 92, tasks: 892, avgTime: "6.5h", owner: { en: "Follow-Up Lead", ar: "قائد المتابعة" } },
            { team: "Coverage", score: 97, tasks: 567, avgTime: "18h", owner: { en: "Coverage Lead", ar: "قائد التغطية" } },
          ].map((t, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span style={{ fontWeight: 700, color: "var(--text)" }}>{t.team}</span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    <BiText bi={t.owner} mode={mode} />
                  </span>
                </div>
                <Pill text={`${t.score}%`} tone={t.score >= 95 ? "success" : "warning"} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-xs" style={{ color: "var(--muted)", fontWeight: 600 }}>
                    <BiText bi={{ en: "Completed Tasks", ar: "المهام المكتملة" }} mode={mode} />
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>{t.tasks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--muted)", fontWeight: 600 }}>
                    <BiText bi={{ en: "Avg Time", ar: "متوسط الوقت" }} mode={mode} />
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>{t.avgTime}</div>
                </div>
              </div>
              <div className="h-2 rounded-full" style={{ background: "var(--line)" }}>
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${t.score}%`, background: t.score >= 95 ? TRYGC.success : TRYGC.orange }}
                />
              </div>
            </div>
          ))}
        </div>
      </KBCard>

      {/* Quality Indicators */}
      <KBCard
        title={{ en: "Quality Indicators", ar: "مؤشرات الجودة" }}
        mode={mode}
      >
        <div className="space-y-4">
          {[
            { label: { en: "Brief Compliance", ar: "الامتثال للبرِيف" }, value: 96, target: 95, icon: <FileText className="h-5 w-5" /> },
            { label: { en: "Client Satisfaction", ar: "رضا العملاء" }, value: 4.8, target: 4.5, icon: <Star className="h-5 w-5" />, isRating: true },
            { label: { en: "First-Time Success Rate", ar: "معدل النجاح من أول مرة" }, value: 89, target: 85, icon: <CheckCircle2 className="h-5 w-5" /> },
            { label: { en: "Documentation Accuracy", ar: "دقة التوثيق" }, value: 99, target: 98, icon: <FileText className="h-5 w-5" /> },
            { label: { en: "Reconciliation Match", ar: "تطابق المطابقة" }, value: 97, target: 95, icon: <Zap className="h-5 w-5" /> },
          ].map((ind, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--accent)" }}>{ind.icon}</span>
                  <span className="text-sm" style={{ fontWeight: 600, color: "var(--text)" }}>
                    <BiText bi={ind.label} mode={mode} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl" style={{ fontWeight: 800, color: "var(--text)" }}>
                    {ind.value}{ind.isRating ? "/5" : "%"}
                  </span>
                  {ind.value >= ind.target && <TrendingUp className="h-4 w-4" style={{ color: TRYGC.success }} />}
                </div>
              </div>
              <div className="h-2 rounded-full" style={{ background: "var(--line)" }}>
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: ind.isRating ? `${(ind.value / 5) * 100}%` : `${ind.value}%`,
                    background: ind.value >= ind.target ? TRYGC.success : TRYGC.orange,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </KBCard>

      {/* KPI Definitions */}
      <KBCard
        title={{ en: "KPI Definitions", ar: "تعريفات المؤشرات" }}
        mode={mode}
      >
        <div className="space-y-2 text-sm">
          {[
            { en: "SLA Compliance = (Tasks completed within SLA / Total tasks) × 100", ar: "الامتثال للـ SLA = (المهام المكتملة ضمن SLA / إجمالي المهام) × 100" },
            { en: "Reconciliation Match = (Done in System with matching pCloud proof / Total Done) × 100", ar: "تطابق المطابقة = (تم في النظام مع إثبات pCloud مطابق / إجمالي تم) × 100" },
            { en: "First-Time Success = Tasks completed correctly without rework on first attempt", ar: "النجاح من أول مرة = المهام المكتملة بشكل صحيح بدون إعادة عمل من المحاولة الأولى" },
            { en: "KPIs are calculated from KPI_Dashboard tab in Google Sheets, aggregated per campaign/team/period.", ar: "المؤشرات تُحسب من تبويب KPI_Dashboard في جوجل شيتس، مجمّعة لكل حملة/فريق/فترة." },
          ].map((def, i) => (
            <div key={i} className="flex items-start gap-2 p-2" style={{ color: "var(--text)" }}>
              <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: TRYGC.purple }} />
              <BiText bi={def} mode={mode} />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}