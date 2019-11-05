/**
 * Get range by unit
 * @param {number} units 
 */
const switchRangeReadFile = (units) =>{
    
    let key;
    
    switch(true){
        case (units <= 5): key = {index:5,units:5}
            break;
        case (units <= 50): key = {index:4,units:50}
            break;
        case (units <= 500): key = {index:3,units:500}
            break;
        case (units <= 5000): key = {index:2,units:5000}
            break;
        case (units <= 50000): key = {index:1,units:50000}
            break;

        }

    return key
}

/**
 * Get range by unit
 * @param {number} units 
 */
const switchRangeDB = (units) =>{
    
    let base;
    
    switch(true){
        case (units <= 5): base = 5
            break;
        case (units <= 50): base = 50
            break;
        case (units <= 500): base = 500
            break;
        case (units <= 5000): base = 5000
            break;
        case (units <= 50000): base = 50000
            break;

        }

    return base
}

/**
 * Get range by unit
 * @param {number} units 
 */
const switchRangeReadStream = (units) =>{
    
    let key;
    
    switch(true){
        case (units <= 5): key = {index:'5_units',units:5}
            break;
        case (units <= 50): key = {index:'50_units', units:50}
            break;
        case (units <= 500): key = {index:'500_units',units:500}
            break;
        case (units <= 5000): key = {index:'5000_units',units:5000}
            break;
        case (units <= 50000): key = {index:'50000_units',units:50000}
            break;
    }
        
    return key
}

module.exports = {
    switchRangeReadFile,
    switchRangeReadStream,
    switchRangeDB
}