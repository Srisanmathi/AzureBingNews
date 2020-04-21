//Express
const express = require('express');
const app = express();

//DOTENV
const dotenv = require('dotenv');
dotenv.config();

//CORS
const cors = require('cors');
app.use(cors());     //Allow all origins

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Swagger Documantation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition :{
      info :
        {
      "title": "Azure Bing News Search",
      "description": "API documentation",
      "contact": {
        "name": "Sri",
        "url": "https://github.com/Srisanmathi",
        "email": "sramac13@uncc.edu"
      },
      "servers" : ["http://localhost:3000/"]
    }
  },
      apis: ["./controller/api.js"]
  }
const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
const api = require('./controller/api');
app.use('/api',api);

//Server 
const   PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})