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
  database('foods').insert()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select('id', 'name', 'calories')
    .then((food) => {
      response.status(200).json(food);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/foods', (request, response) => {
  var food = request.body
  database('foods').insert(food, 'id')
    .then((foodItem) => {
      response.status(201).json({food});
    })
    .catch((error) => {
      response.status(400).json({ error });
    });
});
