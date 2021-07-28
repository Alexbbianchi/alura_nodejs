const conexao = require('./conexao');

const executaQuery = (query, param = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, param, (err, resultados, campos) => {
            if(err) {
                reject(err);
            }

            resolve(resultados);
        })
    })
}

module.exports = executaQuery;