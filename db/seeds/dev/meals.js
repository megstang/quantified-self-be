exports.seed = function(knex, Promise) {
  return knex('meals').del()
    .then(() => {
      return Promise.all([
        knex('meals').insert(
          {name: "Breakfast"},
          {name: "Lunch"},
          {name: "Dinner"},
          {name: "Snack"}
        )
        .then(() => console.log('Meals Seeded :)'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
};
