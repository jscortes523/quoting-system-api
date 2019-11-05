const express = require('express')
const loadDataFS = require('../lib/readFile')
const loadDataReadStream = require('../lib/readStream')
const sendDataByChunks = require('../lib/test')
const {switchRangeDB} = require('../utils/switchRange')
const MongoLib = require('../lib/mongodb')
const router = express.Router();

/**
 * Get quotations using fileRead and send a
 * http response
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
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

/**
 * Get quotations using database and send a
 * http response
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const getQuotationFromDataBase = async (req, res, next) => {
    try{
        const {units} = req.params
        
        const start = process.hrtime()        
        const data = await MongoLib.getQuotationData()
        
        const result = data.map( elem => {
            const baseUnits = switchRangeDB(units)
            const range = elem.quotationRange.find(item => baseUnits === item.units)
            const cost = range.cost / range.units 
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

/**
 * Get quotations using cache and send a
 * http response
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */

const getQuotationFromDataBaseWithCache = async (req, res, next) => {
    try{
        const {units} = req.params
        
        const start = process.hrtime()        
        const data = await MongoLib.getQuotationCachedData()
        
        const result = data.map( elem => {
            const baseUnits = switchRangeDB(units)
            const range = elem.quotationRange.find(item => baseUnits === item.units)
            const cost = range.cost / range.units 
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

/**
 * Get quotations using stream and send a
 * http response
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */

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

const sendByChunk = async (req, res, next) => {
    try {
        sendDataByChunks(req,res)
    } catch (error) {
        next(error)
    }
}

router
    .get('/filereader/:units',getQuotationFileReader)
    .get('/database/:units', getQuotationFromDataBase)
    .get('/dbcache/:units',getQuotationFromDataBaseWithCache)
    .get('/readstream/:units', getQuotationReadStream)
    .get('/test/:units', sendByChunk)

module.exports = router