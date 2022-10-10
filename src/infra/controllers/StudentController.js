const Student = require('../../core/entities/Student');

const SaveStudent = require('../../core/use-cases/SaveStudent');
const DeleteStudent = require('../../core/use-cases/DeleteStudent');
const SearchStudent = require('../../core/use-cases/SearchStudent');
const UpdateStudent = require('../../core/use-cases/UpdateStudent');

const StudentInMemoryRepository = require('../../infra/repositories/StudentInMemoryRepository');

const repository = new StudentInMemoryRepository();

const publishSaveStudents = async (request, response) => {

}

const saveStudents = async (message) => {
  console.log(message.content.toString(), 'Call email API here');
}

const deleteStudent = async (request, response) => {

}

const updateStudent = async (request, response) => {

}

const searchStudent = async (request, response) => {

}

module.exports = {
  saveStudents,
  deleteStudent,
  updateStudent,
  searchStudent,
  publishSaveStudents,
};
