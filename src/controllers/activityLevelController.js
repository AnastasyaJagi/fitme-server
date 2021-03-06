const express = require ('express');
const Activity_level = require('../models/Activity_Level');
const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/activity/';
import request from 'request'
const {activity_levelValidation} = require('../routes/validation');

/// GET PAGE
const getPage = async (req,res) =>{
  request({
    "uri": BASE_URL,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        var activity =  JSON.parse(body)
        console.log(activity);
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("activityPage", {data: activity}, function(e, dt) {
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
  return res.render("action_activityPage", {data: null}, function(e, dt) {
    // Send the compiled HTML as the response
    res.send(dt.toString());
  }); 
};

const getEditPage = async (req,res) =>{
  var page_id = req.params.id;
  request({
    "uri": BASE_URL+page_id,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        console.log(page_id)
        console.log(body)
        var activity =  JSON.parse(body)
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("action_activityPage", {data: activity}, function(e, dt) {
          // Send the compiled HTML as the response
          res.send(dt.toString());
        }); 
    } else {
      console.error("Unable to send message:" + err);
      req.end()
    }
  });  
};

// GET WORKOUT TYPE
const getActivity_level = async (req, res) => {

    try{
        const activity_level = await Activity_level.find();
        res.status(200).json(activity_level)
      }catch(err){
        res.status(400).send(err)({
  
        })
      }
    }

    const getActivity_levelById = async (req, res) => {

      try{
          const activity = await Activity_level.findOne({_id:req.params.activityId});
          res.status(200).json(activity)
        }catch(err){
          res.status(400).send(err)({
    
          })
        }
      }
    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD WORKOUT TYPE
const addActivity_level = async (req, res) => {
console.log(req.body); 

const activity_level = new Activity_level({

    activity : req.body.activity,
    weight : req.body.weight
    
})

// validate
const {error} = activity_levelValidation(req.body)


if (error) return res.status(400).send(error.details[0].message)

try{

// Save to DB
const saveActivity_level = await activity_level.save();
res.status(200).send({message : `Succesfuly add ${saveActivity_level._id}`,_id : saveActivity_level._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE WORKOUT TYPE
const updateActivity_level= async (req, res) => {
  console.log(req.body)
        try{
            const {error} = activity_levelValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateActivity_level = await Activity_level.updateOne({
              _id : req.params.activityId

            },
            {
                $set : {
                    activity : req.body.activity,
                    weight : req.body.weight
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.activityId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//DELETE WORKOUT TYPE
const deleteActivity_level= async (req, res) => {
        try{
          const deleteActivity_level = await Activity_level.remove({
            _id : req.params.activityId
          })
          if (deleteActivity_level.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.activityId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }

module.exports ={
    getActivity_level : getActivity_level,
    addActivity_level : addActivity_level,
    getActivity_levelById: getActivity_levelById,
    updateActivity_level : updateActivity_level,
    deleteActivity_level : deleteActivity_level,
    getPage : getPage,
    getAddPage : getAddPage,
    getEditPage : getEditPage
};