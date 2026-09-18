# 6. Comparativo entre as skills

[← Fluxo completo](05-fluxo-completo.md) · [Índice](README.md) · [Próximo: guia rápido →](07-guia-rapido.md)

| Característica | brand-release | post-brand-release |
| --------------------- | ------------- | ----------------- |
| Momento de uso | Abrir homologação da versão | Após aprovação nas lojas |
| Objetivo | Branch + build + Em homologação | Tag + Release + Itens concluídos |
| Entradas principais | Marca, versão (main), escopo, workflow | Marca, branch `release/*`, versão, escopo |
| Ações executadas | PR libs (opc.), `release/*`, Codemagic, Teams homologação, criar versão Jira, mover cards | Changelog, tag/Release, fixVersions, mover cards, Teams changelog, delete opcional |
| Saídas | Branch, build, card Teams, versão Não lançado, cards Em homologação, runs | Tag, GitHub Release, changelog MD, cards concluídos, Teams, runs |
| Sistemas envolvidos | GitHub, Codemagic, Jira (VERTAPP+DT), Teams webhook | GitHub, Jira (só VERTAPP), Teams webhook |
| Critério de conclusão | Build success + Teams + Jira + learn | Release criada + Jira + Teams + learn |

---

[← Fluxo completo](05-fluxo-completo.md) · [Índice](README.md) · [Próximo: guia rápido →](07-guia-rapido.md)
