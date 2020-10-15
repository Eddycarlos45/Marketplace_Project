class Validador {

    isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) return true;
        else return false;
    };

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

    validaSignUp = (usuario) => {
        let errosSignUp = {}
        if (this.isEmpty(usuario.email.trim())) {
            errosSignUp.email = 'Email não pode ser nulo'
        } else if (!this.isEmail(usuario.email)) {
            errosSignUp.email = 'Não é um email válido'
        }
        if (this.isEmpty(usuario.nome.trim())) errosSignUp.nome = 'Nome não pode ser nulo'
        if (this.isEmpty(usuario.sobrenome.trim())) errosSignUp.sobrenome = 'Nome não pode ser nulo'
        if (this.isEmpty(usuario.senha.trim())) errosSignUp.senha = 'Nome não pode ser nulo'

        return {
            errosSignUp,
            valid: Object.keys(errosSignUp).length === 0 ? true : false
        }
    }
}

module.exports = new Validador