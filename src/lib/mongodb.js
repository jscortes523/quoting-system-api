const {MongoClient, ObjectId}  = require('mongodb')
const config = require('../config')
const URI = `mongodb+srv://${config.dbUser}:${config.dbPwd}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
const Cache = require('./Cache')
/**
 * Database instance
 * @class
 */
class MongoLib{
    /**
     * Connect to database instance
     */
    connect(){
        if (!MongoLib.connection) {
            MongoLib.client = new MongoClient(URI,{useNewUrlParser:true})
            MongoLib.connection = new Promise((resolve, reject) => {
                MongoLib.client.connect(err => {
                    if (err) {
                        reject(err)
                    }

                    console.log('Hey We are connected now!!')
                    resolve(MongoLib.client.db(config.dbName))
                })
            })
        }

        return MongoLib.connection

    }
    /**
     * Get contractor list
     * @returns {Array} contrators list
     */
    static async getQuotationData(){
        return await MongoLib.client.db(config.dbName).collection('contractors')
        .find({}).toArray()
    }

    /**
     * Get Contractor List from cache
     * @returns {Array}
     */
    static async getQuotationCachedData(){
        if(!Cache.getIntances().get('quotations')){
            const quotations = await MongoLib.client.db(config.dbName).collection('contractors')
                .find({}).toArray()
            
            Cache.getIntances().set('quotations',quotations)
        }    
        return Cache.getIntances().get('quotations')
        
    }
    /**
     * Add new post project to database
     * @param {Object} post 
     */
    static async addPost(post){
        const newPost = await MongoLib.client.db(config.dbName).collection('posts')
            .insertOne(post)
        
        return newPost.insertedId
    }

    /**
     * Get projects posted
     * @returns {Array} posts
     */
    static async getAllPosts(){
        const posts = await MongoLib.client.db(config.dbName).collection('posts')
        .find({}).toArray()

        return posts
    }
}

module.exports = MongoLib