class SaveStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {Student} student
   */
  async execute(student) {
    await this.studentsRepository.save(student);
  }

  /**
   * @param {[]} students all students to save
   */
  async executeBatch(students) {
    for (const student in students) {
      await this.studentsRepository.save(student);
    }
  }
}

module.exports = SaveStudent;
