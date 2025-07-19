

async function buscarPost() {

    const saida = document.getElementById("saida")
    saida.innerText = "🔄 Buscando!...";

    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
        const dados = await resposta.json();

        saida.innerText = `
            Titulo: ${dados.title}
            Corpo:  ${dados.body}
        `
    } catch (error) {
        saida.innerText = "Ocorreu um erro!";
        console.log(error);
    }
}