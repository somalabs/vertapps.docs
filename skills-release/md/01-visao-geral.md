# 1. Visão geral

[← Índice](README.md) · [Próximo: brand-release →](02-brand-release.md)

## Objetivo das skills

São **workflows operacionais** executados por um agente de IA. Orquestram GitHub (`gh`), Jira (MCP + REST), Codemagic (só no `brand-release`) e notificação no Teams via **webhook Power Automate**. Não são scripts CLI autônomos: o agente segue o `SKILL.md` e os arquivos de contrato.

## Problema que resolvem

Padronizar o ciclo de release do **app de marca** (não das libs isoladas):

1. Abrir a versão para homologação (branch, build, escopo Jira, alerta Teams).
2. Fechar a versão após aprovação nas lojas (tag, changelog, GitHub Release, conclusão dos cards).

Evita inconsistências manuais (versão errada do `pubspec`, workflow Codemagic pelo nome da UI, escopo Jira divergente do board, merge de PR pelo agente, etc.) e persiste lições em `lessons.md` / `contracts.md` entre chats.

## Momento de uso

| Momento | Skill |
|---------|--------|
| Desenvolvimento concluído; abrir homologação da versão do app | `brand-release` |
| Homologação / envio às lojas (fora destas duas skills) | Publicação humana / processos de loja |
| Lojas aprovaram; fechar ciclo (tag + cards concluídos) | `post-brand-release` |

## Diferença entre as duas

| | `brand-release` | `post-brand-release` |
|--|-----------------|----------------------|
| Momento | **Antes** da homologação / publicação nas lojas | **Depois** da aprovação nas lojas |
| Foco | Branch `release/*`, build Codemagic, Em homologação | Tag `vX.Y.Z`, GitHub Release, Itens concluídos |
| Codemagic | Sim | Não |
| Boards Jira no escopo | VERTAPP + DT | Só VERTAPP |
| Status origem dos cards | `Desenvolvimento concluido` (VERTAPP) / `Deploy` (DT) | `Aguardando versão` |

## Como se complementam

O `brand-release` **abre** a release (código + build + cards em homologação + versão Jira “Não lançado”). O `post-brand-release` **fecha** a mesma linha de versão (tag no GitHub + changelog + cards concluídos + Teams com changelog).

## Fluxo resumido

```text
Desenvolvimento → brand-release → Publicação → post-brand-release
```

1. **Desenvolvimento** — cards em “Desenvolvimento concluido” / DT em Deploy.
2. **`brand-release`** — confirma escopo, opcionalmente bump de libs via PR, cria `release/X.Y.Z`, build Codemagic, Teams (`homologacao`), cria versão Jira, move cards para Em homologação.
3. **Publicação** — homologação interna e envio/aprovação nas lojas (**não** automatizado por estas skills).
4. **`post-brand-release`** — confirma cards em “Aguardando versão”, gera changelog, cria tag/Release, preenche Versões corrigidas, move para Itens concluídos, opcionalmente apaga `release/*`, envia changelog no Teams.

Skills **relacionadas, mas distintas** (não substituídas): `brand-homologation` (sync homolog↔develop) e `lib-release` (versionamento das libs).

---

[← Índice](README.md) · [Próximo: brand-release →](02-brand-release.md)
