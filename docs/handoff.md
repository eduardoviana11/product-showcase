# Handoff de Sessão — Showcase ZUNO (`product-showcase`)

**Data:** 23 de outubro de 2026  
**Status do Projeto:** Funcional, modular, multi-páginas e 100% validado (8/8 testes passando no backend com Python unittest, build de produção gerado com sucesso no frontend via Vite + React Router).

---

## 1. Resumo Executivo da Sessão

Nesta sessão, concluímos o refinamento visual e ergonômico da **Hero Page**, eliminamos bugs de renderização/hover no **AlbumCluster**, corrigimos o indicador de rota ativa no **Header**, atualizamos a hierarquia de POO no backend com `SubscriptionProduct` herdando de `DigitalProduct`, e desacoplamos os eventos e estilos do **ProductCard** em preparação para a futura página individual do produto.

---

## 2. Principais Entregas Realizadas

### 2.1 Refinamentos na Hero Page ([`frontend/src/pages/Home.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Home.jsx))
1. **Remoção da Tag Kicker Superior:**
   - Removida a tag fixa `"PARA OUVIR POR INTEIRO"`, permitindo que o título `<h1>` inicie diretamente no topo da coluna com impacto editorial limpo.
2. **Correção de Sobreposição Tipográfica (Diacríticos):**
   - Ajustada a altura de linha para `leading-[1.05]` e escala tipográfica balanceada (`text-[44px] sm:text-[62px] md:text-[72px] lg:text-[82px] xl:text-[92px] 2xl:text-[102px]`), eliminando completamente a colisão entre o acento agudo do `Á` em `"ESTÁ AQUI"` e a palavra `"FAVORITO"` na linha acima.
3. **Encaixe em Tela Única (Above the Fold):**
   - Container estruturado com `lg:min-h-[calc(100vh-112px)] flex flex-col justify-center` e paddings compactos, garantindo que toda a hero section (título, parágrafo, botões de ação e cluster de álbuns) caiba perfeitamente no viewport inicial de desktops e laptops sem exigir rolagem vertical.
4. **Alinhamento e Amplitude Horizontal:**
   - Texto ancorado à extrema-esquerda (`lg:justify-self-start`).
   - Cluster de álbuns posicionado à extrema-direita (`lg:justify-end`, `lg:ml-auto lg:mr-0`).
   - Espaçamento central ampliado (`gap-8 lg:gap-14 xl:gap-20`), fazendo a hero ocupar toda a extensão horizontal de `1440px`, em harmonia com o carrossel e as seções de coleções abaixo.

---

### 2.2 Estabilização e Animação do AlbumCluster ([`frontend/src/components/hero/AlbumCluster.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/hero/AlbumCluster.jsx))
1. **Eliminação de Desfoque e Vibração (Subpixel Jitter):**
   - Removidas as animações individuais de aumento e rotação (`hover:!scale-110`, `hover:rotate-0`) de cada capa, que provocavam recalculo de texturas no navegador e desfoque temporário ao mover o mouse.
   - Adicionadas propriedades de composição acelerada por hardware permanente (`will-change-transform`, `[transform:translateZ(0)]`, `[backface-visibility:hidden]`) no contêiner e nas imagens, retendo as texturas na GPU sem cintilação ou perda de nitidez no retorno do cursor.
2. **Animação Global e Rígida:**
   - Ao passar o mouse no cluster, todos os 5 discos e a etiqueta inclinada `COLEÇÃO EM DESTAQUE ↗` aumentam de escala juntos (`group-hover:scale-105`), agindo como um bloco coeso e unificado.
3. **Estabilidade de Chaves no React:**
   - Chaves dos slots estabilizadas com `key={`cluster-slot-${idx}`}`, impedindo que o React desmonte e recrie nós do DOM quando os dados do catálogo chegam via API.
4. **Escala Ampliada Moderadamente:**
   - Cluster ampliado para `max-w-[480px] xl:max-w-[520px]`, com o disco central em `w-46 h-46 xl:w-50 xl:h-50` e os discos periféricos em `w-30 h-30 xl:w-34 xl:h-34`.
   - Link mapeado diretamente para `/discos?filter=em-destaque`, ativando a aba de destaque no catálogo.

---

### 2.3 Correção de Rotas Ativas no Header ([`frontend/src/components/layout/Header.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Header.jsx))
- **Bug Corrigido:** Ao navegar para a página de Novidades (`/discos?tab=new`), tanto o link "Discos" quanto "Novidades" recebiam sublinhado preto ativo porque o `NavLink` padrão ignorava a query string.
- **Implementação:** Utilizado `useLocation()` para diferenciar com precisão o estado de cada rota:
  - **Novidades:** sublinhado apenas se `pathname === '/discos'` **e** `tab=new` estiver presente.
  - **Discos:** sublinhado apenas se `pathname === '/discos'` **e** `tab=new` não estiver presente.
  - **Objetos** e **Newsletter** mantêm o comportamento pontual em suas rotas correspondentes.

---

### 2.4 Hierarquia de POO no Backend ([`backend/models/product.py`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py) e [`backend/verify.py`](file:///d:/codigos/projetos/product-showcase/backend/verify.py))
- **Herança Ajustada:** A classe `SubscriptionProduct` agora herda explicitamente de `DigitalProduct`:
  ```python
  class SubscriptionProduct(DigitalProduct):
      def __init__(
          self,
          name,
          description,
          price,
          image,
          frequency="quinzenal",
          file_format="Email/PDF",
          ...
      ):
          super().__init__(
              name=name,
              description=description,
              price=price,
              image=image,
              file_format=file_format,
              ...
          )
          self.frequency = frequency
  ```
- **Polimorfismo e Encapsulamento Preservados:**
  - Método `delivery()` retorna: `f"Envio {self.frequency} direto para sua caixa de entrada."`
  - Serialização `to_dict()` preserva o tipo `"subscription"` e os atributos herdados sem verificações por `isinstance`.
  - Suíte de testes em `backend/verify.py` atualizada com asserção `self.assertIsInstance(subscription, DigitalProduct)`.
  - **Resultado:** 8 de 8 testes passando com sucesso.

---

### 2.5 Desacoplamento no ProductCard ([`frontend/src/components/ui/ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx))
1. **Texto Padronizado "Adicionar":**
   - Removida a alternância de texto no hover (`Ver disco` / `Ver objeto`). O botão exibe de forma consistente e permanente o formato `{formatted_price} · Adicionar ↗`.
2. **Hover Isolado no Botão:**
   - O efeito de fundo verde ácido (`hover:bg-[#C5F43B]`) foi desvinculado do hover do card e acoplado diretamente via CSS no `<button>`. Passar o mouse pelo card mantém o botão transparente; o verde só é ativado quando o cursor atinge o botão.
3. **Desacoplamento de Clique:**
   - O manipulador `onClick` foi removido da tag externa `<article>`, permanecendo exclusivamente no botão de adicionar ao carrinho.
   - Isso deixa a estrutura do card pronta para receber o link/navegação para a futura página individual do produto sem conflitar com a ação de compra rápida.

---

## 3. Estado Atual dos Arquivos Modificados

| Arquivo | Descrição das Modificações |
| :--- | :--- |
| [`backend/models/product.py`](file:///d:/codigos/projetos/product-showcase/backend/models/product.py) | `SubscriptionProduct` herda de `DigitalProduct`, chamada a `super()` e `from_dict`. |
| [`backend/verify.py`](file:///d:/codigos/projetos/product-showcase/backend/verify.py) | Asserção `assertIsInstance(subscription, DigitalProduct)`. 8/8 testes OK. |
| [`frontend/src/components/layout/Header.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/layout/Header.jsx) | Distinção entre `/discos` e `/discos?tab=new` via `useLocation()`. |
| [`frontend/src/components/ui/ProductCard.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx) | Texto fixo `Adicionar ↗`, hover exclusivo no botão e remoção do `onClick` no card. |
| [`frontend/src/components/hero/AlbumCluster.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/components/hero/AlbumCluster.jsx) | Escala global do cluster, aceleração por hardware, anti-blur e chaves estáticas. |
| [`frontend/src/pages/Home.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/pages/Home.jsx) | Ajuste de entrelinha, remoção do kicker, layout ancorado esquerda/direita e tela única. |
| [`frontend/src/App.jsx`](file:///d:/codigos/projetos/product-showcase/frontend/src/App.jsx) | Rota `/colecoes` com scroll automático e gerenciamento global do carrinho. |

---

## 4. Como Executar e Validar

### Backend:
```powershell
cd backend
# Executar suíte de testes unitários:
.\.venv\Scripts\python.exe verify.py
# Esperado: Ran 8 tests in ~0.5s -> OK

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

1. **Página Individual do Produto (Product Detail Page):**
   - Criar a rota dinâmica `/discos/:slug` ou `/produtos/:id` no React Router.
   - Criar a página de detalhes com visualização expandida da capa, vinil animado, ficha técnica completa, tracklist e botão de compra.
   - Envolver o `<article>` ou elementos do [ProductCard](file:///d:/codigos/projetos/product-showcase/frontend/src/components/ui/ProductCard.jsx) com o link para essa nova página.
2. **Gaveta Lateral do Carrinho (Cart Drawer / Slide-Over):**
   - Substituir o feedback atual via toast por um drawer lateral que liste os itens adicionados, quantidades, subtotal e botão conceitual de finalização.
3. **Commit Estruturado no Git:**
   - Registrar no repositório as melhorias visuais da Hero, correções de hover, refinamentos no Header e a evolução da herança em POO.
