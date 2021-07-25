const fs = require('fs');
const path = require('path');

module.exports = (pathPet, petName, callbackImagemCriada) => {
    
    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(pathPet);
    const typeIsValid = validTypes.indexOf(type.substring(1));

    if (typeIsValid === -1) 
        return console.log('Erro! Tipo invalido');

    const newPath = `./assets/imagens/${petName}${type}`;
    fs.createReadStream(pathPet)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => {
           callbackImagemCriada(newPath); 
        })

}

//passar para base 64