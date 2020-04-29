# Bing News Search API
The Bing News Search API uses Bing's search capabilities to get news articles from the web. 

This is a custom API built on top of Microsoft Azure Cognitive Services Search API. This API have 5 endpoints, which includes register, login,trending headlines, news articles based on search key and category.

## Table of content
- [Register](#register)
- [Login](#login)
- [Trending news](#trending-news)
- [News Search based on key](#get-news-by-search-term)
- [News Search based on category](#get-news-by-category)
- [References](#references)
## Base URL
http://174.138.61.156:3000

## Register
This API creates a new account for the user. 

### Endpoint
> /register

### Method
POST

### Request Body
The following are the required parameters that a request must include in json format. You must send 

- `name = [string]`

    Your full name. The minimum length is 1.
- `email = [string]`

    A valid email address.

- `password = [string]`

    Your chosen password. Minimum length is 8 and maximum length is 1024

- `key` = [string]

    Your subscription key for Azure cognitive services.

### Success Response
- Status Code: 200

    description : User is successfully registered
  
### Error Responses



    status: 400
    description: Email already exists


    status: 400
    description: Enter valid details


    status: 500
    description: Unexpected server error.

## Login
This API logs in the registered user. 

### Endpoint
> /login

### Method
POST

### Request Body
The following are the required parameters that a request must include in json format. You must send 

- `email = [string]`

- `password = [String]`


### Success Response
- Status Code: 200

    Response Body: JWT token for the user whose payload contains the subscription key for the Azure API

    Description : User is successfully logged in. Token is sent in the response header and in the body. 
    
    **Use this token in the header for all other API calls**
  
### Error Responses


    status: 400
    description: Enter valid details

    status: 400
    description: User not found. Please register!

    status: 500
    description: Unexpected server error.

## Trending news
This API retrieves the latest news articles from the web and returns them in json format. 

### Endpoint
> /api/trending

### Method
GET

### Request header
The following are the required parameters that a request must include in the header. You must send 

- `auth-token` [ JWT token sent by the server while logging in ]

### Query Parameters
The following are the optional query parameters that a request may include. You must URL encode the query parameter values.

- `count` = [UnsignedShort]

    The number of news articles to return in the response. The default is 10 .

- `offset` = [UnsignedShort]

    The zero-based offset that indicates the number of news articles to skip before returning the article. The default is 0.

- `mkt` = [String]

    The market where the results come from. Typically, mkt is the country where the user is making the request from.

- `safeSearch` = [String]

    Filter news for adult content. The possible filter values are Off, Moderate and strict. The default is Moderate.

### Success Response
- Status Code: 200

        {

        "_type": "TrendingTopics",

        "value": [

            {
                "webSearchUrl": "https://www.bing.com/search?q=Jesse+Ventura+Green+Party&form=TNSA01&filters=tnTID%3a%22C5311516-3CA5-4817-8A7F-876EBC045C16%22+tnVersion%3a%223500253%22+Segment%3a%22popularnow.carousel%22+tnCol%3a%220%22+tnScenario%3a%22TrendingTopicsAPI%22+tnOrder%3a%22e1aa4cf8-2d2c-4617-bf0d-2744bf81b0f9%22",
                "name": "Considering 2020 run",

                "image": {
                    "url": "https://www.bing.com/th?id=OPN.RTNews_Zb7R_00-nPTrkKxP7q8zkQ&c=14&rs=2&qlt=80&pcl=f9f9f9&pid=News",
                    "provider": [
                        {
                            "_type": "Organization",
                            "name": "© Brendan Smialowski/AFP/Getty Images​​"
                        }
                    ]
                },

                "isBreakingNews": false,

                "query": {
                    "text": "Jesse Ventura Green Party"
                },

                "newsSearchUrl": "https://www.bing.com/news/search?q=Jesse+Ventura+Green+Party&form=TNSA02&filters=tnTID%3a%22C5311516-3CA5-4817-8A7F-876EBC045C16%22+tnVersion%3a%223500253%22+Segment%3a%22popularnow.carousel%22+tnCol%3a%220%22+tnScenario%3a%22TrendingTopicsAPI%22+tnOrder%3a%22e1aa4cf8-2d2c-4617-bf0d-2744bf81b0f9%22"
            }
        }
  
### Error Responses


    status: 401
    description: Unauthorized to access the resource. Subscription key is either expired or invalid.


    status: 500
    descriptionexpected server error.

## Get news by search term
This API retrieves the news articles from the web according to the search query and returns them in json format. 

### Endpoint
> /api/search

### Method
GET

### Request header
The following are the required parameters that a request must include in the header. You must send 

- `auth-token` - JWT token sent by the server

### Query Parameters
The following are the required query parameters that a request may include. You must URL encode the query parameter values.

- `q` = [String] [Required]
The user's search query term which cannot be empty. Use this parameter only with the News Search API. 

### Success Response
- Status Code: 200

        {

        "_type": "TrendingTopics",

        "value": [

            {
                "webSearchUrl": "https://www.bing.com/search?q=Jesse+Ventura+Green+Party&form=TNSA01&filters=tnTID%3a%22C5311516-3CA5-4817-8A7F-876EBC045C16%22+tnVersion%3a%223500253%22+Segment%3a%22popularnow.carousel%22+tnCol%3a%220%22+tnScenario%3a%22TrendingTopicsAPI%22+tnOrder%3a%22e1aa4cf8-2d2c-4617-bf0d-2744bf81b0f9%22",
                "name": "Considering 2020 run",

                "image": {
                    "url": "https://www.bing.com/th?id=OPN.RTNews_Zb7R_00-nPTrkKxP7q8zkQ&c=14&rs=2&qlt=80&pcl=f9f9f9&pid=News",
                    "provider": [
                        {
                            "_type": "Organization",
                            "name": "© Brendan Smialowski/AFP/Getty Images​​"
                        }
                    ]
                },

                "isBreakingNews": false,

                "query": {
                    "text": "Jesse Ventura Green Party"
                },

                "newsSearchUrl": "https://www.bing.com/news/search?q=Jesse+Ventura+Green+Party&form=TNSA02&filters=tnTID%3a%22C5311516-3CA5-4817-8A7F-876EBC045C16%22+tnVersion%3a%223500253%22+Segment%3a%22popularnow.carousel%22+tnCol%3a%220%22+tnScenario%3a%22TrendingTopicsAPI%22+tnOrder%3a%22e1aa4cf8-2d2c-4617-bf0d-2744bf81b0f9%22"
            }
        }
  
### Error Responses


    status: 401
    description: Unauthorized to access the resource. Subscription key is either expired or invalid.


    status: 500
    descriptionexpected server error.

## Get news by Category
This API retrieves the news articles from the web according to the category and returns them in json format. 

### Endpoint
> /api/category

### Method
GET

### Request header
The following are the required parameters that a request must include in the header. You must send 

- `auth-token` - JWT token sent by the server

### Query Parameters
The following are the required query parameters that a request may include. You must URL encode the query parameter values.

- `category` = [String] [Required]
The category which cannot be empty. Use this parameter only with the News category API. 

### Success Response
- Status Code: 200

        {

        "_type": "News",

        "webSearchUrl": "https://www.bing.com/news/search?q=entertainment+news&form=TNSA02",

        "value": [

            {
                "name": "Bennifer's 'Jersey Girl' daughter, child actress Raquel Castro, is all grown up on 'Songland'",
                "url": "https://www.yahoo.com/entertainment/bennifers-jersey-girl-daughter-child-actress-raquel-castro-is-all-grown-up-on-songland-030644183.html",
                "image": {
                    "thumbnail": {
                        "contentUrl": "https://www.bing.com/th?id=ON.36678467F022E1778D115BEC65A32D18&pid=News",
                        "width": 700,
                        "height": 560
                    }
                },

                "description": "When Castro’s acting career didn’t take off as she’d hoped, she struggled mentally and emotionally — until music saved her.",

                "about": [
                    {
                        "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/ee60bfe9-910a-f470-ab85-bac7fab6ce31",
                        "name": "Raquel Castro"
                    },
                    {
                        "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/7b00abdf-475f-1ec4-7e68-89adffc2580f",
                        "name": "Jersey Girl"
                    }
                ],
        
        }
  
### Error Responses


- status: 401
    
    Description: Unauthorized to access the resource. Subscription key is either expired or invalid.


- status: 500

    Description: Unexpected server error.




## References
[News search API Documentation](https://docs.microsoft.com/en-us/rest/api/cognitiveservices-bingsearch/bing-news-api-v7-reference#)