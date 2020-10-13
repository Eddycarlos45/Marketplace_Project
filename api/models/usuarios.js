const conexao = require('../infra/conexao')

class Usuarios {

    adiciona(usuario, res) {
        const sql = `INSERT INTO Usuarios SET ?`

        conexao.query(sql, usuario, (erro, resultado) => {
            if (erro) {
                return res.status(400).json(erro)
            } else {
                return res.status(200).json('Sign Up realizado com sucesso')
            }
        })
    }
}
module.exports = new Usuarios