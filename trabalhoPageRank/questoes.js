// as matrizes de adjacencia das questoes e exemplos do livro
// pra acrescentar uma questao e so por mais um item na lista
const Matrix = require("../biblioteca/Matrix").Matrix;

const questoes = [
    // questoes da pagina 501
    { nome: "Questao 5", matriz: new Matrix(4, 4, [
        0, 0, 1, 0,
        1, 0, 0, 0,
        1, 1, 0, 0,
        0, 1, 0, 0
    ]) },
    { nome: "Questao 6", matriz: new Matrix(4, 4, [
        0, 1, 1, 0,
        0, 0, 1, 0,
        1, 0, 0, 1,
        1, 0, 0, 0
    ]) },
    { nome: "Questao 7", matriz: new Matrix(5, 5, [
        0, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        0, 0, 0, 0, 1,
        0, 1, 0, 0, 0,
        0, 1, 1, 0, 0
    ]) },
    { nome: "Questao 8", matriz: new Matrix(10, 10, [
        0, 1, 1, 0, 1, 1, 0, 0, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 1, 0, 1, 0, 1,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0
    ]) },

    // outros exemplos do livro
    { nome: "Exemplo 1 (pag. 496)", matriz: new Matrix(4, 4, [
        0, 0, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 1,
        1, 1, 1, 0
    ]) },
    { nome: "Exemplo 3 (pag. 499)", matriz: new Matrix(10, 10, [
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 1, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0
    ]) },
    { nome: "Exercicio 1 (pag. 500)", matriz: new Matrix(3, 3, [
        0, 0, 1,
        1, 0, 1,
        1, 0, 1
    ]) },
    { nome: "Exercicio 2 (pag. 500)", matriz: new Matrix(4, 4, [
        0, 1, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 0
    ]) }
];

module.exports = questoes;
