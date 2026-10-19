# Preparação do computador — antes da aula

Faça esta parte antes do encontro. Na aula, usaremos o tempo para montar e
entender a vitrine juntos.

Você precisa de Python 3.9 ou superior, Git, VS Code, um navegador, internet para
instalar as dependências e uma conta no GitHub. Os arquivos e comandos ficam
em inglês; este guia explica as ações em português.

## 1. Abrir o terminal no Windows

1. Clique no menu Iniciar.
2. Digite `PowerShell`.
3. Abra o aplicativo PowerShell.
4. Clique na área onde é possível digitar.
5. Copie a primeira linha abaixo e aperte Enter:

```powershell
py --version
```

6. Anote o resultado.
7. Faça o mesmo com:

```powershell
git --version
```

8. Depois:

```powershell
code --version
```

Cada comando deve mostrar uma versão. Se uma ferramenta não for reconhecida,
instale-a pelos passos seguintes. Não precisa reinstalar o que já funciona.

## 2. Instalar as ferramentas no Windows

Escolha uma das duas opções. Não é necessário fazer as duas.

### Opção A — WinGet

1. No PowerShell, teste:

```powershell
winget --version
```

2. Se aparecer uma versão, continue. Se não aparecer, use a opção B.
3. Para instalar Python, execute:

```powershell
winget install --id Python.Python.3.13 --exact --source winget
```

4. Leia e responda às solicitações do instalador. Espere terminar.
5. Para instalar Git, execute:

```powershell
winget install --id Git.Git --exact --source winget
```

6. Espere terminar.
7. Para instalar VS Code, execute:

```powershell
winget install --id Microsoft.VisualStudioCode --exact --source winget
```

8. Espere terminar.
9. Feche PowerShell e VS Code, se estiverem abertos.
10. Abra o PowerShell novamente e repita as três verificações da etapa 1.

Python 3.13 é a versão escolhida para este exemplo; o mínimo do projeto é 3.9.
O comando instala a versão disponível da série 3.13.
[Referência do WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/install).

### Opção B — Instaladores oficiais

1. Abra a [página do Python para Windows](https://www.python.org/downloads/windows/).
2. Escolha um instalador compatível com seu Windows e baixe-o.
3. Abra o arquivo baixado.
4. Se essas opções aparecerem, inclua pip, o launcher `py` e a adição ao PATH.
   PATH permite ao terminal encontrar um programa pelo nome.
5. Conclua a instalação.
6. Abra a [página do Git para Windows](https://git-scm.com/downloads/win).
7. Baixe e abra o instalador. Mantenha a opção de usar Git pela linha de comando.
8. Conclua a instalação.
9. Abra a [página do VS Code](https://code.visualstudio.com/Download).
10. Escolha Windows, baixe e abra o instalador.
11. Se oferecida, marque a opção de adicionar ao PATH.
12. Conclua a instalação.
13. Feche e reabra o PowerShell.
14. Repita as três verificações da etapa 1.

Se `python --version` funcionar e `py --version` não funcionar, use
`python -m venv .venv` no lugar de `py -m venv .venv` durante a atividade.
Com mais de uma versão instalada, `py -3.13 -m venv .venv` seleciona
explicitamente Python 3.13, se ele estiver instalado.

## 3. Instalar a extensão Python

1. Abra o VS Code.
2. Aperte Ctrl+Shift+X para abrir **Extensions** (Extensões).
3. Na busca, digite `Python`.
4. Escolha a extensão cujo publicador é **Microsoft**.
5. Clique em **Install** (Instalar).
6. Aguarde a conclusão.

A extensão ajuda o editor; o Python precisa ter sido instalado na etapa anterior.
Se preferir instalar pelo terminal, o comando equivalente é:

```powershell
code --install-extension ms-python.python
```

## 4. Preparar a conta no GitHub

1. Abra [github.com/signup](https://github.com/signup) se ainda não tem conta.
2. Siga o cadastro e confirme seu e-mail.
3. Se já tem conta, faça login.
4. Anote seu nome de usuário, que aparece no endereço do seu perfil.
5. Guarde esse nome para substituir `YOUR_USERNAME` nos comandos da atividade.
6. Abra o link do catálogo enviado pelo professor e localize a atividade 1.

Na aula, você fará fork do esqueleto e escolherá o nome em **Repository name**.
Não precisa criar um repositório vazio antecipadamente.

Um repositório público pode ser clonado sem login, mas o push para seu fork
exige autenticação. Quando o Git solicitar, use o navegador ou gerenciador de
credenciais para entrar com sua conta.

## 5. Preparar uma foto

1. Escolha uma foto própria ou que você tenha autorização para usar.
2. Salve-a no computador, em um lugar que consiga encontrar.
3. Use um nome simples em inglês, como `book-cover.jpg`, respeitando o tipo real.
4. Não altere a extensão para tentar converter a imagem.
5. Deixe a foto separada; na etapa C5 vamos copiá-la para o projeto.

## macOS

1. Instale Python pelo [site oficial](https://www.python.org/downloads/macos/).
2. Instale VS Code pela [página de downloads](https://code.visualstudio.com/Download).
3. Abra o aplicativo Terminal.
4. Para instalar as ferramentas de linha de comando da Apple, que incluem Git, execute:

```bash
xcode-select --install
```

5. Conclua a janela de instalação. Se já estiverem instaladas, continue.
6. Abra o VS Code e aperte Cmd+Shift+P.
7. Execute **Shell Command: Install 'code' command in PATH**.
8. Reabra o Terminal e execute uma linha por vez:

```bash
python3 --version
git --version
code --version
code --install-extension ms-python.python
```

9. Confira Python 3.9 ou superior e as outras versões.
10. Siga as etapas de conta GitHub e foto acima.

Se `code` não for encontrado, consulte a
[documentação do VS Code](https://code.visualstudio.com/docs/configure/command-line).
Durante a atividade, use `.venv/bin/python` em vez do caminho do Windows.

## Linux — exemplo Ubuntu/Debian

1. Abra o Terminal.
2. Execute:

```bash
sudo apt update
```

3. Aguarde terminar.
4. Instale as ferramentas:

```bash
sudo apt install python3 python3-venv python3-pip git
```

5. Leia as solicitações e espere a instalação.
6. Confira:

```bash
python3 --version
git --version
```

7. Verifique Python 3.9 ou superior.
8. Baixe e instale o pacote adequado do [VS Code](https://code.visualstudio.com/Download).
9. Reabra o Terminal e execute:

```bash
code --version
code --install-extension ms-python.python
```

10. Siga as etapas de conta GitHub e foto acima.

Em outras distribuições, use o gerenciador de pacotes correspondente.
Dependências da aplicação serão instaladas na `.venv`, sem `sudo pip`.

## Conferência antes da aula

- [ ] Python e Git mostram suas versões.
- [ ] VS Code abre e a extensão Python está instalada.
- [ ] Consigo entrar na minha conta do GitHub.
- [ ] Tenho o link do catálogo ou do esqueleto correto.
- [ ] Tenho internet para clonar e instalar os requisitos.
- [ ] Tenho uma foto local ou combinei uma alternativa com o professor.

Siga para [C1 do roteiro guiado](walkthrough.md#c1--criar-sua-cópia-e-abrir-a-pasta).
Para as próximas atividades, as ferramentas continuam instaladas. Você criará
outro fork, clone e ambiente virtual conforme o novo guia.
