const express = require ('express');
const History = require('../models/HistoryRecommendation');
const {HistoryValidation} = require('../routes/validation');

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
        console.log(history);
        // console.log(dest);
        //return res.render('homepage', {destination : body })
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
        const History = await History.find();
        res.status(200).json(history)
      }catch(err){
        res.status(400).send(err)({
  
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
  k : req.body.k   
})

// validate
const {error} = HistoryValidation(req.body)
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
            const {error} = HistoryValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateHistory = await History.updateOne({
              _id : req.params.historyId

            },
            {
                $set : {
                  caseSimilarity : req.body.caseSimilarity,
                  userId : req.body.userId,
                  k : req.body.k               
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
    getHistory: getHistory,
    addHistory : addHistory,
    updateHistory : updateHistory,
    deleteHistory: deleteHistory,
    getPage:getPage
};