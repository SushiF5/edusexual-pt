import { NextResponse } from "next/server";
import { generateDynamicLayout } from "@/lib/stitch";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await generateDynamicLayout(prompt);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error generating layout:", error);
    return NextResponse.json({ error: "Failed to generate layout" }, { status: 500 });
  }
}
