// IMPORT the Package
const express = require ('express'); 
const User = require('../models/User');

//VALIDATION
const {userValidation,loginValidation} = require('../routes/validation');


// Get User
const getUser = async (req, res) => {
    try{
        const users = await User.find();
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
      activityId : req.body.activityId,
      bodygoalId : req.body.bodygoalId
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
     res.status(200).json(upadateUSer)
    }catch(err){
        res.status(400).json({
        message : err
        })
    }
}

// LOGIN
const loginUser = async (req,res) => {
    // Form Validation
    const {error} = loginValidation(req.body)
    if(error) return res.stattus(400).send(error.detail[0].message)
try{
    // Check username exist
    const user = await Users.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Username is not exists!")

    // check pass = email
    const EncodedPass = await bcrypt.compare(req.body.password,user.password)
    if(!EncodedPass) return res.status(400).send("Password is invalid!")
}catch(err){
    res.status(400).json({ message : err})
}
}
    
module.exports ={
    getUser : getUser,
    getUserByName : getUserByName,
    addUser: addUser,
    updateUser : updateUser,
    deleteUser : deleteUser, 
    loginUser : loginUser

};