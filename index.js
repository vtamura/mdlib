import chalk from 'chalk'
import fs from 'fs'

const handleError = err => {
    throw new Error(chalk.red(err.code, 'Caminho/Arquivo inválido.'))
}

const getFile = async filePath => {
    const encode = 'utf-8'

    try {
        const text = await fs.promises.readFile(filePath, encode)
        return getLinks(text)
    }
    catch(err) {
        handleError(err)
    }
}

const getLinks = txt => {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayLinks = []
    let temp

    while((temp = regex.exec(txt)) !== null) {
        arrayLinks.push({ [temp[1]]: temp[2] })
    }
    // arrayLinks.push({ [regex.exec(txt)[1]]: regex.exec(txt)[2] })
    return arrayLinks.length === 0 ? chalk.red("Não há links.") : arrayLinks
}

// getFile('./arquivos/texto1.md')

export default getFile