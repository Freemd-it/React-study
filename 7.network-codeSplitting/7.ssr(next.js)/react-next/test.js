const fs = require('fs')
const server = require('http').createServer();
const file = fs.createWriteStream('./Users/idongsu/Desktop/test.txt')


server.on('request', (req,res) => {
  fs.readFile('./Users/idongsu/Desktop/browser_2.png', (err, data) => {
    if(err) throw err;
    res.end(data);
  })
})

server.listen(8000)