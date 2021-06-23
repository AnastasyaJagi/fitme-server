const moongose = require('mongoose')

const Workout_typeScheme = new moongose.Schema({

workout_type : {
    type : String,
    required : true 
},
workout_description :{
    type : String,
    required : true
}

},{timestamps : true})

module.exports = moongose.model('Workout_type', Workout_typeScheme)