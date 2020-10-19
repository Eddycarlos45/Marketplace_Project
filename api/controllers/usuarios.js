const usuarios = require('../models/usuarios');
const validator = require('../util/validator')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (app) => {

    app.post('/signup', (req, res) => {
        const usuario = req.body
        const { valid, errosSignUp } = validator.validaSignUp(usuario);
        if (!valid) return res.status(400).json(errosSignUp)

        usuarios.adiciona(usuario, res)
    })

    app.post('/login', (req, res) => {
        const { email, senha } = req.body
        usuarios.buscarPorEmail(email)
            .then(usuario => {
                if (senha != usuario[0].senha) return res.status(400).json({ senha: 'Senha incorreta' })
                usuario[0].senha = undefined

                const token = jwt.sign({ id: usuario[0].id }, authConfig.secret, {
                    expiresIn: 86400,
                })

                return res.status(200).json({usuario, token})
            })
            .catch(erro => res.status(400).json({ email: 'Usuario não autenticado' }))
    })
}