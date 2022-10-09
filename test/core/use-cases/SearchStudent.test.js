import { describe, it, expect, beforeEach } from 'vitest';

import Student from '../../../src/core/entities/Student';
import SearchStudent from '../../../src/core/use-cases/SearchStudent';
import StudentInMemoryRepository from '../../../src/infra/repositories/StudentInMemoryRepository';

let searchStudent;
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
  searchStudent = new SearchStudent(repository);

  repository.save(student);
});

describe('executeByCpf()', () => {
  it('should be find a student using valid cpf', async () => {
    const result = await searchStudent.executeByCpf(cpfCleaned);
    expect(result).toEqual(student);
  });

  it('should be find student using invalid cpf format', () => {
    return expect(searchStudent.executeByCpf(cpf)).rejects.toThrow('Invalid format of the CPF');
  });
});

describe('execute()', () => {
  it('should be find all students', async () => {
    const result = await searchStudent.execute();
    expect(result).toEqual([student]);
  });
});