class SaveFile {
  constructor(filesRepository) {
    this.filesRepository = filesRepository;
  }

  /**
   * @param {string} code provided in file upload
   * @returns file upload status
   */
  async execute(file) {
    await this.filesRepository.save(file);
  }
}

module.exports = SaveFile;
