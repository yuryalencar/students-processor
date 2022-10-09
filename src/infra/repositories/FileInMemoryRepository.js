const IFileRepository = require("../../core/repositories/IFileRepository");

class FileInMemoryRepository extends IFileRepository {

	constructor() {
		super();
		this.files = [];
	}

	findByCode(code) { return this.files.find(file => file.code === code) };

	save(file) {
		const found = this.files.find(fileSaved => fileSaved.code === file.code);
		if (!found) this.files.push(file);
	}

	update(file) {
		const { code } = file;
		const index = this.files.findIndex(student => student.code === code);		
		if(index < 0) return

		this.files.splice(index, 1);
		this.files = [...this.files, file];
	}
}

module.exports = FileInMemoryRepository;
