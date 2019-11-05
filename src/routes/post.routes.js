const express = require('express')
const MongoLib = require('../lib/mongodb')

const router = express.Router()


const getAllPosts = async (req, res, next) =>{
    try{
        const posts = await MongoLib.getAllPosts()
        
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}

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