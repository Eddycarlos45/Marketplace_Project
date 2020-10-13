const usuarios = require('../models/usuarios');
const validator = require('../util/validator')

module.exports = (app) => {

    app.post('/signup', (req, res) => {
        const usuario = req.body
        const { valid, errosSignUp } = validator.validaSignUp(usuario);
        if (!valid) return res.status(400).json(errosSignUp)
        
        usuarios.adiciona(usuario, res)
    })
}