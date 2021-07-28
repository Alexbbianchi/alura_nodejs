const query = require('../infraestrutura/database/queries');

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos set ?'
        return query(sql, atendimento);
    }
    list() {
        const sql = 'SELECT * FROM Atendimentos';
        return query(sql);
    }
}

module.exports = new Atendimento();