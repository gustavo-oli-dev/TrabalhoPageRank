const Matrix = require("./Matrix");
const Vector = require("./Vector");

class LinearAlgebra {

    // transposta (A')
    transpose(a) {
        const t = new Matrix(a.cols, a.rows, []);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                t.set(j, i, a.get(i, j));
            }
        }
        return t;
    }

    // matriz vezes vetor (A*a0)
    dot(a, v) {
        const resultado = new Vector(a.rows, []);
        for (let i = 0; i < a.rows; i++) {
            let soma = 0;
            for (let j = 0; j < a.cols; j++) {
                soma = soma + a.get(i, j) * v.get(j);
            }
            resultado.set(i, soma);
        }
        return resultado;
    }

    // numero vezes vetor (1/r*u)
    times(k, v) {
        const resultado = new Vector(v.dim, []);
        for (let i = 0; i < v.dim; i++) {
            resultado.set(i, k * v.get(i));
        }
        return resultado;
    }

    // norma do vetor: raiz da soma dos quadrados (sqrt(u'*u))
    norma(v) {
        let soma = 0;
        for (let i = 0; i < v.dim; i++) {
            soma = soma + v.get(i) * v.get(i);
        }
        return Math.sqrt(soma);
    }

    // soma de cada linha da matriz (sum(A(i,:)))
    somaDasLinhas(a) {
        const resultado = new Vector(a.rows, []);
        for (let i = 0; i < a.rows; i++) {
            let soma = 0;
            for (let j = 0; j < a.cols; j++) {
                soma = soma + a.get(i, j);
            }
            resultado.set(i, soma);
        }
        return resultado;
    }
}

module.exports = LinearAlgebra;
