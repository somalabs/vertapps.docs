# 8. Boas práticas e limitações

[← Guia rápido](07-guia-rapido.md) · [Índice](README.md) · [Próximo: referência técnica →](09-referencia-tecnica.md)

## Boas práticas

* Sempre nomear a **marca** no prompt.
* Tratar a lista confirmada do gate como fonte da verdade (não “corrigir” pai↔filho depois).
* No bump de libs: review/merge humanos; agente só abre a PR.
* Preferir JPEG App Store no `iconUrl` do Teams.
* Ler `lessons.md` no início de cada run.
* Rebuild: usar o atalho, não reiniciar a release.
* Off Premium: Marca APP / Marca = `Off Premium`; branch pode ser `release/vX.Y.Z`.

## Operações que exigem confirmação

* Versão, escopo, criar/FF `release/*`, escolha de workflow (brand), merge de PR (humano), delete de `release/*` (post), gravar lição não óbvia.

## Limitações conhecidas

* Agente não lembra entre chats — memória = arquivos.
* Checklist DT sem estado checked confiável via API → gate humano.
* Destino DT após release: **TBD** em contracts do brand-release.
* Codemagic: MCP `get_app` pode truncar workflows → REST necessária.
* Webhook Teams não edita mensagem antiga → cards `invalidado`/`erro`.
* `post-brand-release` não verifica lojas/Codemagic.
* Cache Codemagic incompleto para várias marcas (GET na 1ª release).

## Dependências externas

GitHub (`somalabs`), Jira (`gruposoma.atlassian.net`), Codemagic, Power Automate (dois webhooks distintos).

## O que as skills não fazem

* Publicar nas lojas.
* Mergear PRs.
* Cruzar card Jira com PR de feature no GitHub.
* Release automática das 6 libs (`lib-release`).
* Sync homolog↔develop (`brand-homologation`).
* Preencher `fixVersions` no `brand-release`.
* Usar MCP Teams.

## Evitar marca / versão / ambiente errados

* Não inferir marca por arquivo aberto.
* Versão sempre da `main` (brand) ou da branch escolhida (post).
* Workflow por id hex, não pelo nome da UI.
* Confirmar lista de cards antes de qualquer transição.
* Webhooks: usar a URL da skill correta (homologação ≠ changelog pós-release).

---

[← Guia rápido](07-guia-rapido.md) · [Índice](README.md) · [Próximo: referência técnica →](09-referencia-tecnica.md)
