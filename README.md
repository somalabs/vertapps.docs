# VERTAPPS Docs

Documentação oficial do time de apps AZZAS. Site em Docusaurus (`website/`), tema visual da apresentação de reestruturação.

## Rodar local

```bash
cd website
npm install
npm start
```

Abre em `http://localhost:3000/vertapps.docs/`.

## Build

```bash
cd website
npm run build
npm run serve
```

## Estrutura

| Pasta | O quê |
|---|---|
| `website/docs/` | Páginas oficiais (Markdown/MDX) |
| `website/src/css/custom.css` | Tokens do tema |
| `website/src/components/` | Kicker, Chip, DocCard, barra de progresso |
| `.github/workflows/` | Deploy no GitHub Pages |

Como escrever: `website/docs/padrao/`.

## Publicar

Push na `main` dispara `.github/workflows/deploy-docs.yml` → https://somalabs.github.io/vertapps.docs/

Backup do HTML antigo: branch `backup/main-pre-docusaurus-2026-09-28`.
