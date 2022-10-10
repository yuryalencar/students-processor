// Creating consumers
const consumer = require('./queue/consumers');
const { consumeFileQueue } = require('./controllers/FileController');
consumer.run('students.save', consumeFileQueue);

// Starting server
const server = require("./server");
server.run();
