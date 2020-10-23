const produtos = require('../models/produtos')
const validator = require('../util/validator')
const auth = require('../util/auth')

module.exports = (app) => {

    app.get('/produtos', (req, res) => {
        produtos.lista()
            .then(lista => {
                return res.status(200).json(lista)
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.get('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const memcachedCliente = app.services.memcachedClient()

        memcachedCliente.get('produto-' + id, (erro, retorno) => {
            if (erro || !retorno) {
                console.log('MISS - chave não encontrada')

                produtos.buscaPorId(id)
                    .then(produto => {
                        return res.status(200).json(produto)
                    })
                    .catch(erro => res.status(400).json(erro))
            } else {
                console.log('HIT - valor: ' + JSON.stringify(retorno))
                res.json(retorno)
                return
            }
        })


    })

    app.post('/produtos', (req, res) => {
        const produto = req.body
        const { valid, errosForm } = validator.validaForm(produto);
        if (!valid) return res.status(400).json(errosForm)

        produtos.adiciona(produto)
            .then((resultado) => {
                produto.id = resultado.insertId
                res.status(201).json('Produto adicionado com sucesso')

                const memcachedCliente = app.services.memcachedClient()
                memcachedCliente.set('produto-' + produto.id, produto, 60000, (erro) => {
                    if (erro) return console.log(erro)
                    console.log('Nova chave adicionada ao cache: produtos:' + produto.id)
                })
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.delete('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        produtos.remove(id)
            .then(() => {
                return res.status(200).json('Produto deletado com Sucesso')
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.put('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const produto = req.body
        produtos.edita(id, produto)
            .then(() => {
                return res.status(200).json('Produto alterado com Sucesso')
            })
            .catch(erro => res.status(400).json(erro))
    })
}