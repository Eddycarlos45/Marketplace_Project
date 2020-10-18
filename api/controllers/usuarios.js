const usuarios = require('../models/usuarios');
const validator = require('../util/validator')

module.exports = (app) => {

    app.post('/signup', (req, res) => {
        const usuario = req.body
        const { valid, errosSignUp } = validator.validaSignUp(usuario);
        if (!valid) return res.status(400).json(errosSignUp)

        usuarios.adiciona(usuario, res)
    })

    app.post('/login', (req, res) => {
        const email = req.body.email
        const senha = req.body.senha
        usuarios.buscarPorEmail(email)
            .then(resultado => {
                if (senha != resultado[0].senha) return res.status(400).json('Usuario não autenticado')
                return res.status(200).json(resultado)
            })
            .catch(erro => res.status(400).json('Não achei'))
    })
}