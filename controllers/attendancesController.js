const Attendance = require('../models/Attendance');

module.exports = app => {
    app.get('/attendances', (req, res) => {
        Attendance.findAll()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err));
    });
    
    app.get('/attendances/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Attendance.findById(id)
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err));
    });

    app.post('/attendances', (req, res) => {

        const attendance = req.body;

        Attendance.add(attendance)
            .then(attendance => res.json(attendance))
            .catch(err => res.status(400).json(err));
    });

    app.patch('/attendances/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        Attendance.update(id, values)
            .then(e => res.json({...values, id}))
            .catch(err => res.status(400).json(err));
    });
   
    app.delete('/attendances/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Attendance.delete(id)
            .then(e => res.json({
                id,
                message:`Atendimento deletado com sucesso!`
            }))
            .catch(err => res.status(400).json(err));
    });
}