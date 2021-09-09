const express = require ('express')
const Admin = require('../models/Admin');

//VALIDATION
const {adminValidation,loginValidation} = require('../routes/validation');

// Get
const getAdmin = async (req, res) => {
    try{
        const admin = await Admin.find();
        res.status(200).json(admin)
      }catch(err){
        res.status(400).json({
          messsage : err
        })
      }
    }

// GET ADMIN By NAME
const getAdminByName = async(req, res) => {
    try{
        const admin = await Admin.findById(req.params.adminId)
        res.status(200).json(user)
      }catch(error){
        res.status(400).json({
            message : error
        })
      }
    }
    
    
//Post
// reg = mengambil informasi dari body, res = mengirim data ke server

// ADD ADMIN
const addAdmin = async (req, res) => {

// validate
const {error} = adminValidation(req.body) 

if (error) return res.status(400).send(error.details[0].message)

try{
    //email exist
    const emailExist = await Admin.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send("Email is already exist")
    
    //if success
    //hash password
    //const salt = await bcrypt.genSalt(10)
    //const hashedPass = await bcrypt.hash(req.body.password.salt)
    const admin = new Admin({

        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        
    })

// Save to DB
const saveAdmin = await admin.save();
res.status(200).json(saveAdmin)
}catch(err){
    res.status(400).json({
        message : err
    })
}
}

//UPDATE
const updateAdmin = async (req, res) => {
        try{
            const updateAdmin = await Admin.updateOne({
            _id : req.params.adminId   
            },
            {
                $set : {
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,

                    
                }
            }
        
         );
         res.status(200).json(updateAdmin)
        }catch(err){
            res.status(400).json({
            message : err
            })
        }
    }



//Delete
const deleteAdmin = async (req, res) => {
        try{
          const deleteAdmin = await Admin.remove({
            _id : req.params.userId
          })
          res.status(200).json(deleteAdmin)
        }catch(err){
          res.status(400).json({
            message : err
          })
        }
    }

module.exports ={
    getAdmin : getAdmin,
    getAdminByName : getAdminByName,
    addAdmin : addAdmin,
    updateAdmin : updateAdmin,
    deleteAdmin : deleteAdmin
};


// LOGIN
const loginAdmin = async (req,res) => {
    // Form Validation
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.detail[0].message)
try{
    // Check username exist
    const admin = await Admin.findOne({email:req.body.email})
    if(!admin) return res.status(400).send("Username is not exists!")

    // check pass = email
    const EncodedPass = await bcrypt.compare(req.body.password,user.password)
    if(!EncodedPass) return res.status(400).send("Password is invalid!")
}catch(err){
    res.status(400).json({ message : err})
}
}
    
module.exports ={
    getAdmin : getAdmin,
    getAdminByName : getAdminByName,
    addAdmin: addAdmin,
    updateAdmin : updateAdmin,
    deleteAdmin : deleteAdmin, 
    loginAdmin : loginAdmin

};

