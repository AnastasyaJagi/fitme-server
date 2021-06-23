const mongoose = require('mongoose')

//Shceme adalah strukstur user
const activityScheme = new mongoose.Schema({
    activity : {
        type : String,
        required : true
    },
    weight : {
        type : Number,
        required : true
    }
    },{timestamps : true})


module.exports = mongoose.model('Activity_Level', activityScheme)
