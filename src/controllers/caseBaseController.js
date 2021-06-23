const express = require ('express');
const CaseBase = require('../models/CaseBase');
const {caseBaseValidation} = require('../routes/validation');

// GET CaseBase
const getCaseBase = async (req, res) => {

    try{
        const casebase = await CaseBase.find()
        .populate('userId')
        .populate('workoutId')
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
  workoutId : req.body.workoutId
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
                  workoutId : req.body.userId              
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
    deleteCaseBase:deleteCaseBase
};
