const mongoose = require('mongoose')
const port =  'mongodb+srv://harshdeep7887:harshdeep121212@cluster0.bspcv4j.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/user'
// harshdeep121212


const connectToMongo = ()=>{mongoose.connect(port)
  .then(() => {
    console.log('Connected')
})
.catch(()=>{
    console.log("connection failed")
})
}

module.exports = connectToMongo