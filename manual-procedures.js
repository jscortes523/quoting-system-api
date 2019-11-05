const mongoose = require('mongoose')
const Contractor = require('./src/model/contractor')
const csv = require('csv-parser')
const fs = require('fs')

URI= 'mongodb+srv://bunny:tQWCITxFec1Kg3JL@zupermarketcluster-ofawj.mongodb.net/quoting_system_db?retryWrites=true&w=majority'
/*
mongoose.connect(URI, (err, res)=> {
    try{
        console.log('Database connected')
        getData()
    }catch(error){
        console.log(error)
    }
}, {useNewUrlParser:true})*/

async function loadData(){
    //50000_units,5000_units,500_units,50_units,5_units
    fs.createReadStream('out.txt')
        .pipe(csv())
        .on('data',async data => {
            const contractor = new Contractor({
                name:`Contractor ${data['id']}`,
                quotationRange: [
                    {
                        units:5,
                        cost: new Number(data['5_units'])
                    },
                    {
                        units:50,
                        cost: new Number(data['50_units'])
                    },
                    {
                        units:500,
                        cost: new Number(data['500_units'])
                    },
                    {
                        units:5000,
                        cost: new Number(data['5000_units'])
                    },
                    {
                        units:50000,
                        cost: new Number(data['50000_units'])
                    }
                ]
            })

            await contractor.save()
        })
        .on('end', () => console.log('Process ended...'))

}

async function getData(){
    const content = await Contractor.findByUnits({units:50})

    content.forEach(element => {
         console.log(element)
    });
}