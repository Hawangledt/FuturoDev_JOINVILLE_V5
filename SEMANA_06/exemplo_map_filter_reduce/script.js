const produtos = [
    {
        id: 1,
        nome: "Notebook Dell",
        estoque: true,
        preco: 2500.00
    },
    {
        id: 2,
        nome: "Mouse Logitech",
        estoque: false,
        preco: 89.90
    },
    {
        id: 3,
        nome: "Teclado Mecânico",
        estoque: true,
        preco: 299.99
    },
    {
        id: 4,
        nome: "Monitor 24'",
        estoque: true,
        preco: 899.00
    },
    {
        id: 5,
        nome: "Webcam HD",
        estoque: false,
        preco: 159.90
    }
];

// Eu preciso responder: Quais itens da lista estão em falta

console.log("Lista de produtos: ", produtos);



const produtosEmFalta = produtos.filter(produto => produto.estoque === false )

console.log("Produtos em falta: ", produtosEmFalta);

console.log("Uso do map: ", produtosEmFalta.map(produto => produto.nome));


const totalDosProdutosEmFalta = produtosEmFalta.map(produto => produto.preco).reduce((contador, precoProduto) => (contador + precoProduto))

console.log("Uso do reduce: ", totalDosProdutosEmFalta);


const resultado = produtos.filter(produto => produto.estoque === false).map(produto => produto.preco).reduce((
    (contador, precoProduto) => ( contador * precoProduto + 100 / 400 ** 2)
))

console.log("Resultado: ", resultado)
