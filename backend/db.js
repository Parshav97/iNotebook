const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// after mongo gets connected then this call back is fired
const connectToMongo = ()=>{
     mongoose.connect(mongoURI, ()=>{
         console.log("connected to Mongo Successfully");
     })
}

module.exports = connectToMongo;