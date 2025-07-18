

function simularRequisicaoPagamentosAPI() {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve("✅ Pagamento efetuado com sucesso!")
        }, 2000);
    });
}


async function confirmarPagamento() {
    const saida = document.getElementById('saida');
    saida.innerText = "🔄 Verificando status do pagamento . . ."

    try {
        const resposta = simularRequisicaoPagamentosAPI();
        saida.innerText = await resposta;
    } catch (error) {
        saida.innerText = "❌ Ocorreu um erro: " + error;
    }
}

function calculadora() {
    const a = "1";
    const b = 0;
    const saida = document.getElementById('saida');

    try {
        if (b !== 0) {
            const resultado = a / b;
            saida.innerText = "Resultado: " + resultado;
        } else {
            saida.innerText = "❌ Ocorreu um erro: b precisa ser diferente de 0!";
        }

    } catch (error) {
        saida.innerText = "❌ Ocorreu um erro: " + error;
    }    
}
