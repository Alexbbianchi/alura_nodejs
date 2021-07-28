const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const tabelas = require('./infraestrutura/database/tabelas');

conexao.connect((erro) => {
    if(erro) return console.log(erro);

    tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});

