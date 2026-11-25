// erro pra quando a operacao nao pode ser feita
class AlgebraLinearErro extends Error {

    constructor(mensagem) {
        super(mensagem);
        // serve pra saber depois que o erro veio das operacao daqui
        this.name = "AlgebraLinearErro";
    }
}

module.exports = AlgebraLinearErro;

