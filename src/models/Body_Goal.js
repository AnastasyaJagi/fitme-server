const mongoose = require('mongoose')

//Shceme adalah strukstur user
const bodyScheme = new mongoose.Schema({
    goal : {
        type : String,
        required : true
    },
    weight : {
        type : Number,
        required : true
    }
    },{timestamps : true})


module.exports = mongoose.model('Body_Goal', bodyScheme)
