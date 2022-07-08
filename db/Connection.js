const mongoose = require('mongoose');
//require('dotenv/config');


const URI = "mongodb+srv://Md-wasif:wasifali007@cluster0.sh96b.mongodb.net/<dbname>?retryWrites=true&w=majority";
const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('connection with mongodb is established');
    })
    .catch((e) => {
      console.error('error while connecting with mongodb atlas ', e);
    });
};

module.exports = connectDB;