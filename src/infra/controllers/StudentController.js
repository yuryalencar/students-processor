const Student = require('../../core/entities/Student');

const SaveStudent = require('../../core/use-cases/SaveStudent');
const DeleteStudent = require('../../core/use-cases/DeleteStudent');
const SearchStudent = require('../../core/use-cases/SearchStudent');
const UpdateStudent = require('../../core/use-cases/UpdateStudent');

const reader = require('../../infra/file-reader');
const StudentInMemoryRepository = require('../../infra/repositories/StudentInMemoryRepository');

const repository = new StudentInMemoryRepository();

/**
 * @param {[]} students 
 */
const saveStudents = async (file) => {
  try {
    const studentArray = await reader.readSheet(Buffer.from(file.data));
    const students = studentArray.map(student => {
      const [name, civilStatus, email, cpf, rg, birthDate, gender] = student;
      return new Student(name, civilStatus, email, cpf, rg, birthDate, gender);
    })
    const save = new SaveStudent(repository);
    await save.executeBatch(students);
    return true
  } catch (error) {
    return false;
  }
}

const deleteStudent = async (request, response) => {
  try {
    const { cpf } = request.params;
    const destroy = new DeleteStudent(repository);
    await destroy.executeByCpf(cpf);

    response.status(204).send();
  } catch (error) {
    const status = /Student not found/.test(error.message) ? 404 : 500;
    response.status(status).send({ error: error.message });
  }
}

const updateStudent = async (request, response) => {
  try {
    const { cpf } = request.params;
    const body = request.body;

    Student.validateStudent(body);
    const { name, civilStatus, email, rg, birthDate, gender } = body;
    const student = new Student(name, civilStatus, email, body.cpf, rg, birthDate, gender);

    const update = new UpdateStudent(repository);
    await update.execute(cpf, student);

    response.status(200).send({ message: "Updated with success !", student });
  } catch (error) {
    let status = /Is not a Student Object/.test(error.message) ? 400 : 500;
    status = /Student not found/.test(error.message) ? 404 : status;
    response.status(status).send({ error: error.message });
  }
}

const seeAll = async (_, response) => {
  try {
    const students = repository.findAll();
    response.send(JSON.stringify(students));
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
}

const searchStudent = async (request, response) => {
  try {
    const { cpf } = request.params;
    const search = new SearchStudent(repository);
    const student = await search.executeByCpf(cpf);

    response.status(200).send({ student });
  } catch (error) {
    const status = /Student not found/.test(error.message) ? 404 : 500;
    response.status(status).send({ error: error.message });
  }
}

module.exports = {
  seeAll,
  saveStudents,
  deleteStudent,
  updateStudent,
  searchStudent,
};
