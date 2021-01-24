const Executor = require('./Executor')
const Task = require('./Task')

function test(value){
    console.log(value)
}

const executor = new Executor(5)
executor.addTask(new Task(test, null, 1234))
executor.addTask(new Task(test, null, 12345))
executor.addTask(new Task(test, null, 123456))
executor.addTask(new Task(test, null, 1234567))
executor.addTask(new Task(test, null, 12345678))
executor.addTask(new Task(test, null, 12345678910))
executor.addTask(new Task(test, null, 12345678911))
executor.addTask(new Task(test, null, 12345678912))
executor.addTask(new Task(test, null, 12345678913))
executor.addTask(new Task(test, null, 12345678914))