const express = require('express')
const path = require('path');
const port = 3000
//auto refresh
const livereload = require("livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public/assets/images'));
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.watch(path.join(__dirname, 'public/css'));

const connectLivereload = require("connect-livereload");
const app = express()
app.use( express.static( "public" ) );
app.set('view engine', 'ejs')
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/home', (req, res) => {
    res.send('home page')
})
  
app.use((req,res,next) => {
    res.status(404).send('error')
})
  
  
app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})