# VERTAPPS Docs

Documentação oficial do time de apps AZZAS. Site em Docusaurus (`website/`), tema visual de `prompt-construcao-apresentacao.md`.

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
| `website/src/css/custom.css` | Tokens do tema (coral, teal, amber, fundo quente) |
| `website/src/components/` | Kicker, Chip, DocCard, barra de progresso |
| `website/static/legado/` | HTML antigo (processos e skills-release) |
| `skills-release/md/` | Fonte Markdown original (ainda no root do repo) |

Como escrever: `website/docs/padrao/`.

## Publicar

O workflow `.github/workflows/deploy-docs.yml` gera o site e publica no GitHub Pages (`/vertapps.docs/`).

HTML na raiz (`index.html`, `processos.html`) permanece como legado até o cutover completo do Pages.
