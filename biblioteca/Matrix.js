// guarda uma matriz de rows linhas por cols colunas
// o elemento (i,j) fica na posicao i * cols + j do array
const AlgebraLinearErro = require("./AlgebraLinearErro");

// numero bem pequeno pra saber se um valor e zero, porque as conta
// com decimal deixam sobra tipo 0.0000000000000002
const QUASE_ZERO = 0.000000001;

class Matrix {

    // construtor que o trabalho pede
    constructor(rows, cols, elements) {
        if (rows <= 0) {
            throw new AlgebraLinearErro(
                "a matriz precisa de pelo menos 1 linha (recebido " + rows + ").");
        }
        if (cols <= 0) {
            throw new AlgebraLinearErro(
                "a matriz precisa de pelo menos 1 coluna (recebido " + cols + ").");
        }

        // a quantidade de numero tem que bater com o tamanho
        if (elements.length !== rows * cols) {
            throw new AlgebraLinearErro("foram passados " + elements.length
                + " elementos, mas uma matriz " + rows + "x" + cols
                + " precisa de " + (rows * cols) + ".");
        }

        // em javascript da pra por texto no array, entao confere se e numero
        for (let i = 0; i < elements.length; i++) {
            if (typeof elements[i] !== "number" || !isFinite(elements[i])) {
                throw new AlgebraLinearErro(
                    "todos os elementos da matriz precisam ser números.");
            }
        }

        this.rows = rows;
        this.cols = cols;

        // copia os valor, senao da pra mudar por fora depois
        this.elements = [];
        for (let i = 0; i < elements.length; i++) {
            this.elements[i] = elements[i];
        }
    }

    // metodo get que o trabalho pede
    get(i, j) {
        this.verificarIndice(i, j);
        return this.elements[i * this.cols + j];
    }

    // metodo set que o trabalho pede, nao retorna nada
    set(i, j, value) {
        this.verificarIndice(i, j);
        if (typeof value !== "number" || !isFinite(value)) {
            throw new AlgebraLinearErro(
                "o valor guardado na matriz precisa ser um número.");
        }
        this.elements[i * this.cols + j] = value;
    }

    // confere se a posicao existe, senao o js so devolve undefined
    verificarIndice(i, j) {
        if (i < 0 || i >= this.rows) {
            throw new AlgebraLinearErro("linha " + i + " não existe;"
                + " a matriz tem linhas de 0 até " + (this.rows - 1) + ".");
        }
        if (j < 0 || j >= this.cols) {
            throw new AlgebraLinearErro("coluna " + j + " não existe;"
                + " a matriz tem colunas de 0 até " + (this.cols - 1) + ".");
        }
    }

    // monta o texto da matriz pra mostrar na tela
    toString() {
        let texto = "";
        for (let i = 0; i < this.rows; i++) {
            texto = texto + "[ ";
            for (let j = 0; j < this.cols; j++) {
                texto = texto + Matrix.arredondar(this.get(i, j)) + " ";
            }
            texto = texto + "]\n";
        }
        return texto;
    }

    // deixa o numero bonito, -0.9999999999 vira -1
    static arredondar(valor) {
        const inteiro = Math.round(valor);
        if (Math.abs(valor - inteiro) < QUASE_ZERO) {
            // evita aparecer -0 na tela
            if (inteiro === 0) {
                return "0";
            }
            return String(inteiro);
        }
        return String(Math.round(valor * 10000) / 10000);
    }
}

module.exports = { Matrix: Matrix, QUASE_ZERO: QUASE_ZERO };

