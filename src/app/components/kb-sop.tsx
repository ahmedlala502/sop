import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Clock, Users, Settings, Activity, Shield, Target, FileText, Link2, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { LangMode, Bi, BiText, H, PageMeta, KBCard, Pill, SLABadge, Accordion, QAItem, SimpleTable, SectionDivider, Checklist, cx, TRYGC, TEAM_COLORS, PageKey } from "./kb-types";
import { HANDBOOK_SOPS } from "./kb-sop-handbook";

// ─── SOP Data ────────────────────────────────────────────────
interface SOPData {
  teamName: Bi;
  teamIcon: React.ReactNode;
  owner: Bi;
  approver: Bi;
  purpose: Bi;
  steps: Array<{ title: Bi; details: Bi; preconditions?: Bi; inputs?: Bi; dod?: Bi; mistakes?: Bi; evidence?: Bi; sla?: string }>;
  outputs: Bi[];
  slas: Array<{ step: string; sla: string; rag: "Green" | "Amber" | "Red"; breach: string }>;
  qualityGates: Bi[];
  escalation: Bi[];
  qaItems: Array<{ question: Bi; symptoms: Bi; causes: Bi; fix: Bi; owner: Bi; sla: string; evidence: Bi; escalation: Bi }>;
  howTo: Array<{ title: Bi; preconditions: Bi; tools: Bi; steps: Bi; outputs: Bi; dod: Bi; mistakes: Bi; qa: Bi }>;
}

const SOPS_BASE: Record<string, SOPData> = {
  sop_community: {
    teamName: { en: "Community Team", ar: "فريق الكوميونيتي" },
    teamIcon: <Users className="h-5 w-5" />,
    owner: { en: "Community Lead", ar: "قائد الكوميونيتي" },
    approver: { en: "Operations Lead", ar: "قائد العمليات" },
    purpose: {
      en: "The Community team is the bridge between TryGC and its clients. They own the relationship lifecycle from sourcing influencers to delivering final campaign reports. Every action must be documented, every commitment tracked, and every deliverable verified against the client brief.",
      ar: "فريق الكوميونيتي هو الجسر بين TryGC وعملائها. يملكون دورة العلاقة من اختيار المؤثرين إلى تسليم تقارير الحملة النهائية. كل إجراء يجب توثيقه، كل التزام يُتتبع، وكل مخرج يُتحقق منه مقابل برِيف العميل."
    },
    steps: [
      {
        title: { en: "1. Define Client Goals & Campaign Scope", ar: "1. تحديد أهداف العميل ونطاق الحملة" },
        details: {
          en: "Meet with the client to define campaign objectives, target audience, deliverables, timeline, and budget. Document everything in a Meeting Minutes (MOM) document. Create a campaign brief with exact requirements: number of influencers, content types (story, reel, post), visit locations, special instructions.",
          ar: "اجتمع مع العميل لتحديد أهداف الحملة، الجمهور المستهدف، المخرجات، الجدول الزمني، والميزانية. وثّق كل شيء في محضر اجتماع. أنشئ برِيف حملة بمتطلبات دقيقة: عدد المؤثرين، أنواع المحتوى (ستوري، ريل، بوست)، مواقع الزيارات، تعليمات خاصة."
        },
        preconditions: { en: "Client contract signed, budget approved", ar: "عقد العميل موقّع، الميزانية معتمدة" },
        inputs: { en: "Client request, signed contract, budget sheet", ar: "طلب العميل، العقد الموقّع، ورقة الميزانية" },
        dod: { en: "Campaign brief documented and client-approved, MOM signed off", ar: "برِيف الحملة موثّق ومعتمد من العميل، محضر الاجتماع مصادق عليه" },
        evidence: { en: "MOM document with signatures, campaign brief PDF, email confirmation", ar: "محضر اجتماع بتواقيع، PDF برِيف الحملة، تأكيد بالإيميل" },
        mistakes: { en: "Vague requirements, missing deliverable counts, no written client approval", ar: "متطلبات غامضة، عدد مخرجات مفقود، عدم الحصول على موافقة مكتوبة" },
      },
      {
        title: { en: "2. Source & Build Influencer List", ar: "2. اختيار وبناء قائمة المؤثرين" },
        details: {
          en: "Source influencers matching the campaign criteria. Build a list with: username, platform, follower count, engagement rate, location, content niche, contact info. Score each influencer against the brief requirements. Submit the list for client approval.",
          ar: "اختر مؤثرين مطابقين لمعايير الحملة. ابنِ قائمة تتضمن: اليوزرنيم، المنصة، عدد المتابعين، معدل التفاعل، الموقع، نيتش المحتوى، معلومات التواصل. قيّم كل مؤثر مقابل متطلبات البرِيف. قدّم القائمة لموافقة العميل."
        },
        sla: "Within 48h of brief approval",
        dod: { en: "List submitted to client with all required fields populated", ar: "القائمة مقدّمة للعميل بكل الحقول المطلوبة مكتملة" },
        evidence: { en: "Google Sheet with People_List tab, client approval email/message", ar: "جوجل شيت بتبويب People_List، إيميل/رسالة موافقة العميل" },
        mistakes: { en: "Incomplete profiles, wrong niche, missing engagement data, submitting without QA", ar: "ملفات ناقصة، نيتش خاطئ، بيانات تفاعل مفقودة، تقديم بدون مراجعة جودة" },
      },
      {
        title: { en: "3. Client Approval & Booking Order", ar: "3. موافقة العميل وأمر الحجز" },
        details: {
          en: "Get client sign-off on the final influencer list. IF client requests changes: update list, re-submit, get new approval. Create a Booking Order document with: campaign name, dates, influencer list, deliverables per influencer, total budget breakdown. Hand off the Booking Order to the Coordination team.",
          ar: "احصل على موافقة العميل على القائمة النهائية. إذا طلب العميل تعديلات: حدّث القائمة، أعد التقديم، احصل على موافقة جديدة. أنشئ أمر حجز يتضمن: اسم الحملة، التواريخ، قائمة المؤثرين، المخرجات لكل مؤثر، تفصيل الميزانية الإجمالية. سلّم أمر الحجز لفريق التنسيق."
        },
        sla: "Same day after client approval",
        dod: { en: "Booking Order created, approved, and handed to Coordination", ar: "أمر الحجز منشأ ومعتمد ومسلّم للتنسيق" },
        evidence: { en: "Booking Order document, client approval proof, handoff confirmation", ar: "مستند أمر الحجز، إثبات موافقة العميل، تأكيد التسليم" },
        mistakes: { en: "Starting campaign setup before client approval, incomplete booking order", ar: "بدء إعداد الحملة قبل موافقة العميل، أمر حجز ناقص" },
      },
      {
        title: { en: "4. Track Campaign Targets", ar: "4. متابعة أهداف الحملة" },
        details: {
          en: "Monitor daily progress against campaign targets. Track: invitations sent vs target, confirmations vs target, visits completed, coverage collected. Update the Campaign_Master sheet daily. IF targets are at risk: escalate to Ops Lead with evidence and proposed recovery plan.",
          ar: "تابع التقدم اليومي مقابل أهداف الحملة. تتبع: الدعوات المرسلة مقابل الهدف، التأكيدات مقابل الهدف، الزيارات المكتملة، التغطية المجمّعة. حدّث شيت Campaign_Master يومياً. إذا كانت الأهداف مهددة: صعّد لقائد العمليات بالدليل وخطة التعافي المقترحة."
        },
        dod: { en: "All trackers updated daily by EOD, risks flagged within 2 hours of identification", ar: "كل المتتبعات محدّثة يومياً قبل نهاية اليوم، المخاطر مُبلّغة خلال ساعتين من اكتشافها" },
        evidence: { en: "Updated trackers, risk log entries, escalation messages with evidence", ar: "متتبعات محدّثة، إدخالات سجل المخاطر، رسائل تصعيد بالدليل" },
        mistakes: { en: "Delayed updates, unreported gaps, no recovery plan when targets slip", ar: "تحديثات متأخرة، فجوات غير مبلّغة، عدم وجود خطة تعافي عند تراجع الأهداف" },
      },
      {
        title: { en: "5. Meetings & Documentation", ar: "5. الاجتماعات والتوثيق" },
        details: {
          en: "Conduct regular client meetings (kickoff, weekly updates, wrap-up). For each meeting: prepare agenda in advance, take notes during meeting, produce MOM within 24h, share with client for sign-off. Maintain a yearly calendar with all scheduled touchpoints.",
          ar: "أجرِ اجتماعات منتظمة مع العميل (انطلاق، تحديثات أسبوعية، ختام). لكل اجتماع: جهّز الأجندة مسبقاً، دوّن الملاحظات أثناء الاجتماع، أنتج محضر الاجتماع خلال 24 ساعة، شاركه مع العميل للمصادقة. حافظ على تقويم سنوي بكل نقاط التواصل المجدولة."
        },
        sla: "MOM within 24h of meeting",
        dod: { en: "MOM shared and signed off by client, calendar updated", ar: "محضر الاجتماع مشارك ومصادق عليه من العميل، التقويم محدّث" },
        evidence: { en: "MOM documents, client sign-off emails, calendar entries", ar: "مستندات محاضر الاجتماعات، إيميلات مصادقة العميل، إدخالات التقويم" },
        mistakes: { en: "No agenda, delayed MOMs, missing sign-offs, forgotten follow-ups", ar: "بدون أجندة، محاضر متأخرة، مصادقات مفقودة، متابعات منسية" },
      },
      {
        title: { en: "6. Daily Client Updates", ar: "6. التحديثات اليومية للعميل" },
        details: {
          en: "Send a daily status update to the client covering: today's completed visits, coverage collected, any issues/risks, decisions needed. Use the appropriate template from the Templates Library (green update for all-clear, risk update for issues). IF a decision is needed from the client: clearly state the decision, deadline, and impact of delay.",
          ar: "أرسل تحديث حالة يومي للعميل يغطي: زيارات اليوم المكتملة، التغطية المجمّعة، أي مشاكل/مخاطر، قرارات مطلوبة. استخدم القالب المناسب من مكتبة القوالب (تحديث أخضر للوضع الطبيعي، تحديث مخاطر للمشاكل). إذا كان قرار مطلوب من العميل: حدد القرار بوضوح، الموعد النهائي، وتأثير التأخير."
        },
        dod: { en: "Client update sent before EOD with accurate data and correct template", ar: "تحديث العميل مرسل قبل نهاية اليوم ببيانات دقيقة والقالب الصحيح" },
        evidence: { en: "Sent messages/emails with timestamps, Client_Comm_Log updated", ar: "رسائل/إيميلات مرسلة بالتاريخ والوقت، Client_Comm_Log محدّث" },
        mistakes: { en: "Sending after EOD, inaccurate numbers, wrong template, missing decision requests", ar: "الإرسال بعد نهاية اليوم، أرقام غير دقيقة، قالب خاطئ، طلبات قرار مفقودة" },
      },
    ],
    outputs: [
      { en: "Campaign brief (client-approved)", ar: "برِيف الحملة (معتمد من العميل)" },
      { en: "Influencer list (sourced, scored, approved)", ar: "قائمة المؤثرين (مختارة، مقيّمة، معتمدة)" },
      { en: "Booking Order (handed to Coordination)", ar: "أمر الحجز (مسلّم للتنسيق)" },
      { en: "Daily client updates", ar: "تحديثات يومية للعميل" },
      { en: "Meeting MOMs (signed)", ar: "محاضر الاجتماعات (موقّعة)" },
      { en: "Yearly calendar", ar: "التقويم السنوي" },
    ],
    slas: [
      { step: "Influencer list delivery", sla: "≤48h after brief approval", rag: "Amber", breach: "Escalate to Ops Lead" },
      { step: "Booking Order creation", sla: "Same day after client approval", rag: "Green", breach: "Delay blocks all downstream teams" },
      { step: "Daily client update", sla: "Before EOD daily", rag: "Green", breach: "Client escalation risk" },
      { step: "MOM delivery", sla: "≤24h after meeting", rag: "Amber", breach: "Follow up immediately" },
      { step: "Risk escalation", sla: "Within 2h of identification", rag: "Red", breach: "Ops Lead notified automatically" },
    ],
    qualityGates: [
      { en: "All influencer profiles complete (no blank fields)", ar: "كل ملفات المؤثرين مكتملة (بدون حقول فارغة)" },
      { en: "Client approval documented before any campaign action", ar: "موافقة العميل موثّقة قبل أي إجراء على الحملة" },
      { en: "Booking Order matches approved list exactly", ar: "أمر الحجز يطابق القائمة المعتمدة بالضبط" },
      { en: "Daily update numbers match tracker data", ar: "أرقام التحديث اليومي تطابق بيانات المتتبع" },
      { en: "MOM includes all action items with owners and deadlines", ar: "محضر الاجتماع يتضمن كل بنود العمل بمالكين ومواعيد" },
    ],
    escalation: [
      { en: "Tier 1 — Team Lead: Handle within team, resolve within 4h. Required: issue description, impacted items, attempted fix.", ar: "المستوى 1 — قائد الفريق: المعالجة داخل الفريق، الحل خلال 4 ساعات. المطلوب: وصف المشكلة، العناصر المتأثرة، الحل المجرّب." },
      { en: "Tier 2 — Ops Lead: Cross-team coordination, resolve within 12h. Required: Tier 1 evidence + business impact assessment.", ar: "المستوى 2 — قائد العمليات: تنسيق بين الفرق، الحل خلال 12 ساعة. المطلوب: أدلة المستوى 1 + تقييم التأثير على الأعمال." },
      { en: "Tier 3 — Client: Client-facing escalation when their decision is needed. Required: full context, options, recommendation, ETA.", ar: "المستوى 3 — العميل: تصعيد للعميل عند الحاجة لقراره. المطلوب: السياق الكامل، الخيارات، التوصية، الوقت المتوقع." },
    ],
    qaItems: [
      {
        question: { en: "Influencer not replying after 12 reminders", ar: "المؤثر لا يرد بعد 12 تذكير" },
        symptoms: { en: "No response in WhatsApp after 12+ attempts over multiple days", ar: "لا رد في الواتساب بعد 12+ محاولة على مدى عدة أيام" },
        causes: { en: "Wrong number, blocked, not interested, messages going to spam", ar: "رقم خاطئ، محظور، غير مهتم، الرسائل تذهب للسبام" },
        fix: { en: "1. Verify number is correct. 2. Try alternate contact (DM, email). 3. Mark as 'No Response' in tracker. 4. Source replacement influencer. 5. Update client.", ar: "1. تحقق من صحة الرقم. 2. جرّب وسيلة تواصل بديلة (DM، إيميل). 3. حدد كـ'لا رد' في المتتبع. 4. اختر مؤثر بديل. 5. حدّث العميل." },
        owner: { en: "Chat Team → Community (for replacement)", ar: "فريق الشات → الكوميونيتي (للبديل)" },
        sla: "≤24h to source replacement",
        evidence: { en: "Screenshot of 12+ attempts, tracker status, replacement proposal", ar: "لقطة شاشة لـ12+ محاولة، حالة المتتبع، اقتراح البديل" },
        escalation: { en: "After 12 attempts with no response, escalate to Community for replacement sourcing", ar: "بعد 12 محاولة بدون رد، صعّد للكوميونيتي لاختيار بديل" },
      },
      {
        question: { en: "Client change request mid-campaign", ar: "طلب تغيير من العميل أثناء الحملة" },
        symptoms: { en: "Client asks to modify brief, add/remove influencers, or change deliverables after campaign started", ar: "العميل يطلب تعديل البرِيف، إضافة/إزالة مؤثرين، أو تغيير المخرجات بعد بدء الحملة" },
        causes: { en: "Market changes, internal client decisions, performance feedback", ar: "تغيرات السوق، قرارات داخلية للعميل، ملاحظات الأداء" },
        fix: { en: "1. Acknowledge request immediately. 2. Assess impact (timeline, budget, resources). 3. Document change scope. 4. Get client approval on revised plan. 5. Update all systems/sheets/folders.", ar: "1. اعترف بالطلب فوراً. 2. قيّم التأثير (الجدول، الميزانية، الموارد). 3. وثّق نطاق التغيير. 4. احصل على موافقة العميل على الخطة المعدّلة. 5. حدّث كل الأنظمة/الشيتات/الفولدرات." },
        owner: { en: "Community Lead", ar: "قائد الكوميونيتي" },
        sla: "Impact assessment within 4h",
        evidence: { en: "Change request document, impact analysis, client approval, updated systems", ar: "مستند طلب التغيير، تحليل التأثير، موافقة العميل، الأنظمة المحدّثة" },
        escalation: { en: "If impact exceeds budget/timeline by >20%, escalate to Ops Lead before responding to client", ar: "إذا تجاوز التأثير الميزانية/الجدول بأكثر من 20%، صعّد لقائد العمليات قبل الرد على العميل" },
      },
    ],
    howTo: [
      {
        title: { en: "How to: Create a Campaign Brief", ar: "كيف: إنشاء برِيف حملة" },
        preconditions: { en: "Client meeting completed, contract signed, budget confirmed", ar: "اجتماع العميل مكتمل، العقد موقّع، الميزانية مؤكدة" },
        tools: { en: "Google Docs, Campaign_Master sheet, MOM template", ar: "جوجل دوكس، شيت Campaign_Master، قالب محضر الاجتماع" },
        steps: { en: "1. Open Campaign Brief template\n2. Fill: Campaign Name, Client, Brand, Country\n3. Add: Objective, Target Audience, KPIs\n4. Specify: # of influencers, content types, visit requirements\n5. Add: Timeline with milestones\n6. Include: Budget breakdown\n7. Review with team lead\n8. Send to client for approval", ar: "1. افتح قالب برِيف الحملة\n2. املأ: اسم الحملة، العميل، البراند، الدولة\n3. أضف: الهدف، الجمهور المستهدف، المؤشرات\n4. حدد: عدد المؤثرين، أنواع المحتوى، متطلبات الزيارات\n5. أضف: الجدول الزمني بالمحطات الرئيسية\n6. ضمّن: تفصيل الميزانية\n7. راجع مع قائد الفريق\n8. أرسل للعميل للموافقة" },
        outputs: { en: "Approved Campaign Brief PDF", ar: "PDF برِيف الحملة المعتمد" },
        dod: { en: "Brief has all required fields, client approved in writing, saved in Dropbox", ar: "البرِيف يحتوي كل الحقول المطلوبة، العميل وافق كتابياً، محفوظ في دروب بوكس" },
        mistakes: { en: "Missing KPI targets, vague deliverables, no client sign-off before starting", ar: "أهداف مؤشرات مفقودة، مخرجات غامضة، بدون مصادقة العميل قبل البدء" },
        qa: { en: "All fields populated? Client name correct? Dates realistic? Budget matches contract?", ar: "كل الحقول مكتملة؟ اسم العميل صحيح؟ التواريخ واقعية؟ الميزانية تطابق العقد؟" },
      },
      {
        title: { en: "Community Checklist", ar: "Community Checklist" },
        preconditions: { en: "Active client portfolio", ar: "Active client portfolio" },
        tools: { en: "Dashboard, Tracking system, Client IG accounts", ar: "Dashboard, Tracking system, Client IG accounts" },
        steps: { en: "1. Add new influencers to the dashboard.\n2. Create plans for upcoming clients or current clients.\n3. Generate leads to help the communication team.\n4. Check the remaining quantity for each client and set up a meeting with them to activate a campaign.\n5. Ensure at least two meetings scheduled with the client each month.\n6. Check clients' IG accounts to understand their target audience to make influencer selection easier.", ar: "1. Add new influencers to the dashboard.\n2. Create plans for upcoming clients or current clients.\n3. Generate leads to help the communication team.\n4. Check the remaining quantity for each client and set up a meeting with them to activate a campaign.\n5. Ensure at least two meetings scheduled with the client each month.\n6. Check clients' IG accounts to understand their target audience to make influencer selection easier." },
        outputs: { en: "Updated dashboard, activated campaigns, scheduled client meetings", ar: "Updated dashboard, activated campaigns, scheduled client meetings" },
        dod: { en: "All clients have active plans, at least two monthly meetings, and audience research done", ar: "All clients have active plans, at least two monthly meetings, and audience research done" },
        mistakes: { en: "Skipping audience research, not scheduling enough client meetings, forgetting to activate campaigns", ar: "Skipping audience research, not scheduling enough client meetings, forgetting to activate campaigns" },
        qa: { en: "Two meetings/month per client? Dashboard updated? Audience researched?", ar: "Two meetings/month per client? Dashboard updated? Audience researched?" },
      },
      {
        title: { en: "Campaign Process", ar: "Campaign Process" },
        preconditions: { en: "Client signed + campaign brief approved", ar: "Client signed + campaign brief approved" },
        tools: { en: "Dashboard, Booking Order template, Client group chat, Tracking system", ar: "Dashboard, Booking Order template, Client group chat, Tracking system" },
        steps: { en: "1. Call or set up a meeting with the client to get all needed information for the campaign.\n2. Ask the client about the influencer criteria they would like to use.\n3. Choose the list and send it to the client to get their approval.\n4. After list approval, send the booking order to the client in the group for approval, then send it to operations.\n5. Always double or triple the requested number of influencers on the list.\n6. Check confirmations and ensure you reached more than the requested number.\n7. If target is 50 visits, confirm with 100. If target is 50 delivery, confirm with 60.\n8. Always ensure the client is approved to confirm with Extra.\n9. Check camp info to ensure operations sent the right details to influencers and took IG screenshots before starting.\n10. Check the messages sent to the influencers.\n11. Follow up on the campaign while running to ensure everything goes smoothly.\n12. Check from your side if influencers posted on their social media.\n13. After closing, ask ops for the report and schedule a meeting with the client to discuss feedback.\n14. Always follow up with clients after any campaign and prepare something for them to start a new campaign and use their quantity.", ar: "1. Call or set up a meeting with the client to get all needed information for the campaign.\n2. Ask the client about the influencer criteria they would like to use.\n3. Choose the list and send it to the client to get their approval.\n4. After list approval, send the booking order to the client in the group for approval, then send it to operations.\n5. Always double or triple the requested number of influencers on the list.\n6. Check confirmations and ensure you reached more than the requested number.\n7. If target is 50 visits, confirm with 100. If target is 50 delivery, confirm with 60.\n8. Always ensure the client is approved to confirm with Extra.\n9. Check camp info to ensure operations sent the right details to influencers and took IG screenshots before starting.\n10. Check the messages sent to the influencers.\n11. Follow up on the campaign while running to ensure everything goes smoothly.\n12. Check from your side if influencers posted on their social media.\n13. After closing, ask ops for the report and schedule a meeting with the client to discuss feedback.\n14. Always follow up with clients after any campaign and prepare something for them to start a new campaign and use their quantity." },
        outputs: { en: "Approved list, approved booking order, running campaign, client feedback", ar: "Approved list, approved booking order, running campaign, client feedback" },
        dod: { en: "Booking order approved by client and ops, confirmations exceed target, report delivered with feedback", ar: "Booking order approved by client and ops, confirmations exceed target, report delivered with feedback" },
        mistakes: { en: "Confirming fewer than target, sending booking order before list approval, not checking camp info", ar: "Confirming fewer than target, sending booking order before list approval, not checking camp info" },
        qa: { en: "Confirmations > target? Booking order approved by both? Camp info verified?", ar: "Confirmations > target? Booking order approved by both? Camp info verified?" },
      },
      {
        title: { en: "Morning (Daily) Routine", ar: "Morning (Daily) Routine" },
        preconditions: { en: "Campaigns active or recently closed", ar: "Campaigns active or recently closed" },
        tools: { en: "Tracking system, Confirmation link, Ops chat", ar: "Tracking system, Confirmation link, Ops chat" },
        steps: { en: "1. Check the campaign's status.\n2. Check confirmations and missing coverage.\n3. Check old dates and their IG accounts if they posted and operations didn't upload.\n4. Follow up with ops if you find missing coverage or someone visited but didn't post.\n5. Check the tracking system to follow up with ops about who visited and didn't post.\n6. Check if ops asked for backup lists.\n7. Check for old dates in the confirmation link and ask ops to change or remove them.\n8. Send a daily report at the end of each day.", ar: "1. Check the campaign's status.\n2. Check confirmations and missing coverage.\n3. Check old dates and their IG accounts if they posted and operations didn't upload.\n4. Follow up with ops if you find missing coverage or someone visited but didn't post.\n5. Check the tracking system to follow up with ops about who visited and didn't post.\n6. Check if ops asked for backup lists.\n7. Check for old dates in the confirmation link and ask ops to change or remove them.\n8. Send a daily report at the end of each day." },
        outputs: { en: "Daily report, resolved missing coverage, cleaned confirmation link", ar: "Daily report, resolved missing coverage, cleaned confirmation link" },
        dod: { en: "All missing coverage followed up, old dates removed, daily report sent", ar: "All missing coverage followed up, old dates removed, daily report sent" },
        mistakes: { en: "Forgetting the daily report, ignoring old dates in confirmation link, not following up on missing coverage", ar: "Forgetting the daily report, ignoring old dates in confirmation link, not following up on missing coverage" },
        qa: { en: "Daily report sent? Old dates cleared? Missing coverage followed up?", ar: "Daily report sent? Old dates cleared? Missing coverage followed up?" },
      },
      {
        title: { en: "After Each Campaign", ar: "After Each Campaign" },
        preconditions: { en: "Campaign closed", ar: "Campaign closed" },
        tools: { en: "Report template, Client meeting, Ops support", ar: "Report template, Client meeting, Ops support" },
        steps: { en: "1. Send the report to the client after 24 or 48 hours; if not ready, prepare it yourself or ask ops for a tutorial.\n2. Make sure to get feedback from the client.", ar: "1. Send the report to the client after 24 or 48 hours; if not ready, prepare it yourself or ask ops for a tutorial.\n2. Make sure to get feedback from the client." },
        outputs: { en: "Client report, client feedback", ar: "Client report, client feedback" },
        dod: { en: "Report delivered within 24–48h, client feedback captured", ar: "Report delivered within 24–48h, client feedback captured" },
        mistakes: { en: "Delaying the report, not collecting feedback, waiting on ops instead of preparing it", ar: "Delaying the report, not collecting feedback, waiting on ops instead of preparing it" },
        qa: { en: "Report sent within 48h? Feedback captured?", ar: "Report sent within 48h? Feedback captured?" },
      },
    ],
  },
  sop_coordination: {
    teamName: { en: "Coordination Hub", ar: "مركز التنسيق" },
    teamIcon: <Settings className="h-5 w-5" />,
    owner: { en: "Coordination Lead", ar: "قائد التنسيق" },
    approver: { en: "Operations Lead", ar: "قائد العمليات" },
    purpose: {
      en: "The Coordination team is the operational backbone — they set up every campaign's infrastructure (folders, sheets, system entries), run daily governance, and deliver final reports. If something isn't set up right, every downstream team suffers.",
      ar: "فريق التنسيق هو العمود الفقري التشغيلي — يقومون بإعداد البنية التحتية لكل حملة (فولدرات، شيتات، إدخالات النظام)، يديرون الحوكمة اليومية، ويسلّمون التقارير النهائية. إذا لم يُعَد شيء بشكل صحيح، كل الفرق اللاحقة تتأثر."
    },
    steps: [
      {
        title: { en: "1. Validate Booking Order", ar: "1. مراجعة أمر الحجز" },
        details: { en: "Receive Booking Order from Community. Validate: all influencer names match approved list, dates are feasible, deliverables are clear. IF any field is missing or unclear: reject back to Community with specific notes. Do not proceed with incomplete orders.", ar: "استلم أمر الحجز من الكوميونيتي. تحقق: كل أسماء المؤثرين تطابق القائمة المعتمدة، التواريخ ممكنة، المخرجات واضحة. إذا أي حقل ناقص أو غامض: ارفض وأعد للكوميونيتي بملاحظات محددة. لا تتقدم بأوامر ناقصة." },
        sla: "Within 2h of receipt",
        dod: { en: "Booking Order validated or rejected with reasons", ar: "أمر الحجز مصادق أو مرفوض مع الأسباب" },
        evidence: { en: "Validation checklist completed, rejection notes if applicable", ar: "قائمة التحقق مكتملة، ملاحظات الرفض إن وُجدت" },
        mistakes: { en: "Accepting incomplete orders, not checking against approved list, proceeding without validation", ar: "قبول أوامر ناقصة، عدم المراجعة مقابل القائمة المعتمدة، المتابعة بدون تصديق" },
      },
      {
        title: { en: "2. Create Dropbox Folders + Shortcuts", ar: "2. إنشاء فولدرات دروب بوكس + اختصارات" },
        details: { en: "Create folder structure: All Campaigns → Company → Brand+Country → Year → Month+Year+Type. Create shortcut under Active Campaigns. Verify naming matches the standard exactly.", ar: "أنشئ هيكلة الفولدرات: كل الحملات → الشركة → البراند+الدولة → السنة → الشهر+السنة+النوع. أنشئ اختصار تحت الحملات النشطة. تحقق أن التسمية تطابق المعيار بالضبط." },
        sla: "Within 4h of validation",
        dod: { en: "Folders created, shortcut active, naming verified", ar: "الفولدرات منشأة، الاختصار فعّال، التسمية متحققة" },
        evidence: { en: "Dropbox folder links, screenshot of structure", ar: "روابط فولدرات دروب بوكس، لقطة شاشة للهيكلة" },
        mistakes: { en: "Wrong naming, missing year folder, no shortcut, typos in brand name", ar: "تسمية خاطئة، فولدر السنة مفقود، بدون اختصار، أخطاء إملائية في اسم البراند" },
      },
      {
        title: { en: "3. Build cam.info + Base Sheets", ar: "3. تجهيز cam.info + الشيتات الأساسية" },
        details: { en: "Create Google Sheets workbook from template. Populate: Campaign_Master, Cam_Info, Influencer_List tabs with Booking Order data. Set up dropdown validations. Share with all team members.", ar: "أنشئ ملف جوجل شيتس من القالب. املأ: تبويبات Campaign_Master، Cam_Info، Influencer_List ببيانات أمر الحجز. أعد قوائم التحقق المنسدلة. شارك مع كل أعضاء الفريق." },
        sla: "Within 4h of folder creation",
        dod: { en: "All tabs populated, validations working, shared with team", ar: "كل التبويبات مملوءة، التحققات تعمل، مشارك مع الفريق" },
        evidence: { en: "Sheet link, screenshots of populated tabs, sharing log", ar: "رابط الشيت، لقطات شاشة للتبويبات المملوءة، سجل المشاركة" },
        mistakes: { en: "Missing tabs, wrong dropdown values, not sharing with all members, data mismatch with BO", ar: "تبويبات مفقودة، قيم منسدلة خاطئة، عدم المشاركة مع الكل، عدم تطابق البيانات مع أمر الحجز" },
      },
      {
        title: { en: "4. Create Campaign in System/Dashboard", ar: "4. إنشاء الحملة على النظام/لوحة القيادة" },
        details: { en: "Enter the campaign in the system/dashboard with all details from Booking Order. Assign influencers. Set dates and deliverables. Verify system data matches Sheet data exactly.", ar: "أدخل الحملة في النظام/لوحة القيادة بكل التفاصيل من أمر الحجز. عيّن المؤثرين. حدد التواريخ والمخرجات. تحقق أن بيانات النظام تطابق بيانات الشيت بالضبط." },
        sla: "Same day as sheet setup",
        dod: { en: "Campaign live in system, all influencers assigned, data matches sheet", ar: "الحملة فعّالة في النظام، كل المؤثرين معيّنين، البيانات تطابق الشيت" },
        evidence: { en: "System screenshot, cross-check with sheet data", ar: "لقطة شاشة للنظام، مطابقة مع بيانات الشيت" },
        mistakes: { en: "Typos in influencer names, wrong dates, missing deliverable assignments", ar: "أخطاء إملائية في أسماء المؤثرين، تواريخ خاطئة، تعيينات مخرجات مفقودة" },
      },
      {
        title: { en: "5. Daily Governance", ar: "5. الحوكمة اليومية" },
        details: { en: "Run Tomorrow Visits review every afternoon: confirm schedule, identify risks, pre-assign tasks. Check SLA breaches. Update risk log. Coordinate across teams for blockers.", ar: "أجرِ مراجعة زيارات بكرة كل بعد ظهر: تأكيد الجدول، تحديد المخاطر، تعيين المهام مسبقاً. تحقق من اختراقات SLA. حدّث سجل المخاطر. نسّق بين الفرق للعوائق." },
        dod: { en: "Tomorrow Visits reviewed, risks logged, SLA breaches flagged, tasks assigned", ar: "زيارات بكرة مراجعة، المخاطر مسجّلة، اختراقات SLA محددة، المهام معيّنة" },
        evidence: { en: "Updated Tomorrow_Visits tab, risk log entries, assignment messages", ar: "تبويب Tomorrow_Visits محدّث، إدخالات سجل المخاطر، رسائل التعيين" },
        mistakes: { en: "Skipping governance, not checking SLAs, reactive instead of proactive", ar: "تخطي الحوكمة، عدم فحص SLA، ردّ الفعل بدلاً من الاستباقية" },
      },
      {
        title: { en: "6. Final Report Delivery", ar: "6. تسليم التقرير النهائي" },
        details: { en: "Compile final campaign report: KPIs vs targets, coverage summary, proof folder link, issues log, lessons learned. QA report data against the System / Task Manager (and the client sheet when used). Deliver to Community for client presentation.", ar: "جمّع تقرير الحملة النهائي: المؤشرات مقابل الأهداف، ملخص التغطية، رابط فولدر الإثباتات، سجل المشاكل، الدروس المستفادة. راجع جودة بيانات التقرير مقابل النظام / مدير المهام (وشيت العميل عند استخدامه). سلّم للكوميونيتي لعرضه على العميل." },
        sla: "24–48h after campaign end",
        dod: { en: "Report QA'd, data matches all sources, delivered to Community", ar: "التقرير مراجع الجودة، البيانات تطابق كل المصادر، مسلّم للكوميونيتي" },
        evidence: { en: "Final report document, QA sign-off, delivery confirmation", ar: "مستند التقرير النهائي، مصادقة مراجعة الجودة، تأكيد التسليم" },
        mistakes: { en: "Numbers don't match sources, missing proof links, delayed delivery", ar: "الأرقام لا تطابق المصادر، روابط إثباتات مفقودة، تسليم متأخر" },
      },
    ],
    outputs: [
      { en: "Validated Booking Order", ar: "أمر حجز مصادق" },
      { en: "Campaign folder structure (Dropbox)", ar: "هيكلة فولدرات الحملة (دروب بوكس)" },
      { en: "Google Sheets workbook (all tabs)", ar: "ملف جوجل شيتس (كل التبويبات)" },
      { en: "System campaign entry", ar: "إدخال الحملة في النظام" },
      { en: "Daily governance outputs", ar: "مخرجات الحوكمة اليومية" },
      { en: "Final campaign report", ar: "تقرير الحملة النهائي" },
    ],
    slas: [
      { step: "BO validation", sla: "Within 2h", rag: "Green", breach: "Reject back to Community" },
      { step: "Folder + sheets + system", sla: "≤4h total setup", rag: "Amber", breach: "Escalate to Ops Lead" },
      { step: "Daily governance", sla: "Every afternoon", rag: "Green", breach: "Auto-flag in risk log" },
      { step: "Final report", sla: "24–48h post-campaign", rag: "Amber", breach: "Client delay notification" },
    ],
    qualityGates: [
      { en: "Folder naming matches standard exactly", ar: "تسمية الفولدرات تطابق المعيار بالضبط" },
      { en: "Sheet data matches Booking Order 100%", ar: "بيانات الشيت تطابق أمر الحجز 100%" },
      { en: "System entries match sheet entries", ar: "إدخالات النظام تطابق إدخالات الشيت" },
      { en: "Final report numbers reconcile across all sources", ar: "أرقام التقرير النهائي تتطابق عبر كل المصادر" },
    ],
    escalation: [
      { en: "Tier 1 — Coordination Lead: Fix within 4h. Evidence: what's wrong, what was attempted.", ar: "المستوى 1 — قائد التنسيق: الإصلاح خلال 4 ساعات. الدليل: ما الخطأ، ما تم محاولته." },
      { en: "Tier 2 — Ops Lead: Cross-team issue, fix within 12h. Evidence: Tier 1 log + impact.", ar: "المستوى 2 — قائد العمليات: مشكلة بين فرق، الإصلاح خلال 12 ساعة. الدليل: سجل المستوى 1 + التأثير." },
      { en: "Tier 3 — Client: When campaign delivery is at risk. Evidence: full context + recovery plan.", ar: "المستوى 3 — العميل: عندما تسليم الحملة مهدد. الدليل: السياق الكامل + خطة التعافي." },
    ],
    qaItems: [
      {
        question: { en: "Wrong folder structure or mixed influencer folders", ar: "هيكلة فولدرات خاطئة أو فولدرات مؤثرين مخلوطة" },
        symptoms: { en: "Files in wrong locations, multiple influencers in same folder, naming doesn't match standard", ar: "ملفات في مواقع خاطئة، عدة مؤثرين في نفس الفولدر، التسمية لا تطابق المعيار" },
        causes: { en: "Rush to set up, copy-paste errors, not following naming convention, no QA check", ar: "التسرع في الإعداد، أخطاء نسخ ولصق، عدم اتباع اتفاقية التسمية، بدون فحص جودة" },
        fix: { en: "1. Stop all uploads. 2. Map current vs correct structure. 3. Move files to correct locations. 4. Fix naming. 5. Verify no files lost. 6. Update all links in sheets.", ar: "1. أوقف كل الرفع. 2. خريطة الهيكلة الحالية مقابل الصحيحة. 3. انقل الملفات للمواقع الصحيحة. 4. أصلح التسمية. 5. تحقق أنه لا ملفات مفقودة. 6. حدّث كل الروابط في الشيتات." },
        owner: { en: "Coordination Team", ar: "فريق التنسيق" },
        sla: "≤4h to fix",
        evidence: { en: "Before/after screenshots, updated links in sheets", ar: "لقطات شاشة قبل/بعد، روابط محدّثة في الشيتات" },
        escalation: { en: "If >50 files need moving, escalate to Ops Lead for resource allocation", ar: "إذا أكثر من 50 ملف يحتاج نقل، صعّد لقائد العمليات لتخصيص الموارد" },
      },
    ],
    howTo: [
      {
        title: { en: "How to: Create Campaign Folder Structure", ar: "كيف: إنشاء هيكلة فولدرات الحملة" },
        preconditions: { en: "Validated Booking Order received", ar: "أمر حجز مصادق مستلم" },
        tools: { en: "Dropbox, Google Sheets template", ar: "دروب بوكس، قالب جوجل شيتس" },
        steps: { en: "1. Navigate to All Campaigns in Dropbox\n2. Create/find Company folder\n3. Create Brand+Country subfolder\n4. Create Year subfolder\n5. Create Month+Year+Type folder\n6. Add subfolders: Briefs, Proofs, Reports\n7. Create shortcut in Active Campaigns\n8. Verify naming against standard\n9. Copy sheet template into folder\n10. Share links with team", ar: "1. انتقل إلى كل الحملات في دروب بوكس\n2. أنشئ/ابحث عن فولدر الشركة\n3. أنشئ فولدر فرعي البراند+الدولة\n4. أنشئ فولدر فرعي السنة\n5. أنشئ فولدر الشهر+السنة+النوع\n6. أضف فولدرات فرعية: البرِيفات، الإثباتات، التقارير\n7. أنشئ اختصار في الحملات النشطة\n8. تحقق من التسمية مقابل المعيار\n9. انسخ قالب الشيت إلى الفولدر\n10. شارك الروابط مع الفريق" },
        outputs: { en: "Complete folder structure with shortcut and shared links", ar: "هيكلة فولدرات كاملة مع اختصار وروابط مشاركة" },
        dod: { en: "All folders exist, naming correct, shortcut works, team has access", ar: "كل الفولدرات موجودة، التسمية صحيحة، الاختصار يعمل، الفريق لديه وصول" },
        mistakes: { en: "Typos in folder names, missing Active Campaigns shortcut, wrong permissions", ar: "أخطاء إملائية في أسماء الفولدرات، اختصار الحملات النشطة مفقود، صلاحيات خاطئة" },
        qa: { en: "Path matches standard? Shortcut resolves? All team members can access?", ar: "المسار يطابق المعيار؟ الاختصار يعمل؟ كل أعضاء الفريق يستطيعون الوصول؟" },
      },
    ],
  },
  sop_chat: {
    teamName: { en: "Chat & WhatsApp Operations", ar: "عمليات الشات والواتساب" },
    teamIcon: <Activity className="h-5 w-5" />,
    owner: { en: "Chat Team Lead", ar: "قائد فريق الشات" },
    approver: { en: "Operations Lead", ar: "قائد العمليات" },
    purpose: {
      en: "The Chat team is the direct communication channel with influencers. They handle invitations, reminders, brief delivery, live support during visits, and data auditing. Every message must be contextual, professional, and logged with timestamps.",
      ar: "فريق الشات هو قناة التواصل المباشرة مع المؤثرين. يتعاملون مع الدعوات، التذكيرات، إرسال البرِيف، الدعم المباشر أثناء الزيارات، وتدقيق البيانات. كل رسالة يجب أن تكون بسياق، مهنية، ومسجّلة بالتاريخ والوقت."
    },
    steps: [
      { title: { en: "1. Contextual Invitations", ar: "1. الدعوات بسياق" }, details: { en: "Send personalized invitation messages to each influencer. Include: campaign name, brand, what they'll experience, visit date options, and why they were selected. Use the Invitation template. Log each message with timestamp in Influencer_Comm_Log.", ar: "أرسل رسائل دعوة مخصصة لكل مؤثر. ضمّن: اسم الحملة، البراند، ما سيختبرونه، خيارات تاريخ الزيارة، ولماذا تم اختيارهم. استخدم قالب الدعوة. سجّل كل رسالة بالتاريخ والوقت في Influencer_Comm_Log." }, sla: "All invitations sent within 24h of campaign setup", dod: { en: "All influencers contacted, messages logged, confirmations tab updated", ar: "كل المؤثرين تم التواصل معهم، الرسائل مسجّلة، تبويب التأكيدات محدّث" }, evidence: { en: "WhatsApp screenshots, Influencer_Comm_Log entries", ar: "لقطات واتساب، إدخالات Influencer_Comm_Log" }, mistakes: { en: "Generic messages, missing personalization, no logging, sending to wrong contact", ar: "رسائل عامة، تخصيص مفقود، بدون تسجيل، الإرسال لجهة اتصال خاطئة" } },
      { title: { en: "2. Log Replies & Update Confirmations", ar: "2. تسجيل الردود وتحديث التأكيدات" }, details: { en: "For every reply: update Confirmations tab with: reply status (Yes/No/Maybe/No Response), timestamp, notes. IF 'Maybe': schedule follow-up. IF 'No': notify Community for replacement.", ar: "لكل رد: حدّث تبويب التأكيدات بـ: حالة الرد (نعم/لا/ربما/لا رد)، التاريخ والوقت، ملاحظات. إذا 'ربما': جدول متابعة. إذا 'لا': أبلغ الكوميونيتي للبديل." }, dod: { en: "All replies logged within 1h of receipt, statuses accurate", ar: "كل الردود مسجّلة خلال ساعة من الاستلام، الحالات دقيقة" }, evidence: { en: "Updated Confirmations tab, reply screenshots", ar: "تبويب التأكيدات المحدّث، لقطات الردود" }, mistakes: { en: "Delayed logging, wrong status, not notifying Community for 'No' replies", ar: "تسجيل متأخر، حالة خاطئة، عدم إبلاغ الكوميونيتي لردود 'لا'" } },
      { title: { en: "3. Send Reminders (Escalating)", ar: "3. إرسال التذكيرات (تصاعدي)" }, details: { en: "Send Reminder #1 at 48h before visit, Reminder #2 (final) at 24h before. IF no response after both: flag in tracker, notify Follow-Up team. Use Reminder templates.", ar: "أرسل تذكير #1 قبل 48 ساعة من الزيارة، تذكير #2 (نهائي) قبل 24 ساعة. إذا لا رد بعد كلاهما: حدد في المتتبع، أبلغ فريق المتابعة. استخدم قوالب التذكير." }, sla: "Reminders sent on schedule, no delays", dod: { en: "Both reminders sent on time, non-responders flagged", ar: "كلا التذكيرين أُرسلا في الوقت، غير المستجيبين محددين" }, evidence: { en: "Message timestamps, tracker flags", ar: "أوقات الرسائل، علامات المتتبع" }, mistakes: { en: "Missing reminder window, wrong template, not flagging non-responders", ar: "تفويت نافذة التذكير، قالب خاطئ، عدم تحديد غير المستجيبين" } },
      { title: { en: "4. Send Brief Before Visit", ar: "4. إرسال البرِيف قبل الزيارة" }, details: { en: "24h before visit: send the campaign brief to confirmed influencers. Include: visit time, location, what to post, hashtags, mentions, any restrictions. Use Brief template. Confirm receipt.", ar: "24 ساعة قبل الزيارة: أرسل برِيف الحملة للمؤثرين المؤكدين. ضمّن: وقت الزيارة، الموقع، ما يُنشر، الهاشتاقات، الإشارات، أي قيود. استخدم قالب البرِيف. تأكد من الاستلام." }, sla: "≤24h before scheduled visit", dod: { en: "Brief sent, receipt confirmed, tracker updated", ar: "البرِيف مرسل، الاستلام مؤكد، المتتبع محدّث" }, evidence: { en: "Sent brief screenshot, receipt confirmation", ar: "لقطة البرِيف المرسل، تأكيد الاستلام" }, mistakes: { en: "Sending late, wrong brief version, missing key details, no receipt check", ar: "الإرسال متأخر، نسخة برِيف خاطئة، تفاصيل أساسية مفقودة، بدون فحص استلام" } },
      { title: { en: "5. Live Support During Visit", ar: "5. الدعم المباشر أثناء الزيارة" }, details: { en: "Be available during visit hours. Answer questions immediately. IF QR code not working: send alternative link. IF influencer needs guidance: provide it in real-time. Log all interactions.", ar: "كن متاحاً أثناء ساعات الزيارة. أجب على الأسئلة فوراً. إذا كود QR لا يعمل: أرسل رابط بديل. إذا المؤثر يحتاج إرشاد: قدمه في الوقت الحقيقي. سجّل كل التفاعلات." }, dod: { en: "All questions answered within 15min, issues resolved, interactions logged", ar: "كل الأسئلة أُجيبت خلال 15 دقيقة، المشاكل حُلّت، التفاعلات مسجّلة" }, evidence: { en: "Chat logs, issue resolution timestamps", ar: "سجلات الشات، أوقات حل المشاكل" }, mistakes: { en: "Slow response, not having alt link ready, missing issue logging", ar: "استجابة بطيئة، عدم جاهزية الرابط البديل، تسجيل مشاكل مفقود" } },
      { title: { en: "6. Audit & Fix Data", ar: "6. تدقيق وتصحيح البيانات" }, details: { en: "End of each day: audit all influencer data for accuracy. Cross-check: system status vs sheet vs actual WhatsApp conversation. Fix any discrepancies. Update all sources to match.", ar: "نهاية كل يوم: دقق كل بيانات المؤثرين للدقة. مطابقة: حالة النظام مقابل الشيت مقابل محادثة الواتساب الفعلية. أصلح أي تناقضات. حدّث كل المصادر لتتطابق." }, dod: { en: "All data sources aligned, discrepancies fixed and logged", ar: "كل مصادر البيانات متوافقة، التناقضات مصلحة ومسجّلة" }, evidence: { en: "Audit log, before/after screenshots of fixes", ar: "سجل التدقيق، لقطات قبل/بعد الإصلاحات" }, mistakes: { en: "Skipping audit, fixing sheet but not system, not documenting changes", ar: "تخطي التدقيق، إصلاح الشيت بدون النظام، عدم توثيق التغييرات" } },
    ],
    outputs: [
      { en: "Invitation messages sent + logged", ar: "رسائل دعوة مرسلة + مسجّلة" },
      { en: "Updated Confirmations tab", ar: "تبويب تأكيدات محدّث" },
      { en: "Reminder messages sent on schedule", ar: "رسائل تذكير مرسلة في الموعد" },
      { en: "Briefs delivered to confirmed influencers", ar: "برِيفات مسلّمة للمؤثرين المؤكدين" },
      { en: "Live support log", ar: "سجل الدعم المباشر" },
      { en: "Daily data audit report", ar: "تقرير تدقيق البيانات اليومي" },
    ],
    slas: [
      { step: "Invitations", sla: "Within 24h of setup", rag: "Amber", breach: "Delays entire campaign" },
      { step: "Reply logging", sla: "Within 1h of reply", rag: "Green", breach: "Stale data for all teams" },
      { step: "Reminders", sla: "On schedule (48h/24h)", rag: "Green", breach: "Missed visit risk" },
      { step: "Brief delivery", sla: "≤24h before visit", rag: "Amber", breach: "Unprepared influencer" },
      { step: "Live support", sla: "≤15min response", rag: "Green", breach: "Poor influencer experience" },
    ],
    qualityGates: [
      { en: "Every message uses correct template with personalization", ar: "كل رسالة تستخدم القالب الصحيح مع التخصيص" },
      { en: "All interactions logged with timestamps", ar: "كل التفاعلات مسجّلة بالتاريخ والوقت" },
       { en: "System / Task Manager + WhatsApp data aligned at EOD (client sheet when used)", ar: "بيانات النظام / مدير المهام + الواتساب متوافقة في نهاية اليوم (شيت العميل عند استخدامه)" },
    ],
    escalation: [
      { en: "Tier 1 — Chat Lead: Resolve within 2h. Evidence: message logs, attempted solutions.", ar: "المستوى 1 — قائد الشات: الحل خلال ساعتين. الدليل: سجلات الرسائل، الحلول المجرّبة." },
      { en: "Tier 2 — Ops Lead: After 4h unresolved. Evidence: full chat history, impact assessment.", ar: "المستوى 2 — قائد العمليات: بعد 4 ساعات بدون حل. الدليل: تاريخ الشات الكامل، تقييم التأثير." },
      { en: "Tier 3 — Client: When influencer issue affects deliverables. Evidence: all attempts + recommended action.", ar: "المستوى 3 — العميل: عندما مشكلة المؤثر تؤثر على المخرجات. الدليل: كل المحاولات + الإجراء الموصى به." },
    ],
    qaItems: [
      { question: { en: "QR/link not working", ar: "كود QR/الرابط لا يعمل" }, symptoms: { en: "Influencer reports QR code error or link not opening", ar: "المؤثر يبلغ عن خطأ في كود QR أو الرابط لا يفتح" }, causes: { en: "Expired link, wrong URL, QR encoding error, platform issue", ar: "رابط منتهي، URL خاطئ، خطأ ترميز QR، مشكلة منصة" }, fix: { en: "1. Test link yourself. 2. Generate new QR/link. 3. Send alternative. 4. Verify it works. 5. Update tracker.", ar: "1. اختبر الرابط بنفسك. 2. ولّد QR/رابط جديد. 3. أرسل البديل. 4. تحقق أنه يعمل. 5. حدّث المتتبع." }, owner: { en: "Chat Team", ar: "فريق الشات" }, sla: "≤15min", evidence: { en: "Error screenshot, new link proof, confirmation from influencer", ar: "لقطة الخطأ، إثبات الرابط الجديد، تأكيد من المؤثر" }, escalation: { en: "If system-wide link issue, escalate to Ops Lead immediately", ar: "إذا مشكلة روابط على مستوى النظام، صعّد لقائد العمليات فوراً" } },
    ],
    howTo: [
      { title: { en: "How to: Log Replies & Confirmations with Timestamps", ar: "كيف: تسجيل الردود والتأكيدات بالتاريخ والوقت" }, preconditions: { en: "Campaign setup complete, invitations sent", ar: "إعداد الحملة مكتمل، الدعوات مرسلة" }, tools: { en: "WhatsApp, Google Sheets (Confirmations + Influencer_Comm_Log tabs)", ar: "واتساب، جوجل شيتس (تبويبات التأكيدات + Influencer_Comm_Log)" }, steps: { en: "1. Open Confirmations tab\n2. Find influencer row\n3. Update Reply Status: Yes/No/Maybe/No Response\n4. Add timestamp (exact date + time)\n5. Add notes (any special requests/conditions)\n6. Open Influencer_Comm_Log\n7. Add new row with: date, time, direction, message summary\n8. If 'No': tag Community for replacement\n9. If 'Maybe': set follow-up reminder for next day\n10. Save and verify", ar: "1. افتح تبويب التأكيدات\n2. ابحث عن صف المؤثر\n3. حدّث حالة الرد: نعم/لا/ربما/لا رد\n4. أضف التاريخ والوقت بالضبط\n5. أضف ملاحظات (أي طلبات/شروط خاصة)\n6. افتح Influencer_Comm_Log\n7. أضف صف جديد بـ: التاريخ، الوقت، الاتجاه، ملخص الرسالة\n8. إذا 'لا': أشِر للكوميونيتي للبديل\n9. إذا 'ربما': اضبط تذكير متابعة لليوم التالي\n10. احفظ وتحقق" }, outputs: { en: "Updated Confirmations tab, Influencer_Comm_Log entries", ar: "تبويب تأكيدات محدّث، إدخالات Influencer_Comm_Log" }, dod: { en: "Reply status matches actual response, timestamp accurate, log complete", ar: "حالة الرد تطابق الاستجابة الفعلية، التوقيت دقيق، السجل مكتمل" }, mistakes: { en: "Wrong status, missing timestamp, not logging in both tabs, delayed updates", ar: "حالة خاطئة، توقيت مفقود، عدم التسجيل في كلا التبويبين، تحديثات متأخرة" }, qa: { en: "Status matches WhatsApp? Timestamp within 1h? Comm_Log entry exists?", ar: "الحالة تطابق الواتساب؟ التوقيت خلال ساعة؟ إدخال Comm_Log موجود؟" } },
    ],
  },
  sop_followup: {
    teamName: { en: "Follow-Up System", ar: "نظام المتابعة" },
    teamIcon: <Clock className="h-5 w-5" />,
    owner: { en: "Follow-Up Lead", ar: "قائد المتابعة" },
    approver: { en: "Operations Lead", ar: "قائد العمليات" },
    purpose: {
      en: "The Follow-Up team ensures no influencer falls through the cracks. They send 10–12 reminders, track missing/needed items, verify system/social data, fix/reschedule as needed, and provide EOD summaries. Persistence and accuracy are non-negotiable.",
      ar: "فريق المتابعة يضمن عدم سقوط أي مؤثر من المتابعة. يرسلون 10–12 تذكير، يتتبعون العناصر الناقصة/المطلوبة، يتحققون من بيانات النظام/السوشيال، يصلحون/يعيدون الجدولة حسب الحاجة، ويقدمون ملخصات نهاية اليوم. الإصرار والدقة غير قابلين للتفاوض."
    },
    steps: [
      { title: { en: "1. 10–12 Reminders", ar: "1. 10–12 تذكير" }, details: { en: "Send up to 12 reminder messages to each non-responding influencer. Space them strategically (morning, afternoon, evening). Vary the message tone slightly with each attempt. Log every attempt with timestamp. After 12 with no response: escalate to Community for replacement.", ar: "أرسل حتى 12 رسالة تذكير لكل مؤثر غير مستجيب. وزّعها بشكل استراتيجي (صباح، ظهر، مساء). غيّر نبرة الرسالة قليلاً مع كل محاولة. سجّل كل محاولة بالتاريخ والوقت. بعد 12 بدون رد: صعّد للكوميونيتي للبديل." }, dod: { en: "All attempts logged, non-responders flagged after 12 attempts", ar: "كل المحاولات مسجّلة، غير المستجيبين محددين بعد 12 محاولة" }, evidence: { en: "Message logs with timestamps, tracker status updates", ar: "سجلات الرسائل بالتاريخ والوقت، تحديثات حالة المتتبع" }, mistakes: { en: "Skipping attempts, not logging, generic messages, giving up too early", ar: "تخطي محاولات، عدم التسجيل، رسائل عامة، الاستسلام مبكراً" } },
      { title: { en: "2. Check Missing/Need", ar: "2. فحص الناقص/التعديل" }, details: { en: "Review Missing_Need_Tracker daily. Categorize each item: Missing Visit, Missing Coverage, Need Edit, Reschedule, Other. Assign owner for each item. Set SLA per item type.", ar: "راجع Missing_Need_Tracker يومياً. صنّف كل عنصر: زيارة مفقودة، تغطية مفقودة، يحتاج تعديل، إعادة جدولة، أخرى. عيّن مالك لكل عنصر. حدد SLA لكل نوع." }, sla: "Review within 2h of EOD report", dod: { en: "All items categorized, owners assigned, SLAs set", ar: "كل العناصر مصنّفة، المالكين معيّنين، SLA محددة" }, evidence: { en: "Updated tracker with categories, owners, and SLAs", ar: "المتتبع المحدّث بالفئات والمالكين وSLA" }, mistakes: { en: "Missing items, wrong categorization, no owner assignment", ar: "عناصر مفقودة، تصنيف خاطئ، عدم تعيين مالك" } },
      { title: { en: "3. Verify System/Social", ar: "3. التحقق من النظام/السوشيال" }, details: { en: "Cross-check: influencer's social media post matches the brief requirements (correct hashtags, mentions, content type). Verify system status matches actual delivery. Flag any mismatches.", ar: "مطابقة: منشور المؤثر على السوشيال ميديا يطابق متطلبات البرِيف (هاشتاقات صحيحة، إشارات، نوع المحتوى). تحقق أن حالة النظام تطابق التسليم الفعلي. حدد أي تناقضات." }, dod: { en: "All verified items marked, mismatches flagged with details", ar: "كل العناصر المتحققة محددة، التناقضات محددة بتفاصيل" }, evidence: { en: "Verification log, mismatch screenshots", ar: "سجل التحقق، لقطات التناقضات" }, mistakes: { en: "Shallow check, missing hashtag verification, not checking all deliverables", ar: "فحص سطحي، عدم التحقق من الهاشتاقات، عدم فحص كل المخرجات" } },
      { title: { en: "4. Fix/Reschedule", ar: "4. الإصلاح/إعادة الجدولة" }, details: { en: "For each issue: coordinate fix with relevant team. IF missing visit: reschedule with influencer. IF wrong content: request edit/repost. IF data mismatch: fix in all systems.", ar: "لكل مشكلة: نسّق الإصلاح مع الفريق المعني. إذا زيارة مفقودة: أعد الجدولة مع المؤثر. إذا محتوى خاطئ: اطلب تعديل/إعادة نشر. إذا تناقض بيانات: أصلح في كل الأنظمة." }, sla: "Fix within 24h", dod: { en: "Issue resolved, all systems updated, proof documented", ar: "المشكلة محلولة، كل الأنظمة محدّثة، الإثبات موثّق" }, evidence: { en: "Fix confirmation, updated systems screenshot", ar: "تأكيد الإصلاح، لقطة الأنظمة المحدّثة" }, mistakes: { en: "Fixing one source but not others, no confirmation from influencer, missing documentation", ar: "إصلاح مصدر واحد بدون الآخرين، بدون تأكيد من المؤثر، توثيق مفقود" } },
      { title: { en: "5. Update Tracker", ar: "5. تحديث المتتبع" }, details: { en: "After every action: update Missing_Need_Tracker with: action taken, result, new status, timestamp. Close resolved items. Flag items approaching SLA breach.", ar: "بعد كل إجراء: حدّث Missing_Need_Tracker بـ: الإجراء المتخذ، النتيجة، الحالة الجديدة، التاريخ والوقت. أغلق العناصر المحلولة. حدد العناصر المقتربة من اختراق SLA." }, dod: { en: "Tracker current, all actions logged, SLA flags set", ar: "المتتبع محدّث، كل الإجراءات مسجّلة، علامات SLA محددة" }, evidence: { en: "Updated tracker screenshots", ar: "لقطات المتتبع المحدّث" }, mistakes: { en: "Delayed updates, forgetting to close resolved items, missing SLA flags", ar: "تحديثات متأخرة، نسيان إغلاق المحلول، علامات SLA مفقودة" } },
      { title: { en: "6. EOD Follow-Up Summary", ar: "6. ملخص متابعة نهاية اليوم" }, details: { en: "Compile end-of-day summary: resolved items, pending items, SLA breaches, items needing escalation. Share with Ops Lead and relevant teams.", ar: "جمّع ملخص نهاية اليوم: العناصر المحلولة، العناصر المعلقة، اختراقات SLA، العناصر التي تحتاج تصعيد. شارك مع قائد العمليات والفرق المعنية." }, dod: { en: "Summary shared before EOD, all items accounted for", ar: "الملخص مشارك قبل نهاية اليوم، كل العناصر محسوبة" }, evidence: { en: "EOD summary message, tracker snapshot", ar: "رسالة ملخص نهاية اليوم، لقطة المتتبع" }, mistakes: { en: "Missing items in summary, inaccurate counts, not sharing with all stakeholders", ar: "عناصر مفقودة في الملخص، أعداد غير دقيقة، عدم المشاركة مع كل المعنيين" } },
    ],
    outputs: [
      { en: "Reminder logs (up to 12 per influencer)", ar: "سجلات التذكير (حتى 12 لكل مؤثر)" },
      { en: "Missing/Need tracker (categorized, owned)", ar: "متتبع الناقص/التعديل (مصنّف، بمالك)" },
      { en: "Verification reports", ar: "تقارير التحقق" },
      { en: "Fix/Reschedule confirmations", ar: "تأكيدات الإصلاح/إعادة الجدولة" },
      { en: "EOD summary", ar: "ملخص نهاية اليوم" },
    ],
    slas: [
      { step: "Reminders", sla: "Per schedule", rag: "Green", breach: "Missed opportunity" },
      { step: "Missing/Need review", sla: "Within 2h of EOD", rag: "Amber", breach: "Items untracked" },
      { step: "Fix/Reschedule", sla: "≤24h", rag: "Amber", breach: "Escalate to Ops Lead" },
      { step: "Tracker update", sla: "After every action", rag: "Green", breach: "Stale data" },
      { step: "EOD summary", sla: "Before EOD", rag: "Green", breach: "Teams blind to status" },
    ],
    qualityGates: [
      { en: "All 12 attempts made before flagging 'No Response'", ar: "كل 12 محاولة تمت قبل تحديد 'لا رد'" },
      { en: "Every tracker item has an owner and SLA", ar: "كل عنصر في المتتبع له مالك وSLA" },
       { en: "Fix verified in the System / Task Manager (and client sheet when used)", ar: "الإصلاح متحقق في النظام / مدير المهام (وشيت العميل عند استخدامه)" },
    ],
    escalation: [
      { en: "Tier 1 — Follow-Up Lead: Resolve within 4h.", ar: "المستوى 1 — قائد المتابعة: الحل خلال 4 ساعات." },
      { en: "Tier 2 — Ops Lead: After 24h unresolved.", ar: "المستوى 2 — قائد العمليات: بعد 24 ساعة بدون حل." },
      { en: "Tier 3 — Client: When deliverable at risk.", ar: "المستوى 3 — العميل: عندما مخرج مهدد." },
    ],
    qaItems: [
      { question: { en: "Proof mismatch (Done vs pCloud)", ar: "تناقض الإثبات (تم مقابل pCloud)" }, symptoms: { en: "Status shows 'Done' but pCloud folder is empty or has wrong files", ar: "الحالة تظهر 'تم' لكن فولدر pCloud فارغ أو يحتوي ملفات خاطئة" }, causes: { en: "Status updated before proof uploaded, wrong folder, file upload failed", ar: "الحالة حُدّثت قبل رفع الإثبات، فولدر خاطئ، فشل رفع الملف" }, fix: { en: "1. Verify current pCloud contents. 2. If missing: contact Coverage team. 3. If wrong folder: move files. 4. If upload failed: retry. 5. Update status only after verified.", ar: "1. تحقق من محتويات pCloud الحالية. 2. إذا مفقود: تواصل مع فريق التغطية. 3. إذا فولدر خاطئ: انقل الملفات. 4. إذا فشل الرفع: أعد المحاولة. 5. حدّث الحالة فقط بعد التحقق." }, owner: { en: "Coverage + Follow-Up", ar: "التغطية + المتابعة" }, sla: "≤24h", evidence: { en: "pCloud screenshot, status correction log", ar: "لقطة pCloud، سجل تصحيح الحالة" }, escalation: { en: "If >10 mismatches in one campaign, escalate to Ops Lead for root cause analysis", ar: "إذا أكثر من 10 تناقضات في حملة واحدة، صعّد لقائد العمليات لتحليل السبب الجذري" } },
    ],
    howTo: [],
  },
  sop_coverage: {
    teamName: { en: "Coverage & QA", ar: "التغطية والجودة" },
    teamIcon: <CheckCircle2 className="h-5 w-5" />,
    owner: { en: "Coverage Lead", ar: "قائد التغطية" },
    approver: { en: "Operations Lead", ar: "قائد العمليات" },
    purpose: {
      en: "The Coverage team ensures every influencer deliverable is captured, verified, and archived. They track posts, download proofs, QA against the brief, archive to pCloud, and reconcile Done status with actual evidence. No 'Done' without proof.",
      ar: "فريق التغطية يضمن أن كل مخرج للمؤثر يُلتقط، يُتحقق منه، ويُؤرشف. يتتبعون المنشورات، يحمّلون الإثباتات، يراجعون الجودة مقابل البرِيف، يؤرشفون في pCloud، ويطابقون حالة 'تم' مع الأدلة الفعلية. لا 'تم' بدون إثبات."
    },
    steps: [
      { title: { en: "1. Track Posts", ar: "1. تتبع المنشورات" }, details: { en: "Monitor influencer social accounts for campaign posts. Check: correct platform, content type matches brief (story/reel/post), timing within visit window. Log each finding in Coverage_QA tab.", ar: "راقب حسابات المؤثرين على السوشيال للمنشورات المتعلقة بالحملة. تحقق: المنصة الصحيحة، نوع المحتوى يطابق البرِيف (ستوري/ريل/بوست)، التوقيت ضمن نافذة الزيارة. سجّل كل نتيجة في تبويب Coverage_QA." }, dod: { en: "All expected posts tracked, Coverage_QA updated", ar: "كل المنشورات المتوقعة متتبعة، Coverage_QA محدّث" }, evidence: { en: "Coverage_QA entries, post screenshots", ar: "إدخالات Coverage_QA، لقطات المنشورات" }, mistakes: { en: "Missing posts (especially stories that expire), wrong timing check, incomplete tracking", ar: "تفويت منشورات (خاصة الستوريز التي تنتهي)، فحص توقيت خاطئ، تتبع ناقص" } },
      { title: { en: "2. Download Proofs", ar: "2. تحميل الإثباتات" }, details: { en: "Download/screenshot every post as proof. File naming: [CampaignCode]_[Username]_[ContentType]_[Date]. Save in local staging folder before uploading.", ar: "حمّل/التقط لقطة لكل منشور كإثبات. تسمية الملف: [كود_الحملة]_[اليوزرنيم]_[نوع_المحتوى]_[التاريخ]. احفظ في فولدر التجهيز المحلي قبل الرفع." }, dod: { en: "All proofs downloaded with correct naming", ar: "كل الإثباتات محمّلة بالتسمية الصحيحة" }, evidence: { en: "Files in staging folder with correct names", ar: "ملفات في فولدر التجهيز بأسماء صحيحة" }, mistakes: { en: "Wrong file names, low-quality screenshots, missing proofs for expired stories", ar: "أسماء ملفات خاطئة، لقطات شاشة منخفضة الجودة، إثباتات مفقودة لستوريز منتهية" } },
      { title: { en: "3. QA vs Brief", ar: "3. فحص الجودة مقابل البرِيف" }, details: { en: "Compare each proof against the campaign brief: correct hashtags? Correct mentions? Right content type? Matches visit requirements? Mark as: Done / Need Edit / Missing. For 'Need Edit': specify exactly what's wrong and what's needed.", ar: "قارن كل إثبات مقابل برِيف الحملة: هاشتاقات صحيحة؟ إشارات صحيحة؟ نوع المحتوى الصحيح؟ يطابق متطلبات الزيارة؟ حدد كـ: تم / يحتاج تعديل / مفقود. لـ'يحتاج تعديل': حدد بالضبط ما الخطأ وما المطلوب." }, dod: { en: "All proofs QA'd, statuses set, edit requests specific", ar: "كل الإثباتات تمت مراجعتها، الحالات محددة، طلبات التعديل محددة" }, evidence: { en: "QA log with status per proof, edit request details", ar: "سجل المراجعة بحالة كل إثبات، تفاصيل طلبات التعديل" }, mistakes: { en: "Approving non-compliant content, vague edit requests, not checking all brief points", ar: "الموافقة على محتوى غير مطابق، طلبات تعديل غامضة، عدم فحص كل نقاط البرِيف" } },
      { title: { en: "4. Archive to pCloud", ar: "4. الأرشفة في pCloud" }, details: { en: "Upload verified proofs to pCloud: Campaign folder → Influencer folder (by username). One folder per influencer. Never mix multiple influencers. Verify upload completed.", ar: "ارفع الإثباتات المتحققة إلى pCloud: فولدر الحملة → فولدر المؤثر (حسب اليوزرنيم). فولدر واحد لكل مؤثر. ممنوع خلط عدة مؤثرين. تحقق أن الرفع اكتمل." }, dod: { en: "All proofs in correct pCloud folders, upload verified", ar: "كل الإثباتات في فولدرات pCloud الصحيحة، الرفع متحقق" }, evidence: { en: "pCloud folder screenshots showing files", ar: "لقطات فولدرات pCloud تظهر الملفات" }, mistakes: { en: "Wrong folder, mixed influencers, upload failed silently, missing files", ar: "فولدر خاطئ، مؤثرين مخلوطين، فشل الرفع بصمت، ملفات مفقودة" } },
      { title: { en: "5. Update Status", ar: "5. تحديث الحالة" }, details: { en: "Update Coverage_QA tab: set QA_Status to Done/Need Edit/Missing/Pending. Update system status to match. Notify Follow-Up for any Need Edit or Missing items.", ar: "حدّث تبويب Coverage_QA: حدد QA_Status كـ تم/يحتاج تعديل/مفقود/قيد الانتظار. حدّث حالة النظام للتطابق. أبلغ المتابعة لأي عناصر تحتاج تعديل أو مفقودة." }, dod: { en: "All statuses current, system matches sheet, Follow-Up notified", ar: "كل الحالات محدّثة، النظام يطابق الشيت، المتابعة مبلّغة" }, evidence: { en: "Updated Coverage_QA, system screenshot, notification proof", ar: "Coverage_QA محدّث، لقطة النظام، إثبات الإبلاغ" }, mistakes: { en: "Status mismatch between sheet and system, not notifying Follow-Up", ar: "تناقض حالة بين الشيت والنظام، عدم إبلاغ المتابعة" } },
      { title: { en: "6. Reconcile Done vs pCloud", ar: "6. مطابقة (تم) مع pCloud" }, details: { en: "Final check: for every influencer marked 'Done' in the system, verify proof exists in pCloud. Count: Done in system vs files in pCloud. If count mismatch: investigate and fix. Document reconciliation results.", ar: "الفحص النهائي: لكل مؤثر محدد 'تم' في النظام، تحقق أن الإثبات موجود في pCloud. عدّ: تم في النظام مقابل ملفات في pCloud. إذا تناقض في العدد: حقق وأصلح. وثّق نتائج المطابقة." }, dod: { en: "100% reconciliation between Done status and pCloud proofs", ar: "مطابقة 100% بين حالة تم وإثباتات pCloud" }, evidence: { en: "Reconciliation report, fix log", ar: "تقرير المطابقة، سجل الإصلاح" }, mistakes: { en: "Skipping reconciliation, accepting count differences, not investigating mismatches", ar: "تخطي المطابقة، قبول فروقات العدد، عدم التحقيق في التناقضات" } },
    ],
    outputs: [
      { en: "Post tracking log", ar: "سجل تتبع المنشورات" },
      { en: "Downloaded proofs (correctly named)", ar: "إثباتات محمّلة (مسمّاة بشكل صحيح)" },
      { en: "QA report per influencer", ar: "تقرير مراجعة جودة لكل مؤثر" },
      { en: "pCloud archive (one folder per influencer)", ar: "أرشيف pCloud (فولدر واحد لكل مؤثر)" },
      { en: "Reconciliation report (Done vs pCloud count)", ar: "تقرير المطابقة (عدد تم مقابل pCloud)" },
    ],
    slas: [
      { step: "Post tracking", sla: "Same day as post", rag: "Green", breach: "Stories may expire" },
      { step: "Proof download", sla: "Within 4h of post", rag: "Amber", breach: "Expired content risk" },
      { step: "QA review", sla: "Same day", rag: "Green", breach: "Delays fix cycle" },
      { step: "pCloud upload", sla: "Within 4h of QA", rag: "Amber", breach: "Missing proofs" },
      { step: "Reconciliation", sla: "Daily at EOD", rag: "Green", breach: "Data integrity risk" },
    ],
    qualityGates: [
      { en: "Every 'Done' has a matching pCloud proof", ar: "كل 'تم' لها إثبات مطابق في pCloud" },
      { en: "QA check covers all brief requirements", ar: "فحص الجودة يغطي كل متطلبات البرِيف" },
      { en: "File naming matches standard exactly", ar: "تسمية الملفات تطابق المعيار بالضبط" },
      { en: "No mixed-influencer folders in pCloud", ar: "لا فولدرات مؤثرين مخلوطة في pCloud" },
    ],
    escalation: [
      { en: "Tier 1 — Coverage Lead: Fix within 4h.", ar: "المستوى 1 — قائد التغطية: الإصلاح خلال 4 ساعات." },
      { en: "Tier 2 — Ops Lead: Systemic issues, >10 mismatches.", ar: "المستوى 2 — قائد العمليات: مشاكل منهجية، أكثر من 10 تناقضات." },
      { en: "Tier 3 — Client: When report data integrity is at risk.", ar: "المستوى 3 — العميل: عندما سلامة بيانات التقرير مهددة." },
    ],
    qaItems: [
      { question: { en: "Coverage posted but not matching brief", ar: "تغطية منشورة لكن لا تطابق البرِيف" }, symptoms: { en: "Post exists but wrong hashtags, missing mentions, wrong content type, or off-brief content", ar: "المنشور موجود لكن هاشتاقات خاطئة، إشارات مفقودة، نوع محتوى خاطئ، أو محتوى خارج البرِيف" }, causes: { en: "Influencer didn't read brief, brief sent late, unclear instructions", ar: "المؤثر لم يقرأ البرِيف، البرِيف أُرسل متأخراً، تعليمات غير واضحة" }, fix: { en: "1. Document exact mismatches. 2. Contact influencer via Chat team. 3. Request specific edits. 4. Set 24h deadline. 5. Re-verify after edit. 6. Update QA status.", ar: "1. وثّق التناقضات بالضبط. 2. تواصل مع المؤثر عبر فريق الشات. 3. اطلب تعديلات محددة. 4. حدد موعد نهائي 24 ساعة. 5. أعد التحقق بعد التعديل. 6. حدّث حالة المراجعة." }, owner: { en: "Coverage + Chat", ar: "التغطية + الشات" }, sla: "≤24h for edit request", evidence: { en: "Before/after screenshots, edit request message, updated QA log", ar: "لقطات قبل/بعد، رسالة طلب التعديل، سجل مراجعة محدّث" }, escalation: { en: "If influencer refuses edit after 24h, escalate to Community for client decision", ar: "إذا المؤثر رفض التعديل بعد 24 ساعة، صعّد للكوميونيتي لقرار العميل" } },
      { question: { en: "Missing visit proof", ar: "إثبات زيارة مفقود" }, symptoms: { en: "Influencer marked as visited but no photos/content found on social media", ar: "المؤثر محدد كزائر لكن لا صور/محتوى موجود على السوشيال" }, causes: { en: "Post deleted, posted on wrong account, visit didn't happen, story expired before capture", ar: "المنشور محذوف، نُشر على حساب خاطئ، الزيارة لم تحصل، الستوري انتهت قبل الالتقاط" }, fix: { en: "1. Contact influencer for proof. 2. Check story archives. 3. If no proof: mark as Missing. 4. Notify Follow-Up. 5. Request re-visit if applicable.", ar: "1. تواصل مع المؤثر للإثبات. 2. تحقق من أرشيف الستوريز. 3. إذا لا إثبات: حدد كمفقود. 4. أبلغ المتابعة. 5. اطلب إعادة زيارة إن أمكن." }, owner: { en: "Coverage Team", ar: "فريق التغطية" }, sla: "≤24h", evidence: { en: "Search attempts documented, influencer communication, status update", ar: "محاولات البحث موثّقة، تواصل مع المؤثر، تحديث الحالة" }, escalation: { en: "If >5 missing proofs in one campaign, escalate to Ops Lead", ar: "إذا أكثر من 5 إثباتات مفقودة في حملة واحدة، صعّد لقائد العمليات" } },
    ],
    howTo: [
      { title: { en: "How to: Coverage QA Checklist & Archiving to pCloud", ar: "كيف: قائمة فحص جودة التغطية والأرشفة في pCloud" }, preconditions: { en: "Posts tracked, proofs downloaded", ar: "المنشورات متتبعة، الإثباتات محمّلة" }, tools: { en: "Coverage_QA sheet, pCloud, campaign brief", ar: "شيت Coverage_QA، pCloud، برِيف الحملة" }, steps: { en: "1. Open Coverage_QA tab\n2. For each influencer row:\n   a. Open proof file\n   b. Compare against brief: hashtags, mentions, content type\n   c. Check image/video quality\n   d. Set QA_Status: Done/Need Edit/Missing\n   e. Add notes for any issues\n3. Open pCloud campaign folder\n4. Create influencer subfolder (username)\n5. Upload verified proofs\n6. Verify upload count matches\n7. Update sheet with pCloud link\n8. Run reconciliation: count Done vs pCloud files", ar: "1. افتح تبويب Coverage_QA\n2. لكل صف مؤثر:\n   أ. افتح ملف الإثبات\n   ب. قارن مع البرِيف: هاشتاقات، إشارات، نوع المحتوى\n   ج. تحقق من جودة الصورة/الفيديو\n   د. حدد QA_Status: تم/يحتاج تعديل/مفقود\n   هـ. أضف ملاحظات لأي مشاكل\n3. افتح فولدر الحملة في pCloud\n4. أنشئ فولدر فرعي للمؤثر (اليوزرنيم)\n5. ارفع الإثباتات المتحققة\n6. تحقق أن عدد الملفات المرفوعة يطابق\n7. حدّث الشيت برابط pCloud\n8. أجرِ المطابقة: عدّ تم مقابل ملفات pCloud" }, outputs: { en: "Completed QA log, archived proofs in pCloud, reconciliation count", ar: "سجل مراجعة مكتمل، إثباتات مؤرشفة في pCloud، عدد المطابقة" }, dod: { en: "All proofs QA'd, uploaded, and reconciled", ar: "كل الإثباتات تمت مراجعتها، رُفعت، وطوبقت" }, mistakes: { en: "Skipping QA, uploading to wrong folder, not running reconciliation", ar: "تخطي المراجعة، الرفع لفولدر خاطئ، عدم إجراء المطابقة" }, qa: { en: "All statuses set? pCloud count matches? No mixed folders?", ar: "كل الحالات محددة؟ عدد pCloud يطابق؟ لا فولدرات مخلوطة؟" } },
    ],
  },
};

const SOPS: Record<string, SOPData> = { ...SOPS_BASE, ...(HANDBOOK_SOPS as Record<string, SOPData>) };

// ─── SOP Page Renderer ───────────────────────────────────────
export function SOPPage({ mode, sopKey }: { mode: LangMode; sopKey: string }) {
  const sop = SOPS[sopKey];
  if (!sop) return <div style={{ color: "var(--text)" }}>SOP not found</div>;
  const color = TEAM_COLORS[sopKey] || TRYGC.purple;
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-6">
      <PageMeta mode={mode} owner={sop.owner} approver={sop.approver} version="3.0" lastUpdated="2026-02-06" nextReview="2026-03-06" />

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="rounded-2xl p-3 shrink-0" style={{ background: color, color: "#fff" }}>{sop.teamIcon}</div>
        <div className="min-w-0">
          <h1 className="text-2xl" style={{ fontWeight: 800, color: "var(--text)" }}><BiText bi={sop.teamName} mode={mode} /></h1>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            <BiText bi={{ en: "Owner: ", ar: "المالك: " }} mode={mode} /><BiText bi={sop.owner} mode={mode} />
            {" · "}
            <BiText bi={{ en: "Approver: ", ar: "المعتمد: " }} mode={mode} /><BiText bi={sop.approver} mode={mode} />
          </div>
        </div>
      </div>

      {/* What this team does */}
      <KBCard title={{ en: "What this team does", ar: "ماذا يفعل هذا الفريق" }} mode={mode}>
        <div className="text-sm" style={{ color: "var(--text)" }}><BiText bi={sop.purpose} mode={mode} /></div>
      </KBCard>

      {/* At a glance */}
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { label: { en: "Steps", ar: "الخطوات" }, value: sop.steps.length },
          { label: { en: "SLAs", ar: "الـ SLA" }, value: sop.slas.length },
          { label: { en: "How-To", ar: "أدلة التشغيل" }, value: sop.howTo.length },
          { label: { en: "Q&A", ar: "أسئلة وأجوبة" }, value: sop.qaItems.length },
        ].map((g, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: "var(--card)", border: `1px solid ${color}55` }}>
            <div className="text-2xl" style={{ fontWeight: 900, color }}>{g.value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted)", fontWeight: 600 }}><BiText bi={g.label} mode={mode} /></div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          <BiText bi={{ en: "Tip: use the sidebar to switch teams. Toggle details to skim or read fully.", ar: "نصيحة: استخدم الشريط الجانبي لتبديل الفرق. بدّل التفاصيل للقراءة السريعة أو الكاملة." }} mode={mode} />
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-all shrink-0"
          style={{ background: "var(--line)", color: "var(--text)", fontWeight: 700 }}
        >
          {expanded
            ? <><ChevronUp className="h-4 w-4" /><BiText bi={{ en: "Collapse all", ar: "طي الكل" }} mode={mode} /></>
            : <><ChevronDown className="h-4 w-4" /><BiText bi={{ en: "Expand all", ar: "توسيع الكل" }} mode={mode} /></>}
        </button>
      </div>

      {/* Steps */}
      <KBCard title={{ en: "Steps", ar: "الخطوات" }} mode={mode}>
        <div className="space-y-4">
          {sop.steps.map((step, i) => (
            <Accordion key={`s-${i}-${expanded}`} title={step.title} mode={mode} defaultOpen={expanded}>
              <div className="space-y-3 text-sm">
                <div style={{ color: "var(--text)" }}><BiText bi={step.details} mode={mode} /></div>
                {step.preconditions && <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Preconditions: ", ar: "المتطلبات المسبقة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={step.preconditions} mode={mode} /></span></div>}
                {step.inputs && <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Inputs: ", ar: "المدخلات: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={step.inputs} mode={mode} /></span></div>}
                {step.sla && <div className="flex items-center gap-2"><span style={{ color: "var(--muted)", fontWeight: 700 }}>SLA:</span><SLABadge label={step.sla} rag={step.sla.includes("24") || step.sla.includes("48") ? "Amber" : "Green"} /></div>}
                {step.dod && <div><span style={{ color: TRYGC.success, fontWeight: 700 }}><BiText bi={{ en: "Definition of Done: ", ar: "تعريف الإنجاز: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={step.dod} mode={mode} /></span></div>}
                {step.evidence && <div><span style={{ color: "var(--info)", fontWeight: 700 }}><BiText bi={{ en: "Evidence Required: ", ar: "الدليل المطلوب: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={step.evidence} mode={mode} /></span></div>}
                {step.mistakes && <div><span style={{ color: TRYGC.danger, fontWeight: 700 }}><BiText bi={{ en: "Common Mistakes: ", ar: "أخطاء شائعة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={step.mistakes} mode={mode} /></span></div>}
              </div>
            </Accordion>
          ))}
        </div>
      </KBCard>

      {/* Outputs */}
      <KBCard title={{ en: "Outputs", ar: "المخرجات" }} mode={mode}>
        <Checklist mode={mode} items={sop.outputs} />
      </KBCard>

      {/* SLAs */}
      <KBCard title={{ en: "SLAs", ar: "الـ SLA" }} mode={mode}>
        <SimpleTable
          headers={mode === "AR" ? ["إجراء الاختراق", "RAG", "SLA", "الخطوة"] : ["Step", "SLA", "RAG", "Breach Action"]}
          rows={sop.slas.map(s => [s.step, <SLABadge label={s.sla} rag={s.rag} />, <Pill text={s.rag} tone={s.rag === "Green" ? "success" : s.rag === "Amber" ? "warning" : "danger"} />, s.breach])}
        />
      </KBCard>

      {/* Quality Gates */}
      <KBCard title={{ en: "Quality Gates", ar: "بوابات الجودة" }} mode={mode}>
        <Checklist mode={mode} items={sop.qualityGates} />
      </KBCard>

      {/* Escalation */}
      <KBCard title={{ en: "Escalation", ar: "التصعيد" }} mode={mode}>
        <div className="space-y-3">
          {sop.escalation.map((e, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-4 text-sm" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
              <div className="rounded-full p-2 shrink-0" style={{ background: i === 0 ? TRYGC.success : i === 1 ? TRYGC.orange : TRYGC.danger, color: "#fff" }}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <span style={{ color: "var(--text)" }}><BiText bi={e} mode={mode} /></span>
            </div>
          ))}
        </div>
      </KBCard>

      {/* Q&A / Troubleshooting */}
      {sop.qaItems.length > 0 && (
        <KBCard title={{ en: "Q&A / Troubleshooting", ar: "أسئلة وأجوبة / استكشاف الأخطاء" }} mode={mode}>
          <div className="space-y-3">
            {sop.qaItems.map((qa, i) => (
              <QAItem key={i} mode={mode} {...qa} />
            ))}
          </div>
        </KBCard>
      )}

      {/* How-To Runbooks */}
      {sop.howTo.length > 0 && (
        <KBCard title={{ en: "How-To Runbooks", ar: "أدلة التشغيل" }} mode={mode}>
          <div className="space-y-4">
            {sop.howTo.map((ht, i) => (
              <Accordion key={`h-${i}-${expanded}`} title={ht.title} mode={mode} defaultOpen={expanded}>
                <div className="space-y-3 text-sm">
                  <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Preconditions: ", ar: "المتطلبات المسبقة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.preconditions} mode={mode} /></span></div>
                  <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Tools: ", ar: "الأدوات: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.tools} mode={mode} /></span></div>
                  <div><span style={{ color: "var(--accent)", fontWeight: 700 }}><BiText bi={{ en: "Steps: ", ar: "الخطوات: " }} mode={mode} /></span><div className="mt-1 whitespace-pre-line" style={{ color: "var(--text)" }}><BiText bi={ht.steps} mode={mode} /></div></div>
                  <div><span style={{ color: TRYGC.success, fontWeight: 700 }}><BiText bi={{ en: "Expected Outputs: ", ar: "المخرجات المتوقعة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.outputs} mode={mode} /></span></div>
                  <div><span style={{ color: TRYGC.success, fontWeight: 700 }}><BiText bi={{ en: "Definition of Done: ", ar: "تعريف الإنجاز: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.dod} mode={mode} /></span></div>
                  <div><span style={{ color: TRYGC.danger, fontWeight: 700 }}><BiText bi={{ en: "Common Mistakes: ", ar: "أخطاء شائعة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.mistakes} mode={mode} /></span></div>
                  <div><span style={{ color: "var(--info)", fontWeight: 700 }}><BiText bi={{ en: "QA Checklist: ", ar: "قائمة فحص الجودة: " }} mode={mode} /></span><span style={{ color: "var(--text)" }}><BiText bi={ht.qa} mode={mode} /></span></div>
                </div>
              </Accordion>
            ))}
          </div>
        </KBCard>
      )}

      {/* Templates Link */}
      <KBCard title={{ en: "Templates", ar: "القوالب" }} mode={mode}>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          <BiText bi={{ en: "See the Templates Library for pre-built message templates relevant to this team's workflows.", ar: "راجع مكتبة القوالب لقوالب الرسائل الجاهزة المتعلقة بسير عمل هذا الفريق." }} mode={mode} />
        </div>
      </KBCard>

      {/* Links */}
      <KBCard title={{ en: "Links", ar: "الروابط" }} mode={mode}>
        <div className="grid gap-2 md:grid-cols-3">
          {[
            { label: "Dropbox Campaign Folders", icon: <ExternalLink className="h-4 w-4" /> },
            { label: "pCloud Archive", icon: <ExternalLink className="h-4 w-4" /> },
            { label: "System/Dashboard", icon: <ExternalLink className="h-4 w-4" /> },
          ].map((link, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg p-3 text-sm" style={{ background: "var(--bg)", border: "1px solid var(--line)", color: "var(--muted)" }}>
              {link.icon}
              <span>{link.label}</span>
              <Pill text="Placeholder" tone="neutral" />
            </div>
          ))}
        </div>
      </KBCard>
    </div>
  );
}
