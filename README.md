# Boutique Bliss

Cole exatamente este prompt inteiro em uma única mensagem:

Crie uma loja virtual COMPLETA, profissional, responsiva e pronta para produção usando React + Vite + TypeScript.

IMPORTANTE: quero que você implemente TODAS as funcionalidades descritas abaixo agora, em uma única geração. Não deixe placeholders de funcionalidades para serem implementados posteriormente.

OBJETIVO

Criar uma loja de produtos importados com estrutura de e-commerce profissional, priorizando conversão e excelente experiência mobile.

A loja deve ter identidade visual própria, premium e moderna. Não copie logotipo, nome, textos institucionais ou identidade visual de nenhuma empresa existente.

CATÁLOGO

Crie o arquivo:

src/data/products.json

TODOS os produtos da loja devem ser carregados automaticamente desse arquivo.

Não quero produtos cadastrados diretamente dentro dos componentes React.

O sistema precisa aceitar centenas ou milhares de produtos dentro desse JSON.

Estrutura esperada:

{
  "products": [
    {
      "id": "001",
      "name": "Produto exemplo",
      "description": "Descrição do produto",
      "category": "Categoria",
      "brand": "Marca",
      "unit": "caixa",
      "price": 500,
      "promoPrice": 450,
      "image": "https://example.com/imagem.jpg",
      "images": [
        "https://example.com/imagem.jpg"
      ],
      "stock": 10,
      "sku": "ABC001",
      "bulkDiscountTiers": [
        {
          "minQty": 2,
          "maxQty": 2,
          "unitPrice": 430,
          "label": "2 unidades"
        }
      ]
    }
  ]
}

Caso algum campo não exista em determinado produto, a aplicação NÃO deve quebrar.

Crie TypeScript interfaces adequadas para os produtos.

PÁGINA INICIAL

Criar:

 header profissional;

 logo/nome temporário facilmente substituível;

 botão de menu;

 busca;

 ícone do carrinho com quantidade;

 banner principal;

 categorias;

 seção de ofertas;

 produtos em destaque;

 catálogo completo;

 footer.

CARDS DOS PRODUTOS

Cada card deve mostrar:

 imagem;

 categoria;

 nome;

 preço;

 preço anterior riscado quando houver promoção;

 selo OFERTA quando promoPrice for menor que price;

 marca quando disponível;

 botão “Ver produto”;

 botão “Adicionar ao carrinho”.

Os cards devem ser elegantes e extremamente bem ajustados para celular.

Desktop: grid responsivo.

Mobile: duas colunas quando houver espaço suficiente e uma coluna somente em telas muito pequenas.

BUSCA

A busca deve funcionar em tempo real pesquisando:

 nome;

 categoria;

 marca;

 descrição.

Não recarregar a página.

FILTROS

Gerar automaticamente categorias e marcas utilizando os próprios produtos do JSON.

Permitir filtrar por:

 categoria;

 marca;

 produtos em promoção;

 faixa de preço.

Adicionar opção “Todos”.

PÁGINA DO PRODUTO

Criar rota individual baseada no ID ou slug.

Deve possuir:

 imagem principal;

 galeria de imagens;

 nome;

 categoria;

 marca;

 descrição;

 preço original;

 preço promocional;

 quantidade;

 estoque;

 botão adicionar ao carrinho;

 botão comprar agora;

 produtos relacionados.

Se existirem bulkDiscountTiers, mostrar uma tabela ou cards com preço por quantidade.

Exemplo:

1 unidade — R$ X
2 unidades — R$ X cada
3 unidades — R$ X cada

O carrinho deverá calcular automaticamente o preço correto conforme a quantidade.

CARRINHO

Criar carrinho completo.

Permitir:

 adicionar produto;

 remover produto;

 alterar quantidade;

 limpar carrinho;

 mostrar imagem;

 mostrar nome;

 mostrar preço unitário;

 mostrar subtotal;

 mostrar total.

Salvar o carrinho no localStorage para não desaparecer ao atualizar a página.

Criar drawer lateral de carrinho e também página completa /carrinho.

FINALIZAÇÃO

Criar botão “Finalizar pedido pelo WhatsApp”.

Ao clicar, gerar automaticamente uma mensagem organizada contendo:

 nome dos produtos;

 quantidade;

 preço unitário;

 subtotal de cada item;

 valor total.

Criar uma constante fácil de editar para colocar posteriormente o número do WhatsApp da loja.

Não invente número real.

DESIGN

Quero aparência de e-commerce premium.

Características:

 layout clean;

 fundo claro;

 cards brancos;

 sombras suaves;

 bordas arredondadas;

 tipografia moderna;

 ótima hierarquia visual;

 animações discretas;

 botões com estados hover;

 skeleton/loading quando necessário;

 excelente responsividade.

Crie variáveis CSS ou configuração central para eu conseguir trocar facilmente:

 cor principal;

 cor secundária;

 nome da loja;

 logo;

 WhatsApp.

MOBILE FIRST

Essa loja terá grande parte dos acessos pelo celular.

Priorize especificamente:

 carregamento rápido;

 botões grandes;

 cards legíveis;

 menu lateral mobile;

 carrinho fácil de acessar;

 filtros mobile;

 navegação simples;

 nenhum conteúdo ultrapassando a largura da tela.

Teste visualmente os layouts para aproximadamente:

375px
430px
768px
1024px+

PERFORMANCE

Implementar:

 lazy loading de imagens;

 componentes reutilizáveis;

 tratamento de imagem quebrada;

 estados vazios;

 loading;

 React Router;

 código organizado;

 sem dependências desnecessárias.

ESTRUTURA

Organize aproximadamente:

src/components
src/pages
src/data
src/types
src/hooks
src/utils

Criar pelo menos:

Home
ProductPage
CartPage
Header
Footer
ProductCard
ProductGrid
Search
Filters
CartDrawer
QuantitySelector
BulkPriceDisplay

MUITO IMPORTANTE

Não crie apenas uma demonstração visual.

Todas as funcionalidades precisam funcionar.

O catálogo inteiro deve depender do arquivo src/data/products.json, porque posteriormente vou substituir esse arquivo por um catálogo grande.

Não use banco de dados neste momento.

Não use Supabase.

Não faça chamadas para APIs externas.

Não dependa de serviços externos para que o catálogo funcione.

Se o JSON tiver 500+ produtos, a loja deve continuar funcionando.

Crie inicialmente apenas 6 produtos fictícios para demonstração, porque depois substituirei products.json pelo catálogo definitivo.

Garanta que executar npm run build não gere erros TypeScript.

No final da implementação, revise todo o código e corrija eventuais erros antes de concluir.

Essa abordagem é melhor para sua conta grátis porque o Lovable faz a loja uma única vez. Depois você não precisa gastar prompt dizendo “adicione produto X”, “adicione produto Y” etc.

E tem uma vantagem maior: quando terminarmos o catálogo, você simplesmente troca:

products.json com 6 produtos fictícios

por

products.json com todos os produtos que você tem autorização para usar.

A loja inteira atualiza automaticamente — categorias, busca, preços, cards e páginas dos produtos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2daf0f38-7928-443f-a94b-9974cf2efcd1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
