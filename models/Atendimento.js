const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    
    adiciona(atendimento, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dateIsValid = moment(data).isSameOrAfter(dataCriacao);
        const clienteIsValid = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dateIsValid,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteIsValid,
                mensagem: 'Cliente deve ter pelo menos três caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        if(erros.length) return res.status(400).json(erros);

        const atendimentoDatado = {
            ...atendimento, 
            dataCriacao, 
            data
        };

        const sql = 'INSERT INTO Atendimentos set ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            res.status(201).json(atendimento);
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            res.status(200).json(resultados);
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            const atendimento = resultados[0];

            res.status(200).json(atendimento);
        })
    }

    altera(id, valores, res) {

        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            res.status(200).json({...valores, id});
        });
    }
   
    deleta(id, res) {

        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            res.status(200).json({id});
        });
    }
}

module.exports = new Atendimento;