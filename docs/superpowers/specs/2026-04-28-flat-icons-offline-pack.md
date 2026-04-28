# Pacote de Ícones Offline (Flat Vetorial Infantil)

## Objetivo

Substituir imagens quebradas/placeholder e padronizar ícones para uso offline, gerando novos PNGs no estilo flat vetorial infantil (fundo transparente) para as categorias:

- `images/action-verbs/`
- `images/school-supplies/`
- `images/zoo-animals/`
- `images/vegetables/`

## Abordagens Consideradas

1. **Manter SVGs atuais**: rápido e confiável, porém não resolve o desejo de padronizar com um novo pacote visual.
2. **Gerar por API (Seedream/URL)**: dependente de API key e com risco de placeholders “image is generating”.
3. **Gerar localmente com canvas-design**: cria artes consistentes e offline sem depender de API externa.

Escolha: **canvas-design**.

## Direção Visual

### Estilo

- Flat vetorial infantil
- Fundo transparente (PNG)
- Acabamento recomendado: **flat + contorno suave**
  - Contorno em cor mais escura do próprio objeto (não preto puro)
  - Aumenta legibilidade em miniaturas

### Formato e Export

- Formato: PNG
- Tamanho alvo: 512×512 (ou 1024×1024 se necessário para mais detalhe), com conteúdo centralizado e margens de respiro
- Sem marca d’água

### Paleta

- Paleta alegre (primárias e secundárias suaves), com consistência dentro de cada categoria
- Contraste suficiente para funcionar em fundos claros e escuros

## Itens e Nomes de Arquivo

### Action Verbs

- `run.png`, `jump.png`, `swim.png`, `eat.png`, `sleep.png`, `play.png`, `read.png`, `write.png`

### School Supplies

- `pencil.png`, `pen.png`, `notebook.png`, `eraser.png`, `ruler.png`, `scissors.png`, `backpack.png`, `book.png`

### Zoo Animals

- `lion.png`, `elephant.png`, `giraffe.png`, `monkey.png`, `zebra.png`, `hippo.png`, `tiger.png`, `penguin.png`

### Vegetables

- `carrot.png`, `tomato.png`, `potato.png`, `broccoli.png`, `corn.png`, `cucumber.png`, `lettuce.png`, `onion.png`

## Integração no Projeto

- Substituir os PNGs atuais que estejam quebrados/placeholder pelos novos PNGs gerados.
- Manter as referências em [data.js](file:///workspace/js/data.js) apontando para `images/<categoria>/<arquivo>.png`.
- Ajustar referências de cards em [index.html](file:///workspace/index.html) se apontarem para `.svg` das categorias afetadas.

## Validação

- Abrir a página e verificar carregamento local sem 404
- Conferir visualmente 1–2 itens por categoria
- Conferir que não existem arquivos duplicados idênticos (hash repetido) entre itens diferentes
