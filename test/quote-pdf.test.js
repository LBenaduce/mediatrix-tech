import assert from "node:assert/strict";
import test from "node:test";
import { createQuotePdf } from "../src/internal/quotePdf.js";
import { createItem, createQuote } from "../src/internal/quoteUtils.js";

test("gera PDF A4 estruturado com uma página e nome correto", async () => {
  const quote = createQuote("202607-0001", new Date(2026, 6, 29, 12));
  quote.customer.name = "Cliente Teste";
  quote.items = [createItem({ description: "Troca de óleo e filtro", quantity: 1, unitPrice: 250 })];
  const { doc, filename } = await createQuotePdf(quote);
  assert.equal(doc.getNumberOfPages(), 1);
  assert.equal(filename, "Orcamento_Itamec_202607-0001_Cliente-Teste.pdf");
  assert.ok(doc.output("arraybuffer").byteLength > 5_000);
});

test("quebra tabela longa em várias páginas e aplica modo demonstração", async () => {
  const quote = createQuote("202607-0002", new Date(2026, 6, 29, 12));
  quote.customer.name = "Cliente Multipágina";
  quote.demonstration = true;
  quote.items = Array.from({ length: 65 }, (_, index) => createItem({
    kind: index % 2 ? "Peça" : "Serviço",
    description: `Item detalhado ${index + 1} para validação da quebra automática de páginas`,
    quantity: (index % 3) + 1,
    unitPrice: 35.5 + index,
  }));
  quote.notes = "Observação extensa. ".repeat(80);
  const { doc } = await createQuotePdf(quote);
  assert.ok(doc.getNumberOfPages() >= 3);
  assert.ok(doc.output("arraybuffer").byteLength > 15_000);
});
