//Express
const express = require('express');
const router = express.Router();

//Axios
const axios = require('axios');

//Search Query
router.post('/search', (req, res) => {
    let searchTerm = req.query.q;
    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news/search", {
        params: {
            "q": searchTerm
        },
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "3cf81872985d4ffe91c7de16a54faaad"
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

    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news/trendingtopics", {
        headers: {
            "Ocp-Apim-Subscription-Key": "3cf81872985d4ffe91c7de16a54faaad"
        }
    }
    ).then(response => {
        res.send(response.data);

    }).catch(err => {
        console.log(err);
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
router.post('/category', (req, res) => {
    let category = req.query.category;
    axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news", {
        params: {
            "category": category
        },
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "3cf81872985d4ffe91c7de16a54faaad"
        }
    }

    ).then(response => {

        res.send(response.data);

    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;