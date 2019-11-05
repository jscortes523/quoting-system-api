const express = require('express')
const loadDataFS = require('../lib/readFile')
const loadDataReadStream = require('../lib/readStream')
const {switchRangeDB} = require('../utils/switchRange')
const MongoLib = require('../lib/mongodb')
const router = express.Router();

const getQuotationFileReader = async (req, res, next) => {
    
    try{
        const { units } = req.params
        const start = process.hrtime()
        const result = loadDataFS(units)
        const end = process.hrtime(start)
        res.status(200).json({
            data: result,
            time: `${end[1]/ 1000000}ms`
        })
    }catch(err){
        next(err)
    }
}

const getQuotationFromDataBase = async (req, res, next) => {
    try{
        const {units} = req.params
        
        const start = process.hrtime()        
        const data = await MongoLib.getQuotationData()
        
        const result = data.map( elem => {
            const baseUnits = switchRangeDB(units)
            const range = elem.quotationRange.find(item => baseUnits === item.units)
            const cost = range.units / range.cost
            return {
                id:elem._id,
                requestedUnits:units,
                baseUnits:baseUnits,
                totalCost:cost*units
            }
        })
        
        const end = process.hrtime(start)
        
        res.status(200).json({
            data:result,
            time:`${end[1] / 1000000}ms`
        })
        
    }catch(err){
        next(err)
    }
}

const getQuotationFromDataBaseWithCache = async (req, res, next) => {
    try{
        const {units} = req.params
        
        const start = process.hrtime()        
        const data = await MongoLib.getQuotationCachedData()
        
        const result = data.map( elem => {
            const baseUnits = switchRangeDB(units)
            const range = elem.quotationRange.find(item => baseUnits === item.units)
            const cost = range.units / range.cost
            return {
                id:elem._id,
                requestedUnits:units,
                baseUnits:baseUnits,
                totalCost:cost*units
            }
        })
        
        const end = process.hrtime(start)
        
        res.status(200).json({
            data:result,
            time:`${end[1] / 1000000}ms`
        })
        
    }catch(err){
        next(err)
    }
}

const getQuotationReadStreamWithCache = async (req, res,next) => {
    res.status(200).json({message:'Hello'})
}


const getQuotationReadStream = async (req, res,next) => {
    try{
        const {units} = req.params
        const start = process.hrtime()
        const result = await loadDataReadStream(units)
        const end = process.hrtime(start)
        res.status(200).json({
            data:result,
            time:`${end[1] / 1000000}ms`
        })
    }catch(err){
        next(err)
    }
}

router
    .get('/filereader/:units',getQuotationFileReader)
    .get('/database/:units', getQuotationFromDataBase)
    .get('/dbcache/:units',getQuotationFromDataBaseWithCache)
    .get('/readstream/:units', getQuotationReadStream)

module.exports = router