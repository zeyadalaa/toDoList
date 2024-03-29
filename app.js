const express = require('express')
const app = express()
const mongoose = require("mongoose");
const path = require('path');
const port = 3000
const livereload = require("livereload");
const bodyParser = require('body-parser');

//import files
const taskController = require("./controllers/taskController");

//middleware
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//auto refresh
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public/assets/images'));
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.watch(path.join(__dirname, 'models'));
liveReloadServer.watch(path.join(__dirname, 'public/css'));

const connectLivereload = require("connect-livereload");
app.use( express.static( "public" ) );
app.set('view engine', 'ejs')
app.use(connectLivereload());
app.use(bodyParser.urlencoded({ extended: true }));
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


//MongoDB connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://zeyadalaa:kF6RqA4PVtBziM3m@todotasks.zmkram0.mongodb.net/todoTasks?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port at http://localhost:${port}`)
  });
}).catch((err) => {
  console.log(err);
});


app.get("/", taskController.findAllTasks);

app.get('/addtodo', (req, res) => {
    res.render('addtodo')
})

app.post('/addtodo', taskController.createTask)

app.delete('/', taskController.deleteTask)

app.get('/editToDo/:id', taskController.updateTask)

app.put('/tasks/:id', taskController.updateTaskById);



  
app.use((req,res,next) => {
    res.status(404).send('error')
})
  
  