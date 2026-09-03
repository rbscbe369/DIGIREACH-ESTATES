// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This Edge function listens for database insert webhooks or direct HTTP POST calls
// and dispatches the exact payload contract to n8n for WhatsApp automation via wacrm.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SiteVisitPayload {
  name: string;
  phone: string;
  project: string;
  project_type: string;
  unit_preference: string;
  date: string;
  time: string;
  visit_mode?: string;
  id?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();

    // Supabase database webhook payloads wrap the record in `record`
    const record: SiteVisitPayload = rawBody.record ? rawBody.record : rawBody;

    const {
      name,
      phone,
      project,
      project_type,
      unit_preference,
      date,
      time,
      visit_mode,
    } = record;

    // Validate required fields
    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name and phone" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Clean phone format
    const cleanPhone = phone.replace(/\D/g, "");

    // Retrieve n8n webhook endpoint from Edge Function environment
    const n8nWebhookUrl = Deno.env.get("N8N_WEBHOOK_URL");

    if (!n8nWebhookUrl) {
      console.warn("N8N_WEBHOOK_URL environment variable is not configured.");
      return new Response(
        JSON.stringify({
          warning: "N8N_WEBHOOK_URL not configured. Lead recorded in database.",
          data: { name, phone: cleanPhone, project, date, time },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare exact n8n webhook payload contract
    const webhookContract = {
      event: "site_visit.created",
      source: "supabase_edge_function",
      timestamp: new Date().toISOString(),
      lead: {
        name,
        phone: cleanPhone,
        project: project || "Digireach Lumina Towers",
        project_type: project_type || "residential",
        unit_preference: unit_preference || "3 BHK Royal Residence",
        date: date || new Date().toISOString().split("T")[0],
        time: time || "Morning (10:00 AM – 1:00 PM)",
        visit_mode: visit_mode || "In-Person Executive Escort",
      },
    };

    console.log(`Forwarding site visit for ${name} (${cleanPhone}) to n8n webhook:`, n8nWebhookUrl);

    // Dispatch POST request to n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Digireach-Source": "Supabase-Edge-Function",
      },
      body: JSON.stringify(webhookContract),
    });

    const n8nResult = await n8nResponse.text();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully forwarded to n8n automation pipeline.",
        n8nStatus: n8nResponse.status,
        n8nResponse: n8nResult,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error in site-visit-notification Edge Function:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
