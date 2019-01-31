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

app.use(function (request, response, done) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'DELETE, PATCH, POST')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  done()
})

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

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select('id', 'name', 'calories')
  .then((food) => {
    response.status(200).json(food)
  })
  .catch((error) => {
    response.status(400).json({ error });
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
})


app.delete('/api/v1/foods/:id', (request,response) => {
  database('mealfoods').where('mealfoods.food_id',request.params.id).del()
    .then(()=> database('foods').where('id', request.params.id).del())
    .then((foods)=> {
      if(foods == 1){
        response.status(204).send()
      }
      else{
        response.status(404).json({error})
      }
    })
  .catch((error)=> {
    response.status(500).json({error})
  });
});

app.patch('/api/v1/foods/:id', (request,response) => {
  database('foods').where({ id: request.params.id }).update({ name: request.body.food.name, calories: request.body.food.calories })
  .then((id) => {
    return database('foods').where('id', request.params.id)
  })
  .then((food) => {
    response.status(200).send(food);
  })
  .catch((error)=> {
    response.status(400).send();
  });
});
