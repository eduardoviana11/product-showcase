# Handoff de Sessão — Showcase ZUNO (`product-showcase`)

**Data:** 06 de novembro de 2026  
**Status do Projeto:** Funcional, modular, multi-páginas e 100% validado (8/8 testes passando no backend com Python `unittest`, build de produção gerado com sucesso no frontend via Vite + React Router).

---

## 1. Resumo Executivo da Sessão

Nesta sessão, avançamos em importantes evoluções de design, UX, navegação e arquitetura de componentes do frontend:
1. **Redesenho Completo da Hero Page:** Integração do novo plano de fundo `hero-background-2.png` com colagem fotográfica e encaixe perfeito em tela cheia (`100vh`), com posicionamento sob a barra de frete/navbar, área clicável única do cluster para a rota de novidades e sombras personalizadas para capas e vinil.
2. **Nova Tela de Loja / Artista (`/artista/:slug` e `/loja/:slug`):** Criador/loja como entidade navegável com perfil dedicado, avatar, badge e listagem unificada de todos os produtos (discos e objetos) daquele mesmo dono, com filtros por tipo, categoria e ordenação.
3. **Barra de Pesquisa com Modal de Sugestões e Botão Limpar (`X`):** Busca em tempo real com modal dropdown exibindo sugestões instantâneas, navegação por Enter para catálogo filtrado, fundo branco puro e botão customizado de `X` preto para limpeza rápida.
4. **Generalização da Tela de Catálogo/Busca:** Unificação das rotas `/discos`, `/discos?tab=new`, `/objetos` e `/busca` com barra de filtros em dropdowns cobrindo tipo, seção, categoria/gênero, artista/loja e ordenação.
5. **Aprimoramentos de UI/UX e Tipografia:**
   - Botões laterais do carrossel da Home alinhados verticalmente ao centro da div cinza da imagem do produto.
   - Remoção de scroll artificial no botão *"novas coleções"*, preparando a rota `/colecoes`.
   - Ajuste na tipografia do preço principal em `ProductDetail.jsx` para a fonte `Inter` proporcional com `tracking-tight`, corrigindo o espaçamento excessivo da fonte monoespaçada.
   - Simplificação do rodapé (`Footer.jsx`) com indicação de projeto educacional e link direto para o GitHub do autor (`github.com/eduardoviana11`).
   - Selo central do disco genérico (`VinylDisc.jsx`) simplificado para cor sólida sem textos.

---

## 2. Principais Entregas Realizadas

### 2.1 Hero Page em Tela Única (`100vh`) com `hero-background-2.png`
- **Arquivos:** [`frontend/src/pages/Home.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Home.jsx) e [`frontend/src/components/hero/AlbumCluster.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/hero/AlbumCluster.jsx).
- **Encaixe em Tela Única:** Altura do hero no desktop configurada com `lg:h-[calc(100vh-114px)]` somando `100vh` exatos junto à barra de frete e header.
- **Efeito sob a Navbar:** O canvas da colagem `16:9` sobe `-114px` para que o topo fique coberto pela navbar, fazendo o recorte de papel rasgado da esquerda sair da borda inferior do header.
- **Camada Clicável do Cluster:** A área do cluster à direita possui um link único cobrindo toda a colagem que redireciona para a tela de novidades (`/discos?tab=new`).
- **Sombras e Proporções dos Discos:**
  - Capa principal aumentada para `17.8% x 33.0%` sem sombra.
  - Demais capas com `shadow-[4px_4px_0px_#141512]`.
  - Vinil central com fundo escuro `bg-[#141512]`, escala `1.18` (eliminando a fresta de corte verde-limão) e sombra esfumada direcional `shadow-[8px_8px_20px_4px_rgba(20,21,18,0.75)]`.

### 2.2 Tela de Artista e Loja (`CreatorProfile.jsx`)
- **Arquivos:** [`frontend/src/pages/CreatorProfile.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/CreatorProfile.jsx), [`frontend/src/App.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/App.jsx) e [`frontend/src/utils/slug.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/utils/slug.js).
- **Roteamento:** Rotas `/artista/:slug` e `/loja/:slug`.
- **Card de Perfil:** Exibe avatar circular com capa do produto/monograma, badge de identificação (`ARTISTA / CRIADOR` ou `LOJA OFICIAL`), contagem de itens por formato e breadcrumb de navegação.
- **Listagem e Filtros:** Apresenta todos os itens (discos ou objetos) daquele mesmo autor/loja com filtros de Tipo, Categoria e Ordenação.
- **Links nos Produtos:** Tanto no card de produto (`ProductCard.jsx`) quanto na tela de detalhes (`ProductDetail.jsx`), clicar no nome do artista ou loja direciona para o seu respectivo perfil.

### 2.3 Busca com Modal e Barra de Pesquisa Refinada
- **Arquivo:** [`frontend/src/components/layout/Header.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Header.jsx).
- **Interior em Branco Puro:** Campo de input com fundo `#FFFFFF` contrastando com o cabeçalho.
- **Modal de Sugestões Instantâneas:** Dropdown interativo exibindo até 6 sugestões com miniatura, título, artista/categoria e preço.
  - Clicar na sugestão leva direto ao produto (`/produto/:id`).
  - Pressionar Enter (ou clicar na barra inferior do modal) abre a listagem com os filtros aplicados.
- **Botão Limpar Customizado (`X`):** Ícone SVG preto (`#141512`) de traço grosso e tamanho ampliado (`w-5 h-5`), limpando a busca com um clique e focando no campo.

### 2.4 Generalização da Tela de Catálogo/Busca
- **Arquivos:** [`frontend/src/pages/Discos.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Discos.jsx) e [`frontend/src/App.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/App.jsx).
- As rotas `/discos`, `/objetos` e `/busca` agora utilizam a mesma página generalizada de catálogo.
- Filtros em dropdowns:
  - **Termo de busca:** Input com botão `X` preto.
  - **Tipo:** Todos, Discos de Vinil, Objetos da Cena.
  - **Seção:** Todo o acervo, Novidades, Em destaque.
  - **Categoria:** Dropdown dinâmico com todos os gêneros e categorias.
  - **Artista / Loja:** Dropdown dinâmico com criadores e lojas.
  - **Ordenação:** Relevância, Menor preço, Maior preço, A-Z, Z-A.

### 2.5 Carrossel da Home e Tipografia de Preço
- **Carrossel ([`Carousel.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/Carousel.jsx)):** Botões laterais circulares com ícones de seta reposicionados verticalmente para `top-[calc((100%-118px)/2)] -translate-y-1/2`, perfeitamente alinhados ao meio da caixa cinza da foto do produto.
- **Preço Principal ([`ProductDetail.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/ProductDetail.jsx)):** Tipografia ajustada de `IBM Plex Mono` para `Inter` com `tracking-tight font-bold`, eliminando o espaçamento artificial entre números e vírgulas.
- **Disco Genérico ([`VinylDisc.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/shapes/VinylDisc.jsx)):** Centro limpo com cor sólida (#C5F43B), sem textos de RPM ou marca.
- **Footer ([`Footer.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Footer.jsx)):** Simplificado para layout minimalista com link para o GitHub do autor (`https://github.com/eduardoviana11`).

---

## 3. Estado Atual dos Arquivos Modificados

| Arquivo | Descrição das Modificações |
| :--- | :--- |
| [`frontend/src/pages/Home.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Home.jsx) | Hero em 100vh com `hero-background-2.png`, botão *"novas coleções"* sem scroll forçado. |
| [`frontend/src/components/hero/AlbumCluster.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/hero/AlbumCluster.jsx) | Overlay clicável cobrindo o cluster para `/discos?tab=new`, sombra circular difusa e escala corrigida no vinil. |
| [`frontend/src/pages/CreatorProfile.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/CreatorProfile.jsx) | Nova página de perfil de artista/loja agregando todos os seus discos e objetos. |
| [`frontend/src/pages/ProductDetail.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/ProductDetail.jsx) | Preço com fonte `Inter tracking-tight`, link do vendedor apontando para `getCreatorHref`. |
| [`frontend/src/components/ui/ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx) | Nome do criador/loja no subtítulo como link clicável para a página do artista/loja. |
| [`frontend/src/components/ui/Carousel.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/Carousel.jsx) | Botões laterais alinhados ao centro vertical da div de imagem do card. |
| [`frontend/src/components/layout/Header.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Header.jsx) | Input de busca branco, modal dropdown de sugestões em tempo real e botão de `X` preto maior. |
| [`frontend/src/pages/Discos.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Discos.jsx) | Catálogo unificado com filtros generalizados (Tipo, Seção, Categoria, Artista/Loja, Ordenação). |
| [`frontend/src/components/shapes/VinylDisc.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/shapes/VinylDisc.jsx) | Selo central limpo em cor sólida. |
| [`frontend/src/components/layout/Footer.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Footer.jsx) | Rodapé simplificado para projeto de estudos com link do GitHub. |
| [`frontend/src/utils/slug.js`](file:///d:/codigos/projetos/product-showcase/frontend/src/utils/slug.js) | Helpers `getCreatorName`, `getCreatorSlug` e `getCreatorHref`. |
| [`frontend/src/App.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/App.jsx) | Rotas `/artista/:slug` e `/loja/:slug`, unificação das rotas de catálogo e scroll ao topo simplificado. |

---

## 4. Sugestões de Skills para a Próxima Sessão

- `frontend-design`: Ao construir a futura tela de coleções (`/colecoes`), para manter estética de fanzine/editorial condizente com a identidade visual da ZUNO.
- `modern-web-guidance`: Boas práticas para formulários, filtros e micro-interações adicionais.

---

## 5. Como Executar e Validar

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
# Validar build de produção:
npm run build
# Executar servidor Vite de desenvolvimento:
npm run dev
# Acesse: http://localhost:5173
```
