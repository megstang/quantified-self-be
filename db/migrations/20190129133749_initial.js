
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function(table){
      table.increments('id').primary();
      table.string('name');
      table.integer('calories').unsigned;

      table.timestamps(true,true);

    }),

    knex.schema.createTable('meals', function(table){
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true,true);
    }),

    knex.schema.createTable("mealfoods", function(table){
      table.increments('id').primary();
      table.integer('meal_id').unsigned;
      table.foreign('meal_id').references('meals.id');
      table.integer('food_id').unsigned;
      table.foreign('food_id').references('foods.id');

      table.timestamps(true,true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealfoods'),
    knex.schema.dropTable('meals'),
    knex.schema.dropTable('foods')
  ])
};
