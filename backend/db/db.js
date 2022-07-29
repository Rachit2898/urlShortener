const mongoose = require('mongoose')

const connectDatabase =()=>{
mongoose.connect("mongodb://localhost:27017/redux",{
useUnifiedTopology: true 
}).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log("Error",err)
})
}
module.exports = connectDatabase