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

  static validateNormalizedCpf(cpf) {
    const hasDotsAndHyphens = new RegExp(/\-|\./).test(cpf);
    const hasText = new RegExp("[A-Za-z]").test(cpf);

    if (hasDotsAndHyphens || hasText) throw new Error('Invalid format of the CPF');
  }

  static validateStudent(object) {
    if (typeof object !== 'object') throw new Error('Is not a Student Object');

    const keys = Object.keys(object);
    if (keys.length < 1) throw new Error('Is not a Student Object');
    const validKeys = ['name', 'civilStatus', 'email', 'cpf', 'rg', 'birthDate', 'gender'];

    for (const key of keys) {
      if (!validKeys.includes(key)) throw new Error('Is not a Student Object');
    }

    for (const key of validKeys) {
      if (!keys.includes(key)) throw new Error('Is not a Student Object');
    }
  }
}

module.exports = Student;
