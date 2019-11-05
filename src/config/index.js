require('dotenv').config()
/**
 * Contain enviroment variables
 * @returns {Object} 
 */
module.exports = {
    dataPath: './src/data/out.txt',
    port:process.env.PORT || 4040,
    dbUser:process.env.DB_USER,
    dbPwd:process.env.DB_PWD,
    dbHost:process.env.DB_HOST,
    dbName: process.env.DB_NAME
}