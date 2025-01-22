const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");
const flash = require("connect-flash");


module.exports.registerUser =  async (req,res) =>{
    try{
    let {fullname , email, password} = req.body;
   
    let user = await userModel.findOne({email: email});
    if(user) return res.status(401).send("You already have an account, please login")  
        
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password,salt ,async function(err,hash){
                
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    }); 
                 
        let token = generatetoken(user);
        res.cookie("token" , token);
        res.send("User created succesfully");
    }
    });
}); 
} 
catch(err){
    res.send(err.message);
    };  
}
module.exports.loginUser = async (req, res) => {
    let {email , password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user){
        req.flash("Email and password is incorrect");
        return res.redirect("/");   
    }    
        bcrypt.compare(password, user.password, function(err,result){
            if(result){
                let token = generatetoken(user);
                res.cookie("token" , token);
                res.redirect("/shop");
                }
                else{
                      req.flash("Email and password is incorrect");
                    return res.redirect("/");
        }
    })
}
module.exports.logout = function(req, res) {
    res.cookie("token","");
    res.redirect("/");
}