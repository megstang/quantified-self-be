exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('mealfoods').insert([
          {food_id:1, meal_id:1 },
          {food_id:2, meal_id:1 },
          {food_id:12, meal_id:1 },
          {food_id:3, meal_id:2},
          {food_id:4, meal_id:2},
          {food_id:5, meal_id:2},
          {food_id:6, meal_id: 3},
          {food_id:7, meal_id: 3},
          {food_id:8, meal_id: 3},
          {food_id:9, meal_id: 4},
          {food_id:10, meal_id: 4},
          {food_id:11, meal_id: 4},
          {food_id:5, meal_id: 4},
        ],'id')
        .then(() => console.log('Meal Foods Seeded :)'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
};
