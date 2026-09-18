# 4. Gates (confirmações humanas)

[← post-brand-release](03-post-brand-release.md) · [Índice](README.md) · [Próximo: fluxo completo →](05-fluxo-completo.md)

## O que é um gate

**Gate** = ponto do fluxo em que o agente **para e pede decisão explícita** ao usuário antes de continuar. Sem a resposta (ou com resposta ambígua), o fluxo **não avança**.

Serve para evitar marca/versão/escopo errados, mutações git sem autorização e ações destrutivas (delete de branch, merge).

**Fonte:** regras em `brand-release/SKILL.md`, `post-brand-release/SKILL.md`, `scope-check.md`, `lib-tags.md` e `learn.md`.

## Visão rápida

```text
brand-release
  Marca? → Versão? → Setup? → Escopo Jira? → Libs (atualizar/manter)?
  → [se PR] Merge feito? → Criar/atualizar release/*? → Qual workflow?
  → (Teams/Jira automáticos se build OK) → [se learn] Gravar lição?

post-brand-release
  Marca? (só se não veio no pedido) → Qual release/*? → Versão?
  → Setup? → Cards da versão? → Deletar release/*?
  → (tag/Release/fixVersions/mover/Teams sem re-perguntar após gates)
  → [se learn] Gravar lição?
```

---

## Gates do `brand-release`

| # | Gate | Quando | O que o agente pergunta / faz | Só avança com | Depois |
|---|------|--------|-------------------------------|---------------|--------|
| B0a | **Marca** | Se a marca **não** veio no pedido | Qual marca? | Nome explícito | Segue B0b |
| B0b | **Versão** | Assim que a marca está definida | Lê `version:` da `main` no GitHub e pergunta se `X.Y.Z` está correta | Confirmação ou versão alternativa | Segue B0c |
| B0c | **Setup** | Junto com versão | *Quer checar GitHub, Jira e Codemagic? (sim / não)* | `sim` ou `não` | `sim` → smoke; `não` → fluxo direto |
| B2 | **Escopo Jira** | Após listar VERTAPP (+ DT) | Mostra key + título + link; *Confirma que esta é a lista da release?* | `sim` ou lista editada | Lista = única fonte do passo de mover cards |
| B2b | **DT `[APP I TODOS]`** | Se houver card TODOS no Deploy | Mostra **só** itens da marca; *Quais desses **não** estão em check?* | Resposta do usuário | Inclui as keys dos cards (não o pai TODOS) |
| B3a | **Libs** | Após comparar pubspec `main` × latest tags | **Atualizar** ou **manter**? | Escolha explícita | Manter → branch; Atualizar → abre PR |
| B3b | **Merge da PR** | Se houve bump de libs | Entrega link da PR; pede review + merge; **não** mergeia | Usuário confirma merge (ou PR = MERGED) | Só então cria `release/*` |
| B4a | **Branch `release/*`** | Antes de criar / FF / push | Descreve a ação (criar, atualizar se atrás da main) e pede ok | Ok explícito | Cria/atualiza branch |
| B4b | **Workflow Codemagic** | Antes do build | Lista workflows (name → id); *Qual usar?* | Número ou nome | `start_build` **imediato** (sem 2ª confirmação) |
| B-ex | **Cleaning up travado** | Exceção (lição 2026-09-17) | Build não fecha, mas artefactos OK | Autorização explícita para seguir Teams/Jira | Não inventar status `finished` sozinho |
| B8 | **Gravar lição** | Se houve correção confirmada no learn | *Posso gravar em lessons.md?* | Ok (exceto IDs de API já confirmados) | Append em `lessons.md` |

### O que **não** é gate no `brand-release`

Após build **success**, estes passos seguem **sem** re-perguntar (já autorizados pelo fluxo):

- POST Teams modelo `homologacao`
- Criar versão Jira (Não lançado), se faltar
- Mover cards confirmados para Em homologação
- Gravar `runs/` (sempre; sem perguntar se run OK sem incidentes)

**Exceção de confirmação:** depois que o usuário **escolhe o workflow**, **não** pedir de novo ok para `start_build`.

### Atalho rebuild (homologação já aberta)

**Não** repete gates B0–B3 nem recria versão / re-move cards. Só:

1. Novo build (mesmo workflow, salvo se o usuário pedir outro — aí há escolha de workflow de novo).
2. Teams `invalidado` + `homologacao`.

Triggers típicos: *gerar outro build*, *invalidar e subir de novo*.

---

## Gates do `post-brand-release`

| # | Gate | Quando | O que o agente pergunta / faz | Só avança com | Depois |
|---|------|--------|-------------------------------|---------------|--------|
| P0a | **Marca** | Só se **não** veio no pedido | Qual marca? | Nome explícito | **Não** perguntar de novo se já nomeou (ex.: “pós-release de offpremium”) |
| P0b | **Branch `release/*`** | Com a marca definida | Lista branches `release/*` numeradas; *Qual usar?* | Número ou nome | Se lista vazia/`gh` falhar → pedir branch manual |
| P0c | **Versão** | Após escolha da branch | Se `release/X.Y.Z` ou `release/vX.Y.Z`, propõe `X.Y.Z` | Confirmação ou correção | Tag será `vX.Y.Z` |
| P0d | **Setup** | Mesmo bloco da escolha | *Checar gh + Jira antes? (sim / não)* | `sim` ou `não` | Smoke opcional |
| P1 | **Cards da versão** | Após JQL Aguardando versão | *Estes são todos os cards que entraram nesta versão?* | `sim` ou editar + nova confirmação | Lista = única fonte de changelog, fixVersions e mover |
| P6 | **Delete `release/*`** | Após tag/Release (e fluxo Jira) | *Posso deletar a branch `release/X.Y.Z` no remoto?* | `sim` explícito | Sem `sim` → branch permanece; **proibido** delete se tag/Release falhou |
| P8 | **Gravar lição** | Correção confirmada no learn | *Posso gravar em lessons.md?* | Ok (exceto IDs/webhook já confirmados) | Append em `lessons.md` |

### O que **não** é gate no `post-brand-release`

Após cards confirmados (e branch/versão ok), seguem **sem** pedir ok a cada passo:

- Gerar changelog (artefato MD)
- `gh release create` (tag + GitHub Release)
- Preencher Versões corrigidas / criar versão no projeto se faltar
- Mover cards para Itens concluídos
- POST Teams com changelog
- Gravar `runs/`

Ou seja: o gate pesado de escopo é o **P1**; a publicação GitHub/Jira/Teams não pede confirmação extra por etapa (exceto o delete da branch).

---

## Comparativo dos gates

| Tema | brand-release | post-brand-release |
|------|---------------|--------------------|
| Marca | Sempre perguntar se ausente; **nunca** inferir por arquivo aberto | Usar a do pedido se já veio; senão perguntar |
| Versão | Da `main` no GitHub | Proposta a partir do nome da `release/*` |
| Setup | gh + Jira + Codemagic | gh + Jira (sem Codemagic) |
| Escopo | VERTAPP + DT; confirma lista | Só VERTAPP Aguardando versão |
| Mutação git | Branch `release/*` (criar/FF) + PR de bump (só abre) | Delete da `release/*` (só com sim) |
| Build / Release | Escolha de workflow → start imediato | Release criada após P1 (sem gate intermediário de “pode criar tag?”) — **Não especificado** pedir ok extra antes do `gh release create` além dos gates P0/P1 |
| Automático pós-sucesso | Teams + versão Jira + mover | Changelog fill já feito; Teams + mover após Release |

---

## Como responder bem a um gate

| Situação | Resposta útil |
|----------|----------------|
| Versão | `sim` / `usar 4.15.1` |
| Setup | `não` (se ferramentas já ok) ou `sim` |
| Escopo | `sim` ou `remover VERTAPP-1234` / `incluir VERTAPP-5678` |
| DT TODOS | Listar keys que **não** estão em check |
| Libs | `manter` ou `atualizar` |
| Branch | `pode criar` / `pode atualizar` |
| Workflow | `2` ou `Build E2E` |
| Merge | `PR mergeada` / colar evidência |
| Delete branch | `não` (padrão seguro) ou `sim` |
| Lição | `pode gravar` |

---

## Falha no meio do fluxo (não é gate, mas para o fluxo)

Se o usuário disse **não** no setup e uma ferramenta falhar depois:

1. Parar **naquela** etapa.
2. Informar ferramenta + erro.
3. Pedir config **só** dessa ferramenta.
4. Retomar do **mesmo** passo (não reiniciar do zero).

Isso vale para as duas skills.

---

## Checklist mental (operador)

### Antes / durante `brand-release`

* [ ] Marca correta
* [ ] Versão da `main` confirmada
* [ ] Lista de cards bate com o board
* [ ] Decisão libs (manter vs PR + merge)
* [ ] Ok para mutar `release/*`
* [ ] Workflow certo (Build vs Build E2E, etc.)

### Antes / durante `post-brand-release`

* [ ] Lojas já aprovaram (gatilho humano — a skill não valida loja)
* [ ] Branch `release/*` correta na lista
* [ ] Versão/tag coerentes
* [ ] Cards em Aguardando versão confirmados
* [ ] Decisão sobre apagar a branch

---

[← post-brand-release](03-post-brand-release.md) · [Índice](README.md) · [Próximo: fluxo completo →](05-fluxo-completo.md)
