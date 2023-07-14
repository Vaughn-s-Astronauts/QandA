const path = require('node:path')
const db = require('./../db.js');
require("dotenv").config({path: path.join(__dirname, '..', '.env')});
const Promise = require("bluebird");


// These models defines the shape of the data in the database.

const populate = {};

exports.getProducts = () => {
  return db.query("SELECT * FROM products;");
}

exports.getProduct = (product_id) => {
  return db.query(`SELECT * FROM products WHERE product_id=${product_id};`);
}

exports.getQuestions = (product_id) => {
  return db.query(`SELECT * FROM questions WHERE product_id=${product_id};`);
}

exports.getAnswers = (question_id) => {
  return db.query(`SELECT * FROM answers WHERE question_id=${question_id};`)
}

exports.addProduct = ({id, name, slogan, description, category, default_price}) => {
  return db.query(`INSERT INTO products VALUES (${id}, {${name}, ${slogan}, ${description}, ${category}, ${default_price})`);
}

