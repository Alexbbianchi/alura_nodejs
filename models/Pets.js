const conexao = require('../infraestrutura/conexao');
const uploadDeArquivos = require('../arquivos/uploadDeArquivos');
class Pet {
    adiciona(pet, res) {
        
        const query = 'INSERT INTO Pets SET ?';

        uploadDeArquivos(pet.imagem, pet.nome, (erro, newPath) => {
            
            if(erro) {
                return res.status(400).json({erro}); 
            }

            const newPet = {...pet, imagem: newPath};

            conexao.query(query, newPet, err => {
                
                if (err) {
                    return res.status(400).json(err); 
                }
    
                return res.status(200).json(newPet); 
            });
        })
    }
}

module.exports = new Pet;