class UpdateFile {
  constructor(filesRepository) {
    this.filesRepository = filesRepository;
  }

  /**
   * @param {File} file
   */
  async execute(file) {
    await this.filesRepository.update(file);
  }
}

module.exports = UpdateFile;
