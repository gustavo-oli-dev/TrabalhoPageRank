// vetor coluna
class Vector {

    constructor(dim, elements) {
        this.dim = dim;
        this.elements = elements;
    }

    get(i) {
        return this.elements[i];
    }

    set(i, value) {
        this.elements[i] = value;
    }
}

module.exports = Vector;
