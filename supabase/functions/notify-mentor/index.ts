// supabase/functions/notify-mentor/index.ts
// Deploy with: supabase functions deploy notify-mentor

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL     = "MentifyHub <notifications@mentifyhub.com>";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin":  "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  try {
    const { mentor_email, mentee_name, request_id } = await req.json();

    if (!mentor_email) {
      return new Response(
        JSON.stringify({ error: "mentor_email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const dashboardUrl = `https://mentifyhub.com/mentor-dashboard.html`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body { margin: 0; padding: 0; background: #f4f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          .wrap { max-width: 560px; margin: 40px auto; padding: 0 20px 40px; }
          .card { background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(15,23,42,.08); overflow: hidden; }
          .header { background: linear-gradient(160deg, #1d4ed8, #0b3b89); padding: 32px 32px 28px; text-align: center; }
          .header img { width: 52px; height: 52px; border-radius: 14px; border: 2px solid rgba(255,255,255,.25); }
          .header h1 { color: #ffffff; font-size: 22px; font-weight: 800; margin: 12px 0 4px; letter-spacing: -.3px; }
          .header p  { color: rgba(255,255,255,.78); font-size: 13px; margin: 0; }
          .body { padding: 28px 32px; }
          .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
          .text { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 20px; }
          .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 20px; margin-bottom: 24px; }
          .info-box .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: #94a3b8; margin-bottom: 4px; }
          .info-box .value { font-size: 14px; font-weight: 600; color: #0f172a; }
          .btn { display: block; width: fit-content; margin: 0 auto; padding: 14px 28px; background: linear-gradient(160deg, #1d4ed8, #0b3b89); color: #ffffff; font-size: 14px; font-weight: 700; border-radius: 14px; text-decoration: none; text-align: center; box-shadow: 0 4px 14px rgba(29,78,216,.35); }
          .footer { padding: 20px 32px; border-top: 1px solid #e2e8f0; background: #f8fafc; text-align: center; }
          .footer p { font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="header">
              <img src="https://mentifyhub.com/logo.png" alt="MentifyHub"/>
              <h1>New mentorship request</h1>
              <p>Someone wants to learn from you</p>
            </div>
            <div class="body">
              <div class="greeting">You have a new request! 🎉</div>
              <p class="text">
                A mentee on MentifyHub has sent you a mentorship request.
                Log in to your dashboard to review their message and decide whether to accept or decline.
              </p>
              <div class="info-box">
                <div class="label">From</div>
                <div class="value">${mentee_name || "A MentifyHub mentee"}</div>
              </div>
              <div class="info-box">
                <div class="label">Request ID</div>
                <div class="value">${request_id || "—"}</div>
              </div>
              <a href="${dashboardUrl}" class="btn">View request on dashboard →</a>
            </div>
            <div class="footer">
              <p>You're receiving this because you're a mentor on MentifyHub.<br/>© ${new Date().getFullYear()} MentifyHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [mentor_email],
        subject: "🌱 New mentorship request on MentifyHub",
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email", detail: data }),
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );

  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
});
