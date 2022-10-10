class UpdateStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {Student} student
   */
  async execute(cpf, student) {
    await this.studentsRepository.update(cpf, student);
  }
}

module.exports = UpdateStudent;
