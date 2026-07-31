# Auditoria do site atual — 31 de julho de 2026

## Escopo e linha de base

Esta auditoria cobre o código do repositório, a versão publicada em `https://www.mediatrix-tech.com/` e a execução local antes das alterações. A linha de base passou em 29 testes automatizados e no build de produção. A página inicial não apresentou erro no console nem rolagem horizontal em 1440 × 900.

## Arquitetura e rotas

- React 19 com Vite 6, CSS próprio e ícones `lucide-react`.
- Não há biblioteca de rotas. `src/main.jsx` escolhe o conteúdo diretamente por `window.location.pathname`.
- Página principal: `/` e `/index.html`.
- Landing pages já existentes: `/brazil`, `/us`, `/europe`, `/switzerland` e `/brazilian-businesses-abroad`.
- Área interna: `/area-interna/*`, carregada sob demanda e protegida por endpoints em `api/admin/*`.
- Qualquer outro caminho recebe a página 404 localizada.
- O Vercel reescreve `/area-interna/*` para a aplicação e aplica `X-Robots-Tag: noindex, nofollow, noarchive`.

## Idiomas

- A home oferece português do Brasil, inglês, espanhol, francês, alemão, chinês, hindi e árabe.
- O idioma é escolhido pelo navegador, salvo no `localStorage` e trocado apenas no cliente. Não existem URLs próprias por idioma.
- As landing pages existentes usam português ou inglês conforme a rota, mas parte do conteúdo das páginas em português continua em inglês.
- Ainda não há `hreflang`; ele só deve ser publicado quando existirem URLs reais e equivalentes para cada idioma.

## Conteúdo, títulos e descrições encontrados

- Título HTML anterior: `Mediatrix Tech | Create. Connect. Convert.`.
- Descrição HTML anterior: criação de sites e conteúdo visual para Brasil e Estados Unidos.
- A home alterava apenas a descrição após o carregamento; o título permanecia genérico.
- As landing pages de campanha alteram título e descrição no cliente conforme mercado e preço.
- A proposta de valor da home era ampla e pouco específica: “Tecnologia e conteúdo que fazem sua marca avançar”.
- O primeiro CTA levava a serviços, não à conversão principal.
- A página já tem canais de WhatsApp, e-mail, Upwork e formulário via FormSubmit.

## SEO e indexação

### Problemas encontrados

- `sitemap.xml` inexistente.
- `robots.txt` tinha dois blocos duplicados de `User-agent` e não declarava o sitemap.
- Ausência de canonical, Open Graph, Twitter Cards, manifest e dados estruturados.
- Ausência de URLs e metadados próprios por idioma.
- Landing pages existentes compartilham o mesmo HTML inicial e dependem de JavaScript para título e descrição.
- A 404 aplica `noindex` no cliente, não no status HTTP; em hospedagem SPA ela pode responder `200`.
- Não há breadcrumbs nas páginas que futuramente precisarão deles.
- As páginas de campanha existentes não estavam listadas em sitemap; elas não foram adicionadas nesta etapa para respeitar o bloqueio de trabalho internacional.

### Pontos positivos

- A área interna já recebe bloqueio por `robots.txt` e `X-Robots-Tag`.
- A página 404 já adiciona `noindex`.
- Os títulos visuais seguem uma hierarquia coerente de um `h1`, `h2` por seção e `h3` nos cartões.

## Acessibilidade

### Pontos positivos

- Link para pular ao conteúdo, foco visível, rótulos de formulário e regiões nomeadas.
- Alvos interativos com tamanho adequado, preferência por movimento reduzido e suporte a idiomas RTL.
- Modais existentes tratam foco e retorno de foco.

### Melhorias pendentes

- `aria-current="page"` é usado em links para seções da mesma página; `location` seria mais preciso.
- O menu móvel fecha com Escape, mas ainda não gerencia o foco como um menu modal.
- Alguns textos das landing pages em português permanecem em inglês.
- Validação automática de contraste e uma auditoria com leitor de tela ainda são necessárias.

## Desempenho e mídia

- Build inicial: JavaScript principal de 363,52 kB (114,77 kB gzip) e CSS principal de 43,67 kB (9,54 kB gzip).
- A área interna é carregada sob demanda, evitando incluir o gerador de PDF no fluxo principal.
- O banner usa poster de 104 kB e vídeo de 332 kB; o fundo otimizado tem 256 kB.
- Imagens de portfólio maiores são carregadas de forma preguiçosa, mas algumas não tinham dimensões intrínsecas e podiam causar deslocamento de layout.
- Há arquivos públicos grandes e versões antigas sem uso direto na home. Eles não são baixados automaticamente, mas aumentam o volume do artefato publicado.
- A landing internacional é importada no pacote principal mesmo quando a rota aberta é apenas a home; uma divisão adicional de código pode reduzir o carregamento inicial.

## Responsividade

- A folha principal tem breakpoints em 600, 1100, 520 e 430 px.
- Grade, CTAs, cabeçalho e formulário mudam para uma coluna em telas menores.
- Não foi detectada rolagem horizontal no desktop durante a linha de base.
- A validação visual final deve cobrir desktop e celular depois dos dois commits.

## Links e conversão

- Os arquivos locais apontados pelo portfólio existem.
- Links externos abrem em nova aba; os atributos de segurança foram normalizados nesta etapa.
- O formulário depende de um serviço externo. O envio real não foi executado durante a auditoria para não gerar uma mensagem de contato.
- A home anterior repetia “Solicitar orçamento”, mas não explicava avaliação gratuita nem destacava projetos como CTA secundário no hero.

## Informações ainda ausentes

- Dados oficiais de uma futura entidade jurídica nos Estados Unidos.
- Endereço empresarial americano e estado de constituição.
- Métricas comprovadas de projetos e depoimentos autorizados.
- Identificadores reais de Search Console, Analytics, Ads e Meta Pixel.
- Política de privacidade e definição final do mecanismo de consentimento.

Nenhum dado de LLC, endereço americano ou estado de constituição foi criado ou inferido nesta auditoria.
