# Roteiro guiado — My Showcase

Este roteiro é para seguir com o professor, mesmo sem experiência.
Cada pessoa trabalha no próprio fork. Fazer a mesma etapa juntos não significa
editar os arquivos de outra pessoa.

Use o Windows/PowerShell como caminho principal. Em macOS/Linux, siga a
adaptação do [README](../README.md#resumo-de-instalação-e-execução): o Python
da `.venv` fica em `.venv/bin/python`. Os passos de edição são os mesmos.

## Antes de começar

1. Termine a [preparação do computador](setup.md) antes da aula.
2. Entre na sua conta do GitHub.
3. Deixe este roteiro aberto no navegador.
4. Tenha uma foto própria ou autorizada salva no computador para usar mais tarde.
5. Aguarde o professor informar a etapa atual.

**Como ler as instruções:**

- **No navegador:** clique na página indicada.
- **No VS Code:** abra e edite um arquivo.
- **No terminal:** copie uma linha de comando, aperte Enter e espere.
- **Ctrl+S:** segure Ctrl e aperte S para salvar o arquivo aberto.
- **Recarregar:** volte ao navegador e aperte Ctrl+R.
- **Pausa C1, C2...:** confira o resultado, mostre ao professor e espere o grupo.
- **Para depois:** tarefa individual que não precisa ser terminada nesta etapa da aula.

Não digite os sinais que cercam um bloco de código. Não troque nomes como
`PhysicalProduct`, `price` ou `delivery`. Vamos personalizar os valores e manter
a estrutura comum. Textos da página e código ficam em inglês; as explicações
deste roteiro ficam em português.

## C1 — Criar sua cópia e abrir a pasta

**Objetivo:** ter o projeto no seu GitHub e no seu computador.

### 1.1 — Fazer o fork no navegador

1. Abra o link enviado pelo professor.
2. Se aparecer uma lista de atividades, clique no esqueleto `1-product-showcase`.
3. Confira se a página lista `app.py`, `models`, `templates` e `static`.
4. Clique no botão **Fork**, perto do topo.
5. Em **Owner**, escolha sua própria conta.
6. Em **Repository name**, escolha o nome do seu projeto. Pode manter
   `1-product-showcase` ou usar, por exemplo, `1-book-store`.
7. Clique em **Create fork**.
8. Aguarde a nova página abrir.
9. Confira se o endereço agora começa com `github.com/` seguido da **sua conta**.
10. Anote o nome escolhido. Ele substituirá `YOUR_REPOSITORY` nos comandos.
11. Clique em **Code**, depois em **HTTPS**, e copie a URL.

**Resultado esperado:** você está na página do seu fork, com os arquivos listados.

### 1.2 — Trazer o fork para o computador

1. Abra o menu Iniciar do Windows.
2. Digite `PowerShell`.
3. Abra o aplicativo PowerShell.
4. Copie a linha abaixo, aperte Enter e aguarde. Ela cria as pastas organizadoras:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\jonathan-sales-programming\projects"
```

5. Entre nessa pasta com a próxima linha:

```powershell
Set-Location "$env:USERPROFILE\jonathan-sales-programming\projects"
```

`$env:USERPROFILE` significa sua pasta de usuário no Windows. Copie essa parte
exatamente; não precisa substituí-la.

6. Na linha abaixo, substitua `YOUR_USERNAME` pela sua conta e
   `YOUR_REPOSITORY` pelo nome anotado. Outra opção é digitar `git clone `,
   com um espaço no final, e colar a URL copiada de **seu fork**:

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

7. Espere o download terminar e a linha para digitar reaparecer.
8. Entre no projeto, substituindo o nome:

```powershell
cd YOUR_REPOSITORY
```

Se escolheu `1-book-store`, a linha é `cd 1-book-store`.

9. Confira o destino dos futuros envios:

```powershell
git remote -v
```

**Resultado esperado:** as linhas de `origin` mostram sua conta e seu repositório.

**Se não acontecer:** se aparecer a conta do professor, mostre antes de continuar.
Se o clone disser que a pasta já existe e ela for sua cópia, entre nela;
não é necessário clonar novamente.

### 1.3 — Abrir no VS Code

1. Ainda nesse terminal, execute:

```powershell
code .
```

O ponto significa “abra esta pasta”.

2. Se o comando falhar, abra o VS Code pelo menu Iniciar.
3. Use **File → Open Folder** (Arquivo → Abrir Pasta).
4. Escolha a pasta do projeto dentro de `jonathan-sales-programming\projects`.
5. Se o VS Code perguntar sobre confiar nos arquivos, confira que é o
   repositório da atividade que você acabou de clonar antes de confirmar.
6. Na lateral esquerda, localize `app.py`.

**Pausa C1:** mostre `app.py` na lista e o `origin` apontando para seu fork.
Aguarde. Você já fez **fork** (cópia na sua conta) e **clone** (cópia local).
O clone já tem Git; não execute `git init` nas pastas organizadoras.

## C2 — Instalar e abrir a versão original

**Objetivo:** ver a aplicação funcionando antes de editar.

### 2.1 — Conferir o terminal e a pasta

1. No VS Code, clique em **Terminal → New Terminal** (Novo Terminal).
2. Confira se o terminal é PowerShell. Se não for, use a seta ao lado de `+`,
   escolha PowerShell e trabalhe nesse novo terminal.
3. Digite:

```powershell
Get-Location
```

4. Leia o caminho. Ele deve terminar com a pasta do seu projeto.
5. Confira os arquivos com uma linha por vez:

```powershell
Test-Path .\app.py
Test-Path .\requirements.txt
```

**Resultado esperado:** duas respostas `True`. Se aparecer `False`, volte a C1.3
e abra a pasta correta antes de instalar.

### 2.2 — Criar a caixa de ferramentas do projeto

1. Execute:

```powershell
py -m venv .venv
```

2. Espere a linha para digitar voltar. O comando pode terminar sem mensagem.
3. Confira a criação:

```powershell
Test-Path .\.venv\Scripts\python.exe
```

**Resultado esperado:** `True`. A pasta `.venv` guarda o Python e as dependências
desta atividade. Não abra nem edite os arquivos dentro dela.

4. Instale os requisitos:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

5. Espere terminar. Esse comando precisa de internet.
6. Confira se as dependências combinam entre si:

```powershell
.\.venv\Scripts\python.exe -m pip check
```

**Resultado esperado:** `No broken requirements found.`. Se houver erro,
mostre a mensagem completa. Não siga digitando os próximos comandos.

### 2.3 — Selecionar o Python no editor

1. Aperte `Ctrl+Shift+P` no VS Code.
2. Digite `Python: Select Interpreter`.
3. Clique nessa opção.
4. Selecione a opção que mostra `.venv` e o caminho do **seu projeto**.
5. Se não aparecer, clique em **Enter interpreter path** e depois **Find**.
6. Abra a pasta do projeto, depois `.venv`, depois `Scripts`.
7. Selecione `python.exe`.

Não precisa executar `Activate.ps1`. Os comandos deste roteiro usam diretamente
o Python correto e não dependem de ativação.

### 2.4 — Verificar e iniciar

1. No terminal do projeto, execute:

```powershell
.\.venv\Scripts\python.exe verify.py
```

2. Espere. Procure `OK` no final. Não precisa decorar o nome dos testes.
3. Inicie o servidor:

```powershell
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

4. Procure a linha com `http://127.0.0.1:5000`.
5. Deixe esse terminal aberto. É normal ele não devolver a linha para digitar.
6. Abra uma nova aba no navegador.
7. Digite `http://127.0.0.1:5000` na barra de endereço e aperte Enter.

**Resultado esperado:** título `My Showcase` e dois cards, `Idea notebook` e
`Creativity guide`, com a imagem `Your photo here`.

**Se não acontecer:** confira a URL e a última mensagem do terminal.
Não abra `index.html` diretamente e não use Live Server.

**Pausa C2:** mostre os dois cards e aguarde. Para parar o servidor, clique no
terminal e aperte Ctrl+C. Por enquanto, mantenha-o rodando.

## C3 — Entender o caminho de um produto

**Objetivo:** reconhecer as peças. Nesta etapa vamos ler, sem editar.

1. No VS Code, clique em `app.py`.
2. Localize `products = [`. Veja os dois objetos dentro da lista.
3. Localize `@app.route("/")`. Flask usa essa rota quando você abre a página inicial.
4. Abaixo dela, localize `render_template(`. Essa chamada entrega os dados ao Jinja.
5. Na lateral, abra a pasta `templates` e clique em `index.html`.
6. Localize `{{ showcase_name }}`. Jinja troca essa expressão pelo nome da vitrine.
7. Localize `{% for product in products %}` e `{% endfor %}`.
8. Observe que o `article` fica entre essas duas linhas. O loop repete esse
   card uma vez para cada objeto. Não precisamos copiar o HTML para cada produto.
9. Abra `static` → `css` → `style.css`. Veja que as regras tratam da aparência.

**Flask** recebe o pedido da página e executa nosso Python.
**Jinja** preenche o template com os dados.
**HTML** organiza o conteúdo.
**CSS** cuida da aparência.
Essas explicações e referências estão no [README](../README.md#o-que-são-flask-e-jinja).

**Pausa C3:** aponte onde está o nome de um produto no Python e onde ele aparece
no HTML como `{{ product.name }}`. Aguarde.

## C4 — Escolher o tema e mudar os dados

**Objetivo:** personalizar os valores usando as mesmas classes e a mesma lista.

### 4.1 — Trocar a identidade

1. Escolha um tema. Pode ser livros, doces, plantas, games ou outro.
2. Anote um produto físico e um digital que combinem com ele.
   Exemplos: livro e e-book; doce e livro digital de receitas; planta e guia digital.
3. Abra `app.py`.
4. Localize a linha `SHOWCASE_NAME = "My Showcase"`.
5. Mude somente o texto entre aspas. Para um exemplo de livros:

```python
SHOWCASE_NAME = "My Book Store"
```

6. Mude o texto entre aspas em `SHOWCASE_DESCRIPTION`.
7. Em `AUTHOR_NAME`, coloque seu nome. Nomes próprios podem manter sua grafia.
8. Aperte Ctrl+S.
9. Volte ao navegador da vitrine.
10. Aperte Ctrl+R.

**Resultado esperado:** novo título, descrição e autoria. Se continuar igual,
confira se salvou e se o servidor permanece aberto.

### 4.2 — Trocar os dados dos dois produtos

1. Em `app.py`, encontre o primeiro `PhysicalProduct(`.
2. Troque o texto de `name` e o de `description` por textos em inglês do seu tema.
3. Na linha `price=59.90,`, troque apenas `59.90` por `49.90` para experimentar.
4. Preserve o ponto decimal e a vírgula no fim da linha. Não coloque o preço
   entre aspas e não escreva `R$` no número.
5. Troque o texto de `pickup_location` pelo local de retirada.
6. Encontre `DigitalProduct(` e personalize `name`, `description`, `price` e
   `file_format`. Por exemplo, mantenha `"PDF"` para um e-book.
7. Mantenha `image="placeholder.svg"` nos dois por enquanto.
8. Salve e recarregue.

**Resultado esperado:** ainda existem dois cards, com seus dados.
O preço de teste do primeiro aparece como `R$ 49,90`: Python usa ponto no número
e `formatted_price()` prepara o texto em reais.

**Pausa C4:** mostre os dois produtos e indique qual é físico e qual é digital.
Aguarde. Refinar descrições longas fica para depois.

## C5 — Adicionar um produto e uma foto

**Objetivo:** criar o terceiro card a partir da lista e experimentar uma imagem local.

### 5.1 — Acrescentar o terceiro produto

1. Abra `app.py`.
2. Localize o início da lista: `products = [`.
3. Desça até o `]` que fecha essa lista. Ele fica antes de `@app.route("/")`.
4. Observe que o segundo produto termina com `),`.
5. Coloque o cursor depois dessa linha e antes de `]`.
6. Insira o bloco abaixo. Ele pertence à lista, não à função `index()`:

```python
    PhysicalProduct(
        name="Handmade bookmark",
        description="A handmade bookmark for your next chapter.",
        price=12.50,
        image="placeholder.svg",
        pickup_location="Neighborhood library",
    ),
```

7. Confira os espaços à esquerda: `PhysicalProduct(` deve alinhar com os
   outros dois produtos. Mantenha `),` no final do bloco.
8. Troque os valores para combinar com seu tema, preservando os nomes dos argumentos.
9. Salve e recarregue.

**Resultado esperado:** três cards, sem ter editado o HTML.
Se houver `SyntaxError`, confira aspas, vírgulas e se o bloco ficou dentro de
`[` e `]`. Se necessário, Ctrl+Z desfaz a última edição; salve e confira novamente.

### 5.2 — Usar uma foto local

1. Abra o Explorador de Arquivos do Windows e localize a foto preparada antes da aula.
2. Habilite a visualização das extensões no menu **Exibir/View** se necessário.
3. Confira o tipo real do arquivo. Não transforme PNG em JPG apenas trocando o nome.
4. Use um nome simples em inglês: por exemplo `book-cover.jpg` para um JPG.
5. Copie o arquivo.
6. Abra a pasta do seu projeto, depois `static` e depois `images`.
7. Cole a foto nessa pasta.
8. No VS Code, confira se ela aparece em `static/images`.
9. Em `app.py`, encontre o produto correspondente.
10. Troque `image="placeholder.svg",` por `image="book-cover.jpg",`.
    Se o seu arquivo tem outro nome ou extensão, escreva exatamente esse nome.
11. Salve e recarregue.

**Resultado esperado:** um card exibe a foto. Os demais ainda podem usar o
placeholder. Não há upload; você colocou o arquivo manualmente no projeto.
As letras maiúsculas, minúsculas e a extensão precisam corresponder ao arquivo.

**Pausa C5:** mostre três cards e a foto trocada. Se você ficou sem imagem,
avise o professor, mantenha `placeholder.svg` e anote a pendência.
As fotos personalizadas de todos os produtos continuam sendo parte da entrega final.

## C6 — Primeiras mudanças de HTML e CSS

**Objetivo:** aprender três alterações pequenas. Vamos parar depois delas.

### 6.1 — Um título no HTML

1. Abra `templates/index.html`.
2. Aperte Ctrl+F, digite `Explore the products` e aperte Esc depois de localizar.
3. Encontre esta linha:

```html
<h2 id="products-title">Explore the products</h2>
```

4. Troque apenas o texto entre `>` e `<`. Exemplo:

```html
<h2 id="products-title">Discover my collection</h2>
```

5. Mantenha `h2`, `id="products-title"` e `</h2>`.
6. Salve e recarregue.

**Resultado esperado:** o título da seção mudou. Os cards continuam automáticos.

### 6.2 — Uma cor no CSS

1. Abra `static/css/style.css`.
2. Localize `:root` no começo do arquivo.
3. Encontre `--accent: #245c48;`.
4. Para experimentar, substitua a linha por:

```css
    --accent: #5b3a83;
```

5. Preserve os dois hífens, os dois pontos, `#` e o ponto e vírgula.
6. Salve e recarregue. Se a cor não atualizar, tente Ctrl+F5.

**Resultado esperado:** os preços e o pequeno texto no cabeçalho ficam roxos.
Você pode escolher outra cor depois, verificando o contraste com o fundo.

### 6.3 — Uma borda no CSS

1. No mesmo arquivo, localize a regra `.card {`.
2. Dentro dela, encontre `border-radius: 1rem;`.
3. Troque apenas o valor, ficando:

```css
    border-radius: 0.5rem;
```

4. Salve e recarregue.
5. Observe os cantos dos cards: ficam menos arredondados.

**Pausa C6:** mostre título, cor e cantos. Pare a personalização visual aqui
durante a aula e aguarde o grupo. Não vamos redesenhar a página inteira juntos.

**Para depois:** fotos restantes, fontes do sistema, `padding` (espaço interno),
`gap` (espaço entre cards) e layout. Faça uma mudança por vez, seguindo os
[desafios e prompts de IA](../README.md#ia-como-apoio-ao-aprendizado).

## C7 — Ver os quatro princípios funcionando

**Objetivo:** entender o comportamento e fazer um erro controlado com correção.

### 7.1 — Ler a estrutura com o professor

1. Abra `models/product.py`.
2. Localize `class Product(ABC):`. Ela reúne o que todo produto tem em comum.
3. Localize `@abstractmethod` e `def delivery(self):`. As subclasses precisam
   implementar esse método; `Product` não pode ser instanciada diretamente.
4. Localize `@property` e `@price.setter`. Eles formam a interface de acesso
   ao preço e concentram a validação.
5. Localize `self._price`. O underscore indica uso interno por convenção;
   não torna o atributo inacessível.
6. Localize `class PhysicalProduct(Product):` e `class DigitalProduct(Product):`.
7. Veja `super().__init__(...)`: as subclasses reutilizam a estrutura da classe base.
8. Volte ao HTML e localize `{{ product.delivery() }}`.
9. Confira os cards: a chamada é a mesma, mas cada classe produz uma entrega diferente.

### 7.2 — Mudar somente as mensagens

1. Volte a `models/product.py`.
2. No método `delivery()` de `PhysicalProduct`, localize a linha com `Pickup at:`.
3. Substitua apenas essa linha por:

```python
        return f"Collect at: {self.pickup_location}."
```

4. No método `delivery()` de `DigitalProduct`, substitua a linha que começa com
   `return f"Digital delivery` por:

```python
        return f"Digital file in {self.file_format} format."
```

5. Preserve os nomes entre chaves, o `f` antes das aspas e os espaços à esquerda.
6. Salve e recarregue.

**Resultado esperado:** os produtos físicos usam a primeira mensagem e o
digital usa a segunda, com o local/formato que você definiu em `app.py`.
O HTML não precisou descobrir o tipo de cada objeto.

### 7.3 — Testar a validação e corrigir

1. Abra `app.py`.
2. Anote o preço atual do primeiro produto.
3. Troque esse preço por `-1`, mantendo a vírgula da linha.
4. Salve e recarregue.
5. Leia a mensagem no terminal ou na página: `The price cannot be negative.`
   O carregamento pode falhar. É o resultado esperado deste experimento.
6. Volte ao arquivo e restaure o preço não negativo que anotou.
7. Salve.
8. Recarregue.
9. Se o servidor tiver parado, clique no terminal, pressione Ctrl+C para encerrar
   qualquer execução restante e inicie novamente:

```powershell
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

10. Abra novamente a URL.

**Pausa C7:** a página deve funcionar outra vez. Mostre as entregas diferentes
e explique onde o preço foi validado. Não avance deixando o preço negativo.

**Para depois:** tente preço zero, mude `file_format` ou explore os desafios.
Uma alteração de regra ou arquitetura só entra por escolha consciente, depois
do caminho comum: explique o motivo e verifique. A personalização de aparência
não exige reescrever as classes.

## C8 — Conferir, registrar e enviar

**Objetivo:** guardar o progresso funcionando no seu próprio fork.

### 8.1 — Conferir a página e fazer a captura

1. Salve todos os arquivos editados.
2. Recarregue a página.
3. Conte os três cards.
4. Confira nomes, preços e entregas.
5. Diminua a largura da janela arrastando uma lateral.
6. Confira se os cards se reorganizam e se há texto ou imagem cortados.
7. Volte à largura normal.
8. No Windows, pressione `Win+Shift+S` e selecione a região da vitrine.
9. Abra a captura pela notificação e salve como `showcase.png`.
   Em macOS, use Shift+Cmd+4; em Linux, use a ferramenta de captura do sistema.
10. Guarde a imagem para enviar ao professor junto da URL. Ela não precisa
    fazer parte do repositório.

### 8.2 — Conferir o código

1. Clique no terminal onde o Flask está rodando.
2. Pressione Ctrl+C.
3. Espere a linha para digitar reaparecer.
4. Execute:

```powershell
.\.venv\Scripts\python.exe verify.py
```

**Resultado esperado:** `OK`. Se falhar, mostre a mensagem e a última mudança
ao professor antes de enviar. Este teste não substitui olhar a página.

### 8.3 — Configurar quem fez as alterações

1. Substitua `YOUR_NAME` pelo seu nome e `YOUR_EMAIL` pelo seu e-mail cadastrado
   no GitHub, mantendo as aspas:

```powershell
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
```

2. Execute uma linha por vez.
3. Confira o que foi salvo:

```powershell
git config --get user.name
git config --get user.email
```

Você faz isso uma vez por repositório. Essa configuração identifica commits;
não realiza login. Se quiser manter seu e-mail privado, use o endereço
`noreply` que o GitHub mostra em **Settings → Emails**.

### 8.4 — Conferir destino, fazer commit e push

1. Veja o que mudou:

```powershell
git status
```

2. Confira novamente o destino:

```powershell
git remote -v
```

3. Procure sua conta e seu repositório nas linhas de `origin`.
4. Se o destino estiver errado, corrija com seus dados e confira outra vez:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git remote -v
```

5. Prepare os arquivos alterados para o registro:

```powershell
git add .
```

6. Confira com `git status`. A pasta `.venv` não deve aparecer nos arquivos preparados.
7. Crie o registro local, chamado **commit**:

```powershell
git commit -m "Customize showcase with my theme"
```

8. Envie os commits ao remoto, chamado **push**:

```powershell
git push
```

9. Se houver pedido de autenticação, use sua conta e conclua o fluxo pelo
   navegador ou gerenciador de credenciais. A senha comum da conta não é uma
   senha de push; peça ajuda se ficar preso. Não coloque tokens no projeto.
10. Espere o envio terminar. Se falhar, leia o erro com o professor.
11. Abra a página do seu fork no GitHub.
12. Recarregue e confira se o commit `Customize showcase with my theme` aparece.
13. Copie a URL do fork para a entrega.

**Pausa C8:** mostre o commit no GitHub e informe o que ficou pendente.
Não é necessário abrir pull request, enviar para o professor como colaborador
ou hospedar a aplicação. O resultado de cada pessoa fica no próprio fork.

## Depois da aula

Use esta lista no seu ritmo:

- [ ] Melhorar os textos em inglês e a apresentação do README em português.
- [ ] Completar as fotos personalizadas de todos os produtos.
- [ ] Refinar cores, fontes, espaços e layout, uma alteração por vez.
- [ ] Conferir a página estreita novamente.
- [ ] Escrever uma explicação breve dos quatro princípios de POO.
- [ ] Guardar uma nova captura se o visual mudou.
- [ ] Executar `verify.py` e repetir `git add .`, commit e push.
- [ ] Enviar a URL, a captura e o tema conforme o prazo combinado.

No próximo dia, abra a mesma pasta no VS Code, abra o terminal e execute:

```powershell
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

Não repita o fork ou clone. Se estiver em outro computador, clone seu fork
e crie uma nova `.venv`. Na próxima atividade, faça outro fork do novo esqueleto,
em outra pasta, seguindo o mesmo ciclo guiado.
