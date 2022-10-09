class SearchStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @returns All students registered
   */
  async execute() {
    const students = await this.studentsRepository.findAll();
    return students;
  }

  /**
   * @param {string} cpf normalized cpf withour dots and hyphen 
   * @returns student if found and undefined if not found
   */
  async executeByCpf(cpf) {
    const student = await this.studentsRepository.findByCpf(cpf);
    return student;
  }
}


module.exports = SearchStudent;
