const mongoose = require('mongoose');

//Connection
mongoose.connect('mongodb+srv://admin:admin@data-cyh2v.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true             //To remove some console deprecation warning
  },
  );

//Checking connection
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("We are connected to MongoDB!");
  });

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 1,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    key:{
        type: String,
        required: true
    }
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);