# Assets de produtos e coleções

Coloque aqui as imagens locais. O backend encontra os arquivos pelo nome da pasta e do arquivo, sem precisar editar o `products.json`.

```text
backend/data/media/
├── products/
│   └── <id-do-produto>/        # o mesmo "id" do products.json
│       ├── cover.jpg           # capa principal (jpg, png, webp...)
│       ├── vinyl.png           # disco personalizado (opcional)
│       └── gallery/
│           ├── 01.jpg          # fotos extras do slider, em ordem alfabética
│           └── 02.jpg
└── collections/
    └── <id-da-coleção>/
        └── banner.jpg          # imagem da coleção (opcional)
```

Regras:

- `cover.*` substitui o campo `image` do produto e vira a primeira foto do slider.
- `vinyl.*` substitui `vinyl_image` e entra no slider.
- Arquivos de `gallery/` entram no slider depois da capa, ordenados pelo nome (use `01`, `02`, `03`...).
- `banner.*` é usado no cabeçalho da coleção na página `/colecoes`.
- URLs externas no campo `images` do `products.json` continuam funcionando.
- Extensões aceitas: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`.
- Os arquivos são servidos em `/api/media/<caminho>`, por exemplo `/api/media/products/igor/cover.jpg`.

## Dimensões e Proporções Recomendadas

| Tipo de Imagem | Proporção | Tamanho Recomendado | Observações |
|---|---|---|---|
| **Capa do Produto (`cover.*`)** | 1:1 (quadrado) | 800 × 800 px até 1200 × 1200 px | Capa de vinil ou foto principal do objeto |
| **Disco Vinil (`vinyl.*`)** | 1:1 (quadrado) | 800 × 800 px (fundo transparente `.png` ou `.webp`) | Usado na animação giratória |
| **Galeria (`gallery/XX.*`)** | 1:1 ou 4:3 | 800 × 800 px ou 1200 × 900 px | Fotos extras do produto |
| **Banner de Coleção (`banner.*`)** | ~4:1 (panorâmico) | **1200 × 300 px** a **1600 × 400 px** | Usa `object-cover`. Mantenha pontos de atenção nas laterais ou fundo, pois o texto fica sobreposto |

Para um produto novo, crie a pasta `products/<id>/gallery/` com o mesmo `id` do `products.json`.

