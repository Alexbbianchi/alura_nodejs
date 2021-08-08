const moment = require('moment');
const axios = require('axios');
const attendanceRepository = require('../repository/attendanceRepository');

class Attendance {
    constructor() {
        this.dateIsValid = ({date, creationDate}) => moment(date).isSameOrAfter(creationDate);
        this.customerIsValid = ({size}) => size >= 3;
        this.valid = parameters => this.validations.filter(camp => {
            const { name } = camp
            const parameter = parameters[name]

            return !camp.valid(parameter)
        });
        this.validations = [
            {
                name: 'date',
                valid: this.dateIsValid,
                message: 'Data deve ser maior ou igual a date atual'
            },
            {
                name: 'customer',
                valid: this.customerIsValid,
                message: 'Cliente deve ter pelo menos três caracteres'
            }
        ];
    }

    async add(attendance) {

        const creationDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const date = moment(attendance.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parameters = {
            date: { date, creationDate },
            customer: { size: attendance.customer.length }
        }

        const erros = this.valid(parameters);

        if(erros.length) {
            return new Promise((resolve, reject) =>  reject(erros));
        }

        const datedAttendance = {
            ...attendance, 
            creationDate, 
            date
        };

        const result = await attendanceRepository.add(datedAttendance);
        return ({ ...attendance, id: result.insertId });
    }

    findAll() {
        return attendanceRepository.findAll();
    }

    async findById(id) {
        const result = (await attendanceRepository.findById(id))[0];

        const {customer} = result;
        const { data } = await axios.get(`http://localhost:8082/${customer}`)
        
        return {
            ...result, 
            customer :data
        }
    }

    update(id, values) {
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        return attendanceRepository.update(id, values);
    }
   
    delete(id) {
        return attendanceRepository.delete(id);
    }
}

module.exports = new Attendance;