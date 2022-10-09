class Student {

  /**
   * @param {string} name 
   * @param {string} civilStatus 
   * @param {string} email 
   * @param {string} cpf 
   * @param {string} rg 
   * @param {string} birthDate 
   * @param {string} gender 
   */
  constructor(name, civilStatus, email, cpf, rg, birthDate, gender) {
    this.validateField(rg, 'rg');
    this.validateNumericField(rg, 'rg')
    this.validateField(cpf, 'cpf');
    this.validateNumericField(cpf, 'cpf')

    this.validateField(name, 'name');
    this.validateField(email, 'email');
    this.validateField(gender, 'gender');
    this.validateField(birthDate, 'birthDate');
    this.validateField(civilStatus, 'civilStatus');

    this.rg = this.normalize(rg);
    this.cpf = this.normalize(cpf);
    this.name = name.trim();
    this.email = email.trim();
    this.gender = gender.trim();
    this.birthDate = birthDate.trim();
    this.civilStatus = civilStatus.trim();
  }

  validateField(field, fieldName) {
    if (typeof field !== 'string') throw new Error(`${fieldName} is not a string`);
    if (field.trim() === '') throw new Error(`${fieldName} cannot be empty`);
  }

  validateNumericField(field, fieldName) {
    const regex = new RegExp("[A-Za-z]");
    if (regex.test(field)) throw new Error(`${fieldName} not have only numbers`);
  }

  normalize(field) {
    const withoutDots = field.split('.').join('');
    const normalized = withoutDots.split('-').join('');
    return normalized.trim();
  }
}

module.exports = Student;
