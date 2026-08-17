# TryGC Operations — Standard Operating Procedures (SOPs)

> **Version:** 3.0 | **Last Updated:** 2026-02-06 | **Next Review:** 2026-03-06  
> **Approver:** Operations Lead

---

## Table of Contents

1. [Community Operations SOP](#1-community-operations-sop)
2. [Coordination Hub SOP](#2-coordination-hub-sop)
3. [Chat & WhatsApp Operations SOP](#3-chat--whatsapp-operations-sop)
4. [Follow-Up System SOP](#4-follow-up-system-sop)
5. [Coverage & QA SOP](#5-coverage--qa-sop)

---

## Non-Negotiables (All Teams)

- **Single source of truth:** status must exist in (System + Sheet + Folder).
- **Zero verbal exceptions:** any change must be documented.
- **Done = fully compliant with brief.**
- **Escalate early.**

---

---

# 1. Community Operations SOP

**Owner:** Community Lead | **Approver:** Operations Lead

## Purpose

The Community team is the bridge between TryGC and its clients. They own the relationship lifecycle from sourcing influencers to delivering final campaign reports. Every action must be documented, every commitment tracked, and every deliverable verified against the client brief.

---

## Steps

### Step 1 — Define Client Goals & Campaign Scope

Meet with the client to define campaign objectives, target audience, deliverables, timeline, and budget. Document everything in a Meeting Minutes (MOM) document. Create a campaign brief with exact requirements: number of influencers, content types (story, reel, post), visit locations, special instructions.

- **Preconditions:** Client contract signed, budget approved
- **Inputs:** Client request, signed contract, budget sheet
- **Definition of Done:** Campaign brief documented and client-approved, MOM signed off
- **Evidence Required:** MOM document with signatures, campaign brief PDF, email confirmation
- **Common Mistakes:** Vague requirements, missing deliverable counts, no written client approval

---

### Step 2 — Source & Build Influencer List

Source influencers matching the campaign criteria. Build a list with: username, platform, follower count, engagement rate, location, content niche, contact info. Score each influencer against the brief requirements. Submit the list for client approval.

- **SLA:** Within 48h of brief approval
- **Definition of Done:** List submitted to client with all required fields populated
- **Evidence Required:** Google Sheet with People_List tab, client approval email/message
- **Common Mistakes:** Incomplete profiles, wrong niche, missing engagement data, submitting without QA

---

### Step 3 — Client Approval & Booking Order

Get client sign-off on the final influencer list. IF client requests changes: update list, re-submit, get new approval. Create a Booking Order document with: campaign name, dates, influencer list, deliverables per influencer, total budget breakdown. Hand off the Booking Order to the Coordination team.

- **SLA:** Same day after client approval
- **Definition of Done:** Booking Order created, approved, and handed to Coordination
- **Evidence Required:** Booking Order document, client approval proof, handoff confirmation
- **Common Mistakes:** Starting campaign setup before client approval, incomplete booking order

---

### Step 4 — Track Campaign Targets

Monitor daily progress against campaign targets. Track: invitations sent vs target, confirmations vs target, visits completed, coverage collected. Update the Campaign_Master sheet daily. IF targets are at risk: escalate to Ops Lead with evidence and proposed recovery plan.

- **Definition of Done:** All trackers updated daily by EOD, risks flagged within 2 hours of identification
- **Evidence Required:** Updated trackers, risk log entries, escalation messages with evidence
- **Common Mistakes:** Delayed updates, unreported gaps, no recovery plan when targets slip

---

### Step 5 — Meetings & Documentation

Conduct regular client meetings (kickoff, weekly updates, wrap-up). For each meeting: prepare agenda in advance, take notes during meeting, produce MOM within 24h, share with client for sign-off. Maintain a yearly calendar with all scheduled touchpoints.

- **SLA:** MOM within 24h of meeting
- **Definition of Done:** MOM shared and signed off by client, calendar updated
- **Evidence Required:** MOM documents, client sign-off emails, calendar entries
- **Common Mistakes:** No agenda, delayed MOMs, missing sign-offs, forgotten follow-ups

---

### Step 6 — Daily Client Updates

Send a daily status update to the client covering: today's completed visits, coverage collected, any issues/risks, decisions needed. Use the appropriate template from the Templates Library (green update for all-clear, risk update for issues). IF a decision is needed from the client: clearly state the decision, deadline, and impact of delay.

- **Definition of Done:** Client update sent before EOD with accurate data and correct template
- **Evidence Required:** Sent messages/emails with timestamps, Client_Comm_Log updated
- **Common Mistakes:** Sending after EOD, inaccurate numbers, wrong template, missing decision requests

---

## Outputs

- Campaign brief (client-approved)
- Influencer list (sourced, scored, approved)
- Booking Order (handed to Coordination)
- Daily client updates
- Meeting MOMs (signed)
- Yearly calendar

---

## SLAs

| Step | SLA | RAG | Breach Action |
|------|-----|-----|---------------|
| Influencer list delivery | ≤48h after brief approval | Amber | Escalate to Ops Lead |
| Booking Order creation | Same day after client approval | Green | Delay blocks all downstream teams |
| Daily client update | Before EOD daily | Green | Client escalation risk |
| MOM delivery | ≤24h after meeting | Amber | Follow up immediately |
| Risk escalation | Within 2h of identification | Red | Ops Lead notified automatically |

---

## Quality Gates

- [ ] All influencer profiles complete (no blank fields)
- [ ] Client approval documented before any campaign action
- [ ] Booking Order matches approved list exactly
- [ ] Daily update numbers match tracker data
- [ ] MOM includes all action items with owners and deadlines

---

## Escalation

| Tier | Owner | Timeline | Required Evidence |
|------|-------|----------|-------------------|
| Tier 1 | Team Lead | Resolve within 4h | Issue description, impacted items, attempted fix |
| Tier 2 | Ops Lead | Resolve within 12h | Tier 1 evidence + business impact assessment |
| Tier 3 | Client | When decision is needed | Full context, options, recommendation, ETA |

---

## Q&A / Troubleshooting

### Problem: Influencer not replying after 12 reminders

- **Symptoms:** No response in WhatsApp after 12+ attempts over multiple days
- **Causes:** Wrong number, blocked, not interested, messages going to spam
- **Fix:**
  1. Verify number is correct
  2. Try alternate contact (DM, email)
  3. Mark as 'No Response' in tracker
  4. Source replacement influencer
  5. Update client
- **Owner:** Chat Team → Community (for replacement)
- **SLA:** ≤24h to source replacement
- **Evidence:** Screenshot of 12+ attempts, tracker status, replacement proposal
- **Escalation:** After 12 attempts with no response, escalate to Community for replacement sourcing

---

### Problem: Client change request mid-campaign

- **Symptoms:** Client asks to modify brief, add/remove influencers, or change deliverables after campaign started
- **Causes:** Market changes, internal client decisions, performance feedback
- **Fix:**
  1. Acknowledge request immediately
  2. Assess impact (timeline, budget, resources)
  3. Document change scope
  4. Get client approval on revised plan
  5. Update all systems/sheets/folders
- **Owner:** Community Lead
- **SLA:** Impact assessment within 4h
- **Evidence:** Change request document, impact analysis, client approval, updated systems
- **Escalation:** If impact exceeds budget/timeline by >20%, escalate to Ops Lead before responding to client

---

## How-To Runbook: Create a Campaign Brief

- **Preconditions:** Client meeting completed, contract signed, budget confirmed
- **Tools:** Google Docs, Campaign_Master sheet, MOM template
- **Steps:**
  1. Open Campaign Brief template
  2. Fill: Campaign Name, Client, Brand, Country
  3. Add: Objective, Target Audience, KPIs
  4. Specify: # of influencers, content types, visit requirements
  5. Add: Timeline with milestones
  6. Include: Budget breakdown
  7. Review with team lead
  8. Send to client for approval
- **Expected Outputs:** Approved Campaign Brief PDF
- **Definition of Done:** Brief has all required fields, client approved in writing, saved in Dropbox
- **Common Mistakes:** Missing KPI targets, vague deliverables, no client sign-off before starting
- **QA Checklist:** All fields populated? Client name correct? Dates realistic? Budget matches contract?

---

---

# 2. Coordination Hub SOP

**Owner:** Coordination Lead | **Approver:** Operations Lead

## Purpose

The Coordination team is the operational backbone — they set up every campaign's infrastructure (folders, sheets, system entries), run daily governance, and deliver final reports. If something isn't set up right, every downstream team suffers.

---

## Steps

### Step 1 — Validate Booking Order

Receive Booking Order from Community. Validate: all influencer names match approved list, dates are feasible, deliverables are clear. IF any field is missing or unclear: reject back to Community with specific notes. Do not proceed with incomplete orders.

- **SLA:** Within 2h of receipt
- **Definition of Done:** Booking Order validated or rejected with reasons
- **Evidence Required:** Validation checklist completed, rejection notes if applicable
- **Common Mistakes:** Accepting incomplete orders, not checking against approved list, proceeding without validation

---

### Step 2 — Create Dropbox Folders + Shortcuts

Create folder structure: All Campaigns → Company → Brand+Country → Year → Month+Year+Type. Create shortcut under Active Campaigns. Verify naming matches the standard exactly.

- **SLA:** Within 4h of validation
- **Definition of Done:** Folders created, shortcut active, naming verified
- **Evidence Required:** Dropbox folder links, screenshot of structure
- **Common Mistakes:** Wrong naming, missing year folder, no shortcut, typos in brand name

---

### Step 3 — Build cam.info + Base Sheets

Create Google Sheets workbook from template. Populate: Campaign_Master, Cam_Info, Influencer_List tabs with Booking Order data. Set up dropdown validations. Share with all team members.

- **SLA:** Within 4h of folder creation
- **Definition of Done:** All tabs populated, validations working, shared with team
- **Evidence Required:** Sheet link, screenshots of populated tabs, sharing log
- **Common Mistakes:** Missing tabs, wrong dropdown values, not sharing with all members, data mismatch with BO

---

### Step 4 — Create Campaign in System/Dashboard

Enter the campaign in the system/dashboard with all details from Booking Order. Assign influencers. Set dates and deliverables. Verify system data matches Sheet data exactly.

- **SLA:** Same day as sheet setup
- **Definition of Done:** Campaign live in system, all influencers assigned, data matches sheet
- **Evidence Required:** System screenshot, cross-check with sheet data
- **Common Mistakes:** Typos in influencer names, wrong dates, missing deliverable assignments

---

### Step 5 — Daily Governance

Run Tomorrow Visits review every afternoon: confirm schedule, identify risks, pre-assign tasks. Check SLA breaches. Update risk log. Coordinate across teams for blockers.

- **Definition of Done:** Tomorrow Visits reviewed, risks logged, SLA breaches flagged, tasks assigned
- **Evidence Required:** Updated Tomorrow_Visits tab, risk log entries, assignment messages
- **Common Mistakes:** Skipping governance, not checking SLAs, reactive instead of proactive

---

### Step 6 — Final Report Delivery

Compile final campaign report: KPIs vs targets, coverage summary, proof folder link, issues log, lessons learned. QA report data against system + sheet + folder. Deliver to Community for client presentation.

- **SLA:** 24–48h after campaign end
- **Definition of Done:** Report QA'd, data matches all sources, delivered to Community
- **Evidence Required:** Final report document, QA sign-off, delivery confirmation
- **Common Mistakes:** Numbers don't match sources, missing proof links, delayed delivery

---

## Outputs

- Validated Booking Order
- Campaign folder structure (Dropbox)
- Google Sheets workbook (all tabs)
- System campaign entry
- Daily governance outputs
- Final campaign report

---

## SLAs

| Step | SLA | RAG | Breach Action |
|------|-----|-----|---------------|
| BO validation | Within 2h | Green | Reject back to Community |
| Folder + sheets + system | ≤4h total setup | Amber | Escalate to Ops Lead |
| Daily governance | Every afternoon | Green | Auto-flag in risk log |
| Final report | 24–48h post-campaign | Amber | Client delay notification |

---

## Quality Gates

- [ ] Folder naming matches standard exactly
- [ ] Sheet data matches Booking Order 100%
- [ ] System entries match sheet entries
- [ ] Final report numbers reconcile across all sources

---

## Escalation

| Tier | Owner | Timeline | Required Evidence |
|------|-------|----------|-------------------|
| Tier 1 | Coordination Lead | Fix within 4h | What's wrong, what was attempted |
| Tier 2 | Ops Lead | Fix within 12h | Tier 1 log + impact assessment |
| Tier 3 | Client | When campaign delivery at risk | Full context + recovery plan |

---

## Q&A / Troubleshooting

### Problem: Wrong folder structure or mixed influencer folders

- **Symptoms:** Files in wrong locations, multiple influencers in same folder, naming doesn't match standard
- **Causes:** Rush to set up, copy-paste errors, not following naming convention, no QA check
- **Fix:**
  1. Stop all uploads
  2. Map current vs correct structure
  3. Move files to correct locations
  4. Fix naming
  5. Verify no files lost
  6. Update all links in sheets
- **Owner:** Coordination Team
- **SLA:** ≤4h to fix
- **Evidence:** Before/after screenshots, updated links in sheets
- **Escalation:** If >50 files need moving, escalate to Ops Lead for resource allocation

---

## How-To Runbook: Create Campaign Folder Structure

- **Preconditions:** Validated Booking Order received
- **Tools:** Dropbox, Google Sheets template
- **Steps:**
  1. Navigate to All Campaigns in Dropbox
  2. Create/find Company folder
  3. Create Brand+Country subfolder
  4. Create Year subfolder
  5. Create Month+Year+Type folder
  6. Add subfolders: Briefs, Proofs, Reports
  7. Create shortcut in Active Campaigns
  8. Verify naming against standard
  9. Copy sheet template into folder
  10. Share links with team
- **Expected Outputs:** Complete folder structure with shortcut and shared links
- **Definition of Done:** All folders exist, naming correct, shortcut works, team has access
- **Common Mistakes:** Typos in folder names, missing Active Campaigns shortcut, wrong permissions
- **QA Checklist:** Path matches standard? Shortcut resolves? All team members can access?

---

---

# 3. Chat & WhatsApp Operations SOP

**Owner:** Chat Team Lead | **Approver:** Operations Lead

## Purpose

The Chat team is the direct communication channel with influencers. They handle invitations, reminders, brief delivery, live support during visits, and data auditing. Every message must be contextual, professional, and logged with timestamps.

---

## Steps

### Step 1 — Contextual Invitations

Send personalized invitation messages to each influencer. Include: campaign name, brand, what they'll experience, visit date options, and why they were selected. Use the Invitation template. Log each message with timestamp in Influencer_Comm_Log.

- **SLA:** All invitations sent within 24h of campaign setup
- **Definition of Done:** All influencers contacted, messages logged, confirmations tab updated
- **Evidence Required:** WhatsApp screenshots, Influencer_Comm_Log entries
- **Common Mistakes:** Generic messages, missing personalization, no logging, sending to wrong contact

---

### Step 2 — Log Replies & Update Confirmations

For every reply: update Confirmations tab with: reply status (Yes/No/Maybe/No Response), timestamp, notes. IF 'Maybe': schedule follow-up. IF 'No': notify Community for replacement.

- **Definition of Done:** All replies logged within 1h of receipt, statuses accurate
- **Evidence Required:** Updated Confirmations tab, reply screenshots
- **Common Mistakes:** Delayed logging, wrong status, not notifying Community for 'No' replies

---

### Step 3 — Send Reminders (Escalating)

Send Reminder #1 at 48h before visit, Reminder #2 (final) at 24h before. IF no response after both: flag in tracker, notify Follow-Up team. Use Reminder templates.

- **SLA:** Reminders sent on schedule, no delays
- **Definition of Done:** Both reminders sent on time, non-responders flagged
- **Evidence Required:** Message timestamps, tracker flags
- **Common Mistakes:** Missing reminder window, wrong template, not flagging non-responders

---

### Step 4 — Send Brief Before Visit

24h before visit: send the campaign brief to confirmed influencers. Include: visit time, location, what to post, hashtags, mentions, any restrictions. Use Brief template. Confirm receipt.

- **SLA:** ≤24h before scheduled visit
- **Definition of Done:** Brief sent, receipt confirmed, tracker updated
- **Evidence Required:** Sent brief screenshot, receipt confirmation
- **Common Mistakes:** Sending late, wrong brief version, missing key details, no receipt check

---

### Step 5 — Live Support During Visit

Be available during visit hours. Answer questions immediately. IF QR code not working: send alternative link. IF influencer needs guidance: provide it in real-time. Log all interactions.

- **Definition of Done:** All questions answered within 15min, issues resolved, interactions logged
- **Evidence Required:** Chat logs, issue resolution timestamps
- **Common Mistakes:** Slow response, not having alt link ready, missing issue logging

---

### Step 6 — Audit & Fix Data

End of each day: audit all influencer data for accuracy. Cross-check: system status vs sheet vs actual WhatsApp conversation. Fix any discrepancies. Update all sources to match.

- **Definition of Done:** All data sources aligned, discrepancies fixed and logged
- **Evidence Required:** Audit log, before/after screenshots of fixes
- **Common Mistakes:** Skipping audit, fixing sheet but not system, not documenting changes

---

## Outputs

- Invitation messages sent + logged
- Updated Confirmations tab
- Reminder messages sent on schedule
- Briefs delivered to confirmed influencers
- Live support log
- Daily data audit report

---

## SLAs

| Step | SLA | RAG | Breach Action |
|------|-----|-----|---------------|
| Invitations | Within 24h of setup | Amber | Delays entire campaign |
| Reply logging | Within 1h of reply | Green | Stale data for all teams |
| Reminders | On schedule (48h/24h) | Green | Missed visit risk |
| Brief delivery | ≤24h before visit | Amber | Unprepared influencer |
| Live support | ≤15min response | Green | Poor influencer experience |

---

## Quality Gates

- [ ] Every message uses correct template with personalization
- [ ] All interactions logged with timestamps
- [ ] System + Sheet + WhatsApp data aligned at EOD

---

## Escalation

| Tier | Owner | Timeline | Required Evidence |
|------|-------|----------|-------------------|
| Tier 1 | Chat Lead | Resolve within 2h | Message logs, attempted solutions |
| Tier 2 | Ops Lead | After 4h unresolved | Full chat history, impact assessment |
| Tier 3 | Client | When deliverables affected | All attempts + recommended action |

---

## Q&A / Troubleshooting

### Problem: QR/link not working

- **Symptoms:** Influencer reports QR code error or link not opening
- **Causes:** Expired link, wrong URL, QR encoding error, platform issue
- **Fix:**
  1. Test link yourself
  2. Generate new QR/link
  3. Send alternative
  4. Verify it works
  5. Update tracker
- **Owner:** Chat Team
- **SLA:** ≤15min
- **Evidence:** Error screenshot, new link proof, confirmation from influencer
- **Escalation:** If system-wide link issue, escalate to Ops Lead immediately

---

## How-To Runbook: Log Replies & Confirmations with Timestamps

- **Preconditions:** Campaign setup complete, invitations sent
- **Tools:** WhatsApp, Google Sheets (Confirmations + Influencer_Comm_Log tabs)
- **Steps:**
  1. Open Confirmations tab
  2. Find influencer row
  3. Update Reply Status: Yes/No/Maybe/No Response
  4. Add timestamp (exact date + time)
  5. Add notes (any special requests/conditions)
  6. Open Influencer_Comm_Log
  7. Add new row with: date, time, direction, message summary
  8. If 'No': tag Community for replacement
  9. If 'Maybe': set follow-up reminder for next day
  10. Save and verify
- **Expected Outputs:** Updated Confirmations tab, Influencer_Comm_Log entries
- **Definition of Done:** Reply status matches actual response, timestamp accurate, log complete
- **Common Mistakes:** Wrong status, missing timestamp, not logging in both tabs, delayed updates
- **QA Checklist:** Status matches WhatsApp? Timestamp within 1h? Comm_Log entry exists?

---

---

# 4. Follow-Up System SOP

**Owner:** Follow-Up Lead | **Approver:** Operations Lead

## Purpose

The Follow-Up team ensures no influencer falls through the cracks. They send 10–12 reminders, track missing/needed items, verify system/social data, fix/reschedule as needed, and provide EOD summaries. Persistence and accuracy are non-negotiable.

---

## Steps

### Step 1 — 10–12 Reminders

Send up to 12 reminder messages to each non-responding influencer. Space them strategically (morning, afternoon, evening). Vary the message tone slightly with each attempt. Log every attempt with timestamp. After 12 with no response: escalate to Community for replacement.

- **Definition of Done:** All attempts logged, non-responders flagged after 12 attempts
- **Evidence Required:** Message logs with timestamps, tracker status updates
- **Common Mistakes:** Skipping attempts, not logging, generic messages, giving up too early

---

### Step 2 — Check Missing/Need

Review Missing_Need_Tracker daily. Categorize each item: Missing Visit, Missing Coverage, Need Edit, Reschedule, Other. Assign owner for each item. Set SLA per item type.

- **SLA:** Review within 2h of EOD report
- **Definition of Done:** All items categorized, owners assigned, SLAs set
- **Evidence Required:** Updated tracker with categories, owners, and SLAs
- **Common Mistakes:** Missing items, wrong categorization, no owner assignment

---

### Step 3 — Verify System/Social

Cross-check: influencer's social media post matches the brief requirements (correct hashtags, mentions, content type). Verify system status matches actual delivery. Flag any mismatches.

- **Definition of Done:** All verified items marked, mismatches flagged with details
- **Evidence Required:** Verification log, mismatch screenshots
- **Common Mistakes:** Shallow check, missing hashtag verification, not checking all deliverables

---

### Step 4 — Fix/Reschedule

For each issue: coordinate fix with relevant team. IF missing visit: reschedule with influencer. IF wrong content: request edit/repost. IF data mismatch: fix in all systems.

- **SLA:** Fix within 24h
- **Definition of Done:** Issue resolved, all systems updated, proof documented
- **Evidence Required:** Fix confirmation, updated systems screenshot
- **Common Mistakes:** Fixing one source but not others, no confirmation from influencer, missing documentation

---

### Step 5 — Update Tracker

After every action: update Missing_Need_Tracker with: action taken, result, new status, timestamp. Close resolved items. Flag items approaching SLA breach.

- **Definition of Done:** Tracker current, all actions logged, SLA flags set
- **Evidence Required:** Updated tracker screenshots
- **Common Mistakes:** Delayed updates, forgetting to close resolved items, missing SLA flags

---

### Step 6 — EOD Follow-Up Summary

Compile end-of-day summary: resolved items, pending items, SLA breaches, items needing escalation. Share with Ops Lead and relevant teams.

- **Definition of Done:** Summary shared before EOD, all items accounted for
- **Evidence Required:** EOD summary message, tracker snapshot
- **Common Mistakes:** Missing items in summary, inaccurate counts, not sharing with all stakeholders

---

## Outputs

- Reminder logs (up to 12 per influencer)
- Missing/Need tracker (categorized, owned)
- Verification reports
- Fix/Reschedule confirmations
- EOD summary

---

## SLAs

| Step | SLA | RAG | Breach Action |
|------|-----|-----|---------------|
| Reminders | Per schedule | Green | Missed opportunity |
| Missing/Need review | Within 2h of EOD | Amber | Items untracked |
| Fix/Reschedule | ≤24h | Amber | Escalate to Ops Lead |
| Tracker update | After every action | Green | Stale data |
| EOD summary | Before EOD | Green | Teams blind to status |

---

## Quality Gates

- [ ] All 12 attempts made before flagging 'No Response'
- [ ] Every tracker item has an owner and SLA
- [ ] Fix verified across all systems (System + Sheet + Folder)

---

## Escalation

| Tier | Owner | Timeline |
|------|-------|----------|
| Tier 1 | Follow-Up Lead | Resolve within 4h |
| Tier 2 | Ops Lead | After 24h unresolved |
| Tier 3 | Client | When deliverable at risk |

---

## Q&A / Troubleshooting

### Problem: Proof mismatch (Done vs pCloud)

- **Symptoms:** Status shows 'Done' but pCloud folder is empty or has wrong files
- **Causes:** Status updated before proof uploaded, wrong folder, file upload failed
- **Fix:**
  1. Verify current pCloud contents
  2. If missing: contact Coverage team
  3. If wrong folder: move files
  4. If upload failed: retry
  5. Update status only after verified
- **Owner:** Coverage + Follow-Up
- **SLA:** ≤24h
- **Evidence:** pCloud screenshot, status correction log
- **Escalation:** If >10 mismatches in one campaign, escalate to Ops Lead for root cause analysis

---

---

# 5. Coverage & QA SOP

**Owner:** Coverage Lead | **Approver:** Operations Lead

## Purpose

The Coverage team ensures every influencer deliverable is captured, verified, and archived. They track posts, download proofs, QA against the brief, archive to pCloud, and reconcile Done status with actual evidence. No 'Done' without proof.

---

## Steps

### Step 1 — Track Posts

Monitor influencer social accounts for campaign posts. Check: correct platform, content type matches brief (story/reel/post), timing within visit window. Log each finding in Coverage_QA tab.

- **Definition of Done:** All expected posts tracked, Coverage_QA updated
- **Evidence Required:** Coverage_QA entries, post screenshots
- **Common Mistakes:** Missing posts (especially stories that expire), wrong timing check, incomplete tracking

---

### Step 2 — Download Proofs

Download/screenshot every post as proof. File naming: `[CampaignCode]_[Username]_[ContentType]_[Date]`. Save in local staging folder before uploading.

- **Definition of Done:** All proofs downloaded with correct naming
- **Evidence Required:** Files in staging folder with correct names
- **Common Mistakes:** Wrong file names, low-quality screenshots, missing proofs for expired stories

---

### Step 3 — QA vs Brief

Compare each proof against the campaign brief: correct hashtags? Correct mentions? Right content type? Matches visit requirements? Mark as: Done / Need Edit / Missing. For 'Need Edit': specify exactly what's wrong and what's needed.

- **Definition of Done:** All proofs QA'd, statuses set, edit requests specific
- **Evidence Required:** QA log with status per proof, edit request details
- **Common Mistakes:** Approving non-compliant content, vague edit requests, not checking all brief points

---

### Step 4 — Archive to pCloud

Upload verified proofs to pCloud: Campaign folder → Influencer folder (by username). One folder per influencer. Never mix multiple influencers. Verify upload completed.

- **Definition of Done:** All proofs in correct pCloud folders, upload verified
- **Evidence Required:** pCloud folder screenshots showing files
- **Common Mistakes:** Wrong folder, mixed influencers, upload failed silently, missing files

---

### Step 5 — Update Status

Update Coverage_QA tab: set QA_Status to Done/Need Edit/Missing/Pending. Update system status to match. Notify Follow-Up for any Need Edit or Missing items.

- **Definition of Done:** All statuses current, system matches sheet, Follow-Up notified
- **Evidence Required:** Updated Coverage_QA, system screenshot, notification proof
- **Common Mistakes:** Status mismatch between sheet and system, not notifying Follow-Up

---

### Step 6 — Reconcile Done vs pCloud

Final check: for every influencer marked 'Done' in the system, verify proof exists in pCloud. Count: Done in system vs files in pCloud. If count mismatch: investigate and fix. Document reconciliation results.

- **Definition of Done:** 100% reconciliation between Done status and pCloud proofs
- **Evidence Required:** Reconciliation report, fix log
- **Common Mistakes:** Skipping reconciliation, accepting count differences, not investigating mismatches

---

## Outputs

- Post tracking log
- Downloaded proofs (correctly named)
- QA report per influencer
- pCloud archive (one folder per influencer)
- Reconciliation report (Done vs pCloud count)

---

## SLAs

| Step | SLA | RAG | Breach Action |
|------|-----|-----|---------------|
| Post tracking | Same day as post | Green | Stories may expire |
| Proof download | Within 4h of post | Amber | Expired content risk |
| QA review | Same day | Green | Delays fix cycle |
| pCloud upload | Within 4h of QA | Amber | Missing proofs |
| Reconciliation | Daily at EOD | Green | Data integrity risk |

---

## Quality Gates

- [ ] Every 'Done' has a matching pCloud proof
- [ ] QA check covers all brief requirements
- [ ] File naming matches standard exactly
- [ ] No mixed-influencer folders in pCloud

---

## Escalation

| Tier | Owner | Trigger |
|------|-------|---------|
| Tier 1 | Coverage Lead | Fix within 4h |
| Tier 2 | Ops Lead | Systemic issues, >10 mismatches |
| Tier 3 | Client | When report data integrity is at risk |

---

## Q&A / Troubleshooting

### Problem: Coverage posted but not matching brief

- **Symptoms:** Post exists but wrong hashtags, missing mentions, wrong content type, or off-brief content
- **Causes:** Influencer didn't read brief, brief sent late, unclear instructions
- **Fix:**
  1. Document exact mismatches
  2. Contact influencer via Chat team
  3. Request specific edits
  4. Set 24h deadline
  5. Re-verify after edit
  6. Update QA status
- **Owner:** Coverage + Chat
- **SLA:** ≤24h for edit request
- **Evidence:** Before/after screenshots, edit request message, updated QA log
- **Escalation:** If influencer refuses edit after 24h, escalate to Community for client decision

---

### Problem: Missing visit proof

- **Symptoms:** Influencer marked as visited but no photos/content found on social media
- **Causes:** Post deleted, posted on wrong account, visit didn't happen, story expired before capture
- **Fix:**
  1. Contact influencer for proof
  2. Check story archives
  3. If no proof: mark as Missing
  4. Notify Follow-Up
  5. Request re-visit if applicable
- **Owner:** Coverage Team
- **SLA:** ≤24h
- **Evidence:** Search attempts documented, influencer communication, status update
- **Escalation:** If >5 missing proofs in one campaign, escalate to Ops Lead

---

## How-To Runbook: Coverage QA Checklist & Archiving to pCloud

- **Preconditions:** Posts tracked, proofs downloaded
- **Tools:** Coverage_QA sheet, pCloud, campaign brief
- **Steps:**
  1. Open Coverage_QA tab
  2. For each influencer row:
     - a. Open proof file
     - b. Compare against brief: hashtags, mentions, content type
     - c. Check image/video quality
     - d. Set QA_Status: Done/Need Edit/Missing
     - e. Add notes for any issues
  3. Open pCloud campaign folder
  4. Create influencer subfolder (username)
  5. Upload verified proofs
  6. Verify upload count matches
  7. Update sheet with pCloud link
  8. Run reconciliation: count Done vs pCloud files
- **Expected Outputs:** Completed QA log, archived proofs in pCloud, reconciliation count
- **Definition of Done:** All proofs QA'd, uploaded, and reconciled
- **Common Mistakes:** Skipping QA, uploading to wrong folder, not running reconciliation
- **QA Checklist:** All statuses set? pCloud count matches? No mixed folders?

---

*End of TryGC SOPs v3.0*
