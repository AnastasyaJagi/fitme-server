const moongose = require('mongoose')

const HistoryRecommendationScheme = new moongose.Schema({
userId : {
    type : moongose.Schema.Types.ObjectId,
        ref: "User",
        required : true

},
caseSimilarity : {
    type : [{
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
}
},{timestamps : true})

module.exports = moongose.model('History', HistoryRecommendationScheme)