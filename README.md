# Mediatrix Tech

Site institucional desenvolvido em React 19 e Vite 6. As rotas públicas usam o roteador leve existente no projeto e recebem metadados específicos no navegador. Durante o build, também são gerados arquivos HTML por rota com `title`, description, canonical, Open Graph, Twitter Card e JSON-LD próprios, permitindo acesso direto e recarregamento sem depender do HTML genérico da página inicial.

## Desenvolvimento

```bash
npm install
npm run dev
npm test
npm run build
```

O projeto não possui um script de lint separado. O build do Vite valida a transformação dos módulos e, em seguida, gera os shells estáticos das rotas públicas em `dist/`.

## Rotas públicas

- `/`
- `/servicos`
- `/portfolio`
- `/empresa`
- `/contato`
- `/criacao-de-sites-santa-maria-rs`
- `/brazil`
- `/us`
- `/europe`
- `/switzerland`
- `/brazilian-businesses-abroad`

`/area-interna/` permanece privada, com `noindex` e fora do sitemap. O projeto mantém o React/Vite atual; os shells por rota são a alternativa segura a uma migração completa para SSR. O conteúdo principal continua sendo renderizado pelo React, enquanto os metadados essenciais já estão presentes na resposta HTML inicial.

## Google Search Console na Vercel

1. No projeto da Vercel, abra **Settings → Environment Variables**.
2. Crie `VITE_GOOGLE_SITE_VERIFICATION` com o token real fornecido pelo Google, sem incluir a tag HTML completa.
3. Marque os ambientes desejados e faça um novo deploy para que o valor seja incluído no build.

Quando a variável está vazia ou ausente, nenhuma meta tag de verificação é renderizada. Não há código de verificação fictício no repositório.

Depois da publicação, as etapas manuais recomendadas são: cadastrar o domínio no Google Search Console, confirmar a propriedade, enviar `https://www.mediatrix-tech.com/sitemap.xml`, solicitar a indexação da nova página local, criar ou completar o Perfil da Empresa no Google e solicitar avaliações somente a clientes reais.
