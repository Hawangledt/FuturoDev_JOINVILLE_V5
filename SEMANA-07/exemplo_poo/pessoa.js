export class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Olá meu nome é ${this.nome} e tenho ${this.idade} anos.`
    }

    fazerAniversario() {
        this.idade++;
        return `${this.nome} agora tem ${this.idade} anos.`;
    }
}