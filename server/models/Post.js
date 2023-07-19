const path = require('node:path')
const db = require('./../db.js');
require("dotenv").config({path: path.join(__dirname, '..', '.env')});
const Promise = require("bluebird");


// These models defines the shape of the data in the database.

const populate = {};

exports.getProducts = (page, count) => {
  return db.query(`SELECT * FROM products WHERE product_id BETWEEN ${(page - 1) * count + 1} AND ${(page - 1) * count + count};`);
}

exports.getProduct = (product_id) => {
  return db.query(`SELECT * FROM products WHERE product_id=${product_id};`);
}

exports.getQuestions = (product_id, page, count) => {
  console.log('product_id: ', product_id);
  console.log('page: ', page);
  console.log('count: ', count);
  return db.query(`SELECT * FROM questions WHERE product_id=${product_id} LIMIT ${count};`);
}

exports.getAnswers = (question_id, page, count) => {
  return db.query(`SELECT * FROM answers WHERE question_id=${question_id} LIMIT ${count};`)
}

exports.addProduct = ({id, name, slogan, description, category, default_price}) => {
  return db.query(`INSERT INTO products VALUES (${id}, {${name}, ${slogan}, ${description}, ${category}, ${default_price})`);
}
