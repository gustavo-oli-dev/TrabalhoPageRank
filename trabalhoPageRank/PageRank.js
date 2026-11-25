// PageRank - Algebra Linear com Aplicacoes (Anton e Rorres), secao 9.3
const LinearAlgebra = require("../biblioteca/LinearAlgebra");

const la = new LinearAlgebra();

// criterio de parada
const tol = 0.00001;
const maxIteracoes = 50;

// junta o vetor numa linha so
function vetorEmTexto(v, casas) {
    let texto = "";
    for (let i = 0; i < v.dim; i++) {
        texto = texto + v.get(i).toFixed(casas) + "  ";
    }
    return texto;
}

function pageRank(nome, A) {
    console.log("===== " + nome + " =====");

    // vetor centro
    const h0 = la.somaDasLinhas(A);
    console.log("Vetor Centro:      " + vetorEmTexto(h0, 0));

    // vetor autoridade
    let a0 = la.somaDasLinhas(la.transpose(A));
    console.log("Vetor Autoridade:  " + vetorEmTexto(a0, 0));

    let an = a0;
    let erro = 0;
    let iteracoes = 0;

    for (let i = 1; i <= maxIteracoes; i++) {
        iteracoes = i;

        const u = la.dot(A, a0);
        const r = la.norma(u);
        const hn = la.times(1 / r, u);

        const v = la.dot(la.transpose(A), hn);
        const s = la.norma(v);
        an = la.times(1 / s, v);

        // Erro = abs(an - a0), pega o maior
        erro = 0;
        for (let k = 0; k < an.dim; k++) {
            const diferenca = Math.abs(an.get(k) - a0.get(k));
            if (diferenca > erro) {
                erro = diferenca;
            }
        }

        if (erro <= tol) {
            break;
        } else {
            a0 = an;
        }
    }

    console.log("Iteracoes:         " + iteracoes + "  (erro " + erro.toFixed(6) + ")");
    console.log("Solucao:           " + vetorEmTexto(an, 5));

    // forma decrescente
    const sites = [];
    for (let i = 0; i < an.dim; i++) {
        sites.push({ site: i + 1, peso: an.get(i) });
    }
    // compara com 5 casas, assim no empate fica o site de numero menor primeiro
    sites.sort(function (x, y) {
        return Number(y.peso.toFixed(5)) - Number(x.peso.toFixed(5));
    });

    let ordem = "";
    for (let i = 0; i < sites.length; i++) {
        ordem = ordem + "site " + sites[i].site + "  ";
    }
    console.log("Forma Decrescente: " + ordem);
    console.log("");
}

module.exports = pageRank;
