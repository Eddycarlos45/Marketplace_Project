const customExpress = require('./config/custom-express')
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

const app = customExpress()

conexao.connect(erro => {
    if (erro) {
        console.log('Não foi possível conectar ao DB')
    } else {
        console.log('Conectado com o BD')
        
        Tabelas.init(conexao)
        app.listen(3030, (req, res) => {
            console.log('Servidor ouvindo na porta 3030')
        })
    }
})
