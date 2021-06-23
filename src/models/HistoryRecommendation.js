const moongose = require('mongoose')

const HistoryRecommendationScheme = new moongose.Schema({
userId : {
    type : moongose.Schema.Types.ObjectId,
        ref: "User",
        required : true

},
caseSimilarity : {
    type : [{
        caseId : {
            type : moongose.Schema.Types.ObjectId,
            ref : "CaseBase",
            required : true
        },
        score : {
            type : Number,
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