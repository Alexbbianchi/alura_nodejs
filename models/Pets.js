const connection = require('../infrastructure/database/connection');
const fileUpload = require('../infrastructure/files/fileUpload');
class Pet {
    add(pet, res) {
        
        const query = 'INSERT INTO Pets SET ?';

        fileUpload(pet.image, pet.name, (erro, newPath) => {
            
            if(erro) {
                return res.status(400).json({erro}); 
            }

            const newPet = {...pet, image: newPath};

            connection.query(query, newPet, err => {
                
                if (err) {
                    return res.status(400).json(err); 
                }
    
                return res.status(200).json(newPet); 
            });
        })
    }
}

module.exports = new Pet;