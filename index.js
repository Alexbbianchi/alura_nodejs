const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/Tabelas');

conexao.connect((erro) => {
    if(erro) return console.log(erro);

    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});

