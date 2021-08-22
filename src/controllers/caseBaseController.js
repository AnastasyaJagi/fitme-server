const express = require ('express');
const CaseBase = require('../models/CaseBase');
const {caseBaseValidation} = require('../routes/validation');

const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/casebase/';
const BASE_USER_URL = 'https://fitmeapp-server.herokuapp.com/api/user/';
import request from 'request'

/// GET PAGE
const getPage = async (req,res) =>{
  request({
    "uri": BASE_URL,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        var casebase =  JSON.parse(body)
        console.log(casebase);
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("casebasePage", {data: casebase}, function(e, dt) {
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
    return res.render("action_casebasePage", {data: null,casebaseType: responses[0] }, function(e, dt) {
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
    return res.render("action_casebasePage", {data: responses[0], casebaseType: responses[1] }, function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    })
  }) 
};
// GET CaseBase
const getCaseBase = async (req, res) => {

    try{
        const casebase = await CaseBase.find()
        .populate('userId')
        .populate('casebaseId')
        res.status(200).json(casebase)
      }catch(err){
        res.status(400).send(err)({
  
        })
      }
    }

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD CaseBase
const addCaseBase = async (req, res) => {
console.log(req.body); 

const casebase = new CaseBase({
  userId : req.body.userId,
  workoutId : req.body.workoutId,
  status : req.body.status
})

// validate
const {error} = caseBaseValidation(req.body)
if (error) return res.status(400).send(error.details[0].message)
try{
// Save to DB
const saveCaseBase = await casebase.save();
res.status(200).send({message : `Succesfuly add ${saveCaseBase._id}`,_id : saveCaseBase._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE CaseBase
const updateCaseBase = async (req, res) => {
  console.log(req.body)
        try{
            const {error} = caseBaseValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateCaseBase = await CaseBase.updateOne({
              _id : req.params.caseId

            },
            {
                $set : {
                  userId : req.body.userId,
                  workoutId : req.body.workoutId,
                  status : req.body.status              
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.caseId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//Delete
const deleteCaseBase= async (req, res) => {
        try{
          const deleteCaseBase = await CaseBase.remove({
            _id : req.params.caseId
          })
          if (deleteCaseBase.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.caseId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }

module.exports ={
    getCaseBase: getCaseBase,
    addCaseBase : addCaseBase,
    updateCaseBase : updateCaseBase,
    deleteCaseBase:deleteCaseBase,
    getPage : getPage,
    getAddPage : getAddPage,
    getEditPage : getEditPage,
};
