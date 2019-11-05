const fs = require('fs')
const csv = require('csv-parser')
const config = require('../config')
const {switchRangeReadStream} = require('../utils/switchRange')

/**
 * Load Data from out.txt file 
 * using Stream method of
 * file system library
 * @param {number} units 
 */
const loadDataReadStream =  (units) => {
    
    return new Promise( resolve => {
        const result = []
        fs.createReadStream(config.dataPath)
            .pipe(csv())
            .on('data', async data => {
                const info = switchRangeReadStream(units)
                const cost = data[info.index]/info.units
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
