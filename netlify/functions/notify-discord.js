export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { payload } = JSON.parse(event.body || "{}");
    console.log("📥 Raw body:", event.body);

    const d = payload?.data || {};
    console.log("📋 Parsed data:", d);

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    console.log("🔗 Webhook URL:", webhookUrl ? "Loaded ✅" : "Missing ❌");

    const content = [
      `📩 **New RSVP**`,
      `• Name: ${d.name || "—"}`,
      `• Email: ${d.email || "—"}`,
      `• Phone: ${d.phone || "—"}`,
      `• Attendance: ${d.attendance || "—"}`,
      `• Guests: ${d.guests || "—"}`,
      `• Dietary: ${d.dietary || "—"}`,
      d.message ? `• Message: ${d.message}` : null,
    ].filter(Boolean).join("\n");

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const text = await resp.text();
    console.log("📤 Discord response:", resp.status, text);

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("❌ Error:", err);
    return { statusCode: 500, body: `Error: ${err}` };
  }
}
