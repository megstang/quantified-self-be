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

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select('id', 'name', 'calories')
    .then((food) => {
      response.status(200).json(food);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});



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
