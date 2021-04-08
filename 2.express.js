const express = require('./express');

const app = express();

app.get('/',
  function(req, res, next) {
    console.log(1);
    next();
  },
  function(req, res, next) {
    console.log(2);
    next();
  }
)
app.get('/',
  function(req, res, next) {
    console.log(3);
    res.end('ok')
  }
)
app.get('/a',
  function(req, res, next) {
    console.log('aaaa');
  }
)

app.listen(3000, () => {
  console.log('running')
})