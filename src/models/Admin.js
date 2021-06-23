const moongose = require('mongoose')

const adminScheme = new moongose.Schema({
    name : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    }
    },{timestamps : true})

    module.exports = moongose.model('Admin', adminScheme)


