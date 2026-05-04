import { NextResponse } from "next/server";
import { guides } from "@/data/content";

interface GuideParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: GuideParams) {
  const { id } = params;
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  // Gerar HTML simples para PDF
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${guide.title}</title>
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
          <h1>${guide.title}</h1>
          <p>${guide.description}</p>
        </div>
        ${guide.sections.map(section => `
          <div>
            <h2>${section.heading}</h2>
            <p>${section.body.replace(/\n/g, '<br/>')}</p>
          </div>
        `).join('')}
        <div class="footer">
          EduSexual PT — ${guide.title} — edusexual-pt.vercel.app
        </div>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="${guide.id}.html"`,
    },
  });
}
