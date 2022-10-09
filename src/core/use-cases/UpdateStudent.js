class UpdateStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {Student} student
   */
  async execute(student) {
    await this.studentsRepository.update(student);
  }
}

module.exports = UpdateStudent;
