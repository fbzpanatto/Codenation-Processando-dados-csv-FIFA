const fs = require('fs')
const csv = require('csvtojson')

const loadCSV = filename => {
    const path = `${filename}.csv`

    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if(error) reject(error)
            resolve(data)
        })
    })
}

async function parseCSV(csvStr){
    return await csv()
    .fromString(csvStr)
}

let makeData = async () => {
    const csv = await loadCSV('data')
    const parsedCsv = await parseCSV(csv)
    return parsedCsv
}

q1 = () => {
    console.log(makeData().then())
}

q2 = () => {}

q3 = () => {}

q4 = () => {}

q5 = () => {}

q6 = () => {}

q1()