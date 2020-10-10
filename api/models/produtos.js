const conexao = require('../infra/conexao')

class Produtos {

    lista(res) {
        const sql = `SELECT * FROM Produtos`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    adiciona(produto, res) {
        const sql = `INSERT INTO Produtos SET ?`

        conexao.query(sql, produto, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json("Produto cadastrado com sucesso")
            }
        })
    }

    remove(id, res) {
        const sql = `DELETE FROM Produtos WHERE id=?`

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json("Produto removido com sucesso")
            }
        })
    }

    edita(id, produto, res) {
        const sql = `UPDATE Produtos SET ? WHERE id=?`

        conexao.query(sql, [produto, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json("Produto editado com sucesso")
            }
        })
    }
}

module.exports = new Produtos