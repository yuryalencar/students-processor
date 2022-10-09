class SearchFile {
  constructor(filesRepository) {
    this.filesRepository = filesRepository;
  }

  /**
   * @param {string} code provided in file upload
   * @returns file upload status
   */
  async executeByCode(code) {
    const file = await this.filesRepository.findByCode(code);
    return file;
  }
}

module.exports = SearchFile;
