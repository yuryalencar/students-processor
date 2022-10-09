import { describe, it, expect, beforeEach } from 'vitest';

import Student from '../../../src/core/entities/Student';
import DeleteStudent from '../../../src/core/use-cases/DeleteStudent';
import StudentInMemoryRepository from '../../../src/infra/repositories/StudentInMemoryRepository';

let deleteStudent;
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
  deleteStudent = new DeleteStudent(repository);

  repository.save(student);
});

describe('executeByCpf()', () => {
  it('should remove a student of repository using valid cpf format', () => {
    deleteStudent.executeByCpf(cpfCleaned);
    const result = repository.findByCpf(cpfCleaned);
    expect(result).toBeUndefined();
  });

  it('should remove a student of repository using invalid cpf format', () => {
    return expect(deleteStudent.executeByCpf(cpf)).rejects.toThrow('Invalid format of the CPF');
  });
});