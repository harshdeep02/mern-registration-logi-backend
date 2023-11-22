const express = require('express')
const app = express()
var cors = require('cors')
const connectToMongo = require('./db')
const port = process.env.port || 5000

app.use(cors())

connectToMongo()
app.use(express.json())
app.use('/api/user', require('./router/auth'))

app.listen(port, () => {
    console.log(`Server listen at port ${port}`)
})
