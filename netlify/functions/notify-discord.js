export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const submission = body.payload.data;

    const webhookUrl = "https://discord.com/api/webhooks/1418198048793952356/tYudspfYaPMiFwZAnfNNzayxY9yV9LQuJwWsSK7vzoZnfv6O4vEhLpInR8mqoIrSYy3Y"; // Webhook URL của bạn

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📩 New RSVP from: **${submission.name}**  
✉️ Email: ${submission.email}  
📞 Phone: ${submission.phone}  
👥 Guests: ${submission.guests}  
📝 Message: ${submission.message || "—"}`
      })
    });

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
