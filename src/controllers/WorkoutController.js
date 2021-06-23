const express = require ('express');
const Workout = require('../models/Workout');
const {workoutValidation} = require('../routes/validation');

// GET WORKOUT
const getWorkout = async (req, res) => {

    try{
        const workout = await Workout.find();
        res.status(200).json(workout)
      }catch(err){
        res.status(400).send(err)({
  
        })
      }
    }

    // GET WORKOUT
const getWorkoutById = async (req, res) => {
console.log('this is by id');

  try{
      const workout = await Workout.findOne({_id : req.params.workoutId});
      res.status(200).json(workout)
    }catch(err){
      res.status(400).send(err)({

      })
    }
  }

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD WORKOUT
const addWorkout = async (req, res) => {
console.log(req.body); 
console.log('this is workout');

const workout = new Workout({

    exercise_level_detail : req.body.exercise_level_detail,
    exercise_level : req.body.exercise_level,
    workout : req.body.workout
})

// validate
const {error} = workoutValidation(req.body)
if (error) return res.status(400).send(error.details[0].message)

try{

// Save to DB
const saveWorkout = await workout.save();
res.status(200).send({message : `Succesfuly add ${saveWorkout._id}`,_id : saveWorkout._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE WORKOUT
const updateWorkout= async (req, res) => {
  console.log(req.body)
        try{
            const {error} = workoutValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateWorkout = await Workout.updateOne({
              _id : req.params.workoutId

            },
            {
                $set : {
                  exercise_level_detail : req.body.exercise_level_detail,
                  exercise_level : req.body.exercise_level,
                  workout : req.body.workout

                    
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.workoutId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//DELETE WORKOUT
const deleteWorkout= async (req, res) => {
        try{
          const deleteWorkout = await Workout.remove({
            _id : req.params.workoutId
          })
          if (deleteWorkout.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.workoutId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }

module.exports ={
    getWorkout: getWorkout,
    getWorkoutById : getWorkoutById,
    addWorkout : addWorkout,
    updateWorkout : updateWorkout,
    deleteWorkout : deleteWorkout
};