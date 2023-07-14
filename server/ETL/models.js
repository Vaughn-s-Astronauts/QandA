const db = require('./../db.js');
const path = require('node:path')
require("dotenv").config({path: path.join(__dirname, '/../', '.env')});
const Promise = require("bluebird");

// These models defines the shape of the data in the database.

const populate = {};

exports.addAllProducts = (arrObj) => {

  db.query('DROP TABLE IF EXISTS products CASCADE;')

  .then(() => {
    db.query('DROP TABLE IF EXISTS questions CASCADE;')
  })

  .then(() => {
    db.query('DROP TABLE IF EXISTS answers CASCADE;')
  })

  .then(() => {
    console.log('tables products, questions, and answers dropped.')
    db.query(`CREATE TABLE IF NOT EXISTS products (product_id integer PRIMARY KEY, name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price integer);`)
  })

  .then(() => {
    console.log('table products created if not previously existing.')
    return db.query(`INSERT INTO products (product_id, name, slogan, description, category, default_price) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(product_id integer, name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added to the products table.`)
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}

exports.addAllQuestions = (load1, load2) => {
  load2 = load2 || [{}];
  db.query(`DROP TABLE IF EXISTS questions CASCADE;`)

  .then(() => {
    console.log('table questions dropped if existed.')
    db.query(`CREATE TABLE questions (question_id integer PRIMARY KEY, product_id integer REFERENCES products (product_id), body TEXT, date_written VARCHAR(255), asker_name VARCHAR(255), asker_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then(() => {
    console.log('table questions created.')
    return db.query(`INSERT INTO questions (question_id, product_id, body, date_written, asker_name, asker_email, reported, helpful) SELECT * FROM json_to_recordset('${JSON.stringify(load1)}') as x(question_id integer, product_id integer, body TEXT, date_written VARCHAR(255), asker_name VARCHAR(255), asker_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added to the questions table.`)
    return db.query(`INSERT INTO questions (question_id, product_id, body, date_written, asker_name, asker_email, reported, helpful) SELECT * FROM json_to_recordset('${JSON.stringify(load2)}') as x(question_id integer, product_id integer, body TEXT, date_written VARCHAR(255), asker_name VARCHAR(255), asker_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added to the questions table.`)
    return db.query('SELECT COUNT(*) FROM questions;')
  })

  .then((res) => {
    console.log(`${res.rows[0].count} total records in the questions table.`)
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}

exports.addFirstAnswers = (arrObj) => {
  db.query(`DROP TABLE IF EXISTS answers;`)

  .then(() => {
    console.log('table answers dropped if existed.')
    db.query(`CREATE TABLE answers (answer_id integer PRIMARY KEY, question_id integer REFERENCES questions (question_id), body TEXT, date_written VARCHAR(255), answerer_name VARCHAR(255), answerer_email VARCHAR(255) DEFAULT null, reported BOOLEAN, helpful integer);`)
  })

  .then(() => {
    console.log('table answers created.')
    return db.query(`INSERT INTO answers (answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(ans_id integer, question_id integer, body TEXT, date_written VARCHAR(255), answerer_name VARCHAR(255), answerer_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added to the answers table.`)
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}

exports.addAppendAnswers = (arrObj) => {
  db.query(`INSERT INTO answers (answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(ans_id integer, question_id integer, body TEXT, date_written VARCHAR(255), answerer_name VARCHAR(255), answerer_email VARCHAR(255), reported BOOLEAN, helpful integer);`)

  .then((res) => {
    console.log(`${res.rowCount} records added to the answers table.`);
    return db.query('SELECT COUNT(*) FROM answers;');
  })

  .then((res) => {
    console.log(`${res.rows[0].count} total records in the answers table`);
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}