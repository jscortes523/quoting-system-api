const NodeCache = require('node-cache')

class Cache{
        
    static getIntances(){
        if(!Cache.instance){
            Cache.instance = new NodeCache({stdTTL:50, checkperiod:60, useClones:false})
        }

        return Cache.instance
    }
}

module.exports = Cache