import { NextRequest, NextResponse } from "next/server";
import { guides } from "@/data/content";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  const safeFilename = guide.id.replace(/[^a-zA-Z0-9_-]/g, "");

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(guide.title)}</title>
<style>
body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
h1 { color: #2D5A5A; border-bottom: 2px solid #2D5A5A; padding-bottom: 10px; }
h2 { color: #2D5A5A; margin-top: 30px; }
.header { margin-bottom: 30px; }
.footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
</style>
</head>
<body>
<div class="header">
<h1>${escapeHtml(guide.title)}</h1>
<p>${escapeHtml(guide.description)}</p>
</div>
${guide.sections.map(section => `
<div>
<h2>${escapeHtml(section.heading)}</h2>
<p>${escapeHtml(section.body).replace(/\n/g, '<br/>')}</p>
</div>
`).join('')}
<div class="footer">
EduSexual PT — ${escapeHtml(guide.title)} — edusexual.pt
</div>
</body>
</html>
`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename}.html"`,
    },
  });
}
