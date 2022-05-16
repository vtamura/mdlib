import getFile from './index.js'
import chalk from 'chalk'
import validateURLs from './validate-https.js'

const path = process.argv

const processLinks = async filePath => {
    const result = await getFile(filePath[2])

    if(filePath[3] === 'validar') {
        console.log(chalk.yellow('Links Validados: '), await validateURLs(result))
    } else {
        console.log(chalk.yellow('Lista de Links: '), result)
    }
}

processLinks(path)