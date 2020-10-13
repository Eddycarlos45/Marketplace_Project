class Tabelas {

    init(conexao) {
        this.conexao = conexao

        this.criarProdutos()
        this.criarUsuarios()
    }

    criarProdutos() {
        const sql = `CREATE TABLE IF NOT EXISTS Produtos (id int NOT NULL AUTO_INCREMENT,
            nome varchar(70) NOT NULL, descricao varchar(80), tipo varchar(20) NOT NULL,
            valor float NOT NULL, quantidade int NOT NULL,observacoes text,PRIMARY KEY(id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        }
        )
    }

    criarUsuarios() {
        const sql = `CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT,
            nome varchar(70) NOT NULL, sobrenome varchar(80), email varchar(30) NOT NULL,
            senha varchar(15),PRIMARY KEY(id))`

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso')
            }
        }
        )
    }
}

module.exports = new Tabelas