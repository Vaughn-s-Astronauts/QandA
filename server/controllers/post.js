const path = require('node:path');
const url = require('url');
const querystring = require('querystring')
require("dotenv").config({path: path.join(__dirname, '..', '.env')});
const Post = require('../models/Post.js');

exports.getProducts = (req, res) => {
  q = url.parse(req.url, true);
  let queryObj = {};
  if (q.search !== null) {
    queryObj = querystring.parse(q.search.substring(q.search.indexOf('?') + 1));
  }
  let page = Number(queryObj.page) || 1;
  let count = Number(queryObj.count) || 5;
  Post.getProducts(page, count)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

exports.getProduct = (req, res) => {
  // console.log(querystring.parse(req.url));
  // const page = req.params.page || 1;
  // const count = req.params.count || 5;
  Post.getProduct(req.params.product_id)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

exports.getQuestions = (req, res) => {
  q = url.parse(req.url, true);
  let queryObj = {};
  if (q.search !== null) {
    queryObj = querystring.parse(q.search.substring(q.search.indexOf('?') + 1));
  }
  console.log('queryObj: ', queryObj)
  let product_id = Number(queryObj.product_id) || 1;
  let page = Number(queryObj.page) || 1;
  let count = Number(queryObj.count) || 5;
  Post.getQuestions(product_id, page, count)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

exports.getAnswers = (req, res) => {
  q = url.parse(req.url, true);
  let queryObj = {};
  if (q.search !== null) {
    queryObj = querystring.parse(q.search.substring(q.search.indexOf('?') + 1));
  }
  let questiion_id = Number(queryObj.question_id) || 1;
  let page = Number(queryObj.page) || 1;
  let count = Number(queryObj.count) || 5;
  Post.getAnswers(question_id, page, count)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}
