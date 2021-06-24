const mongoose = require('mongoose')

//Shceme adalah strukstur user
const userScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
         type : Number,
         required : true
    },
    height : {
        type : Number,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    gender : {
        type : Number,
        required : true,
    },
    activityId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Activity_Level"
    },
    bodygoalId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Body_Goal"
    }

    },{timestamps : true})


module.exports = mongoose.model('User', userScheme)
