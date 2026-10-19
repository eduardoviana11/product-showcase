# Guia do professor — My Showcase

## Objetivo e idiomas

Conduzir cerca de dez participantes de níveis diferentes por uma aplicação
simples, usando dados, POO, Flask, Jinja, HTML e CSS. A aula dura aproximadamente
duas horas para começar. Não prometa domínio dos quatro princípios nesse tempo.

O trabalho é individual via forks; o ritmo das etapas é coletivo. Cada pessoa
usa seu próprio teclado, pasta, ambiente virtual e remoto. Código, comentários,
interface e nomes ficam em inglês. README e guias de orientação ficam em português.

Use [walkthrough.md](walkthrough.md) como roteiro projetado durante a aula.
Ele é a fonte principal dos passos; não peça que a turma alterne entre vários
tutoriais enquanto executa uma etapa.

## Antes da aula

1. Publique o esqueleto genérico `1-product-showcase` usando as instruções abaixo.
2. Confira que o link do catálogo aponta para o esqueleto, não para sua versão.
3. Envie [setup.md](setup.md) com antecedência.
4. Peça instalação de Python 3.9+, Git, VS Code e extensão Python.
5. Peça conta no GitHub, e-mail confirmado e teste de acesso.
6. Peça uma foto própria ou autorizada salva no computador.
7. Prepare uma imagem local autorizada para quem não tiver foto.
8. Faça uma instalação em um clone novo: crie `.venv`, instale requisitos,
   rode `verify.py` e abra a página.
9. Deixe sua demonstração funcionando e o roteiro no marco C1.

Ferramentas instaladas antes da aula liberam tempo para aprender programação.
Não distribua sua `.venv`; cada computador cria a sua.

## Como manter todos na mesma etapa

1. Anuncie o marco atual: por exemplo, “Estamos em C4.1”.
2. Explique em uma frase o que vai mudar.
3. Demonstre uma ação pequena: abrir um arquivo, localizar uma linha ou rodar um comando.
4. Pare de digitar e dê tempo para cada pessoa repetir.
5. Peça a evidência escrita no roteiro, como dois cards ou uma resposta `True`.
6. Pergunte quem precisa de ajuda e resolva antes de avançar.
7. Só anuncie o próximo marco depois da conferência do grupo.

Mantenha um quadro simples com **marco atual**, **quem concluiu** e **quem precisa
de apoio**. Quem terminar cedo revisa a mudança, tenta explicá-la ou ajuda um
colega com consentimento; não começa a extensão avançada durante a trilha comum.

Se um problema demorar, pause e resolva, ou combine uma adaptação para toda a
turma. Anote o que será terminado depois. O relógio não obriga a pular uma
conferência. Use linguagem simples e respeitosa; não infantilize participantes.

## Apresentação curta das ferramentas

- **Flask:** recebe o pedido do navegador e chama uma função Python. Mostre
  `@app.route("/")` e `index()` em `app.py`.
- **Jinja:** preenche o template com os dados recebidos. Mostre
  `{{ product.name }}` e o loop em `templates/index.html`.
- **HTML:** estrutura o conteúdo que chega ao navegador.
- **CSS:** define a aparência desse conteúdo.

Peça que acompanhem um produto no caminho
`app.py → render_template() → index.html → card no navegador`.
O navegador recebe o HTML já preenchido. Live Server e a abertura direta do
arquivo não executam esse fluxo.

Se quiser mostrar código-fonte no navegador, compare o nome real de um produto
com a expressão Jinja no arquivo. A turma só observa neste momento.
As referências oficiais estão no [README](../README.md#o-que-são-flask-e-jinja).

## Base comum e escolhas pessoais

Durante a aula, preserve estes pontos em todos os temas:

| Parte | Combinado |
| --- | --- |
| Estrutura | Mesmas pastas e responsabilidades do esqueleto. |
| Dados | Lista em `app.py`; um produto físico e um digital, no mínimo. |
| Modelo | `Product` abstrata, `price` validado, subclasses e `delivery()`. |
| Template | Cards gerados pelo loop; nenhuma verificação de tipo para entrega. |
| Frontend | HTML/CSS puros, imagens locais e fontes de sistema. |
| Fluxo | Pequena mudança → salvar → executar/conferir → registrar. |

Cada aluno escolhe seu tema, textos, fotos e aparência. Para manter o ritmo,
faça somente as primeiras alterações visuais em grupo. Não peça dez layouts
novos ao mesmo tempo.

Uma mudança de lógica é uma extensão opcional para quem a escolher depois de
concluir a trilha comum. Peça que descreva o objetivo, os arquivos afetados e
como comprovou o funcionamento. Mantenha os limites do MVP: sem login, carrinho,
checkout, pagamentos, banco de dados, JavaScript ou novos frameworks.

Nas próximas atividades, repita organização simples, instruções granulares e
marcos com evidência. Adapte regras do domínio conscientemente; não transforme
um projeto novo em uma arquitetura completamente diferente sem necessidade.
A atividade 2 precisa de um esqueleto próprio e de um roteiro antes de ser liberada.

## Cronograma flexível e marcos

| Tempo | Marco | Evidência antes de avançar |
| --- | --- | --- |
| 0–10 min | C1: fork, clone e VS Code | Arquivos visíveis e `origin` do aluno. |
| 10–20 min | C2: ambiente, instalação e execução | Página original com dois cards. |
| 20–35 min | C3: caminho dos dados | Aluno aponta um dado Python e sua expressão Jinja. |
| 35–45 min | C4: identidade e produtos | Dois cards personalizados; um físico e um digital. |
| 45–60 min | C5: terceiro produto e primeira foto | Três cards e uma imagem local, ou pendência registrada. |
| 60–85 min | C6: início de HTML/CSS | Um título, uma cor e uma borda alterados. |
| 85–105 min | C7: POO e experimento | Entregas diferentes e preço negativo já corrigido. |
| 105–120 min | C8: conferência, commit e push | Commit visível no fork e pendências anotadas. |

Se C1/C2 levar mais tempo, ajuste o restante e combine continuação. Reserve o
fim para salvar um estado funcional e registrar o progresso, mesmo que o
acabamento visual fique para depois.

## Limite da parte de frontend em conjunto

Siga C6 do roteiro:

1. Trocar só o texto do `h2`, preservando `id="products-title"`.
2. Mudar só `--accent` em `:root`.
3. Mudar só `border-radius` da regra `.card`.
4. Salvar e recarregar após cada alteração.
5. Conferir o grupo e encerrar essa parte.

Se demonstrar IA, peça apenas uma dessas pequenas alterações e leia a resposta
com a turma. O restante — fontes, espaçamentos, paleta completa, fotos e layout —
fica para a continuação individual. Todos usam a mesma estrutura durante a aula.

## Como explicar POO sem ampliar o projeto

1. **Abstração:** `Product(ABC)` reúne atributos comuns e exige `delivery()`.
   Instanciá-la diretamente gera `TypeError`.
2. **Encapsulamento:** a propriedade `price` centraliza o acesso e a validação.
   O construtor e atribuições posteriores usam o setter.
   `_price` é interno por convenção, não inacessível; acesso direto pode contornar a regra.
3. **Herança:** as subclasses usam `super().__init__()` e acrescentam
   `pickup_location` ou `file_format`.
4. **Polimorfismo:** a mesma chamada `product.delivery()` produz mensagens
   diferentes conforme o objeto; o template não decide isso com testes de tipo.

`float` mantém o exemplo simples. Aplicações financeiras reais exigem cuidado
com precisão e arredondamento, frequentemente com `Decimal` ou centavos inteiros.
Não amplie o MVP por isso. A apresentação do preço permanece em reais.

Perguntas rápidas: quem cria os objetos? Quem repete os cards? Por que não
instanciamos `Product`? Onde o preço negativo é recusado? O underscore bloqueia
acesso? Mudar CSS altera o preço Python? Para qual conta o push vai?

## Apoio e critérios de entrega

Para iniciantes, aponte o arquivo, a linha a localizar e o resultado esperado.
Diferencie o terminal, o editor e a barra de endereço. Leia o erro com a pessoa
e corrija uma mudança de cada vez. Use os exemplos completos do roteiro.

Quem já tem experiência acompanha os marcos e pode explorar os desafios do
README depois. Não exija desafios avançados da turma inteira.

Entrega final: URL do próprio fork, screenshot local, tema, ao menos três
produtos, fotos e identidade personalizadas, um físico e um digital, e breve
explicação dos quatro princípios. O fim da aula é um marco de progresso;
combine prazo para os itens pendentes. Não exija hospedagem pública ou PR.

## Publicar o esqueleto

Estes passos são do professor. Os alunos usam **Fork**, conforme C1.

1. No computador, abra a pasta `1-product-showcase`, que contém `app.py`.
   Se estiver na pasta organizadora `projects`, entre com
   `cd .\1-product-showcase` antes dos comandos abaixo.
2. Confira os arquivos e `.gitignore`.
3. No GitHub, use **New repository**.
4. Escolha sua conta e o nome `1-product-showcase`.
5. Marque **Public**.
6. Deixe desmarcada a criação de README, `.gitignore` e licença no site.
7. Clique em **Create repository**.
8. No terminal local, dentro da pasta do esqueleto, execute uma linha por vez,
   substituindo `YOUR_NAME`, `YOUR_EMAIL` e `YOUR_USERNAME`:

```powershell
git init
git branch -M main
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
git add .
git commit -m "Create My Showcase activity starter"
git remote add origin https://github.com/YOUR_USERNAME/1-product-showcase.git
git remote -v
git push -u origin main
```

9. Antes da última linha, confira se `origin` aponta para o remoto recém-criado.
10. Depois do push, recarregue o GitHub e abra `app.py` e o README.
11. Compartilhe a URL e atualize o catálogo.

Se já houver Git, preserve histórico, branch e remoto. Confira `git status` e
`git remote -v` e adapte as instruções em vez de reinicializar ou substituir
um remoto existente.

## Sua versão e as próximas atividades

Use o [guia de organização](project-organization.md) para publicar o catálogo,
criar sua versão pessoal por **Use this template** e reservar `2-restaurant-menu`.
Os alunos fazem fork do esqueleto, não da sua versão final.

O código no GitHub não hospeda o Flask. GitHub Pages não executa este backend;
a aplicação continua sendo executada localmente.
