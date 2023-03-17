
const Task = require("../models/taskModel")

// Create documents
exports.createTask = (req,res) => {
    const task = new Task(req.body)
    console.log(req.body); 
    task.save().then(() => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
}


// Find all documents
exports.findAllTasks = async (req,res) => {
    try{
        const todos =  await Task.find({})
        res.render("index",{todos})
    }catch (err){
        console.error(err);
        res.status(500).send("Error retrieving tasks");
    }
}
