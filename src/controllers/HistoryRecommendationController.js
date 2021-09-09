const express = require ('express');
const History = require('../models/HistoryRecommendation');
const {historyValidation} = require('../routes/validation');

const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/history_recommendation/';
import request from 'request'

/// GET PAGE
const getPage = async (req,res) =>{
  request({
    "uri": BASE_URL,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        var history =  JSON.parse(body)
        //console.log(history);
        return res.render("historyPage", {data: history}, function(e, dt) {
          // Send the compiled HTML as the response
          res.send(dt.toString());
        }); 
    } else {
      console.error("Unable to send message:" + err);
      req.end()
    }
  });
};
// GET HISTORY
const getHistory = async (req, res) => {

    try{
        const history = await History.find();
        res.status(200).json(history)
      }catch(err){
        res.status(400).json({
          message : err.message
        })
      }
    }

    const getHistoryByUserId = async (req, res) => {
      try{
          const history = await History.find({userId : req.params.userId})
          .populate('userId');
          res.status(200).json(history)
        }catch(err){
          res.status(400).json({
            message : err.message
          })
        }
      }

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD HISTORY
const addHistory = async (req, res) => {
console.log(req.body); 

const history = new History({
  caseSimilarity : req.body.caseSimilarity,
  userId : req.body.userId,
  k : req.body.k,
  exercise_type: req.body.exercise_type 
})

// validate
const {error} = historyValidation(req.body)
if (error) return res.status(400).send(error.details[0].message)
try{
// Save to DB
const saveHistory = await history.save();
res.status(200).send({message : `Succesfuly add ${saveHistory._id}`,_id : saveHistory._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE HISTORY RECOMMENDATION
const updateHistory = async (req, res) => {
  console.log(req.body)
        try{
            const {error} = historyValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateHistory = await History.updateOne({
              _id : req.params.historyId

            },
            {
                $set : {
                  caseSimilarity : req.body.caseSimilarity,
                  userId : req.body.userId,
                  k : req.body.k,
                  exercise_type: req.body.exercise_type             
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.historyId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//Delete
const deleteHistory= async (req, res) => {
        try{
          const deleteHistory = await History.remove({
            _id : req.params.historyId
          })
          if (deleteHistory.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.historyId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }
module.exports ={
    getHistory: getHistory,
    addHistory : addHistory,
    updateHistory : updateHistory,
    deleteHistory: deleteHistory,
    getPage:getPage,
    getHistoryByUserId : getHistoryByUserId
};