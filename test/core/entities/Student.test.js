import { describe, it, expect, beforeEach } from 'vitest';
import Student from '../../../src/core/entities/Student';

let student;
let rg;
let cpf;
let name;
let email;
let gender;
let birthDate;
let civilStatus;

let rgCleaned;
let cpfCleaned;

beforeEach(() => {
  rg = "43.038.171-2";
  cpf = "861.931.880-29";
  name = "Example Name User";
  email = "test@gmail.com";
  gender = "Male";
  birthDate = "30/02/2002";
  civilStatus = "Solteiro";

  rgCleaned = "430381712";
  cpfCleaned = "86193188029";

  student = new Student(name, civilStatus, email, cpf, rg, birthDate, gender);
});

describe('constructor()', () => {
  it('parameters should be string using valid values', () => {
    const result = new Student(name, civilStatus, email, cpf, rg, birthDate, gender);

    expect(result).toBeDefined();
    expect(result).toBeTypeOf('object');
    expect(result.rg).toBe(rgCleaned);
    expect(result.cpf).toBe(cpfCleaned);
    expect(result.name).toBe(name);
    expect(result.email).toBe(email);
    expect(result.gender).toBe(gender);
    expect(result.birthDate).toBe(birthDate);
    expect(result.civilStatus).toBe(civilStatus);
  });

  it('parameters should be string using invalid values', () => {
    const rgInvalid = true;
    const cpfInvalid = {};
    const nameInvalid = 2;
    const emailInvalid = 2.2;
    const genderInvalid = null;
    const birthDateInvalid = undefined;
    const civilStatusInvalid = false;

    const rgInvalidFunction = () => new Student(name, civilStatus, email, cpf, rgInvalid, birthDate, gender);
    const cpfInvalidFunction = () => new Student(name, civilStatus, email, cpfInvalid, rg, birthDate, gender);
    const nameInvalidFunction = () => new Student(nameInvalid, civilStatus, email, cpf, rg, birthDate, gender);
    const emailInvalidFunction = () => new Student(name, civilStatus, emailInvalid, cpf, rg, birthDate, gender);
    const genderInvalidFunction = () => new Student(name, civilStatus, email, cpf, rg, birthDate, genderInvalid);
    const birthDateInvalidFunction = () => new Student(name, civilStatus, email, cpf, rg, birthDateInvalid, gender);
    const civilStatusInvalidFunction = () => new Student(name, civilStatusInvalid, email, cpf, rg, birthDate, gender);

    expect(rgInvalidFunction).toThrow(/rg is not a string/)
    expect(cpfInvalidFunction).toThrow(/cpf is not a string/)
    expect(nameInvalidFunction).toThrow(/name is not a string/)
    expect(emailInvalidFunction).toThrow(/email is not a string/)
    expect(genderInvalidFunction).toThrow(/gender is not a string/)
    expect(birthDateInvalidFunction).toThrow(/birthDate is not a string/)
    expect(civilStatusInvalidFunction).toThrow(/civilStatus is not a string/)
  });

  it('parameters should be string using empty values', () => {
    const rgInvalidFunction = () => new Student(name, civilStatus, email, cpf, "", birthDate, gender);
    const cpfInvalidFunction = () => new Student(name, civilStatus, email, "", rg, birthDate, gender);
    const nameInvalidFunction = () => new Student("", civilStatus, email, cpf, rg, birthDate, gender);
    const emailInvalidFunction = () => new Student(name, civilStatus, "", cpf, rg, birthDate, gender);
    const genderInvalidFunction = () => new Student(name, civilStatus, email, cpf, rg, birthDate, "");
    const birthDateInvalidFunction = () => new Student(name, civilStatus, email, cpf, rg, "", gender);
    const civilStatusInvalidFunction = () => new Student(name, "", email, cpf, rg, birthDate, gender);

    expect(rgInvalidFunction).toThrow(/rg cannot be empty/)
    expect(cpfInvalidFunction).toThrow(/cpf cannot be empty/)
    expect(nameInvalidFunction).toThrow(/name cannot be empty/)
    expect(emailInvalidFunction).toThrow(/email cannot be empty/)
    expect(genderInvalidFunction).toThrow(/gender cannot be empty/)
    expect(birthDateInvalidFunction).toThrow(/birthDate cannot be empty/)
    expect(civilStatusInvalidFunction).toThrow(/civilStatus cannot be empty/)
  });


  it('cpf and rg should be only numbers', () => {
    const rgInvalid = "43.038.171-2dsafdas";
    const cpfInvalid = "861.931.880-29dsafdas";

    const rgInvalidFunction = () => new Student(name, civilStatus, email, cpf, rgInvalid, birthDate, gender);
    const cpfInvalidFunction = () => new Student(name, civilStatus, email, cpfInvalid, rg, birthDate, gender);

    expect(rgInvalidFunction).toThrow(/rg not have only numbers/)
    expect(cpfInvalidFunction).toThrow(/cpf not have only numbers/)
  });
});

describe('normalize()', () => {
  it('should remove dots', () => {
    const field = "321.123.123.123"
    const expectedResult = "321123123123"

    const result = student.normalize(field);
    expect(result).toBe(expectedResult)
  });

  it('should remove final spaces', () => {
    const field = "    321 123 123 123      "
    const expectedResult = "321 123 123 123"

    const result = student.normalize(field);
    expect(result).toBe(expectedResult)
  });

  it('should remove hyphen', () => {
    const field = "321-123-123-123"
    const expectedResult = "321123123123"

    const result = student.normalize(field);
    expect(result).toBe(expectedResult)
  });

  it('should not remove non-numeric numbers', () => {
    const field = "321-123-123-123asv"
    const expectedResult = "321123123123asv"

    const result = student.normalize(field);
    expect(result).toBe(expectedResult)
  });
});

describe('validateField()', () => {
  it('should be string using non-string types', () => {
    const booleanField = true
    const objectField = {}
    
    const objectFunction = () => student.validateField(objectField, "field");
    const booleanFunction = () => student.validateField(booleanField, "field");

    expect(booleanFunction).toThrow(/field is not a string/);
    expect(objectFunction).toThrow(/field is not a string/);
  });

  it('shouldnt be empty string', () => {
    const emptyString = ""
    const emptyStringWithSpaces = "      "
    
    const emptyStringFunction = () => student.validateField(emptyString, "field");
    const emptyStringWithSpacesFunction = () => student.validateField(emptyStringWithSpaces, "field");

    expect(emptyStringFunction).toThrow(/field cannot be empty/);
    expect(emptyStringWithSpacesFunction).toThrow(/field cannot be empty/);
  });
});

describe('validateNumericField()', () => {
  it('should be numeric field using dots and hypen', () => {
    const field = "321-123-123-123"
    const resultFunction = () => student.validateNumericField(field, "field");
    expect(resultFunction).not.toThrow();
  });

  it('should be numeric field using invalid value', () => {
    const field = "321-123-123-123asc"
    const resultFunction = () => student.validateNumericField(field, "field");
    expect(resultFunction).toThrow(/field not have only numbers/);
  });
});