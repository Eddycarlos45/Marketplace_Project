class Validador {

    isEmpty = (string) => {
        if (string === '') return true;
        else return false;
    };

    validaForm = (produto) => {
        let errosForm = {}
        if (this.isEmpty(produto.nome.trim())) errosForm.nome = 'Nome não pode ser nulo'
        if (this.isEmpty(produto.descricao.trim())) errosForm.descricao = 'Descricao não pode ser nulo'
        if (this.isEmpty(produto.tipo.trim())) errosForm.tipo = 'Tipo não pode ser nulo'
        if (this.isEmpty(produto.valor.toString().trim())) errosForm.valor = 'Valor não pode ser nulo'
        if (this.isEmpty(produto.quantidade.toString().trim())) errosForm.quantidade = 'Quantidade não pode ser nulo'

        return {
            errosForm,
            valid: Object.keys(errosForm).length === 0 ? true : false
        }
    }
}

module.exports = new Validador