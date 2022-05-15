import chalk from 'chalk'
import fs from 'fs'

const throwError = err => {
    throw new Error(chalk.red(err.code, 'Caminho/Arquivo inválido.'))
}

const getFile = async filePath => {
    const encode = 'utf-8'

    try {
        const text = await fs.promises.readFile(filePath, encode)
        getLinks(text)
    }
    catch(err) {
        throwError(err)
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
    console.log(arrayLinks)
}

getFile('./arquivos/texto1.md')