const express = require ('express');
const History = require('../models/HistoryRecommendation');
const {HistoryValidation} = require('../routes/validation');

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

module.exports ={
    getHistory: getHistory,
    addHistory : addHistory,
    updateHistory : updateHistory,
    deleteHistory: deleteHistory
};