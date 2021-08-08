const express = require ('express');
const Workout = require('../models/Workout');
const {workoutValidation} = require('../routes/validation');

const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/workout/';
const BASE_WT_URL = 'https://fitmeapp-server.herokuapp.com/api/workout_type/';
import request from 'request'

/// GET PAGE
const getPage = async (req,res) =>{
  request({
    "uri": BASE_URL,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        var workout =  JSON.parse(body)
        console.log(workout);
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("workoutPage", {data: workout}, function(e, dt) {
          // Send the compiled HTML as the response
          res.send(dt.toString());
        }); 
    } else {
      console.error("Unable to send message:" + err);
      req.end()
    }
  });
    
};

/// GET ADD PAGE 
const getAddPage = async (req,res) =>{
  Promise.all([
    fetchJSON(BASE_WT_URL)
  ]).then(function (responses) {
    return res.render("action_workoutPage", {data: null,workoutType: responses[0] }, function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    })
  }) 
};

const getEditPage = async (req,res) =>{
  var page_id = req.params.id;
  Promise.all([ 
    fetchJSON(BASE_URL+page_id),
    fetchJSON(BASE_WT_URL)
  ]).then(function (responses) {
    console.log(responses[0]);
    return res.render("action_workoutPage", {data: responses[0], workoutType: responses[1] }, function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    })
  }) 
};
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

  // Test
  const test = async (req, res) => {
    var dataArr = plotWorkout(req.body);
    console.log(dataArr);
    res.send('this is test');
  }

  function plotWorkout(body){
    var dataArr = {}
    dataArr['exercise_level'] = body.exercise_level
    dataArr['exercise_level_detail'] = body.exercise_level_detail
    var tempList = []
    for(var i in body){
      if(body[i].workout_list){
        tempList.push({
          workout_type : i,
          workout_list : body[i].workout_list
        })
      }
    }
    dataArr['workout'] = tempList
    for(var i in dataArr.workout){
      var tempArr = []
      for( var j in dataArr.workout[i].workout_list.workout_name){
        var wolist = dataArr.workout[i].workout_list; 
        var woname = wolist.workout_name[j];
        var wolink = wolist.workout_link[j];
        var wo_repetition = wolist.repetition[j];
        var wo_rest_time = wolist.rest_time[j];
        tempArr.push({workout_name: woname, workout_link: wolink, repetition: wo_repetition, rest_time: wo_rest_time })
      }
      dataArr.workout[i].workout_list = tempArr
    }
    return dataArr;
  }

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD WORKOUT
const addWorkout = async (req, res) => {
  var dataArr = plotWorkout(req.body)
  console.log(dataArr);
  const workout = new Workout({
      exercise_level_detail : dataArr.exercise_level_detail,
      exercise_level : dataArr.exercise_level,
      workout : dataArr.workout
  })
  // validate
  const {error} = workoutValidation(dataArr)
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

      function fetchJSON(url) {
        return new Promise((resolve, reject) => {
          request(url, function(err, res, body) {
            if (err) {
              reject(err);
            } else if (res.statusCode !== 200) {
              reject(new Error('Failed with status code ' + res.statusCode));
            } else {
              resolve(JSON.parse(body));
            }
          });
        });
      }

module.exports ={
    getWorkout: getWorkout,
    getWorkoutById : getWorkoutById,
    addWorkout : addWorkout,
    updateWorkout : updateWorkout,
    deleteWorkout : deleteWorkout,
    getPage : getPage,
    getAddPage : getAddPage,
    getEditPage : getEditPage,
    test : test
};