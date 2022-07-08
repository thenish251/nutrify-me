const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');
const config = require('../config'); //get config file.


//Register
router.post('/register', async (req, res) => {

    //LETS VALIDATE THE DATA BEFORE WE A USER.
    const { error } = registerValidation(req.body);
       if(error) return res.status(400).send(error.details[0].message);

       //checking if the user is already in database.
        const emailExist = await User.findOne({ email: req.body.email });
          if(emailExist) return res.status(400).send('Email already exists');

       //Hash Password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.password, salt);

       //Create a new user
       const user = new User ({
        username: req.body.username,
          email: req.body.email,
           password: hashedPassword
       });
       try{
           const savedUser = await user.save();
           res.send({user: user._id});
       }catch(error){
          res.status(400).send(error);
       }
});

//Login
router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
       if(error) return res.status(400).send(error.details[0].message);

      //Checking if the email exists.
       const user = await User.findOne({email: req.body.email});
       if(!user) return res.status(400).send('Email or password is incoorect!');

       const validpass = await bcrypt.compare(req.body.password, user.password);
        if(!validpass) return res.status(400).send('password is incorrect!');

        const token = jwt.sign({ id: user._id }, config.secret, {
         expiresIn: 86400 // expires in 24 hours
       });
       // return the information including token as JSON
       res.header('auth-token', token).send({ auth: true, token });
       //res.status(200).send({ auth: true, token: token });
     });

     //Logout
  router.get('/logout', async (req, res) => {
      res.status(200).send({auth: false, token: null});
});

        //const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
          // res.header('auth-token', token).send(token);
          //res.send('Logged In!');

module.exports = router;