const express = require ('express');
const Workout_type = require('../models/WorkoutType');
const {workout_typeValidation} = require('../routes/validation');

// GET WORKOUT TYPE
const getWorkout_type = async (req, res) => {

    try{
        const workout_type = await Workout_type.find();
        res.status(200).json(workout_type)
      }catch(err){
        res.status(400).send(err)({
  
        })
      }
    }
  
const getWorkout_typeById = async (req,res) => {
  try{
    const workout_type = await Workout_type.findOne({ _id : req.params.workout_typeId});
    res.status(200).json(workout_type)
  }catch(err){
    res.status(400).send(err)({

    })
  }
}

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD WORKOUT TYPE
const addWorkout_type = async (req, res) => {
console.log(req.body); 

const workout_type = new Workout_type({

    workout_type : req.body.workout_type,
    workout_description : req.body.workout_description
    
})

// validate
const {error} = workout_typeValidation(req.body)


if (error) return res.status(400).send(error.details[0].message)

try{

// Save to DB
const saveWorkout_type = await workout_type.save();
res.status(200).send({message : `Succesfuly add ${saveWorkout_type._id}`,_id : saveWorkout_type._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE WORKOUT TYPE
const updateWorkout_type= async (req, res) => {
  console.log(req.body)
        try{
            const {error} = workout_typeValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateWorkout_type = await Workout_type.updateOne({
              _id : req.params.workout_typeId

            },
            {
                $set : {
                    workout_type : req.body.workout_type,
                    workout_description : req.body.workout_description

                    
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.workout_typeId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//DELETE WORKOUT TYPE
const deleteWorkout_type= async (req, res) => {
        try{
          const deleteWorkout_type = await Workout_type.remove({
            _id : req.params.workoutId
          })
          if (deleteWorkout_type.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.workou_typetId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }

module.exports ={
    getWorkout_type : getWorkout_type,
    getWorkout_typeById : getWorkout_typeById,
    addWorkout_type : addWorkout_type,
    updateWorkout_type : updateWorkout_type,
    deleteWorkout_type : deleteWorkout_type
};