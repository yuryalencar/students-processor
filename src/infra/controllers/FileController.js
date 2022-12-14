const { v4: uuidv4 } = require('uuid');
const File = require('../../core/entities/File');
const SaveFile = require('../../core/use-cases/SaveFile');
const UpdateFile = require('../../core/use-cases/UpdateFile');
const SearchFile = require('../../core/use-cases/SearchFile');
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
  try {
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
  
    response.send(JSON.stringify({ message: "File in processing", code: file.code }));
  } catch (error) {
    response.status(500).send(error.message);
  }
}

const consumeFileQueue = async (message) => {
  const file = JSON.parse(message.content.toString());
  const update = new UpdateFile(repository);
  const { code, filename, data } = file;

  try {
    const isSaved = await saveStudents(file);
    if (!isSaved) throw new Error('Fail to proccess file');
    
    await update.execute(new File(code, filename, true, data, 'Successfully processed'));      
  } catch (error) {
    await update.execute(new File(code, filename, false, data, error.message));    
  }
}

const getFileStatus = async (request, response) => {
  try {
    const { code } = request.params;
    const search = new SearchFile(repository);
    const file = await search.executeByCode(code);
    if(!file) return response.status(404).send({ error: 'File not found' });
    
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
