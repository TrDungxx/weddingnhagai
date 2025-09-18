export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { payload } = JSON.parse(event.body || "{}");
    if (!payload || !payload.data) {
      return { statusCode: 400, body: "Bad payload" };
    }

    const d = payload.data;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return { statusCode: 500, body: "Missing DISCORD_WEBHOOK_URL" };
    }

    // Tạo nội dung gọn đẹp
    const lines = [
      `📩 **Neww RSVP**`,
      `• **Name**: ${d.name || "—"}`,
      `• **Email**: ${d.email || "—"}`,
      `• **Phone**: ${d.phone || "—"}`,
      `• **Attendance**: ${d.attendance || "—"}`,
      `• **Guests**: ${d.guests || "—"}`,
      `• **Dietary**: ${d.dietary || "—"}`,
      d.message ? `• **Message**: ${d.message}` : null,
    ].filter(Boolean);

    // Gửi vào Discord (content tối đa ~2000 ký tự)
    const content = lines.join("\n").slice(0, 1900);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: `Error: ${err}` };
  }
}
