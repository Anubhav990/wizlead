// src/app/api/send-whatsapp/route.ts
import { NextRequest, NextResponse } from "next/server";

// Helper function for batching
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  try {
    const { toNumbers, templateName, templateVariables } = await req.json();

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "Missing WhatsApp credentials in .env.local" });
    }

    if (!toNumbers || toNumbers.length === 0) {
      return NextResponse.json({ error: "No recipient numbers provided" });
    }

    const results = [];

    for (const toNumber of toNumbers) {
      const payload = {
        messaging_product: "whatsapp",
        to: toNumber,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: templateVariables.map((v: string) => ({ type: "text", text: v })),
            },
          ],
        },
      };

      const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      results.push({ to: toNumber, response: data });

      // Wait 2 seconds between messages
      await sleep(2000);
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
