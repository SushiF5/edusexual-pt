import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDynamicLayout } from "@/lib/stitch";

const StitchSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = StitchSchema.parse(body);

    const result = await generateDynamicLayout(prompt);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error generating layout:", error);
    return NextResponse.json({ error: "Failed to generate layout" }, { status: 500 });
  }
}
