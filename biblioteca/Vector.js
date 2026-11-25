// guarda um vetor de dimensao dim, so precisa de um indice
// e tratado como vetor coluna, por isso a transposta dele vira Matrix
const AlgebraLinearErro = require("./AlgebraLinearErro");
const Matrix = require("./Matrix").Matrix;

class Vector {

    // construtor que o trabalho pede
    constructor(dim, elements) {
        if (dim <= 0) {
            throw new AlgebraLinearErro(
                "o vetor precisa de dimensão pelo menos 1 (recebido " + dim + ").");
        }

        // a quantidade de numero tem que bater com a dimensao
        if (elements.length !== dim) {
            throw new AlgebraLinearErro("foram passados " + elements.length
                + " elementos, mas a dimensão informada foi " + dim + ".");
        }

        // confere se e numero mesmo, igual na matriz
        for (let i = 0; i < elements.length; i++) {
            if (typeof elements[i] !== "number" || !isFinite(elements[i])) {
                throw new AlgebraLinearErro(
                    "todos os elementos do vetor precisam ser números.");
            }
        }

        this.dim = dim;

        // copia os valor pra ninguem mudar por fora
        this.elements = [];
        for (let i = 0; i < elements.length; i++) {
            this.elements[i] = elements[i];
        }
    }

    // metodo get que o trabalho pede
    get(i) {
        this.verificarIndice(i);
        return this.elements[i];
    }

    // metodo set que o trabalho pede, nao retorna nada
    set(i, value) {
        this.verificarIndice(i);
        if (typeof value !== "number" || !isFinite(value)) {
            throw new AlgebraLinearErro(
                "o valor guardado no vetor precisa ser um número.");
        }
        this.elements[i] = value;
    }

    // confere se a posicao existe
    verificarIndice(i) {
        if (i < 0 || i >= this.dim) {
            throw new AlgebraLinearErro("posição " + i + " não existe;"
                + " o vetor tem posições de 0 até " + (this.dim - 1) + ".");
        }
    }

    // monta o texto no formato ( 1 2 3 )
    toString() {
        let texto = "( ";
        for (let i = 0; i < this.dim; i++) {
            texto = texto + Matrix.arredondar(this.elements[i]) + " ";
        }
        return texto + ")";
    }
}

module.exports = Vector;

