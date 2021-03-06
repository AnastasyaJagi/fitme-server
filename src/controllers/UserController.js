// IMPORT the Package
const express = require ('express'); 
const User = require('../models/User');
const mongoose = require('mongoose');

//VALIDATION
const {userValidation,loginUserValidation} = require('../routes/validation');

const BASE_URL = 'https://fitmeapp-server.herokuapp.com/api/user/';
const BASE_ACTIVITY_URL = 'https://fitmeapp-server.herokuapp.com/api/activity/';
const BASE_BODYGOAL_URL = 'https://fitmeapp-server.herokuapp.com/api/bodygoal/';
import request from 'request'

// getlogin page
const getLoginPage = async (req,res) =>{
  return res.render("login", function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    });
};
/// GET PAGE
const getPage = async (req,res) =>{
  Promise.all([ 
    fetchJSON(BASE_URL)
  ]).then(function (responses) {
    return res.render("userPage", {data: responses[0], activity: responses[1], bodygoal : responses[2] }, function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    })
  })
};

const getEditPage = async (req,res) =>{
  var page_id = req.params.id;
  Promise.all([ 
    fetchJSON(BASE_URL+page_id),
    fetchJSON(BASE_ACTIVITY_URL),
    fetchJSON(BASE_BODYGOAL_URL)
  ]).then(function (responses) {
    return res.render("action_userPage", {data: responses[0], activity: responses[1], bodygoal : responses[2] }, function(e, dt) {
      // Send the compiled HTML as the response
      res.send(dt.toString());
    })
  })
    
};

// Get User
const getUser = async (req, res) => {
    try{
        const users = await User.find().populate('activityId bodygoalId');
        res.status(200).json(users)
      }catch(err){
        res.status(400).json({
          messsage : err
        })
      }
    }


//GET USER BY name
const getUserByName = async(req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)
      }catch(error){
        res.status(400).json({
            message : error
        })
      }
    }


//Post 
// reg = mengambil informasi dari body, res = mengirim data ke server

//Add
const addUser = async (req, res) => {

// validate
const {error} = userValidation(req.body)
if (error) return res.status(400).send(error.details[0].message)

try{
    //email exist
    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send("Email is already exist")
    
    //if success
    //hash password
    //const salt = await bcrypt.genSalt(10)
    //const hashedPass = await bcrypt.hash(req.body.password.salt)
    const user = new User({

      userId : req.body.userId,
      name : req.body.name,
      email : req.body.email,
      username : req.body.username,
      password : req.body.password,
      age : req.body.age,
      height : req.body.height,
      weight : req.body.weight,
      gender : req.body.gender,
      activityId : mongoose.Schema.Types.ObjectId(req.body.activityId),
      bodygoalId :  mongoose.Schema.Types.ObjectId(req.body.bodygoalId)
    })
    // Save to DB
    const saveUser = await user.save();
    res.status(200).json({
      message : "Successfully Add User with id "+saveUser._id,
      _id : saveUser._id
    })
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

// DELETE USERRS
const deleteUser = async ( req,res) =>{
    try{
      const deleteUser = await User.remove({
        _id : req.params.userId
      })
      res.status(200).json(deleteUser)
    }catch(err){
      res.status(400).json({
        message : err
      })
    }
}

// UPDATE USERS
const updateUser = async (req,res) => {
    try{
        const upadateUSer = await User.updateOne({
        _id : req.params.userId   
        },
        {
            $set : {
                    userId : req.body.userId,
                    name : req.body.name,
                    email : req.body.email,
                    username : req.body.username,
                    password : req.body.password,
                    age : req.body.age,
                    height : req.body.height,
                    weight : req.body.weight,
                    gender : req.body.gender,
                    activityId : req.body.activityId,
                   bodygoalId : req.body.bodygoalId
                
            }
        }
    
     );
     res.status(200).json({
      message : "Successfully Add User with id "+upadateUSer._id,
      _id : upadateUSer._id
    })
    }catch(err){
        res.status(400).json({
        message : err
        })
    }
}

const loginUser = async (req, res) => {
  console.log('login user');
  // Login for all users
  //form validation
  const {error} = loginUserValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  try{
      //check username exist
      const user = await User.findOne({username:req.body.username})
      if(!user) return res.status(400).send({
          message : "username is not exists!",
          _id : null
      })

      //check pass = username
      const result = await User.findOne({username:req.body.username, password: req.body.password})
      if(!result) return res.status(400).send({
          message : "Password is invalid!",
          _id : null
      })
      // Create TOKEN and store id in jwt
      // const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET)
      // res.header('auth-user',token).status(200).send({
      res.status(200).send({
          message : "Successfully login!",
          token : null,
          _id : result._id
      })

  }catch(err){
      res.status(400).json({ message : err})
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
    getUser : getUser,
    getUserByName : getUserByName,
    addUser: addUser,
    updateUser : updateUser,
    deleteUser : deleteUser, 
    loginUser : loginUser,
    getPage : getPage,
    getEditPage : getEditPage,
    getLoginPage: getLoginPage
};