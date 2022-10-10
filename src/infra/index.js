// Creating consumers
const { consumeFileQueue } = require('./controllers/FileController');
const consumer = require('./queue/consumers');
consumer.run('students.save', consumeFileQueue);

// Starting server
const server = require("./server");
server.run();
