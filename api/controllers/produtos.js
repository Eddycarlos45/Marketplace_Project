const produtos = require('../models/produtos')
const validator = require('../util/validator')

module.exports = (app) => {

    app.get('/produtos', (req, res) => {
        produtos.lista(res)
    })

    app.post('/produtos', (req, res) => {
        const produto = req.body
        const { valid, errosForm } = validator.validaForm(produto);
        if (!valid) return res.status(400).json(errosForm)

        produtos.adiciona(produto, res)
    })

    app.delete('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        produtos.remove(id, res)
    })

    app.patch('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const produto = req.body
        produtos.edita(id, produto, res)
    })
}