const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name:{type:String, required:true},
    projects:[{
        name:String,
        units:Number,
        contractors:[{
            contractor: {type: mongoose.Types.ObjectId, ref:'Contractor'},
            name:String,
            totalCost:Number
        }]
    }]
})

module.exports = mongoose.model('Customer', CustomerSchema)