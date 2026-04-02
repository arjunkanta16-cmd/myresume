import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import type { PortfolioData } from "@/data/portfolio";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN = 46;

type Cursor = {
  page: PDFPage;
  y: number;
};

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const width = font.widthOfTextAtSize(test, size);
    if (width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function ensureSpace(doc: PDFDocument, cursor: Cursor, required: number) {
  if (cursor.y - required > MARGIN) {
    return cursor;
  }

  const page = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  return { page, y: A4_HEIGHT - MARGIN };
}

function drawParagraph(
  doc: PDFDocument,
  cursor: Cursor,
  text: string,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  indent = 0,
  lineGap = 6
) {
  const maxWidth = A4_WIDTH - MARGIN * 2 - indent;
  const lines = wrapText(text, font, size, maxWidth);
  cursor = ensureSpace(doc, cursor, lines.length * (size + lineGap));

  for (const line of lines) {
    cursor.page.drawText(line, {
      x: MARGIN + indent,
      y: cursor.y,
      size,
      font,
      color
    });
    cursor.y -= size + lineGap;
  }

  return cursor;
}

function drawHeading(doc: PDFDocument, cursor: Cursor, title: string, font: PDFFont) {
  cursor = ensureSpace(doc, cursor, 32);
  cursor.page.drawText(title.toUpperCase(), {
    x: MARGIN,
    y: cursor.y,
    size: 11,
    font,
    color: rgb(0.07, 0.4, 0.68)
  });
  cursor.y -= 10;
  cursor.page.drawLine({
    start: { x: MARGIN, y: cursor.y },
    end: { x: A4_WIDTH - MARGIN, y: cursor.y },
    thickness: 1,
    color: rgb(0.75, 0.82, 0.88)
  });
  cursor.y -= 18;
  return cursor;
}

export async function generateResumePdf(data: PortfolioData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let cursor: Cursor = { page, y: A4_HEIGHT - MARGIN };

  cursor.page.drawText(data.fullName || data.name, {
    x: MARGIN,
    y: cursor.y,
    size: 24,
    font: fontBold,
    color: rgb(0.08, 0.12, 0.18)
  });
  cursor.y -= 28;
  cursor.page.drawText(data.role, {
    x: MARGIN,
    y: cursor.y,
    size: 11,
    font: fontRegular,
    color: rgb(0.22, 0.29, 0.37)
  });
  cursor.y -= 22;

  const contactLine = [
    ...data.contact.emails,
    data.contact.phone,
    data.contact.location,
    ...(data.contact.addressLines ?? []),
    ...(data.contact.github ? [data.contact.github.replace("https://", "")] : []),
    ...(data.contact.linkedin ? [data.contact.linkedin.replace("https://", "")] : [])
  ].join("  |  ");

  cursor = drawParagraph(pdfDoc, cursor, contactLine, fontRegular, 9, rgb(0.32, 0.38, 0.45));
  cursor.y -= 8;

  cursor = drawHeading(pdfDoc, cursor, "Professional Summary", fontBold);
  cursor = drawParagraph(pdfDoc, cursor, data.professionalIdentity, fontRegular, 10.5, rgb(0.17, 0.2, 0.25));
  cursor = drawParagraph(pdfDoc, cursor, data.heroBlurb, fontRegular, 10.5, rgb(0.17, 0.2, 0.25));
  cursor.y -= 8;

  cursor = drawHeading(pdfDoc, cursor, "Experience", fontBold);
  for (const item of data.experience) {
    cursor = ensureSpace(pdfDoc, cursor, 96);
    cursor.page.drawText(`${item.role} | ${item.company}`, {
      x: MARGIN,
      y: cursor.y,
      size: 11,
      font: fontBold,
      color: rgb(0.08, 0.12, 0.18)
    });
    cursor.y -= 16;
    cursor.page.drawText(`${item.duration} | ${item.location}`, {
      x: MARGIN,
      y: cursor.y,
      size: 9,
      font: fontRegular,
      color: rgb(0.39, 0.43, 0.49)
    });
    cursor.y -= 16;
    cursor = drawParagraph(pdfDoc, cursor, item.summary, fontRegular, 10, rgb(0.17, 0.2, 0.25));
    for (const point of item.highlights) {
      cursor = drawParagraph(pdfDoc, cursor, `- ${point}`, fontRegular, 9.5, rgb(0.17, 0.2, 0.25), 8, 4);
    }
    cursor.y -= 10;
  }

  cursor = drawHeading(pdfDoc, cursor, "Projects", fontBold);
  for (const project of data.projects) {
    cursor = ensureSpace(pdfDoc, cursor, 84);
    cursor.page.drawText(project.title, {
      x: MARGIN,
      y: cursor.y,
      size: 11,
      font: fontBold,
      color: rgb(0.08, 0.12, 0.18)
    });
    cursor.y -= 14;
    cursor = drawParagraph(pdfDoc, cursor, `Problem: ${project.problem}`, fontRegular, 9.5, rgb(0.17, 0.2, 0.25));
    cursor = drawParagraph(pdfDoc, cursor, `Solution: ${project.solution}`, fontRegular, 9.5, rgb(0.17, 0.2, 0.25));
    cursor = drawParagraph(pdfDoc, cursor, `Outcome: ${project.outcome}`, fontRegular, 9.5, rgb(0.17, 0.2, 0.25));
    cursor = drawParagraph(
      pdfDoc,
      cursor,
      `Tech: ${project.tech.join(", ")}`,
      fontRegular,
      9.5,
      rgb(0.07, 0.4, 0.68)
    );
    cursor.y -= 8;
  }

  cursor = drawHeading(pdfDoc, cursor, "Skills", fontBold);
  for (const category of data.skills) {
    cursor = ensureSpace(pdfDoc, cursor, 28);
    cursor.page.drawText(category.title, {
      x: MARGIN,
      y: cursor.y,
      size: 10,
      font: fontBold,
      color: rgb(0.08, 0.12, 0.18)
    });
    cursor.y -= 14;
    cursor = drawParagraph(
      pdfDoc,
      cursor,
      category.items.map((item) => item.name).join(" | "),
      fontRegular,
      9.5,
      rgb(0.17, 0.2, 0.25)
    );
    cursor.y -= 6;
  }

  cursor = drawHeading(pdfDoc, cursor, "Certifications & Achievements", fontBold);
  for (const cert of data.certifications) {
    cursor = drawParagraph(
      pdfDoc,
      cursor,
      `- ${cert.title} - ${cert.issuer}: ${cert.note}`,
      fontRegular,
      9.5,
      rgb(0.17, 0.2, 0.25),
      8,
      4
    );
  }
  cursor.y -= 8;

  cursor = drawHeading(pdfDoc, cursor, "Career Goal", fontBold);
  cursor = drawParagraph(pdfDoc, cursor, data.careerGoal, fontRegular, 10, rgb(0.17, 0.2, 0.25));

  return pdfDoc.save();
}
