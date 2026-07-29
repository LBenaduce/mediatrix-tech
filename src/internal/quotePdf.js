import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { companyConfig } from "./companyConfig.js";
import {
  calculateQuote,
  formatCurrency,
  formatDate,
  quoteFilename,
} from "./quoteUtils.js";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 15;
const HEADER_BOTTOM = 40;
const FOOTER_TOP = 285;

async function imageData(url) {
  if (!url) return null;
  const response = await fetch(url);
  if (!response.ok) return null;
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(blob);
  });
}

function drawHeader(doc, logo) {
  doc.setFillColor(companyConfig.colors.navy);
  doc.rect(0, 0, PAGE_WIDTH, 34, "F");
  if (logo) {
    try {
      doc.addImage(logo, undefined, MARGIN, 8, 24, 18, undefined, "FAST");
    } catch {
      // O wordmark abaixo permanece como fallback caso o arquivo não seja compatível.
    }
  }
  const textX = logo ? 43 : MARGIN;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(companyConfig.shortName, textX, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(
    [companyConfig.address, companyConfig.phone, companyConfig.email].filter(Boolean).join("  |  "),
    textX,
    21,
  );
  if (companyConfig.document) doc.text(companyConfig.document, textX, 26);
  doc.setTextColor(companyConfig.colors.ink);
}

function drawWatermark(doc) {
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.11 }));
  doc.setTextColor(31, 110, 212);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  doc.text("DEMONSTRAÇÃO — SEM VALOR COMERCIAL", PAGE_WIDTH / 2, PAGE_HEIGHT / 2, {
    align: "center",
    angle: 35,
  });
  doc.restoreGraphicsState();
}

function ensureSpace(doc, y, required, logo) {
  if (y + required <= FOOTER_TOP - 5) return y;
  doc.addPage();
  drawHeader(doc, logo);
  return HEADER_BOTTOM + 5;
}

function field(doc, label, value, x, y, width) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(companyConfig.colors.muted);
  doc.text(label.toUpperCase(), x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(companyConfig.colors.ink);
  const lines = doc.splitTextToSize(String(value || "—"), width);
  doc.text(lines, x, y + 5);
}

function sectionTitle(doc, title, y) {
  doc.setFillColor(235, 242, 252);
  doc.roundedRect(MARGIN, y, PAGE_WIDTH - MARGIN * 2, 8, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(companyConfig.colors.blue);
  doc.text(title.toUpperCase(), MARGIN + 3, y + 5.3);
}

export async function createQuotePdf(quote) {
  const totals = calculateQuote(quote);
  const logo = await imageData(companyConfig.logoUrl);
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  doc.setProperties({
    title: `Orçamento ${quote.number} - ${companyConfig.name}`,
    subject: "Orçamento de serviços e peças automotivas",
    author: companyConfig.name,
  });

  drawHeader(doc, logo);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(companyConfig.colors.navy);
  doc.text("ORÇAMENTO", MARGIN, 48);
  doc.setFontSize(9);
  doc.setTextColor(companyConfig.colors.muted);
  doc.text(`Nº ${quote.number}`, MARGIN, 54);
  field(doc, "Emissão", formatDate(quote.issueDate), 138, 45, 24);
  field(doc, "Validade", formatDate(quote.validityDate), 169, 45, 26);

  sectionTitle(doc, "Cliente e veículo", 61);
  field(doc, "Cliente", quote.customer.name, MARGIN, 74, 74);
  field(doc, "Telefone", quote.customer.phone, 94, 74, 42);
  field(doc, "Veículo", quote.vehicle.brand, 141, 74, 54);
  field(doc, "Modelo", quote.vehicle.model, MARGIN, 89, 44);
  field(doc, "Ano", quote.vehicle.year, 64, 89, 20);
  field(doc, "Placa", quote.vehicle.plate, 94, 89, 30);
  field(doc, "Quilometragem", quote.vehicle.mileage, 141, 89, 54);

  const tableRows = quote.items.map((item, index) => [
    String(index + 1),
    item.kind,
    item.description || "—",
    normalizeQuantity(item.quantity),
    formatCurrency.format(Number(item.unitPrice) || 0),
    formatCurrency.format(totals.itemTotals[index]),
  ]);

  autoTable(doc, {
    startY: 105,
    margin: { top: HEADER_BOTTOM + 5, right: MARGIN, bottom: 18, left: MARGIN },
    head: [["#", "Tipo", "Descrição", "Qtd.", "Valor unit.", "Total"]],
    body: tableRows,
    theme: "grid",
    styles: { font: "helvetica", fontSize: 8.2, cellPadding: 2.3, overflow: "linebreak", textColor: companyConfig.colors.ink },
    headStyles: { fillColor: companyConfig.colors.blue, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [247, 250, 253] },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 20 },
      2: { cellWidth: "auto" },
      3: { cellWidth: 14, halign: "right" },
      4: { cellWidth: 27, halign: "right" },
      5: { cellWidth: 27, halign: "right", fontStyle: "bold" },
    },
    willDrawPage: ({ pageNumber, cursor }) => {
      if (pageNumber > 1) {
        drawHeader(doc, logo);
        cursor.y = HEADER_BOTTOM + 5;
      }
    },
  });

  let y = ensureSpace(doc, doc.lastAutoTable.finalY + 7, 34, logo);
  const totalsX = 122;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal", totalsX, y + 5);
  doc.text(formatCurrency.format(totals.subtotal), 195, y + 5, { align: "right" });
  doc.text("Desconto", totalsX, y + 12);
  doc.text(`- ${formatCurrency.format(totals.discount)}`, 195, y + 12, { align: "right" });
  doc.setDrawColor(210, 220, 232);
  doc.line(totalsX, y + 16, 195, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(companyConfig.colors.blue);
  doc.text("TOTAL", totalsX, y + 24);
  doc.text(formatCurrency.format(totals.total), 195, y + 24, { align: "right" });

  y = ensureSpace(doc, y + 34, 32, logo);
  sectionTitle(doc, "Condições", y);
  y += 13;
  field(doc, "Forma de pagamento", quote.paymentMethod, MARGIN, y, 53);
  field(doc, "Condições de pagamento", quote.paymentTerms, 73, y, 61);
  field(doc, "Prazo previsto", quote.estimatedTime, 141, y, 54);
  y += 18;

  const detailBlocks = [
    ["Garantia", quote.warranty],
    ["Observações", quote.notes],
  ].filter(([, value]) => value);

  for (const [label, value] of detailBlocks) {
    const lines = doc.splitTextToSize(String(value), PAGE_WIDTH - MARGIN * 2 - 6);
    y = ensureSpace(doc, y, 12 + lines.length * 4.5, logo);
    sectionTitle(doc, label, y);
    y += 13;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(companyConfig.colors.ink);
    doc.text(lines, MARGIN + 3, y);
    y += lines.length * 4.5 + 6;
  }

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    if (quote.demonstration) drawWatermark(doc);
    doc.setDrawColor(220, 226, 234);
    doc.line(MARGIN, FOOTER_TOP, PAGE_WIDTH - MARGIN, FOOTER_TOP);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(companyConfig.colors.muted);
    doc.text(`${companyConfig.name} | Orçamento ${quote.number}`, MARGIN, 291);
    doc.text(`Página ${page} de ${pageCount}`, PAGE_WIDTH - MARGIN, 291, { align: "right" });
  }

  return { doc, filename: quoteFilename(quote) };
}

function normalizeQuantity(value) {
  const quantity = Number(value) || 0;
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(quantity);
}
