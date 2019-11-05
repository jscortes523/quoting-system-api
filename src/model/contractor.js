const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const Schema = mongoose.Schema

const  QuotationSchema = new Schema({
    units:{type:Number, required:true},
    cost:{type:Number, required:true}    
})

QuotationSchema.virtual('costPerUnit').get(function(){ 
    const result = (this.cost / this.units)*100
    return  Math.round(result)/100
} )


const ContractorSchema = new Schema({
    name:{type:String, required:true},
    quotationRange :{type:[QuotationSchema],default:[]}
})

ContractorSchema.index({'quotationRange':1})

ContractorSchema.plugin(mongooseLeanVirtuals)

ContractorSchema.statics.findByUnits = async function({units}){
    const quotation = []

    const result = await this.find({quotationRange: {$elemMatch:{ units:units}}})//this.find({'quotationRange.units':units})
        .lean({virtuals:true})
    
    result.forEach( data => {
            data.quotationRange.forEach( range => {
                if( range.units === units ){
                    quotation.push({
                        contractor:data._id,
                        name:data.name,
                        costPerUnits:range.costPerUnit
                    })
                }
            })
        })

    return quotation;
}

module.exports = mongoose.model('Contractor',ContractorSchema)
