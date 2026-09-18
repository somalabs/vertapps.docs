# 7. Guia rápido

[← Comparativo](06-comparativo.md) · [Índice](README.md) · [Próximo: boas práticas →](08-boas-praticas.md)

## Para iniciar uma release

```text
Gerar release da [MARCA]
```

Responda: versão correta? setup sim/não? escopo ok? atualizar ou manter libs? criar branch? qual workflow Codemagic?

## Depois da publicação

```text
Fechar release da [MARCA] [X.Y.Z] — lojas aprovaram
```

Escolha a branch `release/*` na lista; confirme os cards; diga se pode apagar a branch.

## Checklist antes de executar

* [ ] Marca correta nomeada no pedido
* [ ] Gates respondidos (versão, escopo, branch/workflow) — ver [Gates](04-gates.md)
* [ ] `brand-release`: cards em Desenvolvimento concluido / DT Deploy conforme o caso
* [ ] `post-brand-release`: lojas já aprovaram (confirmação humana)
* [ ] `gh` e MCPs Jira (+ Codemagic no brand-release) utilizáveis, ou setup sob demanda
* [ ] Não confundir com `brand-homologation` / `lib-release`

## Checklist após executar

* [ ] `brand-release`: build success, Teams 202, versão Jira criada, cards Em homologação, `runs/` criado
* [ ] `post-brand-release`: Release `vX.Y.Z` no GitHub, cards concluídos, Teams changelog 202, `runs/` criado
* [ ] Pendências (DT sem transição, branch não deletada, etc.) registradas

---

[← Comparativo](06-comparativo.md) · [Índice](README.md) · [Próximo: boas práticas →](08-boas-praticas.md)
