const produtos = require('../models/produtos')
const validator = require('../util/validator')
const auth = require('../util/auth')

module.exports = (app) => {

    app.get('/produtos', auth, (req, res, next) => {
        produtos.lista()
            .then(lista => {
                return res.status(200).json(lista)
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.post('/produtos', auth, (req, res) => {
        const produto = req.body
        const { valid, errosForm } = validator.validaForm(produto);
        if (!valid) return res.status(400).json(errosForm)

        produtos.adiciona(produto)
            .then(() => {
                return res.status(200).json('Produto adicionado com sucesso')
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.delete('/produtos/:id', auth, (req, res) => {
        const id = parseInt(req.params.id)
        produtos.remove(id)
            .then(() => {
                return res.status(200).json('Produto deletado com Sucesso')
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.put('/produtos/:id', auth, (req, res) => {
        const id = parseInt(req.params.id)
        const produto = req.body
        produtos.edita(id, produto)
            .then(() => {
                return res.status(200).json('Produto alterado com Sucesso')
            })
            .catch(erro => res.status(400).json(erro))
    })
}