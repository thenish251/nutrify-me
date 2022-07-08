const express = require('express');
const cors = require('cors');
const connectDB = require('./db/Connection');
//const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

connectDB();

//import Routes
const authRoute = require('./routes/auth');
const usercontroller = require('./Controllers/UserController');
const mealcontroller = require('./Controllers/MealController');

//Middlewares
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/users', usercontroller);
app.use('/meal', mealcontroller);

const Port = process.env.Port || 5000;
app.listen(Port, () => {
    console.log('server is up and running.....');
});
