class Tables {
    init(connection) {
        this.connection = connection;

        this.CreateAttendances();
        this.criarPerts();
    }

    CreateAttendances() {
        const sql = 'CREATE TABLE IF NOT EXISTS Attendances (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))';
        
        this.connection.query(sql, (erro) => {
            if(erro) return console.log(erro);

            console.log("Tabela atendimentos criada com sucesso!");
        });
    }

    criarPerts() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id))';

        this.connection.query(query, err => {
            if(err) return console.log(err);

            console.log('Tabela Pets criada com sucesso!');
        })
    }
}

module.exports = new Tables;