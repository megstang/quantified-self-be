
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('foods').insert([
          {name: "bagel", calories: 250},
          {name: "jelly donut", calories: 300},
          {name: "oatmeal", calories: 150},
          {name: "ranch salad dressing", calories: 150},
          {name: "rice", calories: 205},
          {name: "tuna", calories: 100},
          {name: "spaghetti", calories: 250},
          {name: "red wine", calories: 120},
          {name: "pizza", calories: 300},
          {name: "pretzels", calories: 100},
          {name: "salsa", calories: 50},
          {name: "cake", calories: 250}
        ], 'id')
        .then(() => console.log('Foods Seeded :)'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
};
