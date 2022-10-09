const Student = require("../entities/Student");

class SaveStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {Student} student
   */
  async execute(student) {
    Student.validateStudent(student);
    await this.studentsRepository.save(student);
  }

  /**
   * @param {[]} students all students to save
   */
  async executeBatch(students) {
    for (const student of students) {
      Student.validateStudent(student);
      await this.studentsRepository.save(student);
    }
  }
}

module.exports = SaveStudent;
