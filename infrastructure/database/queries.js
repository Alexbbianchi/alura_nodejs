const connection = require('./connection');

module.exports = (query, param = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, param, (err, resultados, campos) => {
            if(err) {
                reject(err);
            }

            resolve(resultados);
        })
    })
}