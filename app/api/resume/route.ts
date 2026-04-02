import { NextResponse } from "next/server";

import { defaultPortfolioData, type PortfolioData } from "@/data/portfolio";
import { generateResumePdf } from "@/lib/resume-pdf";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PortfolioData;
    const data = payload ?? defaultPortfolioData;
    const pdfBytes = await generateResumePdf(data);
    const buffer = Buffer.from(pdfBytes);
    const filename = `${(data.fullName || data.name).replace(/\s+/g, "_")}_Resume.pdf`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error("Resume generation failed", error);
    return NextResponse.json({ message: "Unable to generate resume" }, { status: 500 });
  }
}
