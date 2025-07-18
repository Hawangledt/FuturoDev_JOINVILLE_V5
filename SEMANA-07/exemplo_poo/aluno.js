import {Pessoa} from "./pessoa.js"


export class Aluno extends Pessoa {
    constructor(nome, idade, curso = "JavaScript Avançado") {
        super(nome, idade);
        this.curso = curso;
    }

    estudar() {
        return `${this.nome} está estudando ${this.curso}.`
    }

    apresentar() {
        return `Sou aluno! Meu nome é ${this.nome}, tenho ${this.idade} anos e estudo ${this.curso}.`;
    }
}