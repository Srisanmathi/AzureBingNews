//Router
const router = require('express').Router();

//Joi
const Joi = require('@hapi/joi');

//User Model(mongoose)
const User = require('../model/User');

//Json web token
const jwt = require('jsonwebtoken');

//Login
router.post('/', async (req, res) => {
    let user = req.body;
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(1024).required()
    });
    let details = schema.validate(user);
    //If error in validation
    if(details.error){
        res.status(400).send("Error : Enter valid details");
    }
    //No error in validation
    else{
        //check if email and password are right

        let currentUser = await User.findOne({email : user.email});
        if(currentUser == null){
            res.status(400).send("Error : User not found. Please register!");
        }
        else if(user.password == currentUser.password){
            console.log(currentUser.key);
            jwt.sign({key:currentUser.key},"shan",(err,token)=>{
                res.header("auth-token", token).send({"token" : token});
            })

            
        }
        else{
            res.send("Login unsuccessful");
        }

        
    }

});

module.exports = router;