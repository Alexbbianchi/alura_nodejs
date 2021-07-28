const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento {
    constructor() {
        this.dateIsValid = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteIsValid = ({tamanho}) => tamanho >= 3;
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        });
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dateIsValid,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteIsValid,
                mensagem: 'Cliente deve ter pelo menos três caracteres'
            }
        ];
    }

    adiciona(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);

        if(erros.length) {
            return new Promise((resolve, reject) =>  reject(erros));
        }

        const atendimentoDatado = {
            ...atendimento, 
            dataCriacao, 
            data
        };

        return repositorio.adiciona(atendimentoDatado)
            .then(resultados => {
                return ({ ...atendimento, id: resultados.insertId });
            });
    }

    lista() {
        return repositorio.lista();
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`;

        conexao.query(sql, async (erro, resultados) => {
            if(erro) return res.status(400).json(erro);

            const atendimento = resultados[0];

            const {cliente} = atendimento;
            const { data } = await axios.get(`http://localhost:8082/${cliente}`)

            res.status(200).json({...atendimento, cliente: data});
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