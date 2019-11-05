const fs = require('fs')
const csv = require('csv-parser')
const config = require('../config')
const {switchRangeReadStream} = require('../utils/switchRange')

const loadDataReadStream =  (units) => {
    
    return new Promise( resolve => {
        const result = []
        fs.createReadStream(config.dataPath)
            .pipe(csv())
            .on('data', async data => {
                const info = switchRangeReadStream(units)
                const cost = info.units/ data[info.index]
                result.push({
                    id:data['id'],
                    requestedUnits:units,
                    baseUnits:info.units,
                    totalCost:units*cost
                })
            })
            .on('end', () => resolve(result))
        })
}

module.exports =loadDataReadStream
