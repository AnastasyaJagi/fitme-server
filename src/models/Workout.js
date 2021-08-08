const moongose = require('mongoose')

const WorkoutScheme = new moongose.Schema({

exercise_level : {
    type : Number,
    required : true 
},
exercise_level_detail :{
    type : String,
    required : true
},
workout : {
    type : [{
        workout_type : {
            type : moongose.Schema.Types.ObjectId,
            ref : "Workout_type"
        },
        workout_list : {
            type : {
                workout_name : {
                    type : [String],
                    required : true
                },
                workout_link : {
                    type : [String],
                    required : true
                },
                repetition : {
                    type : [String],
                    required : true
                },
                rest_time : {
                    type : [String],
                    required : true
                }
            }
        }
    }]
}

},{timestamps : true})

module.exports = moongose.model('Workout', WorkoutScheme)