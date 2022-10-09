import { describe, it, expect, beforeEach } from 'vitest';
import IStudentRepository from '../../../src/core/repositories/IStudentRepository';

describe('IStudentRepository', () => {
  it('IStudentRepository not implemented errors', () => {
    const repository = new IStudentRepository();

    expect(repository.save).toThrow(/Method is not implemented/);
    expect(repository.update).toThrow(/Method is not implemented/);
    expect(repository.findAll).toThrow(/Method is not implemented/);
    expect(repository.findByCpf).toThrow(/Method is not implemented/);
    expect(repository.destroyByCpf).toThrow(/Method is not implemented/);
  });
});
