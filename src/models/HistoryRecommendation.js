const moongose = require('mongoose')

const HistoryRecommendationScheme = new moongose.Schema({
userId : {
    type : moongose.Schema.Types.ObjectId,
        ref: "User",
        required : true

},
caseSimilarity : {
    type : [{
        _id : {
            type : moongose.Schema.Types.ObjectId,
                ref: "CaseBase",
                required : true
        },
        name : {
            type : String,
            required : true
        },
        similarity : {
            type : Number,
            required : true
        },
        label : {
            type : String,
            required : true
        }
    }]
},
k : {
    type : Number,
    required : true
},
exercise_type : {
    type : String,
    required : true
}
},{timestamps : true})

module.exports = moongose.model('History', HistoryRecommendationScheme)