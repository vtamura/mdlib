import fetch from 'node-fetch'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const handleError = err => {
    throw new Error(err)
}
const getHttpStatus = async arrayURLs => {
    try {
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return `${res.status} - ${res.statusText}`
                }
        ))
    
        return arrayStatus
    }
    catch(err) {
        handleError(err)
    }
}

const getLinksFromObj = arrayLinks => {
    return arrayLinks.map(link => Object
        .values(link)
        .join()
    )
}

const validateURLs = async arrayLinks => {
    try {
        const links = getLinksFromObj(arrayLinks)
        const statusLinks = await getHttpStatus(links)
        const result = arrayLinks
            .map((obj, i) => (
                {
                    ...obj, 
                    "status": statusLinks[i]
                } 
            ))
    
        return result

    }
    catch(err) {
        handleError(err)
    }
}

export default validateURLs