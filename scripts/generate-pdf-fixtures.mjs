import { mkdir, writeFile } from "node:fs/promises";
import { createQuotePdf } from "../src/internal/quotePdf.js";
import { createItem, createQuote } from "../src/internal/quoteUtils.js";

const outputDirectory = new URL("../tmp/pdfs/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const single = createQuote("202607-0001", new Date(2026, 6, 29, 12));
single.customer = { name: "Mariana Souza", phone: "(13) 99999-1234" };
single.vehicle = { brand: "Toyota", model: "Corolla XEi", year: "2021", plate: "ABC1D23", mileage: "48.500 km" };
single.items = [
  createItem({ kind: "Serviço", description: "Revisão preventiva completa", quantity: 1, unitPrice: 420 }),
  createItem({ kind: "Peça", description: "Kit de filtros", quantity: 1, unitPrice: 285.9 }),
  createItem({ kind: "Peça", description: "Óleo sintético 5W-30", quantity: 5, unitPrice: 52.5 }),
];
single.discount = { type: "percentage", value: 5 };
single.paymentMethod = "PIX ou cartão";
single.paymentTerms = "À vista ou em até 3x sem juros.";
single.estimatedTime = "1 dia útil";
single.warranty = "90 dias para os serviços executados.";
single.notes = "Valores sujeitos à confirmação após desmontagem e inspeção final.";

const multi = structuredClone(single);
multi.number = "202607-0002";
multi.customer.name = "Carlos Almeida";
multi.demonstration = true;
multi.items = Array.from({ length: 72 }, (_, index) => createItem({
  kind: index % 3 === 0 ? "Serviço" : "Peça",
  description: `Item ${index + 1} - descrição detalhada para testar legibilidade e paginação automática`,
  quantity: (index % 4) + 1,
  unitPrice: 24.9 + index * 3.75,
}));
multi.notes = "Diagnóstico sujeito a atualização conforme a inspeção técnica. ".repeat(22);

for (const [name, quote] of [["single-page.pdf", single], ["multi-page-demo.pdf", multi]]) {
  const { doc } = await createQuotePdf(quote);
  await writeFile(new URL(name, outputDirectory), Buffer.from(doc.output("arraybuffer")));
}
