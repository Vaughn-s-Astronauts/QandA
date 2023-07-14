const path = require('node:path');
const express = require('express');
const app = express();
const PORT = 3000;
const myLogger = require('./middleware/logger.js');
const post = require('./controllers/post.js')
const Promise = require("bluebird");

app.use(myLogger);
app.use(express.static(path.join(__dirname, "./../public")));



// In an HTTP GET request, parameters are sent as a query string:

// http://example.com/page?parameter=value&also=another

// In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body. Parameters noted for each route below follow this standard.

// page default is 1.
// count default is 5.

// example
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/?product_id=37313&count=1000


app.get('/products', (req, res) => {
  post.getProducts(req, res);
})

app.get('/products/:product_id', (req, res) => {
  post.getProduct(req, res);
})

app.get('/qa/questions/:product_id', (req,res) => {
  post.getQuestions(req, res);
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  post.getAnswers(req, res);
})


app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.send(req.params);
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.send(req.params);
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.send(req.params);
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send(req.params);
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})