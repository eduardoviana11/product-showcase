# Handoff de Sessão — Showcase ZUNO (`product-showcase`)

**Data:** 04 de novembro de 2026  
**Status do Projeto:** Funcional, modular, multi-páginas e 100% validado (8/8 testes passando no backend com Python `unittest`, build de produção gerado com sucesso no frontend via Vite + React Router).

---

## 1. Resumo Executivo da Sessão

Nesta sessão, desenvolvemos e refinamos integralmente a **Página de Detalhes do Produto (`/produto/:id`)** no frontend, padronizamos as convenções tipográficas em toda a aplicação (removendo os pontos médios `·`), reorganizamos a hierarquia visual para um padrão comercial fluido e direto inspirado em grandes e-commerces, e expandimos a modelagem de dados no backend com suporte a múltiplos arquivos de imagem (`images`), slugs amigáveis e listas de faixas unificadas.

---

## 2. Principais Entregas Realizadas

### 2.1 Página Individual do Produto ([`frontend/src/pages/ProductDetail.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/ProductDetail.jsx) e [`frontend/src/App.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/App.jsx))
1. **Roteamento Dinâmico e Slugs Canônicos:**
   - Adicionada a rota `/produto/:id` no React Router com utilitário [`slug.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/utils/slug.js) (`slugifyProductName` e `getProductId`), permitindo acesso tanto por slug textual legível (`/produto/clube-da-esquina`) quanto por identificador definido no catálogo.
   - Navegação integrada a partir de qualquer [`ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx) ao clicar na capa, título ou subtítulo do item.
2. **Slider de Imagens com Miniaturas:**
   - Viewport principal em fundo branco puro (`bg-[#FFFFFF]`), bordas com cantos de arredondamento suave (`rounded-lg`), setas circulares e fotos sem corte/arredondamento interno (`rounded-none`).
   - Carrossel de miniaturas com contorno preto nítido (`border-2 border-[#141512]`) sem anéis coloridos. Suporte ao array `images` no JSON com fallback para vinil ou artes geradas.
3. **Coluna de Compra Unificada (Caixa Branca Integrada):**
   - Agrupamento de todas as seções comerciais (título, disponibilidade, artista/loja, preço, frete, seletor de quantidade, botão de compra, resumo técnico e faixas) em um único bloco branco com borda suave (`rounded-lg bg-[#FFFFFF] border border-[#141512]/15`).
4. **Hierarquia Editorial e Comercial:**
   - **Título:** Em destaque no topo da coluna (`text-2xl sm:text-3xl lg:text-4xl font-bold`).
   - **Disponibilidade:** `"Em estoque"` em verde forte (`text-[#00a650] font-bold`), sem caixa ou bordas ao redor.
   - **Artista / Loja:** Logo abaixo do estoque, em tom acinzentado (`text-[#141512]/75`), sem rótulos `"Artista:"` ou `"Categoria:"`. Itens de artistas apontam para `/artista/:slug`, de lojas parceiras para `/loja/:slug` e produtos oficiais ZUNO para `/objetos`.
   - **Preço e Entrega:** Preço à vista em `IBM Plex Mono`, parcelamento em até 6x sem juros e entrega padronizada em `"Retirada ou envio: Estúdio ZUNO"`.
5. **Seletor de Quantidade em Dropdown:**
   - Dropdown com largura fixa (`sm:w-[225px] shrink-0`), impedindo qualquer redimensionamento ou deslocamento lateral do botão de adicionar ao carrinho.
   - Opções de 1 a 5 unidades e opção `"Mais de 5 unidades"` que abre campo numérico dedicado com valor mínimo de 1.
   - Botão **ADICIONAR AO CARRINHO** sem sombras pesadas, com cantos arredondados (`rounded-xl`) e feedback direto.
6. **Resumo Técnico, Faixas e Seção de Descrição Completa:**
   - Seção *"O que você precisa saber sobre este produto"* com limitador de texto e barra acinzentada `"Ver descrição completa ↓"`, acionando rolagem suave para a âncora `#descricao-completa`.
   - Lista de faixas (tracklist) para vinis unificada em um único campo contínuo (sem divisão entre lados A e B).
   - Seção completa de especificações e texto longo fixada entre os produtos relacionados e o rodapé.
7. **Breadcrumb Navegável com Filtro de Gênero:**
   - Removido o botão redundante de voltar.
   - O gênero/categoria no caminho (`Início > Discos > Pop > Bad`) agora é um link interativo (`/discos?category=Pop`) que carrega a listagem de discos com o filtro ativo.

---

### 2.2 Remoção Global de Pontos Médios (`·`)
- Substituídos todos os caracteres `·` presentes em textos, títulos e badges por `-` ou vírgulas `,` em:
  - [`frontend/src/components/layout/Header.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Header.jsx)
  - [`frontend/src/components/layout/Footer.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Footer.jsx)
  - [`frontend/src/components/hero/AlbumCluster.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/hero/AlbumCluster.jsx)
  - [`frontend/src/components/ui/ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx)
  - [`frontend/src/pages/Home.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Home.jsx)
  - [`frontend/src/pages/Discos.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Discos.jsx)
  - [`frontend/src/pages/Objetos.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Objetos.jsx)
  - [`frontend/src/pages/Newsletter.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Newsletter.jsx)
  - [`frontend/src/data/showcaseData.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/data/showcaseData.js)
  - [`backend/data/products.json`](file:///d:/codigos/projetos/product-showcase/backend/data/products.json)
  - [`backend/models/product.py`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py)

---

### 2.3 Evolução do Backend e Modelos de POO ([`backend/models/product.py`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py))
1. **Identificadores e Fábrica de Instâncias:**
   - Função [`generate_product_slug`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py#L6-L13) para normalização Unicode e criação automática de identificadores URL-friendly a partir do nome.
   - Atributos `id`, `images` (lista de imagens adicionais) e `tracklist` integrados aos construtores e à serialização polimórfica `to_dict()`.
2. **Compatibilidade e Validação Unitária:**
   - Suíte de testes em [`backend/verify.py`](file:///d:/codigos/projetos/product-showcase/backend/verify.py) atualizada para validar `id` em todos os produtos serializados.
   - **Resultado:** 8 de 8 testes passando com sucesso.

---

## 3. Estado Atual dos Arquivos Modificados

| Arquivo | Descrição das Modificações |
| :--- | :--- |
| [`frontend/src/pages/ProductDetail.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/ProductDetail.jsx) | Tela do produto com slider, dropdown de quantidade, div branca unificada e descrição completa. |
| [`frontend/src/pages/Discos.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Discos.jsx) | Suporte a `category` via query param a partir do breadcrumb da página de produto. |
| [`frontend/src/components/ui/ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx) | Remoção das tags sobrepostas e link para `/produto/:id`. |
| [`frontend/src/utils/slug.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/utils/slug.js) | Utilitários de slug e resolução de identificadores para rotas. |
| [`backend/models/product.py`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py) | Suporte a `id`, `images`, `tracklist` e remoção de pontos médios em strings de entrega. |
| [`backend/data/products.json`](file:///d:/codigos/projetos/product-showcase/backend/data/products.json) | Identificadores explícitos, suporte a lista de fotos `images` e faixas contínuas. |
| [`frontend/src/data/showcaseData.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/data/showcaseData.js) | Dados de fallback sincronizados com as novas propriedades e pontuações. |
| [`backend/verify.py`](file:///d:/codigos/projetos/product-showcase/backend/verify.py) | Asserções de teste unitário para `id` na serialização. |

---

## 4. Como Executar e Validar

### Backend:
```powershell
cd backend
# Executar suíte de testes unitários:
.\.venv\Scripts\python.exe verify.py
# Esperado: Ran 8 tests in ~0.2s -> OK

# Executar a API Flask:
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

### Frontend:
```powershell
cd frontend
# Servidor de desenvolvimento:
npm run dev

# Validação do build de produção:
npm run build
# Esperado: 0 erros, bundle gerado com sucesso em dist/
```

---

## 5. Próximos Passos Sugeridos para a Próxima Sessão

1. **Páginas de Artistas e Lojas (`/artista/:slug` e `/loja/:slug`):**
   - Implementar as rotas dedicadas mapeadas a partir do link do vendedor na tela de produto.
   - Listar todos os álbuns e objetos associados àquele artista ou loja específica.
2. **Gaveta Lateral do Carrinho (Cart Drawer / Slide-Over):**
   - Substituir a notificação atual via toast por um drawer lateral interativo, permitindo alterar quantidades ou remover itens adicionados.
3. **Commit Estruturado no Git:**
   - Registrar no repositório a implementação da página de produto, as melhorias de UX e a eliminação global dos caracteres `·`.

---

## 6. Suggested Skills

Para a próxima sessão, recomenda-se que o próximo agente utilize as seguintes skills conforme o escopo da tarefa:
- **`frontend-design`**: Para manter a consistência visual, propor layouts fluidos e evitar designs genéricos ao construir as páginas de artista/loja ou o Cart Drawer.
- **`web-design-guidelines`**: Para auditar acessibilidade de modais/drawers, contraste, usabilidade em teclado e foco nos novos componentes interativos.
