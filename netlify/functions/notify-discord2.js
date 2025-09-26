export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // ---- Parse all possible formats (JSON or x-www-form-urlencoded) ----
    const ct = (event.headers["content-type"] || "").toLowerCase();
    let body = {};
    if (ct.includes("application/json")) {
      body = JSON.parse(event.body || "{}");
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      const params = new URLSearchParams(event.body || "");
      body = Object.fromEntries(params.entries());
      if (body.payload) { try { body = JSON.parse(body.payload); } catch {} }
    } else {
      try { body = JSON.parse(event.body || "{}"); } catch {}
    }

    // Netlify có thể bọc ở nhiều nơi:
    const raw =
      body?.payload?.data ||   // kiểu 1
      body?.data ||            // kiểu 2
      body?.submission ||      // kiểu 3
      body;                    // fields phẳng

    // ---- Map linh hoạt các tên field thường gặp ----
    const fullName =
      raw.name ||
      [raw.first_name, raw.last_name].filter(Boolean).join(" ") ||
      raw.full_name ||
      raw.title || "—";

    const email = raw.email || raw.email_address || "—";
    const phone = raw.phone || raw.phone_number || raw.number || "—";
    const attendance = raw.attendance || raw.status || "—";
    const guests = raw.guests || raw.guest_count || "—";
    const dietary = raw.dietary || raw.diet || "—";
    const message = raw.message || raw.notes || null;

    const lines = [
      `📩 **New RSVP**`,
      `• **Name**: ${fullName}`,
      `• **Email**: ${email}`,
      `• **Phone**: ${phone}`,
      `• **Attendance**: ${attendance}`,
      `• **Guests**: ${guests}`,
      `• **Dietary**: ${dietary}`,
      message ? `• **Message**: ${message}` : null,
    ].filter(Boolean);

    const content = lines.join("\n").slice(0, 1900);

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return { statusCode: 500, body: "Missing DISCORD_WEBHOOK_URL" };

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 502, body: `Discord error: ${resp.status} ${text}` };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: `Error: ${err}` };
  }
}
