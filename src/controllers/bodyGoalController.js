const Body_goal = require('../models/Body_Goal');
const {body_goalValidation} = require('../routes/validation');
const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/bodygoal/';
import request from 'request'


/// GET PAGE
const getPage = async (req,res) =>{
  request({
    "uri": BASE_URL,
    "method": "GET"
  }, (err,response, body) => {
    if (!err) {
        var bodygoal =  JSON.parse(body)
        console.log(bodygoal);
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("bodygoalPage", {data: bodygoal}, function(e, dt) {
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
  return res.render("action_bodygoalPage", {data: null}, function(e, dt) {
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
        var bodygoal =  JSON.parse(body)
        // console.log(dest);
        //return res.render('homepage', {destination : body })
        return res.render("action_bodygoalPage", {data: bodygoal}, function(e, dt) {
          // Send the compiled HTML as the response
          res.send(dt.toString());
        }); 
    } else {
      console.error("Unable to send message:" + err);
    }
  });
    
};

// GET WORKOUT TYPE
const getBody_goal = async (req, res) => {

    try{
        const body_goal = await Body_goal.find();
        res.status(200).json(body_goal)
      }catch(err){
        res.status(400).send(err)({
  
        })
      }
    }

    const getBody_goalById = async (req, res) => {

      try{
          const body_goal = await Body_goal.findOne({_id:req.params.goalId});
          res.status(200).json(body_goal)
        }catch(err){
          res.status(400).send(err)({
    
          })
        }
      }

    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD WORKOUT TYPE
const addBody_goal = async (req, res) => {
console.log(req.body); 

const body_goal = new Body_goal({

    goal : req.body.goal,
    weight : req.body.weight
    
})

// validate
const {error} = body_goalValidation(req.body)


if (error) return res.status(400).send(error.details[0].message)

try{

// Save to DB
const saveBody_goal = await body_goal.save();
res.status(200).send({message : `Succesfuly add ${saveBody_goal._id}`,_id : saveBody_goal._id})
}catch(err){
    res.status(400).json({
        message : err.message
    })
}
}

//UPDATE WORKOUT TYPE
const updateBody_goal= async (req, res) => {
  console.log(req.body)
        try{
            const {error} = body_goalValidation (req.body)
            if(error) return res.status(400).send(error.details[0].message);
            const updateBody_goal = await Body_goal.updateOne({
              _id : req.params.goalId
            },
            {
                $set : {
                    goal : req.body.goal,
                    weight : req.body.weight
                }
            });
            
       
         res.status(200).json({message : `Successsfuly Update ${req.params.goalId}`})
          }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }
  



//DELETE WORKOUT TYPE
const deleteBody_goal= async (req, res) => {
        try{
          const deleteBody_goal = await Body_goal.remove({
            _id : req.params.goalId
          })
          if (deleteBody_goal.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"}) 
          }else{
            res.status(200).send({message : `Success deleted Id ${req.params.goalId}`})

          }
          
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
      }

module.exports ={
    getBody_goal : getBody_goal,
    addBody_goal : addBody_goal,
    getBody_goalById : getBody_goalById,
    updateBody_goal : updateBody_goal,
    deleteBody_goal : deleteBody_goal,
    getPage : getPage,
    getAddPage : getAddPage,
    getEditPage : getEditPage
};