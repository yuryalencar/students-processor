// Creating consumers
const consumer = require('./queue/consumers');
const { saveStudents } = require('./controllers/StudentController');
consumer.run('students.save', saveStudents);

// Starting server
const server = require("./server");
server.run();
