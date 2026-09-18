# 5. Fluxo completo de release

[← Gates](04-gates.md) · [Índice](README.md) · [Próximo: comparativo →](06-comparativo.md)

Cenário ilustrativo: **FARM 4.15.1**.

## 1. Preparação

Cards VERTAPP em Desenvolvimento concluido (Marca APP = Farm); DT em Deploy se houver. Libs/tags alinhadas ou aceitar bump no fluxo.

```text
Vou abrir a release 4.15.1 da FARM quando os cards estiverem em Desenvolvimento concluido.
```

## 2. Execução do `brand-release`

```text
Gerar release da FARM
```

Agente: versão da main → setup? → escopo → libs → branch → workflow → build → Teams → versão Jira → Em homologação → learn.

## 3. Revisões e confirmações

Usuário confirma escopo, mergea PR de bump se existir, autoriza branch, escolhe workflow. Em rebuild:

```text
Invalidar e subir de novo
```

## 4. Publicação

Homologação e lojas — **fora** destas skills. Modelo Teams `homologado` (status por loja) está definido no `brand-release/contracts.md`, mas o gatilho de envio pós-loja no dia a dia **não** está como passo obrigatório do `SKILL.md` do brand-release (uso sob demanda / processo humano).

## 5. Execução do `post-brand-release`

```text
Fechar release da FARM 4.15.1 — lojas aprovaram
```

## 6. Validações finais

Lista de cards confirmada; Release com changelog; cards em Itens concluídos; Teams 202; run gravado. Branch `release/*` só se o usuário autorizar delete.

## 7. Encerramento

Relatório + `runs/` em ambas as skills. Lições promovidas a contracts quando estáveis.

---

[← Gates](04-gates.md) · [Índice](README.md) · [Próximo: comparativo →](06-comparativo.md)
