const fs = require('fs')
const csv = require('csv-parser')
const {switchRangeReadStream} = require('../utils/switchRange')
const config = require('../config')
const sendDataByChunks = (req, res) => {

    const {units} = req.params

    fs.createReadStream(config.dataPath)
        .pipe(csv())
        .on('data', data => {
            const info = switchRangeReadStream(units)
            const cost = info.units/ data[info.index]
            res.write(JSON.stringify({
                id:data['id'],
                requestedUnits:units,
                baseUnits:info.units,
                totalCost:units*cost
            }))
        })
        .on('end', () => res.end())
}

module.exports = sendDataByChunks;  
 