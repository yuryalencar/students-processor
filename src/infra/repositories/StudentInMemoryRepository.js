const IStudentRepository = require("../../core/repositories/IStudentRepository");

class StudentInMemoryRepository extends IStudentRepository {

	constructor() {
		super();
		this.students = [];
	}

	findAll() { return this.students };

	findByCpf(cpf) { 
		const student = this.students.find(student => student.cpf === cpf);
		if(!student) throw new Error("Student not found");
		return student
	};

	save(student) {
		const found = this.students.find(studentSaved => studentSaved.cpf === student.cpf);
		if (!found) this.students = [...this.students, student];
	}

	destroyByCpf(cpf) {
		const index = this.students.findIndex(student => student.cpf === cpf);
		if(index < 0) throw new Error("Student not found to delete");

		this.students.splice(index, 1);
	};

	update(cpf, student) {
		const index = this.students.findIndex(student => student.cpf === cpf);
		if(index < 0) throw new Error("Student not found to update");

		this.students.splice(index, 1);
		this.students = [...this.students, student];
	};
}

module.exports = StudentInMemoryRepository;
