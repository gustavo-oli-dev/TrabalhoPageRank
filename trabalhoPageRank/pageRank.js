// PageRank - Algebra Linear com Aplicacoes (Anton e Rorres), secao 9.3
const LinearAlgebra = require("../biblioteca/LinearAlgebra");

const algebra = new LinearAlgebra();

// criterio de parada: para quando o erro ficar menor ou igual a isso
const tolerancia = 0.00001;

// junta os valores do vetor numa linha so, com as casas decimais pedidas
function vetorEmTexto(vetor, casasDecimais) {
    let texto = "";
    // coloca cada valor seguido de dois espacos
    for (let i = 0; i < vetor.dim; i++) {
        texto = texto + vetor.get(i).toFixed(casasDecimais) + "  ";
    }
    return texto;
}

// calcula os vetores centro e autoridade e mostra os sites em ordem decrescente
// matriz: matriz de adjacencia, linha i coluna j = 1 se o site i aponta pro site j
function pageRank(nome, matriz) {
    console.log("===== " + nome + " =====");

    const transposta = algebra.transpose(matriz);

    // vetor centro inicial (h0 no livro): soma de cada linha
    const centroInicial = algebra.somaDasLinhas(matriz);
    console.log("Vetor Centro:      " + vetorEmTexto(centroInicial, 0));

    // vetor autoridade inicial (a0 no livro): soma de cada coluna
    let autoridadeAnterior = algebra.somaDasLinhas(transposta);
    console.log("Vetor Autoridade:  " + vetorEmTexto(autoridadeAnterior, 0));

    let autoridade = autoridadeAnterior;

    // sem limite de iteracao, repete ate o erro ficar menor ou igual a tolerancia
    while (true) {
        // centro (hk no livro) = A * a, dividido pela norma
        const centroBruto = algebra.dot(matriz, autoridadeAnterior);
        const normaCentro = algebra.norma(centroBruto);
        // matriz sem nenhum link da norma 0, e nao da pra dividir por 0
        if (normaCentro === 0) {
            throw new Error("a matriz nao tem nenhum link (tudo 0), nao da pra calcular.");
        }
        const centro = algebra.times(1 / normaCentro, centroBruto);

        // autoridade (ak no livro) = A transposta * centro, dividido pela norma
        const autoridadeBruta = algebra.dot(transposta, centro);
        const normaAutoridade = algebra.norma(autoridadeBruta);
        autoridade = algebra.times(1 / normaAutoridade, autoridadeBruta);

        // erro = maior diferenca entre a autoridade nova e a anterior
        let erro = 0;
        for (let k = 0; k < autoridade.dim; k++) {
            const diferenca = Math.abs(autoridade.get(k) - autoridadeAnterior.get(k));
            if (diferenca > erro) {
                erro = diferenca;
            }
        }

        if (erro <= tolerancia) {
            break;
        }
        autoridadeAnterior = autoridade;
    }

    console.log("Solucao:           " + vetorEmTexto(autoridade, 5));

    // forma decrescente: guarda cada site com o seu peso
    const sites = [];
    for (let i = 0; i < autoridade.dim; i++) {
        sites.push({ numero: i + 1, peso: autoridade.get(i) });
    }

    // ordena do maior peso pro menor comparando com 5 casas,
    // assim no empate fica o site de numero menor primeiro
    sites.sort(function (siteA, siteB) {
        return Number(siteB.peso.toFixed(5)) - Number(siteA.peso.toFixed(5));
    });

    // monta o texto com os sites na ordem
    let ordem = "";
    for (let i = 0; i < sites.length; i++) {
        ordem = ordem + "site " + sites[i].numero + "  ";
    }
    console.log("Forma Decrescente: " + ordem);
    console.log("");
}

module.exports = pageRank;
