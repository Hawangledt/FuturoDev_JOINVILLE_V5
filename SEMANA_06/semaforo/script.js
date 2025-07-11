let modoAutomatico = true; // Flag, indica se o modo automatico vai ficar ativo ou inativo
let solicitacaoPedestres = false;
let estadoAtual = 'verde'; // "Verde" -> "Amarelo" -> "Vermelho"
let contador = 0;

function acender(cor) {
    document.getElementById('vermelho').classList.remove("ativo");
    document.getElementById('amarelo').classList.remove("ativo");
    document.getElementById('verde').classList.remove("ativo");

    document.getElementById(cor).classList.add("ativo")
}

function desligar() {
    document.getElementById('vermelho').classList.remove("ativo");
    document.getElementById('amarelo').classList.remove("ativo");
    document.getElementById('verde').classList.remove("ativo");
}

function iniciarAutomatico() {
    modoAutomatico = true;
    estadoAtual = 'verde';
    maquinaEstados()
}

function desligarAutomatico() {
    modoAutomatico = false;
}

function solicitarModoPedestre() {
    solicitacaoPedestres = true;
}

function maquinaEstados() {

    // Se o modo automatico estiver desligado, encerra a maquina de estados
    if ( !modoAutomatico ) return;

    if (solicitacaoPedestres) {
        console.log("Solicitacao Recebida!", "Contador em: ", contador);
        console.log("Estado Atual: ", estadoAtual);
        if ( contador >= 3) {
            solicitacaoPedestres = false;
            contador = 0;
        } else {
            contador++
            console.log("Aumentando contador", "Contador novo em: ", contador);
        }
    } else {
        contador = 0 
    }

    switch (estadoAtual) {
        case 'verde':
            acender(estadoAtual);

            tempoLigado = 5000 // 5 segundos

            if (solicitacaoPedestres) {
                tempoLigado = 2000 // Se pedestre solicitou apoio, então muda o tempo.
            }

            setTimeout(() => {
                estadoAtual = 'amarelo';
                maquinaEstados();
            }, tempoLigado); // ms -> 5000 ms é igual á 5 segundos

            break;

        case 'amarelo':
            acender(estadoAtual);

            tempoLigado = 1000

            setTimeout(() => {
                estadoAtual = 'vermelho';
                maquinaEstados();
            }, tempoLigado);
                
            break;

        case 'vermelho':
            acender(estadoAtual);

            tempoLigado = 2000

            if ( solicitacaoPedestres ) {
                tempoLigado = 6000;
            }

            setTimeout(() => {
                estadoAtual = 'verde';
                maquinaEstados();
            }, tempoLigado);
            break;
    }

}



maquinaEstados()