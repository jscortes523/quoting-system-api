const express = require('express')
const MongoLib = require('../lib/mongodb')

/**
 * Router
 */
const router = express.Router()

/**
 * Get all post stored and send
 * a http response with posts list
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const getAllPosts = async (req, res, next) =>{
    try{
        const posts = await MongoLib.getAllPosts()
        
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}

/**
 * Add new project post
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
const addPost = async (req, res, next) =>{
    try{
        const {name, units} = req.body
        
        await MongoLib.addPost({name, units})
        
        res.status(201).json({
            name:name,
            units:units
        })
        
    }catch(err){
        next(err)   
    }
}

router
    .get('/', getAllPosts)
    .post('/', addPost)

module.exports = router