// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/meanDB', (err)=>{
//     if(!err){
//         console.log('DB Connnection Successful')
//     }
//     else{
//         console.log('Error in Connnection ' + err)

//     }
// })

// module.exports = mongoose;
//////////////////////////////////////////////////
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/meanDB';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: " + err.message);
  });

module.exports = mongoose;
