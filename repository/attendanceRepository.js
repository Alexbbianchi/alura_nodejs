const query = require('../infrastructure/database/queries');

class AttendanceRepository {
    add(attendance) {
        const sql = 'INSERT INTO Attendances set ?'
        return query(sql, attendance);
    }
    findAll() {
        const sql = 'SELECT * FROM Attendances';
        return query(sql);
    }
    findById(id) {
        const sql = `SELECT * FROM Attendances where id = ?`;
        return query(sql, id);
    }
    update(id, values) {
        const sql = 'UPDATE Attendances SET ? WHERE id = ?';
        return query(sql, [values, id]);
    }
    delete(id) {
        const sql = 'DELETE FROM Attendances WHERE id = ?';
        return query(sql, id);
    }
}

module.exports = new AttendanceRepository();