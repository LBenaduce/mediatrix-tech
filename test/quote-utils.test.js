import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateQuote,
  createQuote,
  nextQuoteNumber,
  quoteFilename,
} from "../src/internal/quoteUtils.js";

test("gera numeração mensal sequencial", () => {
  const date = new Date(2026, 6, 29, 12);
  assert.equal(nextQuoteNumber("", date), "202607-0001");
  assert.equal(nextQuoteNumber("202607-0009", date), "202607-0010");
  assert.equal(nextQuoteNumber("202606-0042", date), "202607-0001");
});

test("calcula itens e desconto em reais", () => {
  const quote = createQuote("202607-0001", new Date(2026, 6, 29, 12));
  quote.items = [
    { quantity: 2, unitPrice: 150 },
    { quantity: 1, unitPrice: 80.5 },
  ];
  quote.discount = { type: "currency", value: 30.5 };
  assert.deepEqual(calculateQuote(quote), {
    itemTotals: [300, 80.5],
    subtotal: 380.5,
    discount: 30.5,
    total: 350,
  });
});

test("calcula desconto percentual e limita o total a zero", () => {
  const quote = createQuote("202607-0001", new Date(2026, 6, 29, 12));
  quote.items = [{ quantity: 4, unitPrice: 25 }];
  quote.discount = { type: "percentage", value: 15 };
  assert.equal(calculateQuote(quote).total, 85);
  quote.discount.value = 150;
  assert.equal(calculateQuote(quote).total, 0);
});

test("gera nome de PDF seguro com cliente", () => {
  const quote = createQuote("202607-0001", new Date(2026, 6, 29, 12));
  quote.customer.name = "João da Silva / Oficina";
  assert.equal(quoteFilename(quote), "Orcamento_Itamec_202607-0001_Joao-da-Silva-Oficina.pdf");
});
