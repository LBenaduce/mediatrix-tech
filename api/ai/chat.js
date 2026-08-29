import { MEDIATRIX_KNOWLEDGE, SUPPORTED_CHAT_LANGUAGES } from "../_lib/mediatrix-knowledge.js";

const requests = new Map();
const MAX_MESSAGES = 12;
function limited(ip) { const now = Date.now(); const hits = (requests.get(ip) || []).filter((time) => time > now - 60_000); hits.push(now); requests.set(ip, hits); return hits.length > 20; }
function languageFor(text, fallback) { const rules = [["zh-CN", /[\u3400-\u9fff]/], ["hi", /[\u0900-\u097f]/], ["ar", /[\u0600-\u06ff]/], ["pt-BR", /\b(olá|site|preciso|quero|orçamento|você|vocês|obrigad[oa])\b/i], ["it", /\b(ciao|sito|vorrei|sono|grazie|progetto)\b/i], ["es", /\b(hola|sitio|quiero|necesito|gracias|proyecto)\b/i], ["fr", /\b(bonjour|pour|vous|merci|projet|souhaite)\b/i], ["de", /\b(hallo|website|ich|und|für|möchte|danke|projekt)\b/i]]; return rules.find(([, regex]) => regex.test(text))?.[0] || fallback; }
function bodyOf(request) { if (typeof request.body === "string") return JSON.parse(request.body); return request.body || {}; }

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") { response.setHeader("Allow", "POST"); return response.status(405).json({ error: "Method not allowed" }); }
  const ip = request.headers["x-forwarded-for"]?.split(",")[0] || "unknown";
  if (limited(ip)) return response.status(429).json({ error: "Please try again shortly." });
  let payload; try { payload = bodyOf(request); } catch { return response.status(400).json({ error: "Invalid request." }); }
  const messages = Array.isArray(payload.messages) ? payload.messages.slice(-MAX_MESSAGES) : [];
  if (!messages.length || messages.some((item) => !["user", "assistant"].includes(item.role) || typeof item.content !== "string" || item.content.length > 1200)) return response.status(400).json({ error: "Invalid messages." });
  const fallback = SUPPORTED_CHAT_LANGUAGES.includes(payload.language) ? payload.language : "en";
  const language = languageFor(messages.at(-1).content, fallback);
  if (!process.env.AI_API_KEY) return response.status(503).json({ error: "AI temporarily unavailable." });
  const instructions = `You are Mediatrix AI, an AI sales assistant. ${MEDIATRIX_KNOWLEDGE} Identify the language of the visitor's latest message and reply in that language. Use one of these language codes: ${SUPPORTED_CHAT_LANGUAGES.join(", ")}. If the latest message is too short or ambiguous, use ${language}. Be friendly, concise, and ask at most one relevant question. Never claim to be human. For uncertainty, binding price/deadline, complex request, or serious hiring intent, set handoff true. Return JSON only: {"reply":"...","handoff":boolean,"language":"detected language code"}.`;
  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${process.env.AI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.AI_MODEL || "gpt-4o-mini", response_format: { type: "json_object" }, messages: [{ role: "system", content: instructions }, ...messages.map(({ role, content }) => ({ role, content }))], max_tokens: 350, temperature: 0.4 }) });
    if (!upstream.ok) throw new Error(`LLM ${upstream.status}`);
    const result = await upstream.json(); const parsed = JSON.parse(result.choices?.[0]?.message?.content || "{}");
    if (typeof parsed.reply !== "string" || !parsed.reply.trim()) throw new Error("Invalid LLM response");
    return response.status(200).json({ reply: parsed.reply.trim(), handoff: Boolean(parsed.handoff), language: SUPPORTED_CHAT_LANGUAGES.includes(parsed.language) ? parsed.language : language });
  } catch (error) { console.error("Mediatrix AI request failed", error.message); return response.status(503).json({ error: "AI temporarily unavailable." }); }
}
