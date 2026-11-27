// rodar: node trabalhoPageRank/main.js
const readline = require("readline");
const Matrix = require("../biblioteca/Matrix").Matrix;
const pageRank = require("./pageRank");
const questoes = require("./questoes");

// le o que a pessoa digita no terminal
const leitor = readline.createInterface({ input: process.stdin, output: process.stdout });

// fila das linhas digitadas, pra nao perder linha ao colar a matriz
const linhasGuardadas = [];
// funcao que entrega a linha pra pergunta que esta esperando resposta
let entregarLinha = null;

// cada linha digitada vai direto pra pergunta que esta esperando, ou fica guardada na fila
leitor.on("line", function (linha) {
    if (entregarLinha !== null) {
        const resolver = entregarLinha;
        entregarLinha = null;
        resolver(linha);
    } else {
        linhasGuardadas.push(linha);
    }
});

// fecha o programa quando a entrada acaba (ctrl+c)
leitor.on("close", function () {
    process.exit(0);
});

// mostra a pergunta e devolve a linha que a pessoa digitar
function perguntar(texto) {
    process.stdout.write(texto);
    if (linhasGuardadas.length > 0) {
        return Promise.resolve(linhasGuardadas.shift());
    }
    return new Promise(function (resolver) {
        entregarLinha = resolver;
    });
}

// roda o pagerank, se der erro mostra a mensagem sem fechar o programa
function rodarPageRank(nome, matriz) {
    console.log("");
    try {
        pageRank(nome, matriz);
    } catch (erro) {
        console.log("Erro: " + erro.message);
        console.log("");
    }
}

// pede o tamanho e as linhas da matriz de adjacencia e devolve a Matrix
async function digitarMatriz() {
    // repete ate digitar um tamanho valido
    let quantidadeSites = 0;
    while (true) {
        const resposta = await perguntar("Quantos sites tem a matriz? ");
        quantidadeSites = Number(resposta.trim());
        if (Number.isInteger(quantidadeSites) && quantidadeSites > 0) {
            break;
        }
        console.log("digite um numero inteiro maior que 0.");
    }

    console.log("Digite cada linha com " + quantidadeSites + " numeros (0 ou 1) separados por espaco.");
    console.log("Linha i, coluna j = 1 quer dizer que o site i aponta pro site j.");

    // pede uma linha por site
    const elementos = [];
    for (let i = 0; i < quantidadeSites; i++) {
        // repete a mesma linha ate ela vir certa
        while (true) {
            const resposta = await perguntar("Linha " + (i + 1) + ": ");
            const partes = resposta.trim().split(/[\s,]+/);

            if (partes.length !== quantidadeSites) {
                console.log("a linha precisa ter " + quantidadeSites + " numeros, foram "
                    + partes.length + ".");
                continue;
            }

            // confere se a linha so tem 0 e 1
            let linhaValida = true;
            for (let j = 0; j < partes.length; j++) {
                if (partes[j] !== "0" && partes[j] !== "1") {
                    linhaValida = false;
                }
            }
            if (!linhaValida) {
                console.log("use so 0 ou 1.");
                continue;
            }

            // guarda os numeros da linha no array da matriz
            for (let j = 0; j < partes.length; j++) {
                elementos.push(Number(partes[j]));
            }
            break;
        }
    }

    return new Matrix(quantidadeSites, quantidadeSites, elementos);
}

// troca a matriz de uma questao pela digitada e roda de novo
// a troca so vale enquanto o programa estiver aberto
async function trocarMatriz() {
    // repete ate escolher uma questao que existe
    let numeroQuestao = 0;
    while (true) {
        const resposta = await perguntar("Trocar a matriz de qual questao (1 a " + questoes.length + ")? ");
        numeroQuestao = Number(resposta.trim());
        if (Number.isInteger(numeroQuestao) && numeroQuestao >= 1 && numeroQuestao <= questoes.length) {
            break;
        }
        console.log("digite um numero de 1 a " + questoes.length + ".");
    }

    const questao = questoes[numeroQuestao - 1];
    console.log("Matriz atual da " + questao.nome + ":");
    console.log(questao.matriz.toString());

    questao.matriz = await digitarMatriz();
    rodarPageRank(questao.nome, questao.matriz);
}

// mostra o menu e faz o que foi escolhido, ate digitar 0
async function mostrarMenu() {
    while (true) {
        console.log("===== PageRank =====");
        // lista as questoes numeradas a partir de 1
        for (let i = 0; i < questoes.length; i++) {
            console.log((i + 1) + " - " + questoes[i].nome);
        }
        const opcaoTrocar = questoes.length + 1;
        console.log(opcaoTrocar + " - Trocar a matriz de adjacencia de uma questao");
        console.log("0 - Sair");

        const resposta = (await perguntar("Escolha: ")).trim();
        const opcao = Number(resposta);

        if (resposta === "0") {
            break;
        } else if (Number.isInteger(opcao) && opcao >= 1 && opcao <= questoes.length) {
            rodarPageRank(questoes[opcao - 1].nome, questoes[opcao - 1].matriz);
        } else if (opcao === opcaoTrocar) {
            await trocarMatriz();
        } else {
            console.log("opcao invalida.");
            console.log("");
        }
    }
    leitor.close();
}

mostrarMenu();
