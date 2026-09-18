# 2. Skill `brand-release`

[← Visão geral](01-visao-geral.md) · [Índice](README.md) · [Próximo: post-brand-release →](03-post-brand-release.md)

## Objetivo

Abrir a release do app de uma marca: validar versão e tags das libs a partir do `pubspec.yaml` da branch **`main` no GitHub**, abrir PR de bump se necessário (sem mergear), criar/atualizar a branch `release/X.Y.Z`, disparar build no Codemagic, notificar o Teams, criar a versão no Jira (Não lançado) e mover os cards confirmados para **Em homologação**.

## Quando utilizar

**Utilizar quando** o usuário pedir, por exemplo:

- release de marca / gerar versão de release;
- abrir homologação de app;
- Build E2E (ou outro workflow) de release;
- rebuild em homologação (“gerar outro build”, “invalidar e subir de novo”).

**Não utilizar quando:**

- a intenção for só sync homolog↔develop → usar `brand-homologation`;
- a intenção for tag/release de **lib** → usar `lib-release`;
- as lojas já aprovaram e o objetivo é fechar cards/tag → usar `post-brand-release`;
- faltar confirmação de marca/versão (a skill **não** deve inferir marca só por arquivo aberto).

## Pré-requisitos

Com base na implementação:

| Pré-requisito | Detalhe |
|---------------|---------|
| Marca definida pelo usuário | Não inferir por contexto de arquivo/chat antigo |
| Versão confirmada | Lida de `version:` no `pubspec.yaml` da `main` no GitHub (`somalabs/<app-repo>`) |
| `gh` autenticado | Necessário para API GitHub / PR / branch (smoke opcional no setup) |
| MCP `user-jira` | Listar e transicionar issues; REST para versões e checklist DT |
| MCP `user-codemagic` | `list_apps`, `start_build`, `wait_for_build`; REST para workflows/logs |
| Credenciais Codemagic | `CODEMAGIC_API_KEY` em `~/.cursor/mcp.json` (para GET `/apps` e logs) — **não expor no chat** |
| Credenciais Jira | `JIRA_HOST` / `JIRA_EMAIL` / `JIRA_API_TOKEN` do MCP — **não expor** |
| Webhook Teams | URL em `brand-release/contracts.md` (Power Automate) |
| Repo do app | Mapeado em `repositories.md` (org `somalabs`) |
| Confirmação humana do escopo | Lista de keys VERTAPP (+ DT) antes de mover |
| Confirmação antes de mutações git | Criar/FF/push `release/*`, abrir PR |

**Não especificado:** variáveis de ambiente além das do MCP; checklist formal de permissões de GitHub org além do que `gh auth status` valida.

## Como utilizar

Exemplos de prompts (alinhados ao `SKILL.md`):

**Básico**

```text
Gerar release da FARM
```

**Completo**

```text
Abrir release da FARM: confirmar versão da main, checar setup do GitHub/Jira/Codemagic, e seguir o fluxo até Em homologação.
```

**Marca específica**

```text
Rodar Build E2E de release da Animale
```

**Com versão, ambiente (workflow) e card/contexto Jira**

```text
Abrir release 4.15.0 da FARM com workflow Build E2E. Os cards já estão em Desenvolvimento concluido no VERTAPP.
```

**Rebuild (atalho, já em homologação)**

```text
Gerar outro build da FARM
```

```text
Invalidar e subir de novo
```

## Informações de entrada

| Entrada | Obrigatória | Formato | Exemplo | Descrição |
| ------- | ----------: | ------- | ------- | --------- |
| Marca | Sim | Nome da marca AZZAS | `FARM`, `Off Premium`, `Animale` | Define repo e filtros Jira/Codemagic |
| Versão do app | Sim (confirmada) | SemVer `X.Y.Z` (sem `+build` na branch) | `4.15.1` | Lida da `main`; usuário confirma |
| Setup (smoke) | Não (pergunta) | `sim` / `não` | `não` | Se `sim`: `gh` + Jira + Codemagic |
| Atualizar libs | Sim no passo 3 | `atualizar` / `manter` | `manter` | Comparação pubspec `main` × latest tags |
| Confirmação do escopo Jira | Sim | `sim` / editar lista | `sim` | Keys VERTAPP + DT |
| Criar/atualizar `release/*` | Sim antes da mutação | ok explícito | `pode criar` | Gate antes de push/FF |
| Workflow Codemagic | Sim | nome ou número da lista | `Build E2E` | Depois da escolha, `start_build` imediato |
| Cards DT `[APP I TODOS]` | Condicional | quais itens **não** estão em check | `DT-422` | Gate humano (API sem check/uncheck confiável) |

## Funcionamento interno

1. **Interpretação** — Lê `contracts.md` e `lessons.md`. Se a marca não veio no pedido, pergunta. Com a marca, lê `version:` da `main` via `gh api` e pergunta se está correta; pergunta se quer setup.
2. **Validações** — Versão só da `main` remota; marca não inferida; lista Jira só após confirmação; mutações git só com ok; workflow sempre por **id hex**.
3. **Consultas** — `pubspec.yaml` (`ref=main`); Jira VERTAPP (`cf[11606]` = Marca APP) e DT (Deploy + APP); latest tags das libs; cache Codemagic em contracts ou GET `/apps/{app_id}`.
4. **Comandos / tools** — `gh api` / PR; MCP Codemagic `start_build` + `wait_for_build`; REST build/logs; POST webhook Teams; REST criar versão VERTAPP; MCP `get_transitions` / `transition_issue`.
5. **Decisões automáticas** — Após build **success**: Teams `homologacao`, criar versão Jira (se faltar), mover cards, learn. Após escolha do workflow: `start_build` sem segunda confirmação.
6. **Confirmações humanas** — Marca (se ausente), versão, setup, escopo, atualizar/manter libs, merge da PR pelo usuário, criar/atualizar branch `release/*`, escolha do workflow, (exceção) seguir com Cleaning up travado se o usuário autorizar.
7. **Criado/modificado** — PR de bump (opcional); branch `release/X.Y.Z`; build Codemagic; mensagem Teams; versão Jira Não lançado; cards em Em homologação; `runs/` (+ `lessons`/`contracts` se houver correção).
8. **Critério de sucesso** — Build em status terminal **success**; Teams enviado com Android + **iOS** build numbers; versão Jira criada (ou já existente); keys do gate movidas; entry em `runs/`. Em falha de build: diagnosticar, **não** Teams de sucesso nem Jira de homologação; ir ao learn.

**Atalho rebuild:** não repete passos 0–3 nem 6–7 de versão/cards; só novo build + Teams `invalidado` + `homologacao`.

## Saídas geradas

| Saída | Quando |
|-------|--------|
| PR de bump de libs → `main` | Se usuário escolher atualizar |
| Branch `release/X.Y.Z` | Após ok (+ após merge da PR, se houve bump) |
| Build Codemagic | Após escolha do workflow |
| Adaptive Card Teams (`homologacao` / `erro` / `invalidado` / `homologado`) | Conforme cenário |
| Versão Jira VERTAPP `{marca}_v…` Não lançado | Após Teams success — **sem** preencher `fixVersions` nos cards |
| Cards em Em homologação | Keys confirmadas no gate |
| `runs/YYYY-MM-DD-<marca>-<versão>.md` | Sempre (passo learn) |
| Atualização `lessons.md` / `contracts.md` | Se correção confirmada / IDs de API |

**Não gera:** tag `vX.Y.Z`, GitHub Release do app, preenchimento de Versões corrigidas nos cards, publicação nas lojas.

### Exemplo de resposta esperada (sucesso)

Baseado no run real `runs/2026-09-17-offpremium-10.3.0.md`:

```text
Release — Off Premium 10.3.0 — sucesso

- Branch: release/10.3.0
- Build: success — https://codemagic.io/app/.../build/...
  Android Build: 417167 | iOS Build: 98
- Teams: homologacao — HTTP 202
- Versão Jira: off premium_v10.3.0 (Não lançado) — sem fill nos cards
- Cards movidos para EM HOMOLOGAÇÃO: VERTAPP-… (lista)
- DT: pendência se sem transição
- Learn: runs/2026-09-17-offpremium-10.3.0.md
```

## Erros e solução de problemas

| Problema | Possível causa | Como resolver |
| -------- | -------------- | ------------- |
| `Workflow "Build E2E" does not exist` | `workflow_id` passado como nome da UI | Usar id hex de contracts ou GET `/apps/{app_id}` |
| Contagem JQL ≠ board | Campo/marca errados ou multi-marca | Usar `cf[11606]` (Marca APP); no gate editar lista; board manda |
| Cards somem da swimlane após move | Moveu o pai em vez do card da swimlane | No gate listar a key visível; passo 7 move só o confirmado |
| Build failed sem causa | Polling parou cedo / sem log | Repetir `wait_for_build`; GET build + log da action failed |
| Cleaning up travado com artefactos OK | Etapa finishing do Codemagic | Com autorização explícita, seguir Teams/Jira com artefactos |
| Ícone quebrado no Teams | WebP Play Store / URL truncada | Preferir JPEG App Store em `icons/manifest.json` |
| Setup Teams falha | Uso de MCP Teams | Usar só webhook Power Automate |
| Agente mergeou PR | Violação da regra | Só abrir PR; usuário faz review/merge |
| Versão/libs do checkout local | Fonte da verdade errada | Sempre `pubspec` da `main` no GitHub |
| DT checklist sem checked | HeroCoders sync off | Perguntar quais **não** estão em check |
| Rebuild reinicia release | Fluxo tratado como release nova | Usar atalho (só build + Teams invalidado/homologacao) |

## Exemplo completo de execução

**Prompt**

```text
Gerar release da Off Premium
```

**Dados identificados**

- Marca: Off Premium (Jira Marca APP = `Off Premium`; repo `app.flutter.off.frontend`)
- Versão proposta: lida da `main` (ex.: `10.3.0`)
- Setup: usuário responde `não` ou `sim`

**Etapas**

1. Confirmar versão `10.3.0`.
2. Listar VERTAPP (`Desenvolvimento concluido` + `cf[11606] = "Off Premium"`) e DT; confirmar lista.
3. Comparar tags das libs; manter ou abrir PR → **parar** até merge do usuário.
4. Pedir ok → criar `release/10.3.0`; listar workflows; usuário escolhe `Build` → `start_build` → aguardar fim.
5. POST Teams `homologacao` com Android/iOS builds.
6. Criar `off premium_v10.3.0` se não existir.
7. Transicionar keys confirmadas (transition id `171` → Em homologação).
8. Gravar `runs/`.

**Confirmações**

Versão, setup, escopo, libs, branch, workflow; merge da PR se houver.

**Resultado final**

Relatório com marca, versão, branch, PR (se houver), build URL/status, tasks, versão Jira, cards movidos, lições.

---

[← Visão geral](01-visao-geral.md) · [Índice](README.md) · [Próximo: post-brand-release →](03-post-brand-release.md)
