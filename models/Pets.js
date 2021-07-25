const conexao = require('../infraestrutura/conexao');
const uploadDeArquivos = require('../arquivos/uploadDeArquivos');
class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?';

        uploadDeArquivos(pet.imagem, pet.nome, (newPath) => {
            const newPet = {...pet, imagem: newPath};

            conexao.query(query, newPet, err => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err); 
                }
    
                return res.status(200).json(newPet); 
            });
        })
    }
}

module.exports = new Pet;