const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'snacktrack';



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
module.exports = database;

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/meals', (request, response) => {
  database.raw(
    `SELECT meals.id, meals.name, array_to_json(array_agg(json_build_object('food', foods.id, 'name', foods.name, 'calories', foods.calories))) AS foods
    FROM meals 
    JOIN mealfoods ON meals.id = mealfoods.meal_id
    JOIN foods ON foods.id = mealfoods.food_id
    GROUP BY meals.id`
  )
    .then((meals) => {
      response.status(200).json(meals)
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});
