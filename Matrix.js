// matriz guardada em um array, linha por linha
class Matrix {

    constructor(rows, cols, elements) {
        this.rows = rows;
        this.cols = cols;
        this.elements = elements;
    }

    get(i, j) {
        return this.elements[i * this.cols + j];
    }

    set(i, j, value) {
        this.elements[i * this.cols + j] = value;
    }
}

module.exports = Matrix;
