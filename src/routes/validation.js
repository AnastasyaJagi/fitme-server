// User VALIDATION
const Joi = require('@hapi/joi')

// fungsi JOI untuk menyimpan data validasi

// USER VALIDATION
const userValidation = (users) => {
    const schema = Joi.object({          
        name : Joi.string()
        .required(),
        email : Joi.string()
        .required()
        .email(),
        username : Joi.string()
        .required(),
        password : Joi.string()
        .required(),
        age : Joi.number()
        .required(),
        height : Joi.number()
        .required(),
        weight : Joi.number()
        .required(),
        gender : Joi.number()
        .required(),
        activityId : Joi.string(),
        bodygoalId : Joi.string(),
     });
    return schema.validate(users)
}


// LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            username : Joi.string()
            .required()
            .email(),

            password : Joi.string()
            .required(),
        }
    );

    return schema.validate(data);
}

// ADMIN VALIDATION
const adminValidation = (data) => {
    const schema = Joi.object(
        {
          name : Joi.string()
          .required(),
          email : Joi.string()
          .required(),
          username : Joi.string()
          .required(),
          password  : Joi.string()
          .required()
        }
    );
    return schema.validate(data);
};

// WORKOUT VALIDATION
const workoutValidation = (data) => {
    const schema = Joi.object(
        {
            exercise_level_detail : Joi.string()
            .required(),
            exercise_level : Joi.required(),
            workout : Joi.required()
            } )
            return schema.validate(data)
        };



// HISTORY RECOMMENDATION
const historyValidation = (data) => {
    const schema = Joi.object(
        {
            caseSimilarity : Joi.required(),
            userId : Joi.required(),
            k :  Joi.number().required(),
            exercise_type: Joi.required(),
            score : Joi.required()
        })
        return schema.validate(data)
};
// CASE BASE
const caseBaseValidation = (data) => {
    const schema = Joi.object(
        {
            userId : Joi.required(),
            workoutId : Joi.required(),
            status : Joi.number()
            .required()
        })
        return schema.validate(data)
    };


    // WORKOUT TYPE
const workout_typeValidation = (data) => {
    const schema = Joi.object(
        {
            workout_type : Joi.required(),
            workout_description : Joi.required(),
            
        })
        return schema.validate(data)
    };

const body_goalValidation = ( data ) => {
    const schema = Joi.object(
        {
            goal : Joi.required(),
            weight : Joi.required(),
            
        })
    return schema.validate(data)
}

const activity_levelValidation = ( data ) => {
    const schema = Joi.object(
        {
            activity : Joi.required(),
            weight : Joi.required(),
            
        })
    return schema.validate(data)
}

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
module.exports.adminValidation = adminValidation;
module.exports.workoutValidation = workoutValidation;
module.exports.historyValidation = historyValidation;
module.exports.workout_typeValidation = workout_typeValidation;
module.exports.caseBaseValidation = caseBaseValidation;
module.exports.activity_levelValidation = activity_levelValidation;
module.exports.body_goalValidation = body_goalValidation;