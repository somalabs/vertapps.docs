# 10. Lessons e memória entre runs

[← Referência técnica](09-referencia-tecnica.md) · [Índice](README.md)

## Por que existe

O agente **não lembra entre chats**. O aprendizado das skills de release fica em **arquivos versionados** na pasta de cada skill:

| Arquivo | Papel |
|---------|--------|
| `lessons.md` | Erros já vistos + **correção canônica** (o que fazer da próxima vez) |
| `runs/` | Histórico de cada execução (sucesso, falha ou abort) |
| `contracts.md` | Valores oficiais estáveis (IDs, JQL, status, webhooks) — promovidos a partir de lessons |
| `learn.md` | Regras do passo Learn (como gravar runs/lessons) |
| `SKILL.md` | Fluxo; reforçado quando a lição muda o processo |

**Objetivo:** não cometer o mesmo erro mais de uma vez.

## Onde ficam

| Skill | Caminhos |
|-------|----------|
| `brand-release` | `IA/brand-release/lessons.md`, `learn.md`, `runs/`, `contracts.md` |
| `post-brand-release` | `IA/post-brand-release/lessons.md`, `learn.md`, `runs/`, `contracts.md` |

Cada skill tem **sua própria** memória. Lições do brand-release não substituem as do post (e vice-versa), embora possam falar do mesmo sistema (Jira, Teams, etc.).

## Formato de uma lição (`lessons.md`)

```markdown
## YYYY-MM-DD — título curto
- **Sintoma:** o que se viu / o que deu errado
- **Causa:** por que aconteceu
- **Correção:** o que fazer da próxima vez (canônico)
- **Promovido para contracts/SKILL?** sim/não
```

**Regra (post-brand-release, e prática nas duas):** se o sintoma bater com uma entrada, usar a **Correção** — não improvisar outro caminho.

## Loop anti-repetição

```text
Início do run: ler lessons.md + contracts.md
        ↓
Executar fluxo aplicando correções canônicas
        ↓
Erro? → procurar em lessons → se achar, aplicar Correção
        ↓
Erro novo? → diagnosticar causa raiz → corrigir neste run
        ↓
Fim: gravar runs/ (+ lessons com ok do usuário, se houver correção)
        ↓
Mesma lição 2× → promover regra para contracts.md (e SKILL se for fluxo)
```

No **post-brand-release**, o `learn.md` exige consultar `lessons.md` **também no meio** do fluxo (antes de retentar `gh`/Jira/Teams). No **brand-release**, o learn é obrigatório no fim; a leitura de lessons no início está no `SKILL.md` (“Antes de começar”).

## Passo Learn — quando roda

| Skill | Passo | Quando |
|-------|--------|--------|
| `brand-release` | Passo 8 (no `SKILL.md`; o `learn.md` ainda intitula “passo 7”) | **Sempre** — sucesso, falha ou abort |
| `post-brand-release` | Passo 8 | **Sempre** — sucesso, falha ou abort |

**Proibido** pular o learn porque o build/Release/Teams falhou.

## O que é gravado

### 1. Run (`runs/`)

Nome: `YYYY-MM-DD-<marca>-<versão>.md` (colisão → sufixo `-2`).

**brand-release** — campos típicos: data, resultado (`success` \| `failed` \| `aborted`), passo que parou, branch, build (status + URL), escopo (keys), incidentes, lições gravadas.

**post-brand-release** — além disso: início/fim/tempo de execução, tag/Release, branch deletada, Teams (HTTP), lições **aplicadas** e gravadas.

### 2. Lesson (`lessons.md`)

Só se houve **correção confirmada**.

- Perguntar: *Posso gravar esta correção em lessons.md?*
- Só gravar com ok do usuário.

**Exceções (podem ir direto, sem pedir):**

| Skill | Exceção |
|-------|---------|
| brand-release | `app_id` / `workflow_id` já retornados pela API com sucesso |
| post-brand-release | `transition_id`, textos oficiais, webhook URL já confirmados pelo usuário ou pela API |

### 3. Promoção para `contracts.md`

Atualizar contracts quando, por exemplo:

- Texto oficial de status / label / nome de versão / canal
- IDs confirmados (`app_id`, `workflow_id`, `transition_id`)
- Webhook Teams correto
- Formato de changelog / layout Teams (post)
- A **mesma lição aparecer 2 vezes** → vira regra em contracts (e reforço no SKILL se for fluxo)

### 4. Run OK sem incidentes

Só cria o arquivo em `runs/` — **sem** perguntar sobre lessons.

## Exemplos reais (já promovidos)

Trechos ilustrativos — o catálogo completo está nos `lessons.md` de cada skill.

### brand-release

| Lição | Correção canônica (resumo) |
|-------|----------------------------|
| Escopo VERTAPP | Usar **Marca APP** `cf[11606]`, não `cf[10315]` |
| Workflow Codemagic | Sempre **id hex**, nunca o nome da UI |
| Bump commons | `azzas_dito` + `azzas_splash` na **mesma tag** (se existirem no pubspec) |
| Passo 6/7 Jira | Mover **exatamente** as keys do gate |
| Teams | Webhook Power Automate; modelos `homologacao` / `erro` / `invalidado` |
| Versão Jira na abertura | Só **criar** versão Não lançado; **não** preencher `fixVersions` nos cards |

### post-brand-release

| Lição | Correção canônica (resumo) |
|-------|----------------------------|
| Tag | `--target` = branch `release/*` confirmada |
| Marca Off Premium | `cf[10315] = "Off Premium"` (não `OFF`) |
| Changelog | Título em negrito + descrição na linha seguinte |
| Teams pós-release | Changelog + ícone; webhook canônico em contracts |
| Preferir | `get_issue_fields` se `get_issue` falhar |

## Gate relacionado

Gravar lição nova = **gate humano** (exceto as exceções de IDs/API acima). Ver também [Gates](04-gates.md) (itens B8 / P8).

## O que o operador deve fazer

* Conferir o run em `runs/` ao final.
* Se o agente propor uma lesson: validar se sintoma/causa/correção estão corretos antes do `sim`.
* Se a correção for regra estável (ou repetida), esperar/ver promoção em `contracts.md`.
* **Não** tratar o chat como memória — se algo importa, tem que estar em lessons/contracts/runs.

## Proibido (para o agente)

* Inventar status, workflow, transition ids, nomes de versão ou webhook
* Reescrever lessons sem evidência do run atual
* Retentar a mesma abordagem que acabou de falhar sem consultar lessons
* Encerrar o run sem criar entry em `runs/`

---

[← Referência técnica](09-referencia-tecnica.md) · [Índice](README.md)
