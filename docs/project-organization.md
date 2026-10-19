# Organização da coleção Jonathan Sales Programming

## Um catálogo e um repositório por atividade

Use `jonathan-sales-programming` como nome do repositório catálogo na sua conta.
Ele contém um README e `projects/` com links. Cada esqueleto fica em um
repositório separado, para o aluno fazer fork apenas da atividade desejada.

No GitHub, o endereço é `github.com/CONTA/REPOSITORIO`. Uma pasta interna
não recebe fork independente; se todos os códigos estivessem dentro do catálogo,
o fork copiaria o conjunto. Não é necessário criar uma organização no GitHub.
[Referência sobre forks](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo).

Exemplo no GitHub; cada item é um repositório:

```text
YOUR_USERNAME
├── jonathan-sales-programming   Catalog
├── 1-product-showcase           Activity 1 starter
├── 1-book-store                 Instructor's personal version
└── 2-restaurant-menu            Future activity

STUDENT_USERNAME
├── 1-anna-sweets                Fork of 1-product-showcase
└── 2-anna-menu                  Future fork of 2-restaurant-menu
```

`YOUR_USERNAME` e `STUDENT_USERNAME` são placeholders. Os nomes mostram a
organização proposta, não indicam repositórios já publicados.

## Pastas no computador

A estrutura local pode ser:

```text
jonathan-sales-programming/
└── projects/
    ├── 1-book-store/
    │   ├── .git/
    │   ├── .venv/
    │   └── app.py
    └── 2-restaurant-menu/
        └── .git/
```

As duas pastas externas só organizam os arquivos; não execute `git init` nelas.
Cada clone já contém seu Git, tem remoto próprio e usa suas dependências.
Abra a pasta de uma atividade por vez no VS Code.

Essa pasta organizadora não é um clone do catálogo, apesar do mesmo nome.
Para editar o catálogo, use outro local, como `catalog-repos`, evitando colocar
um repositório dentro de outro.

Neste workspace, `projects` é somente a pasta organizadora. O primeiro
esqueleto fica em `projects/1-product-showcase/`, com seu `app.py`, README,
documentação e `.venv`. Os próximos projetos terão pastas ao lado dele.

Abra `1-product-showcase` no VS Code para trabalhar na atividade 1. Quando um
guia disser “raiz do projeto”, ele se refere à pasta que contém `app.py`, não
à pasta organizadora `projects`. O nome local pode ser diferente do remoto.
Crie uma nova `.venv` em cada clone; não a mova entre pastas.

## Nomes que podem ser personalizados

| Nome | Onde mudar | Exemplo |
| --- | --- | --- |
| Coleção | Repositório catálogo e seu README. | `jonathan-sales-programming` |
| Esqueleto | Repositório publicado pelo professor. | `1-product-showcase` |
| Projeto do aluno | **Repository name** na criação do fork. | `1-book-store` |
| Pasta local | Criada pelo clone, normalmente com o nome do fork. | `1-book-store/` |
| Título da página | `SHOWCASE_NAME` em `app.py`. | `My Book Store` |
| Apresentação no GitHub | Título e introdução do README. | Descrição em português. |

Use o número da atividade, letras minúsculas e hífens nos repositórios.
Os nomes de repositório, arquivos e código permanecem em inglês. Os READMEs e
guias que explicam como construir o projeto ficam em português.

Trocar `SHOWCASE_NAME` não renomeia o GitHub. Renomear o fork não troca o
título da página. São ajustes independentes.

## Fluxo do aluno em cada atividade

1. Abra o catálogo.
2. Escolha uma atividade marcada como disponível.
3. Abra seu link de **esqueleto**, não a versão pessoal do professor.
4. Leia o README.
5. Faça fork para sua conta.
6. Escolha o nome do projeto na tela de criação do fork.
7. Clone seu fork em uma pasta própria.
8. Abra essa pasta no VS Code.
9. Siga o roteiro em conjunto, parando nos marcos combinados.
10. Confira `git remote -v` antes de fazer commit e push.
11. Entregue a URL do fork e os itens pedidos.

Na atividade 2, repita o fluxo com o novo esqueleto. Não coloque o projeto 2
dentro do clone do projeto 1. Não precisa reinstalar Python, Git ou VS Code,
mas cada projeto Python recebe sua própria `.venv`.

Não é necessário configurar `upstream` nem abrir pull request para concluir
essas atividades. Cada pessoa publica no próprio fork.

## Padrão das próximas atividades

A turma seguirá uma lógica reconhecível:

- Preparar ferramentas antes da aula e iniciar com um esqueleto funcional.
- Criar fork e clone, executar e conferir antes de editar.
- Localizar dados, regras, apresentação e estilos em partes simples.
- Alterar uma coisa por vez, salvar e observar o resultado.
- Fazer só as primeiras personalizações em grupo e terminar detalhes depois.
- Conferir, explicar a lógica, fazer commit e push.

Para próximos projetos web desta coleção, reutilize a base simples de Python,
Flask, Jinja e HTML/CSS, com responsabilidades semelhantes. Regras específicas
mudam conforme a atividade e devem ser explicadas no novo guia.
Não presuma que o placeholder da atividade 2 já tem implementação ou comandos.

Os temas dos alunos usam a mesma lógica do esqueleto correspondente. Mudanças
de arquitetura ficam como extensões deliberadas depois da trilha comum,
acompanhadas de justificativa e verificação.

## Renomear um fork existente

Prefira escolher o nome ao fazer fork. Se quiser mudar depois:

1. No GitHub, abra **seu fork**.
2. Clique em **Settings → General**.
3. Localize **Repository name**.
4. Digite o novo nome.
5. Clique em **Rename**.
6. No VS Code, abra o terminal da pasta desse projeto.
7. Atualize o remoto com sua conta e o novo nome:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/NEW_NAME.git
```

8. Confira:

```powershell
git remote -v
```

9. Atualize a URL da entrega e os links escritos no README.

A pasta local pode manter o nome anterior; use seu caminho real ao abrir.
[Referência de renomeação](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).

## Versão pessoal do professor

1. Publique `1-product-showcase` conforme o [guia do professor](instructor-guide.md#publicar-o-esqueleto).
2. Nas configurações desse repositório, marque **Template repository**.
3. Volte à página principal.
4. Clique em **Use this template → Create a new repository**.
5. Escolha sua conta.
6. Informe outro nome, como `1-book-store`.
7. Crie o repositório.
8. Clone essa nova versão e siga seu README para instalar.
9. Personalize nela; mantenha o esqueleto genérico.
10. No catálogo, marque esse link como **Versão do professor**.

O template gera outro repositório com histórico próprio. Essa cópia não tem
o vínculo de um fork. Os alunos continuam usando Fork para a atividade.
Se futuramente optar por templates para todos, explique a mudança de fluxo.

Referências: [criar um template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
e [usar um template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

## Preparar e publicar o catálogo

1. Abra a raiz do esqueleto, onde está `app.py`.
2. Abra o PowerShell nessa pasta.
3. Os arquivos de [examples/catalog](examples/catalog/README.md) serão copiados
   para outro local. Confira que o destino abaixo ainda não existe; se existir,
   escolha outro para não misturar conteúdos.
4. Crie a pasta organizadora:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\catalog-repos"
```

5. Copie o modelo:

```powershell
Copy-Item -LiteralPath .\docs\examples\catalog -Destination "$env:USERPROFILE\catalog-repos\jonathan-sales-programming" -Recurse
```

6. Entre na cópia e abra o editor:

```powershell
Set-Location "$env:USERPROFILE\catalog-repos\jonathan-sales-programming"
code .
```

7. Abra `projects/README.md`.
8. Substitua `YOUR_USERNAME` pela conta do professor.
9. Confira o link do esqueleto já publicado.
10. Mantenha a atividade 2 como **Em preparação** até estar pronta.
11. Salve o arquivo.

O catálogo conterá apenas:

```text
jonathan-sales-programming/
├── README.md
└── projects/
    └── README.md
```

12. No GitHub, crie `jonathan-sales-programming` como repositório público vazio,
    sem arquivos gerados pelo site.
13. No terminal da cópia do catálogo, execute uma linha por vez,
    substituindo os placeholders:

```powershell
git init
git branch -M main
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
git add .
git commit -m "Create Jonathan Sales Programming catalog"
git remote add origin https://github.com/YOUR_USERNAME/jonathan-sales-programming.git
git remote -v
git push -u origin main
```

14. Confira o destino antes do push.
15. Recarregue a página do GitHub e abra os links.

Se o catálogo já existir, trabalhe no clone existente, preservando histórico
e remoto, em vez de seguir a criação inicial.

## Reservar a atividade 2

Por enquanto, a linha **Em preparação** no catálogo é suficiente.
O [README de exemplo](examples/2-restaurant-menu/README.md) não contém uma aplicação.

Para reservar também um repositório:

1. Crie `2-restaurant-menu` no GitHub como repositório público vazio.
2. Volte ao terminal da raiz deste esqueleto, onde está `app.py`.
3. Confira que o destino abaixo é novo, sem clone existente.
4. Prepare a pasta, uma linha por vez:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\jonathan-sales-programming\projects"
Copy-Item -LiteralPath .\docs\examples\2-restaurant-menu -Destination "$env:USERPROFILE\jonathan-sales-programming\projects\2-restaurant-menu" -Recurse
Set-Location "$env:USERPROFILE\jonathan-sales-programming\projects\2-restaurant-menu"
```

5. Publique o placeholder, substituindo os seus dados:

```powershell
git init
git branch -M main
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
git add .
git commit -m "Reserve activity 2 in preparation"
git remote add origin https://github.com/YOUR_USERNAME/2-restaurant-menu.git
git remote -v
git push -u origin main
```

6. Confira o destino antes do push e depois confirme o README no GitHub.
7. Desenvolva o esqueleto nesse novo repositório.
8. Prepare um roteiro de construção com ações pequenas, resultados, pausas
   coletivas e tarefas de continuação.
9. Marque como disponível somente quando código, instruções e verificações
   estiverem prontos.

Esses comandos são instruções para uma publicação futura; não foram executados
automaticamente.
