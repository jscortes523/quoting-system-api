const express = require('express')
const bodyParse = require('body-parser')
const config = require('./config')
const MongoLib = require('./lib/mongodb')
const quotationRoute = require('./routes/quotation.routes')
const postRoute = require('../src/routes/post.routes')
const cors = require('cors')
const mongoLib = new MongoLib()
mongoLib.connect()

const app = express()
const router = express.Router()
const port = config.port

app.use(cors())
app.use(bodyParse.json())

router.use('/quote',quotationRoute)
router.use('/post',postRoute)
app.use('/api',router)

app.listen(port,()=>{
    console.log('Bunny Studio',`Magic Happen on port ${port}`)
})
