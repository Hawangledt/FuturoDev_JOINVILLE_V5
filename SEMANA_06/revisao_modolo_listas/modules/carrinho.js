
export function calcularTotal(carrinho) {
    return carrinho.map(item => (item.preco)).reduce((soma, item) => soma + item)
    
}

export function filtrarPromocoes(carrinho) {
    return carrinho.filter(item => item.promocao)
}

export function extrairNomes(carrinho) {
    return carrinho.map(item => item.nome)
}