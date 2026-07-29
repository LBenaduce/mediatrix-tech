export const DRAFT_STORAGE_KEY = "itamec-quote-draft-v1";
export const LAST_NUMBER_STORAGE_KEY = "itamec-quote-last-number-v1";

export function isoDate(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function addDays(dateValue, days) {
  const date = new Date(`${dateValue}T12:00:00`);
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

export function createItem(overrides = {}) {
  return {
    id: globalThis.crypto?.randomUUID?.() || `item-${Date.now()}-${Math.random()}`,
    kind: "Serviço",
    description: "",
    quantity: 1,
    unitPrice: 0,
    ...overrides,
  };
}

export function nextQuoteNumber(previousNumber = "", date = new Date()) {
  const prefix = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
  const match = String(previousNumber).match(/^(\d{6})-(\d{4})$/);
  const sequence = match?.[1] === prefix ? Number(match[2]) + 1 : 1;
  return `${prefix}-${String(sequence).padStart(4, "0")}`;
}

export function createQuote(number, date = new Date()) {
  const issueDate = isoDate(date);
  return {
    number,
    issueDate,
    validityDate: addDays(issueDate, 10),
    customer: { name: "", phone: "" },
    vehicle: { brand: "", model: "", year: "", plate: "", mileage: "" },
    items: [createItem()],
    discount: { type: "currency", value: 0 },
    paymentTerms: "",
    paymentMethod: "",
    estimatedTime: "",
    notes: "",
    warranty: "",
    demonstration: false,
  };
}

export function normalizeNumber(value) {
  const parsed = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function calculateQuote(quote) {
  const itemTotals = quote.items.map((item) => normalizeNumber(item.quantity) * normalizeNumber(item.unitPrice));
  const subtotal = itemTotals.reduce((sum, value) => sum + value, 0);
  const rawDiscount = normalizeNumber(quote.discount.value);
  const discount = quote.discount.type === "percentage"
    ? subtotal * Math.min(rawDiscount, 100) / 100
    : Math.min(rawDiscount, subtotal);
  return {
    itemTotals,
    subtotal,
    discount,
    total: Math.max(subtotal - discount, 0),
  };
}

export const formatCurrency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}

export function sanitizeFilename(value) {
  return String(value || "Cliente")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "Cliente";
}

export function quoteFilename(quote) {
  return `Orcamento_Itamec_${quote.number}_${sanitizeFilename(quote.customer.name)}.pdf`;
}
