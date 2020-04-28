//Router
const router = require('express').Router();

//Joi
const Joi = require('@hapi/joi');

//User Model(mongoose)
const User = require('../model/User');

router.post('/', async (req, res) => {
    let user = req.body;
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(1024).required(),
        key: Joi.string().required()
    });
    let details = schema.validate(user);
    //If error in validation
    if(details.error){
        res.status(400).send("Error : Enter valid details");
    }
    //No error in validation
    else{
        //check if email exists already
        let isExists = await User.findOne({email : user.email});
        if(isExists == null){
            let newUser = new User({
                name : user.name,
                email : user.email,
                password : user.password,
                key : user.key
            });
            let isSaved = await newUser.save();
            if(isSaved){
                res.send(isSaved.name + " is registered successfully");
            }
        }else{
            res.status(400).send("Error : Email already exists");
        }
    }

});

module.exports = router;