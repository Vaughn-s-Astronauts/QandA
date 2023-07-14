const path = require('node:path')
require("dotenv").config({path: path.join(__dirname, '..', '.env')});
const Post = require('../models/Post.js');

exports.getProducts = (req, res) => {
  Post.getProducts()
  .then((data) => {
    res.send(data.rows);
    res.send(200).end();
  })
}

exports.getProduct = (req, res) => {
  Post.getProduct(req.params.product_id)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

exports.getQuestions = (req, res) => {
  Post.getQuestions(req.params.product_id)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

exports.getAnswers = (req, res) => {
  Post.getAnswers(req.params.question_id)
  .then((data) => {
    res.send(data.rows);
    res.status(200).end();
  })
}

