class DeleteStudent {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  /**
   * @param {string} cpf 
   */
  async executeByCpf(cpf) {
    await this.studentsRepository.destroyByCpf(cpf);
  }
}

module.exports = DeleteStudent;
