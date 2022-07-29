const mongoose = require('mongoose')

const connectDatabase =()=>{
mongoose.connect("mongodb+srv://rachit:12345@cluster0.neale.mongodb.net/?retryWrites=true&w=majority",{
useUnifiedTopology: true 
}).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log("Error",err)
})
}
module.exports = connectDatabase