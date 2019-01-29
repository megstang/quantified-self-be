exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('meals').insert([
          {name: "Breakfast"},
          {name: "Lunch"},
          {name: "Dinner"},
          {name: "Snack"}
        ],'id')
        .then(() => console.log('Meals Seeded :)'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
};
