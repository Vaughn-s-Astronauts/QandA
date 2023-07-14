const fs = require('fs');
const util = require('util');

const productsFile = '/Users/brett.stgeorge/Downloads/product.csv';
const questionsFile = '/Users/brett.stgeorge/Downloads/questions.csv';
const answersFile = '/Users/brett.stgeorge/Downloads/answers.csv';

const readStream = {};
readStream.products = fs.createReadStream(productsFile, {encoding: 'utf8'});
readStream.questions = fs.createReadStream(questionsFile, {encoding: 'utf8'});
readStream.answers = fs.createReadStream(answersFile, {encoding: 'utf8'});

module.exports = readStream;