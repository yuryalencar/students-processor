import { describe, it, expect, beforeEach } from 'vitest';

import Student from '../../../src/core/entities/Student';
import UpdateStudent from '../../../src/core/use-cases/UpdateStudent';
import StudentInMemoryRepository from '../../../src/infra/repositories/StudentInMemoryRepository';

let updateStudent;
let repository;

let rg;
let cpf;
let name;
let email;
let gender;
let birthDate;
let cpfCleaned;
let civilStatus;

let student;

beforeEach(() => {
  rg = "43.038.171-2";
  cpf = "861.931.880-29";
  cpfCleaned = "86193188029";
  name = "Example Name User";
  email = "test@gmail.com";
  gender = "Male";
  birthDate = "30/02/2002";
  civilStatus = "Solteiro";

  student = new Student(name, civilStatus, email, cpf, rg, birthDate, gender);

  repository = new StudentInMemoryRepository();
  updateStudent = new UpdateStudent(repository);

  repository.save(student);
});

describe('execute()', () => {
  it('should be update a student using valid cpf', async () => {
    const { cpf } = student;
    const updatedStudent = new Student("UPDATED", "UPDATED", "UPDATED", cpf, "0000", "30/05/1997", "FEMALE");
    
    await updateStudent.execute(updatedStudent);
    
    const students = await repository.findAll();
    const result = await repository.findByCpf(cpf);

    expect(students).contain(updatedStudent);
    expect(result).toEqual(updatedStudent);
  });

  it('should be not update a file using invalid cpf', async () => {
    const cpf = '00000000000'
    const updatedStudent = new Student("UPDATED", "UPDATED", "UPDATED", cpf, "0000", "30/05/1997", "FEMALE");
    
    await updateStudent.execute(updatedStudent);
    
    const students = await repository.findAll();
    const result = await repository.findByCpf(cpf);

    expect(students).not.contain(updatedStudent);
    expect(result).toBeUndefined();
  });
});
