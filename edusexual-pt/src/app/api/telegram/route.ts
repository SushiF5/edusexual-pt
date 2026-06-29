import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

const TelegramSchema = z.object({
  name: z.string().max(100).optional(),
  question: z.string().min(1, "Question is required").max(2000),
  audience: z.enum(["criancas", "jovens", "adultos"]),
});

export async function POST(req: Request) {
  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = TelegramSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
    }

    const { name, question, audience } = parsed.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram env vars not configured — question was not sent.");
      return NextResponse.json({ success: true, fallback: true });
    }

    const audienceLabels: Record<string, string> = {
      criancas: "Crianças (6-12)",
      jovens: "Jovens (12-25)",
      adultos: "Adultos (Pais/Educadores)",
    };

    const displayName = name?.trim() || "Anónimo";

    const text = [
      "📩 *Nova Pergunta Anónima*",
      "",
      `👤 Nome: ${displayName}`,
      `🎯 Perfil: ${audienceLabels[audience] || audience}`,
      `❓ Pergunta:`,
      `${question.trim()}`,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error sending telegram message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
