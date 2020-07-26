exports.up = function(knex, Promise) {
    return knex.schema.createTable('stuffs', function(table) {
      table.increments()
      table.string('loc')
      
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('stuffs');
  }