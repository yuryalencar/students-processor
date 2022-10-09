import { describe, it, expect, beforeEach } from 'vitest';

import Student from '../../../src/core/entities/Student';
import SaveStudent from '../../../src/core/use-cases/SaveStudent';
import StudentInMemoryRepository from '../../../src/infra/repositories/StudentInMemoryRepository';

let saveStudent;
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
  saveStudent = new SaveStudent(repository);
});

describe('executeBatch()', () => {
  it('should be save one student', async () => {
    const students = [student];
    await saveStudent.executeBatch(students);
    const allStudents = await repository.findAll();

    expect(allStudents).contains(student);
  });

  it('shouldnt be save two students with same cpf', async () => {
    const students = [student, student];
    await saveStudent.executeBatch(students);
    const allStudents = await repository.findAll();

    expect(allStudents).toHaveLength(1);
    expect(allStudents).contains(student);
  });

  it('shouldnt be save two students with same cpf', async () => {
    const newStudent = new Student(name, civilStatus, email, '060.909.909-09', rg, birthDate, gender);
    const students = [student, newStudent];
    await saveStudent.executeBatch(students);
    const allStudents = await repository.findAll();

    expect(allStudents).toHaveLength(2);
    expect(allStudents).contains(student);
    expect(allStudents).contains(newStudent);
  });

  it('shouldnt be save an not student instance', () => {
    const students = [{}];
    return expect(saveStudent.executeBatch(students)).rejects.toThrow(/Is not a Student Object/);
  });

  it('shouldnt be save an not array', () => {
    return expect(saveStudent.executeBatch()).rejects.toThrow(/students is not iterable/);
  });
});