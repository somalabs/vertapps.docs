# 3. Skill `post-brand-release`

[← brand-release](02-brand-release.md) · [Índice](README.md) · [Próximo: gates →](04-gates.md)

## Objetivo

Fechar o ciclo **depois** da aprovação nas lojas: confirmar cards VERTAPP em **Aguardando versão**, gerar changelog, criar tag `vX.Y.Z` + GitHub Release a partir da `release/*`, preencher **Versões corrigidas**, mover cards para **Itens concluídos**, perguntar se apaga a branch, enviar o changelog no Teams e gravar learn.

## Quando utilizar

**Utilizar quando** o usuário pedir fechar release, pós-release de marca, tag da release, changelog pós-loja ou concluir cards após publish — e as lojas **já aprovaram** (gatilho humano documentado em `contracts.md`).

**Não utilizar quando:**

- ainda estiver abrindo homologação / gerando build → `brand-release`;
- for release de lib → `lib-release`;
- for sync homolog → `brand-homologation`.

## Pré-requisitos

| Pré-requisito | Detalhe |
|---------------|---------|
| Marca | Usar a do pedido se já nomeada; senão perguntar |
| Branch `release/*` no remoto | Listada via `gh` e **escolhida** pelo usuário |
| Versão | Proposta a partir do nome da branch (`release/X.Y.Z` ou `release/vX.Y.Z` → versão `X.Y.Z`) |
| `gh` autenticado | Tag, Release, delete branch |
| MCP `user-jira` | Escopo, fixVersions, transitions |
| REST Jira | Criar versão no projeto se faltar |
| Webhook Teams pós-release | URL em `post-brand-release/contracts.md` (distinta da do brand-release) |
| Ícones | `../brand-release/icons/manifest.json` → `iconUrl` |
| Confirmação dos cards | Lista em Aguardando versão |

**Não especificado / não implementado:**

- Verificação automática de aprovação nas lojas (Play Store / App Store);
- Checagem de build Codemagic ou artefactos nesta skill;
- Coleta de evidências de publicação além do changelog + Release GitHub.

A skill **assume** que o usuário dispara o fluxo após aprovação; não valida disponibilidade nas lojas.

## Como utilizar

**Básico**

```text
Fechar release da FARM 4.15.0
```

**Completo**

```text
Pós-release Animale — lojas aprovaram. Criar tag, changelog, concluir cards e avisar no Teams.
```

**Marca específica**

```text
Pós-release de offpremium
```

**Com versão e intenção explícita**

```text
Criar tag e concluir cards da release 5.10.0 da Animale
```

## Informações de entrada

| Entrada | Obrigatória | Formato | Exemplo | Descrição |
| ------- | ----------: | ------- | ------- | --------- |
| Marca | Sim | Nome exato do pedido / Jira | `Off Premium`, `Cris Barros` | Se já no prompt, não perguntar de novo |
| Branch `release/*` | Sim | Escolha na lista numerada | `release/v10.2.0` | Listar remoto antes de digitar |
| Versão | Sim (confirmada) | `X.Y.Z` | `10.2.0` | Tag será `v10.2.0` |
| Setup | Não (pergunta) | `sim` / `não` | `não` | Smoke `gh` + Jira |
| Confirmação dos cards | Sim | `sim` / editar | `sim` | Únicas keys dos passos 2, 4, 5 |
| Deletar `release/*` | Sim perguntar | `sim` / `não` | `não` | Só delete com `sim` explícito |

## Funcionamento interno

1. **Interpretação** — Lê `contracts.md` + `lessons.md`. Resolve repo. Lista `release/*`. Propõe versão. Setup opcional.
2. **Identificação da release** — Pela **branch escolhida** (não por Codemagic nem lojas). Padrão `release/X.Y.Z` ou `release/vX.Y.Z` (Off Premium / Cris Barros).
3. **Passo 1 — cards** — JQL: `status = "Aguardando versão" AND cf[10315] = <Marca>` (campo **Marca**, não Marca APP). Confirmação humana.
4. **Passo 2 — changelog** — Template em `changelog-template.md`; artefato `.cursor/artifacts/<marca>-<versao>-post-release-changelog.md`; cards + libs cms/commons/checkout do pubspec da branch; descrições só com base no Jira.
5. **Passo 3 — tag + Release** — `gh release create "vX.Y.Z" --target release/… --notes-file …`. Nunca `--target` main/develop.
6. **Passo 4 — Versões corrigidas** — Merge de `fixVersions`; cria versão no projeto se faltar (padrão default `X.Y.Z`; Off Premium / Cris Barros usam prefixo documentado).
7. **Passo 5 — mover** — Transition para Itens concluídos (id `31` em contracts) + comentário com link da Release.
8. **Passo 6 — delete** — Pergunta; delete só com sim e só se tag/Release ok.
9. **Passo 7 — Teams** — Mesmo changelog + ícone; HTTP 202 esperado.
10. **Passo 8 — learn** — Sempre `runs/`; lessons/contracts se couber.

**Publicação com falha / parcial:**

- Parar no passo que falhou; aplicar `lessons.md` se houver sintoma conhecido.
- Não deletar branch se tag/Release falhou.
- Se Release ok e Teams falhou: reportar HTTP; não inventar retry cego; pode reenviar após corrigir URL.
- Cards sem transição: reportar pendência sem inventar status.
- **Não especificado:** rollback automático de tag/Release; reabertura de cards; fluxo dedicado a “loja rejeitou”.

## Saídas geradas

| Saída | Detalhe |
|-------|---------|
| Artefato MD de changelog | `.cursor/artifacts/…-post-release-changelog.md` |
| Tag `vX.Y.Z` + GitHub Release | Corpo = changelog |
| `fixVersions` nos cards | Preenchido / merge |
| Cards em Itens concluídos | Keys confirmadas |
| Delete opcional de `release/*` | Com ok |
| Adaptive Card Teams (changelog) | Webhook pós-release |
| `runs/` (+ lessons/contracts) | Sempre / se correção |

### Exemplo de resposta esperada (sucesso)

Baseado em `runs/2026-09-17-offpremium-10.2.0.md`:

```text
Pós-release — Off Premium 10.2.0 — sucesso

- Tag/Release: v10.2.0 — https://github.com/somalabs/app.flutter.off.frontend/releases/tag/v10.2.0
- Branch origem: release/v10.2.0 (não deletada)
- 18 cards confirmados → Itens concluídos
- fixVersions: off premium_v10.2.0
- Teams: HTTP 202
- Tempo de execução: (registrado no run)
- Learn: runs/2026-09-17-offpremium-10.2.0.md
```

## Erros e solução de problemas

| Problema | Possível causa | Como resolver |
| -------- | -------------- | ------------- |
| JQL vazio para OFF | Valor `OFF` em vez de `Off Premium` | Usar `cf[10315] = "Off Premium"` |
| `get_issue` falha | Instabilidade do tool | Preferir `get_issue_fields` (+ pai se filho) |
| Tag no commit errado | `--target` main/develop | Sempre branch `release/*` confirmada |
| Changelog genérico | Sem ler Jira | Analisar título/AC/comentários; frase padrão se insuficiente |
| Mensagem Teams no canal errado | Webhook legado `cu/24` | Usar URL canônica `cu/14` em contracts; reenviar |
| Versão Jira inventada | SemVer puro onde o projeto usa prefixo | Off Premium / Cris Barros: padrão `{marca}_vX.Y.Z` |
| Branch apagada cedo | Delete sem ok / após falha de tag | Só perguntar após Release ok; só com `sim` |
| Repetir erro já documentado | Ignorar `lessons.md` | Ler e aplicar correção canônica no passo 0 |

## Exemplo completo de execução

**Prompt**

```text
Pós-release de offpremium
```

**Dados**

- Marca: Off Premium (não perguntar de novo)
- Lista `release/*` → usuário escolhe `release/v10.2.0` → versão `10.2.0`
- Setup: conforme resposta

**Etapas**

1. Listar/confirmar cards em Aguardando versão.
2. Gerar changelog (cards + cms/commons/checkout).
3. `gh release create v10.2.0 --target release/v10.2.0`.
4. Garantir/preencher `off premium_v10.2.0` em fixVersions.
5. Transicionar para Itens concluídos.
6. Perguntar delete da branch.
7. POST Teams changelog + ícone.
8. Gravar run (+ lessons se houver).

**Confirmações**

Branch, versão, lista de cards, delete da branch; setup opcional.

**Resultado**

Relatório com tag, Release, cards, branch deletada sim/não, Teams HTTP, tempo, pendências, lições.

---

[← brand-release](02-brand-release.md) · [Índice](README.md) · [Próximo: gates →](04-gates.md)
