import { Pessoa } from "./pessoa.js";
import { Aluno } from "./aluno.js";

const form = document.getElementById("formPessoa");
const container = document.getElementById("cards");

form.addEventListener("submit",  (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const idade = parseInt(document.getElementById("idade").value);

        const pessoa = new Pessoa(nome, idade);
        criarCard(pessoa);
        form.reset();
})

function criarCard(instancia) {
    const card = document.createElement("div");
    card.classList.add("card");

    const paragrafo = document.createElement("p");
    paragrafo.innerText = `Pessoa ${instancia.nome} criada!`

    const btnApresentar = document.createElement("button");
    btnApresentar.innerText = "Apresentar";
    btnApresentar.onclick = () => {
        paragrafo.innerText = instancia.apresentar();
    };

    const btnEnvelhecer = document.createElement("button");
    btnEnvelhecer.innerText = "Envelhecer";
    btnEnvelhecer.onclick = () => {
        paragrafo.innerText = instancia.fazerAniversario();
    }

    const btnPromover = document.createElement("button");
    btnPromover.innerText = "Promover para Aluno";
    btnPromover.onclick = () => {
        const novoAluno = new Aluno(instancia.nome, instancia.idade);
        card.remove(); // Apagando o card da Pessoa!
        criarCard(novoAluno);
    }

    const btnEstudar = document.createElement("button");
    btnEstudar.innerText = "Estudar";
    if (instancia instanceof Aluno) {
        btnEstudar.style.display = "inline-block";
        btnEstudar.onclick = () => {
            paragrafo.innerText = instancia.estudar();
        }
    } else {
        btnEstudar.style.display = "none";
    }
    // btnEstudar.style.display = instancia instanceof Aluno ? "inline-block" : "none";

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir Pessoa";
    btnExcluir.style.backgroundColor = "#ff4444d1";
    btnExcluir.style.color = "white"
    btnExcluir.onclick = () => {
        card.remove();
    }



    card.appendChild(paragrafo);

    card.appendChild(btnApresentar);
    card.appendChild(btnEnvelhecer);
    card.appendChild(btnExcluir);

    card.appendChild(btnPromover);
    card.appendChild(btnEstudar);

    container.appendChild(card);
}
