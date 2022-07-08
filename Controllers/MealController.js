const mongoose = require('mongoose');
const router = require('express').Router();
const Verify = require('../routes/verifyToken');
const config = require('../config');
const User_ref = require('./UserController');

const { create } = require('../model/Meal');

//Integrate with nutritnoix API
const getCalories = async (foodname) => {
 const calorie = -1;
 const response = await fetch(config.nutritionixEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': '3dc2ea35',
      'x-app-key': '3ade312bd3091f52a181f332b894acd6',
      'x-remote-user-id': 0,
    },
    body: JSON.stringify({ query: foodname }),
  });
  console.log('response');
  return response.json();
};

const Meal = require('../model/Meal');
const User = require('../model/User');

//CREATE A NEW MEAL.
router.post('/', Verify, async (req, res) => {
  // console.log('reqbody :', req.body);
  let body = req.body;
  // console.log('body ', body);
  if (!req.body.calorie) {
    // console.log('calories not provided ');
    body.calorie = -1; //get calories from api
    // console.log('meal name ', req.body.mealName);
    await getCalories(req.body.foodname).then((data) => {
      console.log('data ', data);

      if (data.hasOwnProperty('message')) {
        body.calorie = -1;
      } else {
        body.calorie = data.foods[0].nf_calories;
      }
    });
  }
  console.log('body after api call ', body);
  if (body.calorie != -1) {
    let mealModel = new Meal(body);
    console.log('success');
    mealModel
      .save()
      .then(() => {
        console.log(mealModel);
        res.status(200).send({
          error: false,
          message: 'Meal posted successfully',
        });
      })
      .catch((e) => {
        console.log('1 error');
        console.log(mealModel);
        res.status(400).send({
          error: true,
          message: 'Something went wrong!!',
          errObj: e,
        });
        return;
      });
  } else {
    console.log('2 error');
    res.status(400).send({
      error: true,
      message: 'Meal does not exist!!',
      errObj: null,
    });
  }
});

module.exports = router;
