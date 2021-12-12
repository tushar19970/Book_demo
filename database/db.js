require('dotenv').config();
const knex = require('knex') ({
    client : "mysql",
    connection : {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    }
})

knex.schema.createTable('details', (table) => {
    table.integer('id').primary()
    table.string('Book_name').notNullable()
    table.string('Language').notNullable()
    table.string('Writter').notNullable()
    table.string('Released_year').notNullable()
}).then((data) => {
    console.log("Table has been created successfully...");
}).catch((err) => {
    console.log("Table has been already created...");
})

module.exports = knex