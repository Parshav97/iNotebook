const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes();   //due to it we have got two indexes one is by default other one is the email
module.exports = User;

