const myLogger = function (req, res, next) {
  console.log('Request details:')
  console.log(`Method: ${req.method}, Params: ${req.params}, Query: ${req.query}, Body: ${req.body}`);
  next();
}

module.exports = myLogger;