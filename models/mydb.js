const express = require('express')
const app = express();




const mongoose = require('mongoose');

const toDoTasks = new mongoose.Schema({
  task: String,
});

const Task = mongoose.model('Task', toDoTasks);

module.exports = Task;