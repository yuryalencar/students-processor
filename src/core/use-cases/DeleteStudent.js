const Student = require('../entities/Student');

class DeleteStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {string} cpf 
   */
  async executeByCpf(cpf) {
    Student.validateNormalizedCpf(cpf);
    await this.studentsRepository.destroyByCpf(cpf);
  }
}

module.exports = DeleteStudent;
