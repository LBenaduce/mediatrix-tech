import React from "react";
import {
  Download,
  Eye,
  FilePlus2,
  LogOut,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { companyConfig, missingCompanyFields } from "./companyConfig";
import { createQuotePdf } from "./quotePdf";
import {
  calculateQuote,
  createItem,
  createQuote,
  DRAFT_STORAGE_KEY,
  formatCurrency,
  LAST_NUMBER_STORAGE_KEY,
  nextQuoteNumber,
} from "./quoteUtils";
import "./internal.css";

function readDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY));
    if (draft?.number && Array.isArray(draft.items)) return draft;
  } catch {
    // Um rascunho inválido é ignorado com segurança.
  }
  const number = nextQuoteNumber(localStorage.getItem(LAST_NUMBER_STORAGE_KEY));
  localStorage.setItem(LAST_NUMBER_STORAGE_KEY, number);
  return createQuote(number);
}

export function InternalQuotes() {
  const [auth, setAuth] = React.useState("checking");
  const [quote, setQuote] = React.useState(readDraft);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [pdfStatus, setPdfStatus] = React.useState("");
  const totals = React.useMemo(() => calculateQuote(quote), [quote]);

  React.useEffect(() => {
    const previousTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement("meta"));
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow, noarchive");
    document.title = "Orçamentos | Área interna Itamec";

    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error();
        setAuth("authenticated");
      })
      .catch(() => {
        setAuth("unauthenticated");
        if (window.location.pathname !== "/area-interna/login") {
          window.history.replaceState({}, "", "/area-interna/login?redirect=%2Farea-interna%2Forcamentos");
        }
      });

    return () => {
      document.title = previousTitle;
      if (previousRobots) robots.setAttribute("content", previousRobots);
      else robots.remove();
    };
  }, []);

  React.useEffect(() => {
    if (auth !== "authenticated") return undefined;
    // Rascunhos e numeração são deliberadamente locais: ficam somente neste navegador.
    const timeout = window.setTimeout(() => {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(quote));
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [auth, quote]);

  React.useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  if (auth === "checking") return <LoadingScreen />;
  if (auth === "unauthenticated") return <LoginScreen onSuccess={() => {
    window.history.replaceState({}, "", "/area-interna/orcamentos");
    setAuth("authenticated");
  }} />;

  const update = (path, value) => {
    setQuote((current) => {
      const next = structuredClone(current);
      let target = next;
      path.slice(0, -1).forEach((key) => { target = target[key]; });
      target[path.at(-1)] = value;
      return next;
    });
  };

  const updateItem = (id, field, value) => {
    setQuote((current) => ({
      ...current,
      items: current.items.map((item) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  const removeItem = (id) => {
    setQuote((current) => ({
      ...current,
      items: current.items.length > 1 ? current.items.filter((item) => item.id !== id) : current.items,
    }));
  };

  const buildPdf = async () => {
    setPdfStatus("Gerando PDF…");
    try {
      const result = await createQuotePdf(quote);
      setPdfStatus("");
      return result;
    } catch (error) {
      console.error(error);
      setPdfStatus("Não foi possível gerar o PDF.");
      return null;
    }
  };

  const preview = async () => {
    const result = await buildPdf();
    if (!result) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(result.doc.output("blob")));
  };

  const download = async () => {
    const result = await buildPdf();
    result?.doc.save(result.filename);
  };

  const print = async () => {
    const result = await buildPdf();
    if (!result) return;
    const url = URL.createObjectURL(result.doc.output("blob"));
    const frame = document.createElement("iframe");
    frame.hidden = true;
    frame.src = url;
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      window.setTimeout(() => {
        URL.revokeObjectURL(url);
        frame.remove();
      }, 60_000);
    };
    document.body.appendChild(frame);
  };

  const clearQuote = () => {
    if (!window.confirm("Limpar todos os dados deste orçamento?")) return;
    setQuote(createQuote(quote.number));
  };

  const newQuote = () => {
    if (!window.confirm("Iniciar um novo orçamento com a próxima numeração?")) return;
    const number = nextQuoteNumber(localStorage.getItem(LAST_NUMBER_STORAGE_KEY));
    localStorage.setItem(LAST_NUMBER_STORAGE_KEY, number);
    const next = createQuote(number);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
    setQuote(next);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    window.history.replaceState({}, "", "/area-interna/login?redirect=%2Farea-interna%2Forcamentos");
    setAuth("unauthenticated");
  };

  return (
    <div className="internal-app">
      <header className="internal-header">
        <div className="internal-brand">
          <BrandMark />
          <div><strong>{companyConfig.name}</strong><span>Área interna · Orçamentos</span></div>
        </div>
        <button className="internal-button ghost" type="button" onClick={logout}><LogOut size={17} />Sair</button>
      </header>

      <main className="quote-shell">
        <div className="quote-heading">
          <div>
            <p className="internal-eyebrow">Gerador de orçamento</p>
            <h1>Orçamento <span>#{quote.number}</span></h1>
            <p>O rascunho e a numeração ficam disponíveis somente neste navegador.</p>
          </div>
          <label className="demo-switch">
            <input type="checkbox" checked={quote.demonstration} onChange={(event) => update(["demonstration"], event.target.checked)} />
            <span>Modo Demonstração</span>
          </label>
        </div>

        {missingCompanyFields.length > 0 && (
          <aside className="config-notice">
            <strong>Configuração pendente</strong>
            <span>Preencha {missingCompanyFields.join(", ")} em <code>companyConfig.js</code> para exibição no PDF.</span>
          </aside>
        )}

        <form className="quote-form" onSubmit={(event) => event.preventDefault()}>
          <Section title="Identificação">
            <div className="field-grid columns-3">
              <Input label="Número do orçamento" value={quote.number} readOnly />
              <Input label="Data de emissão" type="date" value={quote.issueDate} onChange={(value) => update(["issueDate"], value)} />
              <Input label="Validade" type="date" value={quote.validityDate} onChange={(value) => update(["validityDate"], value)} />
            </div>
          </Section>

          <Section title="Cliente">
            <div className="field-grid columns-2">
              <Input label="Nome do cliente" value={quote.customer.name} onChange={(value) => update(["customer", "name"], value)} autoComplete="name" />
              <Input label="Telefone" type="tel" value={quote.customer.phone} onChange={(value) => update(["customer", "phone"], value)} autoComplete="tel" />
            </div>
          </Section>

          <Section title="Veículo">
            <div className="field-grid columns-5">
              <Input label="Veículo / marca" value={quote.vehicle.brand} onChange={(value) => update(["vehicle", "brand"], value)} />
              <Input label="Modelo" value={quote.vehicle.model} onChange={(value) => update(["vehicle", "model"], value)} />
              <Input label="Ano" value={quote.vehicle.year} onChange={(value) => update(["vehicle", "year"], value)} inputMode="numeric" />
              <Input label="Placa" value={quote.vehicle.plate} onChange={(value) => update(["vehicle", "plate"], value.toUpperCase())} />
              <Input label="Quilometragem" value={quote.vehicle.mileage} onChange={(value) => update(["vehicle", "mileage"], value)} inputMode="numeric" />
            </div>
          </Section>

          <Section title="Serviços e peças" action={(
            <button className="internal-button secondary" type="button" onClick={() => setQuote((current) => ({ ...current, items: [...current.items, createItem()] }))}>
              <Plus size={17} />Adicionar item
            </button>
          )}>
            <div className="items-list">
              {quote.items.map((item, index) => (
                <article className="item-row" key={item.id}>
                  <span className="item-number">{index + 1}</span>
                  <label><span>Tipo</span><select value={item.kind} onChange={(event) => updateItem(item.id, "kind", event.target.value)}><option>Serviço</option><option>Peça</option></select></label>
                  <Input label="Descrição" value={item.description} onChange={(value) => updateItem(item.id, "description", value)} />
                  <Input label="Quantidade" type="number" min="0" step="0.001" value={item.quantity} onChange={(value) => updateItem(item.id, "quantity", value)} />
                  <MoneyInput label="Valor unitário" value={item.unitPrice} onChange={(value) => updateItem(item.id, "unitPrice", value)} />
                  <div className="item-total"><span>Total</span><strong>{formatCurrency.format(totals.itemTotals[index])}</strong></div>
                  <button className="remove-item" type="button" aria-label={`Remover item ${index + 1}`} disabled={quote.items.length === 1} onClick={() => removeItem(item.id)}><Trash2 size={18} /></button>
                </article>
              ))}
            </div>
          </Section>

          <div className="quote-bottom-grid">
            <Section title="Condições">
              <div className="field-grid columns-2">
                <Input label="Forma de pagamento" value={quote.paymentMethod} onChange={(value) => update(["paymentMethod"], value)} placeholder="Ex.: PIX, cartão, dinheiro" />
                <Input label="Prazo previsto" value={quote.estimatedTime} onChange={(value) => update(["estimatedTime"], value)} placeholder="Ex.: 3 dias úteis" />
                <TextArea label="Condições de pagamento" value={quote.paymentTerms} onChange={(value) => update(["paymentTerms"], value)} />
                <TextArea label="Garantia" value={quote.warranty} onChange={(value) => update(["warranty"], value)} />
                <TextArea className="wide" label="Observações" value={quote.notes} onChange={(value) => update(["notes"], value)} />
              </div>
            </Section>

            <Section title="Resumo">
              <div className="discount-fields">
                <label><span>Desconto</span><select value={quote.discount.type} onChange={(event) => update(["discount", "type"], event.target.value)}><option value="currency">Em reais (R$)</option><option value="percentage">Em porcentagem (%)</option></select></label>
                <Input label="Valor" type="number" min="0" max={quote.discount.type === "percentage" ? "100" : undefined} step="0.01" value={quote.discount.value} onChange={(value) => update(["discount", "value"], value)} />
              </div>
              <div className="totals-card">
                <p><span>Subtotal</span><strong>{formatCurrency.format(totals.subtotal)}</strong></p>
                <p><span>Desconto</span><strong>- {formatCurrency.format(totals.discount)}</strong></p>
                <p className="grand-total"><span>Valor total</span><strong>{formatCurrency.format(totals.total)}</strong></p>
              </div>
            </Section>
          </div>
        </form>

        <div className="action-bar">
          <div>
            <button className="internal-button secondary" type="button" onClick={preview}><Eye size={18} />Visualizar</button>
            <button className="internal-button secondary" type="button" onClick={print}><Printer size={18} />Imprimir</button>
            <button className="internal-button primary" type="button" onClick={download}><Download size={18} />Baixar PDF</button>
          </div>
          <div>
            <button className="internal-button ghost" type="button" onClick={clearQuote}><RotateCcw size={18} />Limpar</button>
            <button className="internal-button ghost" type="button" onClick={newQuote}><FilePlus2 size={18} />Novo orçamento</button>
          </div>
          <span className="pdf-status" role="status">{pdfStatus}</span>
        </div>
      </main>

      {previewUrl && <PdfPreview url={previewUrl} onClose={() => setPreviewUrl("")} />}
    </div>
  );
}

function LoginScreen({ onSuccess }) {
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("Entrando…");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus(result.error || "Não foi possível entrar.");
      return;
    }
    setPassword("");
    onSuccess();
  };

  return (
    <main className="login-screen">
      <section className="login-card">
        <BrandMark />
        <p className="internal-eyebrow">Área restrita</p>
        <h1>Orçamentos Itamec</h1>
        <p>Acesso exclusivo para uso interno da empresa.</p>
        <form onSubmit={submit}>
          <Input label="Senha" type="password" value={password} onChange={setPassword} autoComplete="current-password" required />
          <button className="internal-button primary" type="submit"><ShieldCheck size={18} />Entrar com segurança</button>
          <span className="login-status" role="status">{status}</span>
        </form>
      </section>
    </main>
  );
}

function LoadingScreen() {
  return <main className="login-screen"><section className="login-card loading"><BrandMark /><p>Verificando sessão segura…</p></section></main>;
}

function BrandMark() {
  return companyConfig.logoUrl
    ? <img className="internal-logo" src={companyConfig.logoUrl} alt={`Logotipo ${companyConfig.name}`} />
    : <span className="wordmark" aria-label={companyConfig.name}>{companyConfig.shortName}</span>;
}

function Section({ title, action, children }) {
  return <section className="form-section"><div className="section-header"><h2>{title}</h2>{action}</div>{children}</section>;
}

function Input({ label, onChange, className = "", ...props }) {
  return <label className={className}><span>{label}</span><input {...props} onChange={onChange ? (event) => onChange(event.target.value) : undefined} /></label>;
}

function MoneyInput({ label, value, onChange }) {
  return <label><span>{label}</span><div className="money-input"><span>R$</span><input type="number" min="0" step="0.01" value={value} onChange={(event) => onChange(event.target.value)} /></div></label>;
}

function TextArea({ label, onChange, className = "", ...props }) {
  return <label className={className}><span>{label}</span><textarea rows="3" {...props} onChange={(event) => onChange(event.target.value)} /></label>;
}

function PdfPreview({ url, onClose }) {
  React.useEffect(() => {
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div className="preview-backdrop" role="dialog" aria-modal="true" aria-label="Visualização do orçamento">
      <div className="preview-dialog">
        <div><strong>Visualização do PDF</strong><button type="button" onClick={onClose} aria-label="Fechar visualização"><X /></button></div>
        <iframe src={url} title="Pré-visualização do orçamento em PDF" />
      </div>
    </div>
  );
}
