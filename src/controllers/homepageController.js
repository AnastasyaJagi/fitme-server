require('dotenv').config()
import request from 'request'


const getHomepage = async (req,res) =>{
    return res.render("index", function(e, dt) {
        // Send the compiled HTML as the response
        res.send(dt.toString());
    });    
  };
  
  module.exports = {
    getHomepage : getHomepage
}
