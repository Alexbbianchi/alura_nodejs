const fs = require('fs');
const path = require('path');

module.exports = (pathPet, petName, callbackImagemCriada) => {
    

        const validTypes = ['jpg', 'png', 'jpeg'];
        const type = path.extname(pathPet);

        if (validTypes.indexOf(type.substring(1)) === -1) {

            return callbackImagemCriada('Erro! Tipo invalido'); 
        }

        const newPath = `./assets/imagens/${petName}${type}`;
        
        fs.createReadStream(pathPet)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => {
                callbackImagemCriada(false, newPath); 
            });
}

//passar para base 64