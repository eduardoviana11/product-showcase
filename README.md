# Projeto 1 — My Showcase

Uma vitrine de produtos para aprender Python, orientação a objetos (POO), Flask,
Jinja, HTML, CSS e Git/GitHub. O esqueleto `1-product-showcase` já funciona com
dois produtos. Cada pessoa escolhe um tema, personaliza sua cópia e acrescenta
pelo menos um terceiro produto.

O trabalho é **individual**, mas a aula é **guiada em conjunto**: todos fazem a
mesma etapa em seus próprios projetos. Duas horas são um começo; os detalhes
podem ser concluídos depois. A aplicação é demonstrativa, sem vendas, carrinho,
pagamentos, login, banco de dados ou envio real de arquivos.

**Idioma:** este README e os guias de orientação estão em português. Código,
comentários, nomes de arquivos e repositórios, textos da página e exemplos de
commit continuam em inglês.

## Comece por aqui

O projeto é estruturado de forma desacoplada em:
- **`backend/`**: API REST em Flask com os modelos de Programação Orientada a Objetos e `.venv` próprio.
- **`frontend/`**: Aplicação React com Vite e Tailwind CSS v4.

### 1. Backend (Flask)
```powershell
cd .\backend
.\.venv\Scripts\python.exe -m flask --app app run --debug
```
Para rodar a verificação de testes do backend:
```powershell
cd .\backend
.\.venv\Scripts\python.exe verify.py
```

### 2. Frontend (React + Vite)
```powershell
cd .\frontend
npm install
npm run dev
```
Acesse `http://localhost:5173` no navegador.


1. **Antes da aula:** siga a [preparação do computador](docs/setup.md).
2. **Durante a aula:** abra o [passo a passo guiado](docs/walkthrough.md).
   Ele mostra onde clicar, o que editar, o resultado esperado e quando esperar.
3. **Depois da aula:** termine as personalizações indicadas no roteiro.
4. **Para quem ensina:** use o [guia do professor](docs/instructor-guide.md).
5. **Para organizar várias atividades:** use o [guia da coleção](docs/project-organization.md).

O roteiro detalhado é o caminho principal para iniciantes. O resumo de comandos
abaixo serve para consulta quando você já conhece as etapas.

## O que são Flask e Jinja?

**Flask** é um conjunto de ferramentas para criar aplicações web com Python.
Neste projeto, ele recebe o pedido do navegador para abrir `/`, executa a função
`index()` de `app.py` e devolve a página pronta. A associação entre um endereço
e uma função se chama **rota**. [Referência do Flask](https://flask.palletsprojects.com/en/stable/quickstart/).

**Jinja** é a ferramenta que preenche um modelo de página, chamado **template**.
Em `templates/index.html`, `{{ product.name }}` vira o nome de um produto. O
trecho `{% for product in products %}` repete o card para cada objeto da lista.
O Flask usa Jinja por meio de `render_template()` antes de enviar o HTML ao
navegador. [Referência do Jinja](https://jinja.palletsprojects.com/en/stable/templates/).

Outros nomes que aparecerão:

| Nome | O que faz aqui |
| --- | --- |
| Python | Linguagem em que escrevemos os dados e as regras. |
| HTML | Estrutura a página: títulos, parágrafos, imagens e cards. |
| CSS | Define cores, fontes, bordas, espaços e organização visual. |
| Backend | Parte executada pelo Python no servidor local. |
| Frontend | Parte que o navegador mostra, usando HTML e CSS. |
| Terminal | Lugar onde digitamos comandos e lemos respostas do computador. |
| `.venv` | Pasta que guarda um ambiente Python próprio deste projeto. |
| pip | Ferramenta que instala as dependências listadas em `requirements.txt`. |
| Git | Registra as alterações no computador. |
| GitHub | Guarda os repositórios remotos e permite fazer forks. |

O caminho de uma visita é:

```text
Navegador pede /
    → Flask executa index() em app.py
    → Python entrega os objetos ao Jinja
    → Jinja preenche index.html e gera HTML
    → navegador exibe o HTML e carrega CSS e imagens
```

Abrir `index.html` diretamente não executa esse caminho. Use o endereço do
Flask. A extensão Live Server não substitui o servidor Python.

## A mesma lógica, com a identidade de cada pessoa

Todos começam com a mesma organização:

| Parte | Responsabilidade que vamos manter |
| --- | --- |
| `app.py` | Configuração da vitrine, lista `products` e rota `/`. |
| `models/product.py` | Classes, regra do preço e métodos de entrega. |
| `templates/index.html` | Um loop Jinja que cria os cards. |
| `static/css/style.css` | Aparência da página. |
| `static/images/` | Imagens locais dos produtos. |

O tema pode ser livros, games, doces, roupas, plantas, artes digitais, cardápio
ou artesanato. Textos, imagens, cores e preços mudam; o caminho dos dados
continua igual. Mantenha pelo menos um `PhysicalProduct` e um `DigitalProduct`.

Na aula, preserve os nomes das classes, os métodos, a propriedade `price`, a
rota e as chamadas Jinja. A parte de frontend em grupo terá somente um título,
uma cor e uma borda. Os demais detalhes ficam para depois.

Quem quiser mudar a lógica poderá fazer isso **como extensão consciente após
o roteiro comum**: registre o que mudou, por quê e como verificou. Isso não é
necessário para entregar a atividade. Continue respeitando o escopo simples e
os exemplos dos quatro princípios; trocar a stack ou construir uma loja real
não faz parte dos desafios deste MVP.

Para novas atividades, vamos repetir o fluxo de preparação, fork, execução,
pequenas mudanças, conferência, commit e push. O novo README explicará qualquer
diferença de regra ou dependência. O projeto 2 ainda é um placeholder.

## Requisitos e preparação

Use **Python 3.9 ou superior**, **Flask 3.1.x**, Git, VS Code e um navegador.
A extensão Python da Microsoft ajuda no editor. A instalação das ferramentas
deve acontecer antes da aula; o [guia de preparação](docs/setup.md) traz os passos.

A instalação inicial precisa de internet. Depois, a aplicação usa arquivos
locais e fontes do sistema. Jinja e as outras dependências vêm com a instalação
dos requisitos; não é preciso instalar Flask globalmente. Veja os
[requisitos oficiais do Flask](https://flask.palletsprojects.com/en/stable/installation/).

## Resumo de instalação e execução

Primeiro, faça **Fork** do esqueleto no GitHub para sua própria conta.
Escolha o nome em **Repository name**, como `1-book-store`.
Troque `YOUR_USERNAME` pela sua conta e `YOUR_REPOSITORY` pelo nome escolhido.

No PowerShell, execute uma linha por vez e espere terminar:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\jonathan-sales-programming\projects"
Set-Location "$env:USERPROFILE\jonathan-sales-programming\projects"
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
git remote -v
code .
```

Confira se `origin` aponta para **seu fork**. Na pasta que contém `app.py`:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pip check
.\.venv\Scripts\python.exe verify.py
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

Abra **http://127.0.0.1:5000** no navegador. Pare o servidor com **Ctrl+C**
no terminal em que ele está rodando. `--debug` é para desenvolvimento local.

Não é necessário ativar a `.venv`. No VS Code, use `Ctrl+Shift+P` →
**Python: Select Interpreter** → `.venv\Scripts\python.exe`.
O [roteiro guiado](docs/walkthrough.md) explica cada comando, a escolha do
interpretador e o que fazer se a tela não abrir.

Cada computador e cada atividade precisa de sua própria `.venv`. Essa pasta
não vai para o GitHub e não deve ser copiada de outro projeto.

Em macOS/Linux, siga os mesmos passos de fork e use:

```bash
mkdir -p ~/jonathan-sales-programming/projects
cd ~/jonathan-sales-programming/projects
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
git remote -v
code .
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m pip check
.venv/bin/python verify.py
.venv/bin/python -m flask --app app run --debug
```

Se já clonou, entre na pasta existente e comece pela criação da `.venv`.
Se `code .` falhar, abra a pasta pelo menu do VS Code. Nos demais comandos
dos guias, use `.venv/bin/python` no lugar de `.\.venv\Scripts\python.exe`.
A preparação de cada sistema está em [setup.md](docs/setup.md).

## O que vamos fazer juntos e depois

| Marco | Em conjunto | Depois, individualmente |
| --- | --- | --- |
| C1 | Fork, clone e pasta certa no VS Code. | Organizar os links pessoais. |
| C2 | Criar ambiente e abrir a versão original. | Repetir a execução sem ajuda. |
| C3 | Identificar Flask, Jinja, HTML, CSS e os dados. | Reler os arquivos com calma. |
| C4 | Trocar identidade e os dados dos dois produtos. | Refinar os textos. |
| C5 | Adicionar o terceiro produto e trocar uma imagem. | Completar as fotos próprias. |
| C6 | Alterar um título HTML, uma cor e uma borda CSS. | Refinar fontes, espaços e layout. |
| C7 | Observar POO, experimentar preço negativo e corrigir. | Explorar outros exemplos. |
| C8 | Conferir, fazer commit e push no próprio fork. | Terminar a entrega e enviar novos commits. |

Ao chegar a um marco, mostre o resultado e aguarde o professor.
Se terminar antes, releia o que mudou; acompanhe o grupo sem iniciar outra
etapa. As instruções completas estão no [roteiro da aula](docs/walkthrough.md).

## Onde aparecem os quatro princípios de POO?

| Princípio | Exemplo no projeto |
| --- | --- |
| Abstração | `Product(ABC)` reúne o que os produtos têm em comum e exige `delivery()` com `@abstractmethod`. Não pode ser instanciada diretamente. |
| Encapsulamento | `price` oferece getter e setter. O setter valida tanto o construtor quanto atribuições posteriores. `_price` é interno por convenção; o underscore não bloqueia seu acesso. |
| Herança | `PhysicalProduct` e `DigitalProduct` reutilizam a classe base com `super().__init__()`. |
| Polimorfismo | O template chama `product.delivery()` da mesma forma para ambos; cada subclasse produz sua mensagem, sem testar tipos no HTML. |

Preços são números Python como `59.90`. A apresentação permanece em reais:
`R$ 59,90`. A lista fica em memória, definida no código, sem persistência.

## Desafios opcionais

Comece estes desafios depois do percurso comum. Não é preciso terminar todos.

| Nível | Possibilidades |
| --- | --- |
| Básico | Completar três produtos, fotos próprias, identidade e cores. |
| Intermediário | Adicionar categoria e exibi-la no HTML; melhorar responsividade; criar método de desconto que retorna outro preço sem alterar o original. Defina regras, como percentual de 0 a 100 e rejeição de outros valores. |
| Avançado | Nova subclasse com entrega própria; filtro de categoria com Flask e formulário HTML GET; leitura de JSON que cria objetos das subclasses. |

Essas extensões não estão implementadas no esqueleto. Registre sua intenção
antes de alterar a lógica e consiga explicar o resultado.

## IA como apoio ao aprendizado

Peça uma mudança pequena, leia a explicação, aplique, execute e confira.
Prompts para usar depois da demonstração do professor:

> Estou aprendendo HTML e CSS. Explique em português este trecho. Ajude-me a mudar só a borda dos cards, indicando o arquivo e a linha a localizar. Mantenha código, comentários e textos da página em inglês. Preserve o Jinja, as classes CSS e a lógica Python. Não adicione JavaScript nem frameworks.

> Quero uma vitrine com o tema [TEMA]. Sugira uma paleta com bom contraste e explique em português qual variável CSS mudar primeiro. Vamos alterar uma coisa por vez.

> Explique em português o que Flask e Jinja fazem neste projeto. Mostre como um produto criado em app.py chega ao card, usando os nomes existentes em inglês.

> Já concluí o roteiro comum e quero experimentar uma categoria. Oriente em etapas, mantendo a estrutura atual e os quatro princípios. Explique cada mudança em português e escreva o código em inglês.

Não substitua um arquivo inteiro por uma resposta da IA sem entender as mudanças.

## Entrega individual

Ao terminar a atividade, cada pessoa entrega:

- URL do próprio fork com os commits publicados.
- Screenshot da página funcionando localmente e indicação do tema.
- Pelo menos três produtos, sendo um físico e um digital.
- Imagens e identidade visual personalizadas.
- Explicação breve dos quatro princípios no código.

O fim da aula é um ponto de progresso; o professor combina o prazo para o que
faltar. Não é preciso adicionar alunos como colaboradores nem abrir pull request.
Publicar código no GitHub não hospeda o Flask; GitHub Pages não executa este
backend. Não exigimos hospedagem pública.

## Solução de problemas

| Sintoma | Primeiro passo |
| --- | --- |
| `py` não encontrado | Reabra o terminal depois de instalar Python. Se `python --version` funcionar, use `python -m venv .venv`. |
| `app.py` ou `.venv` não encontrado | Confira a pasta com `Get-Location` e `Test-Path .\app.py`; entre no clone correto. |
| `No module named flask` | Use o executável da `.venv` para instalar os requisitos e iniciar o servidor. |
| Erro em `Activate.ps1` | Use os comandos deste guia, que dispensam ativação. |
| `No module named pip` na `.venv` | Rode `.\.venv\Scripts\python.exe -m ensurepip --upgrade` e repita a instalação. |
| Falta de `venv`/`ensurepip` no Ubuntu/Debian | Instale `python3-venv` conforme a preparação. |
| Chaves Jinja na página | Abra http://127.0.0.1:5000 pelo Flask, não o arquivo HTML. |
| Página inacessível | Confira se o servidor está rodando e se a URL usa a porta mostrada no terminal. |
| Foto não aparece | Confira pasta, nome, extensão e letras maiúsculas; recarregue. |
| Mudança não aparece | Salve com Ctrl+S, confira o terminal e recarregue; tente Ctrl+F5 para CSS em cache. |
| `SyntaxError` | Confira aspas, vírgulas, colchetes e espaços no começo das linhas. Desfaça a última edição com Ctrl+Z se necessário. |
| `ValueError` de preço | Corrija para um número não negativo com ponto decimal, como `59.90`. |
| Clone diz `destination path ... already exists` | Se já é seu clone, entre nele; não clone de novo. |
| Clone trouxe só uma lista de atividades | Volte ao catálogo e faça fork do esqueleto da atividade. |
| Git pede nome/e-mail | Configure a autoria conforme C8 do roteiro. |
| Push sem permissão | Confira `git remote -v` e a conta autenticada. |
| Push rejeitado por mudanças remotas | Peça ajuda para conciliar as alterações; não force o envio. |

Se a porta 5000 estiver ocupada, pare o servidor anterior ou use:

```powershell
.\.venv\Scripts\python.exe -m flask --app app run --debug --port 5001
```

Abra então http://127.0.0.1:5001. Ao pedir ajuda, mostre a etapa atual, o comando
executado e a mensagem completa.

## Arquivos para consulta

| Arquivo | Função |
| --- | --- |
| `verify.py` | Verificações com `unittest` e o test client do Flask. |
| `requirements.txt` | Dependências do projeto. |
| `.gitignore` | Mantém `.venv`, caches e arquivos locais fora do Git. |
| [Roteiro guiado](docs/walkthrough.md) | Passos C1 a C8, com resultados e pausas. |
| [Guia do professor](docs/instructor-guide.md) | Cronograma, apoio e publicação do esqueleto. |
| [Organização dos projetos](docs/project-organization.md) | Catálogo, nomes, forks e versões pessoais. |
