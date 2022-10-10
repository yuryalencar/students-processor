const { v4: uuidv4 } = require('uuid');
const File = require('../../core/entities/File');
const FileInMemoryRepository = require('../repositories/FileInMemoryRepository');

const { saveStudents } = require('./StudentController');

const {
  errorNotFile,
  errorNotStudentKey,
  errorSendQueue
} = require('../messages/error');
const publish = require('../queue/publishers');
const { readSheet } = require('../file-reader');

const repository = new FileInMemoryRepository();

const publishFileInQueue = async (request, response) => {
  if (!request.files) return response.status(400).send(errorNotFile);
  if (!request.files.students) return response.status(400).send(errorNotStudentKey);

  const { name, data } = request.files.students;
  const file = new File(uuidv4(), name, false, data, 'In Queue');

  const isPublished = await publish({
    exchange: 'students.exchange',
    queue: 'students.save',
    routingKey: 'save_student',
    message: file
  });

  if (!isPublished) return response.status(400).send(errorSendQueue);
  repository.save(file);

  response.send(JSON.stringify({ message: "File in processing", code: file.code }))
}

const consumeFileQueue = async (message) => {
  const file = JSON.parse(message.content.toString());
  const isSaved = await saveStudents(file);

  const { code, filename, data } = file;
  if (isSaved) {
    await repository.update(new File(code, filename, true, data, 'Successfully processed'));
  } else {
    await repository.update(new File(code, filename, false, data, 'Fail to proccess file'));
  }
}

module.exports = {
  consumeFileQueue,
  publishFileInQueue,
};
