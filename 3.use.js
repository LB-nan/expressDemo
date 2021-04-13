const express = require('express');

const app = express();

app.use((req, res, next) => {
  if (req.query.a == 1) {
    next();
  } else {
    res.send('没有权限');
  }
})

app.get('/', function(req, res) {
  res.send('有权限，通过了');
})

app.listen(3000, () => {
  console.log('running')
})