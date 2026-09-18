# Documentação das Skills de Release

Documentação técnica das skills operacionais de release de apps de marca AZZAS2154, em arquivos separados por seção.

## Índice

| # | Seção | Arquivo |
|---|--------|---------|
| 1 | [Visão geral](01-visao-geral.md) | `01-visao-geral.md` |
| 2 | [Skill `brand-release`](02-brand-release.md) | `02-brand-release.md` |
| 3 | [Skill `post-brand-release`](03-post-brand-release.md) | `03-post-brand-release.md` |
| 4 | [Gates (confirmações humanas)](04-gates.md) | `04-gates.md` |
| 5 | [Fluxo completo de release](05-fluxo-completo.md) | `05-fluxo-completo.md` |
| 6 | [Comparativo entre as skills](06-comparativo.md) | `06-comparativo.md` |
| 7 | [Guia rápido](07-guia-rapido.md) | `07-guia-rapido.md` |
| 8 | [Boas práticas e limitações](08-boas-praticas.md) | `08-boas-praticas.md` |
| 9 | [Referência técnica](09-referencia-tecnica.md) | `09-referencia-tecnica.md` |
| 10 | [Lessons e memória entre runs](10-lessons.md) | `10-lessons.md` |

Versão HTML (navegação no navegador): [`html/index.html`](html/index.html)

## Caminhos analisados

| Skill | Pasta |
|-------|--------|
| `brand-release` | `app.flutterlib.azzascore.frontend/IA/brand-release/` |
| `post-brand-release` | `app.flutterlib.azzascore.frontend/IA/post-brand-release/` |

> **Nota de nomenclatura:** a skill pós-release chama-se **`post-brand-release`** (com “t”). Não existe pasta ou `SKILL.md` com o nome `pos-brand-release`. Nesta documentação, “pós-release” refere-se a `post-brand-release`.

Arquivos lidos integralmente: `SKILL.md`, `contracts.md`, `mcp-workflow.md`, `repositories.md`, `scope-check.md`, `learn.md`, `lessons.md`, runs de exemplo, e, no `brand-release`, também `lib-tags.md` e `icons/`; no `post-brand-release`, também `changelog-template.md`.

## Fluxo resumido

```text
Desenvolvimento → brand-release → Publicação → post-brand-release
```

## Começar por aqui

- Novo no fluxo → [Guia rápido](07-guia-rapido.md)
- Entender o ciclo → [Visão geral](01-visao-geral.md) → [Fluxo completo](05-fluxo-completo.md)
- Entender confirmações → [Gates](04-gates.md)
- Entender memória / lições → [Lessons](10-lessons.md)
- Executar abertura → [brand-release](02-brand-release.md)
- Executar fechamento → [post-brand-release](03-post-brand-release.md)

---

*Documento gerado a partir da implementação presente em `IA/brand-release/` e `IA/post-brand-release/`. Comportamentos não descritos nesses arquivos foram marcados como “Não especificado”.*
