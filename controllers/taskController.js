
const Task = require("../models/taskModel")

exports.createTask = (req,res) => {
    const task = new Task(req.body)
    console.log(req.body); 
    task.save().then(() => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
}