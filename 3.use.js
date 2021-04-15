const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log(222)
  next('出错了');
  // if (req.query.a == 1) {

  // } else {
  //   res.send('没有权限');
  // }
})

app.get('/', function(req, res) {
  res.end('ok');
})

app.listen(3000, () => {
  console.log('running')
})