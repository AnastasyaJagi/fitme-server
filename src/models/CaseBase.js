const moongose = require('mongoose')

const CaseBaseScheme = new moongose.Schema({
userId : {
    type : moongose.Schema.Types.ObjectId,
        ref: "User",
        required : true

},
workoutId : {
    type : moongose.Schema.Types.ObjectId,
        ref: "Workout",
        required : true
},
status : {
    type : Number,
    required : true
}
},{timestamps : true})

module.exports = moongose.model('CaseBase', CaseBaseScheme)