# 9. Referência técnica

[← Boas práticas](08-boas-praticas.md) · [Índice](README.md) · [Próximo: lessons →](10-lessons.md)

## Arquivos principais — `brand-release`

| Arquivo | Finalidade |
|---------|------------|
| `IA/brand-release/SKILL.md` | Fluxo oficial (passos 0–8) |
| `contracts.md` | IDs Codemagic, JQL, status, Teams, padrões de versão, libs |
| `mcp-workflow.md` | Como chamar MCP/REST |
| `repositories.md` | Mapa marca → repo |
| `scope-check.md` | Gate de escopo VERTAPP + DT |
| `lib-tags.md` | Check/bump de tags das libs |
| `learn.md` / `lessons.md` / `runs/` | Memória persistente |
| `icons/` + `manifest.json` | Ícones / `iconUrl` para Teams |

## Arquivos principais — `post-brand-release`

| Arquivo | Finalidade |
|---------|------------|
| `IA/post-brand-release/SKILL.md` | Fluxo oficial (passos 0–8) |
| `contracts.md` | Tag, Jira, webhook changelog, formatos |
| `mcp-workflow.md` | `gh` + Jira + Teams |
| `repositories.md` | Apps + libs do changelog |
| `scope-check.md` | Gate Aguardando versão |
| `changelog-template.md` | Corpo da GitHub Release |
| `learn.md` / `lessons.md` / `runs/` | Memória |

## Scripts

**Não há** scripts `.ps1`/`.sh` versionados nas pastas das skills. Os comandos estão embutidos em `mcp-workflow.md` (exemplos bash/PowerShell).

## Templates

* Adaptive Cards Teams (descritos em contracts).
* `changelog-template.md` (post).
* Template de run em `learn.md`.

## Variáveis / segredos (não documentar valores)

| Item | Uso |
|------|-----|
| `CODEMAGIC_API_KEY` | API Codemagic (workflows/logs) |
| Credenciais Jira do MCP | REST versões / checklist |
| URL webhook (sig) | POST Teams — ver contracts; **não copiar sig para chats públicos** |

## Comandos típicos

```bash
# brand-release — versão
gh api repos/somalabs/<app-repo>/contents/pubspec.yaml?ref=main --jq .content

# post-brand-release — branches
gh api "repos/somalabs/<app-repo>/branches?per_page=100" --paginate --jq '.[].name | select(startswith("release/"))'

# post-brand-release — Release
gh release create "vX.Y.Z" --repo somalabs/<app-repo> --target "release/X.Y.Z" --title "[MARCA] X.Y.Z" --notes-file <changelog.md>

# post-brand-release — delete (só com ok)
gh api -X DELETE "repos/somalabs/<app-repo>/git/refs/heads/release/X.Y.Z"
```

MCP: `user-jira` (`list_issues`, `get_issue`/`get_issue_fields`, `update_issue`, `get_transitions`, `transition_issue`); `user-codemagic` (`list_apps`, `start_build`, `wait_for_build`, …).

## Integrações e permissões

| Sistema | Permissões típicas necessárias |
|---------|--------------------------------|
| GitHub | Leitura contents; criar branch/PR; criar Release/tag; delete ref (se autorizado) |
| Jira | Browse/transition issues; create version; update fixVersions |
| Codemagic | Start/build status (API token) |
| Power Automate | URL de invoke do fluxo (sem MCP Teams) |

---

[← Boas práticas](08-boas-praticas.md) · [Índice](README.md) · [Próximo: lessons →](10-lessons.md)
