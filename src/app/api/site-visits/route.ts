import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const { name, phone, project, project_type, unit_preference, date, time, visit_mode } = payload;

    // Validate essential fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    let n8nDispatched = false;

    // If N8N_WEBHOOK_URL is configured, forward the lead to n8n
    if (n8nWebhookUrl && !n8nWebhookUrl.includes("placeholder")) {
      try {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "site_visit.created",
            timestamp: new Date().toISOString(),
            data: {
              name,
              phone,
              project,
              project_type,
              unit_preference,
              date,
              time,
              visit_mode: visit_mode || "In-Person Executive Escort",
            },
          }),
        });
        n8nDispatched = true;
      } catch (webhookErr) {
        console.warn("n8n webhook dispatch non-blocking error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Site visit booked successfully.",
      referenceId: "VISIT-" + Math.floor(100000 + Math.random() * 900000),
      n8nDispatched,
      receivedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Site visit route error:", err);
    return NextResponse.json(
      { error: "Internal server error processing booking." },
      { status: 500 }
    );
  }
}
