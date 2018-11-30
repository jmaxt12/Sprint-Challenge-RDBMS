exports.up = function(knex, Promise) {
    return knex.schema.createTable("project", tbl => {
      tbl.increments();
      tbl.string("name", 200).notNullable();
      tbl.string("description", 550).notNullable();
      tbl.boolean("completed").defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("project");
  };