const fs = require('fs')
const {switchRangeReadFile} = require('../utils/switchRange')
const config = require('../config')

const loadDataFS = (units) => {

    const content = fs.readFileSync(config.dataPath,'utf8').toString()
    const stringArray = content.split('\n')
    let counter = 0
    const result = []
    stringArray.forEach( data => {
        if(counter !== 0){
            const row = data.split(',')

            const info = switchRangeReadFile(units)
            const cost = info.units/row[info.index]

            result.push({
                id:row[0],
                requestedUnits:units,
                baseUnits:info.units,
                totalCost:cost*units
            })

        }
        counter++
    })

    return result;
}

module.exports = loadDataFS