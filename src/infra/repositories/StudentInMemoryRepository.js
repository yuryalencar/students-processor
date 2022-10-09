const IStudentRepository = require("../../core/repositories/IStudentRepository");

class StudentInMemoryRepository extends IStudentRepository {

	constructor() {
		super();
		this.students = [];
	}

	findAll() { return this.students };

	findByCpf(cpf) { return this.students.find(student => student.cpf === cpf) };

	save(student) {
		const found = this.students.find(studentSaved => studentSaved.cpf === student.cpf);
		if (!found) this.students = [...this.students, student];
	}

	destroyByCpf(cpf) {
		const index = this.students.findIndex(student => student.cpf === cpf);
		this.students.splice(index, 1);
	};

	update(student) {
		const { cpf } = student;
		const index = this.students.findIndex(student => student.cpf === cpf);
		this.students.splice(index, 1);
		this.students = [...this.students, student];
	};
}

module.exports = StudentInMemoryRepository;
