import { NextRequest, NextResponse } from "next/server";
import { guides } from "@/data/content";
import { checkRateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import { Document, Page, Text, View, StyleSheet, pdf } from "@/lib/pdf";

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 11, lineHeight: 1.6, color: "#333" },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D5A5A", marginBottom: 10, borderBottom: "2px solid #2D5A5A", paddingBottom: 10 },
  description: { fontSize: 12, color: "#555", marginBottom: 20 },
  section: { marginTop: 25 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#2D5A5A", marginBottom: 8 },
  sectionBody: { fontSize: 11, color: "#333", whiteSpace: "pre-line" },
  footer: { marginTop: 40, paddingTop: 20, borderTop: "1px solid #ddd", fontSize: 9, color: "#666", textAlign: "center" },
});

function GuidePDF({ guide }: { guide: typeof guides[0] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.description}>{guide.description}</Text>
        </View>
        {guide.sections.map((section, i) => (
          <View key={`${guide.id}-s${i}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.heading}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
        <View style={styles.footer}>
          <Text>EduSexual PT — {guide.title} — edusexual.pt</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET(request: NextRequest) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

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

  const pdfBlob = await pdf(<GuidePDF guide={guide} />).toBlob();
  const pdfBytes = new Uint8Array(await pdfBlob.arrayBuffer());

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFilename}.pdf"`,
      "Content-Length": pdfBytes.byteLength.toString(),
    },
  });
}