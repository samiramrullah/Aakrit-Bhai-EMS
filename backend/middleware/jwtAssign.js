require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: (details) => {
    return jwt.sign(details, process.env.SECRET_KEY);
  },
  verifyJWT: (token) => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(!err) 
        {
            return true;
        }
        else return false;
    })
  },
  getDecodedValue: (token)=>{
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(!err) return decoded
    })
  }
};