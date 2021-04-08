const express = require('./express');

console.log(express)

const app = express();

app.get('/', (req, res) => {
  res.end('ok')
})

app.listen(3000, ()=>{
  console.log('running')
})
