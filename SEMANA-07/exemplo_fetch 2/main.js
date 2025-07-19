async function buscarPost() {
    const container = document.getElementById("posts");
    container.innerHTML = "🔄 Carregando Posts!..."

    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
        const posts = await resposta.json(); // Lista de posts

        container.innerHTML = "";

        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post");

            div.innerHTML=`
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `

            container.appendChild(div);
        })
    } catch (error) {
        saida.innerText = "Ocorreu um erro!";
        console.log(error);
    }
}