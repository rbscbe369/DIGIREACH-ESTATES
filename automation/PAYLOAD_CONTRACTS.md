# Digireach Estates — Webhook & Automation Payload Contracts

This document specifies the exact JSON contracts for the **Supabase $\rightarrow$ Edge Function $\rightarrow$ n8n $\rightarrow$ wacrm** automation pipeline.

---

## 1. Real-Time Site Visit Booking Payload Contract

### A. Edge Function / Next.js $\rightarrow$ n8n Webhook
- **Method**: `POST`
- **Header**: `Content-Type: application/json`
- **Endpoint**: `https://<your-n8n-instance>/webhook/digireach-site-visit-webhook`

```json
{
  "event": "site_visit.created",
  "source": "supabase_edge_function",
  "timestamp": "2026-09-03T10:30:00.000Z",
  "lead": {
    "name": "Karthik Subramaniam",
    "phone": "9876543210",
    "project": "Digireach Lumina Towers",
    "project_type": "residential",
    "unit_preference": "3 BHK Royal Residence",
    "date": "2026-09-06",
    "time": "Morning (10:00 AM – 1:00 PM)",
    "visit_mode": "In-Person Executive Escort"
  }
}
```

### B. n8n $\rightarrow$ wacrm WhatsApp Template API
- **Method**: `POST`
- **Endpoint**: `https://api.wacrm.net/v1/messages/template`
- **Headers**:
  - `Authorization: Bearer <WACRM_API_KEY>`
  - `Content-Type: application/json`

```json
{
  "to": "919876543210",
  "template": "digireach_site_visit_confirmed",
  "language": "en",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "Karthik Subramaniam" },
        { "type": "text", "text": "Digireach Lumina Towers" },
        { "type": "text", "text": "3 BHK Royal Residence" },
        { "type": "text", "text": "2026-09-06" },
        { "type": "text", "text": "Morning (10:00 AM – 1:00 PM)" },
        { "type": "text", "text": "+919876543210" }
      ]
    },
    {
      "type": "button",
      "sub_type": "url",
      "index": "0",
      "parameters": [
        { "type": "text", "text": "https://maps.google.com/?q=11.0016,76.9744" }
      ]
    }
  ]
}
```

---

## 2. Scheduled 24-Hour Pre-Visit Reminder

- **Trigger**: n8n hourly cron job querying `public.site_visits WHERE date = CURRENT_DATE + INTERVAL '1 day'`
- **Template**: `digireach_visit_reminder_24h`
- **Payload Sent**:

```json
{
  "to": "919876543210",
  "template": "digireach_visit_reminder_24h",
  "language": "en",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "Karthik Subramaniam" },
        { "type": "text", "text": "Digireach Lumina Towers" },
        { "type": "text", "text": "Morning (10:00 AM – 1:00 PM)" },
        { "type": "text", "text": "+919876543210" }
      ]
    }
  ]
}
```

---

## 3. Scheduled 48-Hour Post-Visit Feedback

- **Trigger**: n8n daily cron job querying `public.site_visits WHERE date = CURRENT_DATE - INTERVAL '2 days' AND status = 'completed'`
- **Template**: `digireach_post_visit_followup_48h`
- **Payload Sent**:

```json
{
  "to": "919876543210",
  "template": "digireach_post_visit_followup_48h",
  "language": "en",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "Karthik Subramaniam" },
        { "type": "text", "text": "Digireach Lumina Towers" },
        { "type": "text", "text": "https://digireachestates.com/feedback/VISIT-829104" }
      ]
    }
  ]
}
```

---

## 4. Weekly Unconverted Lead Nurture Sequence

- **Trigger**: Every Tuesday at 10:30 AM
- **Audience**: Completed visitors from >7 days ago who haven't yet reserved a unit
- **Template**: `digireach_weekly_nurture_milestone`
- **Content**: Milestone progress updates, upcoming price escalation notices, and new tower phase launches.

```json
{
  "to": "919876543210",
  "template": "digireach_weekly_nurture_milestone",
  "language": "en",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "Karthik Subramaniam" },
        { "type": "text", "text": "Digireach Lumina Towers" },
        { "type": "text", "text": "68% (Tier 22 RCC Slabs Completed)" },
        { "type": "text", "text": "https://digireachestates.com/progress-videos" }
      ]
    }
  ]
}
```

---

## 5. Rule-Based Inbound Keyword Routing (No AI/LLM)

Inbound WhatsApp webhooks from wacrm are routed through exact keyword matching:

| Keyword in Message | Automated Action | Response / Outcome |
| :--- | :--- | :--- |
| `PRICE` | Immediate auto-reply with verified price sheet | Sends direct link to master cost sheet PDF |
| `CALLBACK` | Tags lead `lead_hot` + triggers sales team notification | Dispatches urgent Slack/Email notification to Relationship Manager |
| `RESCHEDULE` | Tags lead `reschedule_requested` | Adds task to concierge queue for rescheduling |
| `CANCEL` | Tags lead `cancelled_visit` | Updates status in DB and pauses reminders |

---

## Quick Testing via cURL

```bash
curl -X POST http://localhost:3000/api/site-visits \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arun Kumar",
    "phone": "9876543210",
    "project": "Digireach Lumina Towers",
    "project_type": "residential",
    "unit_preference": "3 BHK Royal Residence",
    "date": "2026-09-10",
    "time": "Morning (10:00 AM – 1:00 PM)",
    "visit_mode": "In-Person Executive Escort"
  }'
```
