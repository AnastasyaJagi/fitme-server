require('dotenv').config()
import request from 'request'


const getHomepage = async (req,res) =>{
    return res.render("index", function(e, dt) {
        // Send the compiled HTML as the response
        res.send(dt.toString());
    });    
  };

  const logout = (req,res) => {
    res.cookie("key_fitme","");
    res.cookie("email_fitme","");
    res.redirect('login')
}

  
  module.exports = {
    getHomepage : getHomepage,
    logout : logout
}
