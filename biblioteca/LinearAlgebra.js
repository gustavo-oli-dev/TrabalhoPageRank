// aqui ficam as contas, so recebe Matrix e Vector e devolve o resultado
// os metodo aceitam Matrix ou Vector e conferem com instanceof la dentro
const AlgebraLinearErro = require("./AlgebraLinearErro");
const Matrix = require("./Matrix").Matrix;
const QUASE_ZERO = require("./Matrix").QUASE_ZERO;
const Vector = require("./Vector");

class LinearAlgebra {

    // transpose que o trabalho pede, troca as linha pelas coluna
    transpose(a) {
        if (a instanceof Matrix) {
            // as dimensao entram trocada, uma 2x3 vira 3x2
            const resultado = this.matrizDeZeros(a.cols, a.rows);
            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.cols; j++) {
                    resultado.set(j, i, a.get(i, j));
                }
            }
            return resultado;
        }

        if (a instanceof Vector) {
            const resultado = this.matrizDeZeros(1, a.dim);
            for (let i = 0; i < a.dim; i++) {
                resultado.set(0, i, a.get(i));
            }
            return resultado;
        }

        throw new AlgebraLinearErro("transpose espera uma Matrix ou um Vector.");
    }

    // sum que o trabalho pede, soma posicao por posicao
    sum(a, b) {
        if (a instanceof Matrix && b instanceof Matrix) {
            if (a.rows !== b.rows || a.cols !== b.cols) {
                throw new AlgebraLinearErro("não dá para somar uma matriz "
                    + a.rows + "x" + a.cols + " com uma matriz " + b.rows + "x" + b.cols
                    + "; as duas precisam ter o mesmo tamanho.");
            }

            const resultado = this.matrizDeZeros(a.rows, a.cols);
            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.cols; j++) {
                    resultado.set(i, j, a.get(i, j) + b.get(i, j));
                }
            }
            return resultado;
        }

        if (a instanceof Vector && b instanceof Vector) {
            if (a.dim !== b.dim) {
                throw new AlgebraLinearErro("não dá para somar um vetor de dimensão "
                    + a.dim + " com um de dimensão " + b.dim
                    + "; as dimensões precisam ser iguais.");
            }

            const resultado = this.vetorDeZeros(a.dim);
            for (let i = 0; i < a.dim; i++) {
                resultado.set(i, a.get(i) + b.get(i));
            }
            return resultado;
        }

        throw new AlgebraLinearErro("sum espera duas matrizes ou dois vetores;"
            + " não dá para misturar os dois tipos.");
    }

    // times que o trabalho pede, multiplica posicao por posicao
    // cuidado: nao e a multiplicacao de matriz, aquela e o dot
    times(a, b) {
        // se o primeiro for numero, e multiplicacao por escalar
        if (typeof a === "number") {
            if (b instanceof Matrix) {
                const resultado = this.matrizDeZeros(b.rows, b.cols);
                for (let i = 0; i < b.rows; i++) {
                    for (let j = 0; j < b.cols; j++) {
                        resultado.set(i, j, a * b.get(i, j));
                    }
                }
                return resultado;
            }

            if (b instanceof Vector) {
                const resultado = this.vetorDeZeros(b.dim);
                for (let i = 0; i < b.dim; i++) {
                    resultado.set(i, a * b.get(i));
                }
                return resultado;
            }

            throw new AlgebraLinearErro(
                "times com escalar espera uma Matrix ou um Vector depois dele.");
        }

        if (a instanceof Matrix && b instanceof Matrix) {
            if (a.rows !== b.rows || a.cols !== b.cols) {
                throw new AlgebraLinearErro("não dá para multiplicar elemento a"
                    + " elemento uma matriz " + a.rows + "x" + a.cols + " com uma matriz "
                    + b.rows + "x" + b.cols + "; as duas precisam ter o mesmo tamanho."
                    + " Para multiplicar matrizes use dot.");
            }

            const resultado = this.matrizDeZeros(a.rows, a.cols);
            for (let i = 0; i < a.rows; i++) {
                for (let j = 0; j < a.cols; j++) {
                    resultado.set(i, j, a.get(i, j) * b.get(i, j));
                }
            }
            return resultado;
        }

        if (a instanceof Vector && b instanceof Vector) {
            if (a.dim !== b.dim) {
                throw new AlgebraLinearErro("não dá para multiplicar um vetor de"
                    + " dimensão " + a.dim + " com um de dimensão " + b.dim
                    + "; as dimensões precisam ser iguais.");
            }

            const resultado = this.vetorDeZeros(a.dim);
            for (let i = 0; i < a.dim; i++) {
                resultado.set(i, a.get(i) * b.get(i));
            }
            return resultado;
        }

        throw new AlgebraLinearErro("times espera um escalar e uma Matrix, ou"
            + " duas matrizes, ou dois vetores.");
    }

    // dot que o trabalho pede, a multiplicacao de matriz de verdade
    // resultado[i][j] = a[i][0]*b[0][j] + a[i][1]*b[1][j] + ...
    dot(a, b) {
        // matriz vezes vetor, usado no pagerank (A*a0 e A'*hn)
        if (a instanceof Matrix && b instanceof Vector) {
            if (a.cols !== b.dim) {
                throw new AlgebraLinearErro("não dá para multiplicar uma matriz "
                    + a.rows + "x" + a.cols + " por um vetor de dimensão " + b.dim + ".");
            }
            const resultado = this.vetorDeZeros(a.rows);
            for (let i = 0; i < a.rows; i++) {
                let soma = 0;
                for (let k = 0; k < a.cols; k++) {
                    soma = soma + a.get(i, k) * b.get(k);
                }
                resultado.set(i, soma);
            }
            return resultado;
        }

        if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
            throw new AlgebraLinearErro("dot espera duas matrizes ou uma matriz e um vetor.");
        }
        if (a.cols !== b.rows) {
            throw new AlgebraLinearErro("não dá para multiplicar uma matriz "
                + a.rows + "x" + a.cols + " por uma matriz " + b.rows + "x" + b.cols
                + "; o número de colunas da primeira (" + a.cols + ") tem que ser"
                + " igual ao número de linhas da segunda (" + b.rows + ").");
        }

        const resultado = this.matrizDeZeros(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let soma = 0;
                // o k percorre a linha de a e a coluna de b junto
                for (let k = 0; k < a.cols; k++) {
                    soma = soma + a.get(i, k) * b.get(k, j);
                }
                resultado.set(i, j, soma);
            }
        }
        return resultado;
    }

    // gauss que o trabalho pede, zera tudo que ta abaixo do pivo
    gauss(a) {
        return this.escalonar(a, false);
    }

    // gaussJordan, faz o pivo virar 1 e zera tambem o que ta acima
    gaussJordan(a) {
        return this.escalonar(a, true);
    }

    // o escalonamento, os dois metodo de cima chamam ele
    // reduzida false = eliminacao gaussiana, true = gauss-jordan
    escalonar(a, reduzida) {
        if (!(a instanceof Matrix)) {
            throw new AlgebraLinearErro("a matriz não foi informada.");
        }

        // trabalha numa copia pra nao estragar a matriz que chegou
        const matriz = this.copiar(a);
        let linhaDoPivo = 0;

        for (let coluna = 0; coluna < matriz.cols; coluna++) {
            if (linhaDoPivo >= matriz.rows) {
                break;
            }

            // pega o maior valor em modulo, pra nao dividir por numero pequeno
            let linhaDoMaiorValor = linhaDoPivo;
            for (let i = linhaDoPivo + 1; i < matriz.rows; i++) {
                const atual = Math.abs(matriz.get(i, coluna));
                const maior = Math.abs(matriz.get(linhaDoMaiorValor, coluna));
                if (atual > maior) {
                    linhaDoMaiorValor = i;
                }
            }

            // coluna toda zerada, nao tem pivo aqui
            if (Math.abs(matriz.get(linhaDoMaiorValor, coluna)) < QUASE_ZERO) {
                continue;
            }

            this.trocarLinhas(matriz, linhaDoPivo, linhaDoMaiorValor);

            if (reduzida) {
                const valorDoPivo = matriz.get(linhaDoPivo, coluna);
                for (let j = 0; j < matriz.cols; j++) {
                    matriz.set(linhaDoPivo, j, matriz.get(linhaDoPivo, j) / valorDoPivo);
                }
                matriz.set(linhaDoPivo, coluna, 1);
            }

            const pivo = matriz.get(linhaDoPivo, coluna);
            for (let i = 0; i < matriz.rows; i++) {
                if (i === linhaDoPivo) {
                    continue;
                }
                // aqui e a diferenca: no gauss puro pula as linha de cima
                if (reduzida === false && i < linhaDoPivo) {
                    continue;
                }

                const fator = matriz.get(i, coluna) / pivo;
                for (let j = 0; j < matriz.cols; j++) {
                    const novo = matriz.get(i, j) - fator * matriz.get(linhaDoPivo, j);
                    matriz.set(i, j, novo);
                }
                matriz.set(i, coluna, 0);
            }

            linhaDoPivo = linhaDoPivo + 1;
        }

        this.limparZeros(matriz);
        return matriz;
    }

    // solve que o trabalho pede, recebe a matriz aumentada [A | b]
    // depois do gauss-jordan a resposta ja fica na ultima coluna
    solve(a) {
        if (!(a instanceof Matrix)) {
            throw new AlgebraLinearErro("a matriz não foi informada.");
        }
        if (a.cols < 2) {
            throw new AlgebraLinearErro("a matriz aumentada precisa de pelo menos"
                + " 2 colunas: as incógnitas e os termos independentes.");
        }

        // a ultima coluna nao e incognita, e a dos resultado
        const quantidadeDeIncognitas = a.cols - 1;
        const matriz = this.gaussJordan(a);

        for (let i = 0; i < matriz.rows; i++) {
            // se sobrou uma linha 0 = numero, o sistema nao tem solucao
            let coeficientesZerados = true;
            for (let j = 0; j < quantidadeDeIncognitas; j++) {
                if (Math.abs(matriz.get(i, j)) > QUASE_ZERO) {
                    coeficientesZerados = false;
                }
            }
            const termoIndependente = matriz.get(i, quantidadeDeIncognitas);
            if (coeficientesZerados && Math.abs(termoIndependente) > QUASE_ZERO) {
                throw new AlgebraLinearErro("o sistema não tem solução"
                    + " (sistema impossível): a linha " + (i + 1) + " do escalonamento"
                    + " virou 0 = " + Matrix.arredondar(termoIndependente) + ".");
            }
        }

        const solucao = [];
        for (let i = 0; i < quantidadeDeIncognitas; i++) {
            solucao[i] = 0;
        }

        // acha o 1 de cada incognita e le o valor na ultima coluna
        let pivosEncontrados = 0;
        for (let coluna = 0; coluna < quantidadeDeIncognitas; coluna++) {
            if (pivosEncontrados >= matriz.rows) {
                break;
            }
            const valor = matriz.get(pivosEncontrados, coluna);
            if (Math.abs(valor - 1) < QUASE_ZERO) {
                solucao[coluna] = matriz.get(pivosEncontrados, quantidadeDeIncognitas);
                pivosEncontrados = pivosEncontrados + 1;
            }
        }

        // menos pivo que incognita quer dizer infinitas solucao
        if (pivosEncontrados < quantidadeDeIncognitas) {
            throw new AlgebraLinearErro("o sistema tem infinitas soluções"
                + " (sistema possível e indeterminado): são " + quantidadeDeIncognitas
                + " incógnitas, mas o escalonamento só deu " + pivosEncontrados
                + " equação(ões) independente(s).");
        }

        return new Matrix(quantidadeDeIncognitas, 1, solucao);
    }

    // norma do vetor: raiz da soma dos quadrados, usado no pagerank
    norma(v) {
        if (!(v instanceof Vector)) {
            throw new AlgebraLinearErro("norma espera um Vector.");
        }
        let soma = 0;
        for (let i = 0; i < v.dim; i++) {
            soma = soma + v.get(i) * v.get(i);
        }
        return Math.sqrt(soma);
    }

    // soma de cada linha da matriz, vira um vetor, usado no pagerank
    somaDasLinhas(a) {
        if (!(a instanceof Matrix)) {
            throw new AlgebraLinearErro("somaDasLinhas espera uma Matrix.");
        }
        const resultado = this.vetorDeZeros(a.rows);
        for (let i = 0; i < a.rows; i++) {
            let soma = 0;
            for (let j = 0; j < a.cols; j++) {
                soma = soma + a.get(i, j);
            }
            resultado.set(i, soma);
        }
        return resultado;
    }

    // cria uma matriz do tamanho pedido com tudo zerado
    matrizDeZeros(linhas, colunas) {
        const valores = [];
        for (let i = 0; i < linhas * colunas; i++) {
            valores[i] = 0;
        }
        return new Matrix(linhas, colunas, valores);
    }

    // mesma coisa mas pra vetor
    vetorDeZeros(dimensao) {
        const valores = [];
        for (let i = 0; i < dimensao; i++) {
            valores[i] = 0;
        }
        return new Vector(dimensao, valores);
    }

    // copia a matriz, por isso o gauss e o solve nao estragam a original
    copiar(a) {
        const copia = this.matrizDeZeros(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                copia.set(i, j, a.get(i, j));
            }
        }
        return copia;
    }

    // troca duas linha de lugar, e uma operacao elementar
    // o valorGuardado e preciso senao o valor da linha 1 se perde
    trocarLinhas(matriz, linha1, linha2) {
        if (linha1 === linha2) {
            return;
        }
        for (let j = 0; j < matriz.cols; j++) {
            const valorGuardado = matriz.get(linha1, j);
            matriz.set(linha1, j, matriz.get(linha2, j));
            matriz.set(linha2, j, valorGuardado);
        }
    }

    // troca as sobra das conta por zero, senao aparece 0.0000000000000002
    limparZeros(matriz) {
        for (let i = 0; i < matriz.rows; i++) {
            for (let j = 0; j < matriz.cols; j++) {
                if (Math.abs(matriz.get(i, j)) < QUASE_ZERO) {
                    matriz.set(i, j, 0);
                }
            }
        }
    }
}

module.exports = LinearAlgebra;

