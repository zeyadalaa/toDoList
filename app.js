const express = require('express')
const mongoose = require("mongoose");
const path = require('path');
const port = 3000
const livereload = require("livereload");

//import files


//auto refresh
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public/assets/images'));
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.watch(path.join(__dirname, 'models'));
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


//MongoDB connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://zeyadalaa:uRpU5pMAZvUasVsa@cluster0.b8dat8c.mongodb.net/task?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect().then(
  app.listen(port, () => {
    console.log(`Example app listening on port at http://localhost:${port}`)
  })
).catch((err)=>{
    console.log(err)
});




app.get('/', (req, res) => {
  res.render('index');
})

app.get('/addtodo', (req, res) => {
    res.render('addtodo')
})
  
app.use((req,res,next) => {
    res.status(404).send('error')
})
  
  