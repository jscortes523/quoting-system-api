const NodeCache = require('node-cache')

/**
 * Cache Manager
 * @class Cache
 */
class Cache{
      
    /**
     * Get Cache instance, It only is instantiated one time
     * If instance is undefined create a new one
     */
    static getIntances(){
        if(!Cache.instance){
            Cache.instance = new NodeCache({stdTTL:50, checkperiod:60, useClones:false})
        }

        return Cache.instance
    }
}

module.exports = Cache