import { calcularTotal, extrairNomes, filtrarPromocoes } from './modules/carrinho.js';


const carrinho = [
    { nome: "Camiseta", preco: 29.90, promocao: true },
    { nome: "Calça Jeans", preco: 89.90, promocao: false },
    { nome: "Tênis", preco: 149.90, promocao: true },
    { nome: "Jaqueta", preco: 199.90, promocao: false },
    { nome: "Boné", preco: 39.90, promocao: true }
];

const resultado = document.getElementById("resultado")

document.getElementById("btnNomes").addEventListener("click", () => {
    const nomes = extrairNomes(carrinho); // gera a lista de nomes
    resultado.innerText = "Nomes: \n" + JSON.stringify(nomes, null, 2);
});
document.getElementById("btnPromocoes").addEventListener("click", () => {
    const promocoes = filtrarPromocoes(carrinho); //gerar uma lista dos produtos com promoção
    resultado.innerText = "Promoções: \n" + JSON.stringify(promocoes, null, 2);
});
document.getElementById("btnTotal").addEventListener("click", () => {
    const total =  calcularTotal(carrinho);
    console.log("Total: ", total);
    resultado.innerText = "Total: R$" + total;
});

