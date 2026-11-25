// arquivo principal: node main.js
// as matrizes de adjacencia das questoes e exemplos do livro
const Matrix = require("./Matrix");
const pageRank = require("./PageRank");

// questoes da pagina 501
pageRank("Questao 5", new Matrix(4, 4, [
    0, 0, 1, 0,
    1, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 0, 0
]));

pageRank("Questao 6", new Matrix(4, 4, [
    0, 1, 1, 0,
    0, 0, 1, 0,
    1, 0, 0, 1,
    1, 0, 0, 0
]));

pageRank("Questao 7", new Matrix(5, 5, [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 0, 0, 0,
    0, 1, 1, 0, 0
]));

pageRank("Questao 8", new Matrix(10, 10, [
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
]));

// outros exemplos do livro
pageRank("Exemplo 1 (pag. 496)", new Matrix(4, 4, [
    0, 0, 1, 1,
    1, 0, 0, 0,
    1, 0, 0, 1,
    1, 1, 1, 0
]));

pageRank("Exemplo 3 (pag. 499)", new Matrix(10, 10, [
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
]));

pageRank("Exercicio 1 (pag. 500)", new Matrix(3, 3, [
    0, 0, 1,
    1, 0, 1,
    1, 0, 1
]));

pageRank("Exercicio 2 (pag. 500)", new Matrix(4, 4, [
    0, 1, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 1, 1, 0
]));
