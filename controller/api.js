//Express
const express = require('express');
const router = express.Router();

//Axios
const axios = require('axios');

// //JWT verification
const jwt = require('jsonwebtoken');

router.use((req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.send("Access Denied");
    }
    else{
        jwt.verify(token,"shan",(err,decoded)=>{
            key = decoded.key;
            if(err){
                res.send("Access Denied");
            }
        })
    }
    next();
})

//Search Query
router.get('/search', (req, res) => {
    let searchTerm = req.query.q;
    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news/search", {
        params: {
            "q": searchTerm
        },
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": key
        }
    }

    ).then(response => {

        res.send(response.data);

    }).catch(err => {
        console.log(err);
    })
});

//Trending
router.get('/trending', (req, res) => {
    // const key = req.header('Ocp-Apim-Subscription-Key');
    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news/trendingtopics", {
        headers: {
            "Ocp-Apim-Subscription-Key": key
        }
    }
    ).then(response => {
        res.send(response.data);

    }).catch(err => {
        if (err.response.status == 401) {
            res.status(401).send(err.response.data);
        } else {
            res.status(400).send({
                "message": "Error occured"
            });
        }
    })
});

//Search by category
router.get('/category', (req, res) => {
    let category = req.query.category;
    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news", {
        params: {
            "category": category
        },
        headers: {
            "Ocp-Apim-Subscription-Key": key
        }
    }

    ).then(response => {

        res.send(response.data);

    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;