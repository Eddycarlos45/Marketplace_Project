const conexao = require('../infra/conexao')

class Produtos {

    lista() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Produtos`

            conexao.query(sql, (erro, resultados) => {
                if (erro) return reject(erro)
                return resolve(resultados)
            })
        })
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Produtos WHERE id=?`

            conexao.query(sql, id, (erro, resultado) => {
                if (erro) return reject(erro)
                return resolve(resultado)
            })
        })
    }

    adiciona(produto) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Produtos SET ?`

            conexao.query(sql, produto, (erro, resultado) => {
                if (erro) return reject(erro)

                return resolve(resultado)
            })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Produtos WHERE id=?`

            conexao.query(sql, id, (erro) => {
                if (erro) return reject(erro)
                return resolve()
            })
        })
    }

    edita(id, produto) {

        return new Promise((resolve, reject) => {
            const sql = `UPDATE Produtos SET ? WHERE id=?`

            conexao.query(sql, [produto, id], (erro) => {
                if (erro) return reject(erro)
                return resolve()
            })
        })
    }
}

module.exports = new Produtos