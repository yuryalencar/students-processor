const { v4: uuidv4 } = require('uuid');
const File = require('../../core/entities/File');
const SaveFile = require('../../core/use-cases/SaveFile');
const UpdateFile = require('../../core/use-cases/UpdateFile');
const FileInMemoryRepository = require('../repositories/FileInMemoryRepository');

const { saveStudents } = require('./StudentController');

const {
  errorNotFile,
  errorNotStudentKey,
  errorSendQueue
} = require('../messages/error');
const publish = require('../queue/publishers');

const repository = new FileInMemoryRepository();

const publishFileInQueue = async (request, response) => {
  if (!request.files) return response.status(400).send(errorNotFile);
  if (!request.files.students) return response.status(400).send(errorNotStudentKey);

  const { name, data } = request.files.students;
  const file = new File(uuidv4(), name, false, data, 'In Queue');

  const save = new SaveFile(repository);
  await save.execute(file);

  const isPublished = await publish({
    exchange: 'students.exchange',
    queue: 'students.save',
    routingKey: 'save_student',
    message: file
  });

  if (!isPublished) return response.status(400).send(errorSendQueue);

  response.send(JSON.stringify({ message: "File in processing", code: file.code }))
}

const consumeFileQueue = async (message) => {
  const file = JSON.parse(message.content.toString());
  const isSaved = await saveStudents(file);

  const update = new UpdateFile(repository);
  const { code, filename, data } = file;
  if (isSaved) {
    await update.execute(new File(code, filename, true, data, 'Successfully processed'));
  } else {
    await update.execute(new File(code, filename, false, data, 'Fail to proccess file'));
  }
}

const getFileStatus = async (request, response) => {
  try {
    const { code } = request.params;
    const { isProcessed, filename, details } = await repository.findByCode(code);
    response.status(200).send({ file: { code, isProcessed, filename, details } });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

module.exports = {
  publishFileInQueue,
  consumeFileQueue,
  getFileStatus
}
