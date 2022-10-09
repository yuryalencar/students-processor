import { describe, it, expect, beforeEach } from 'vitest';
import IFileRepository from '../../../src/core/repositories/IFileRepository';

describe('IFileRepository', () => {
  it('IFileRepository not implemented errors', () => {
    const repository = new IFileRepository();

    expect(repository.save).toThrow(/Method is not implemented/);
    expect(repository.update).toThrow(/Method is not implemented/);
    expect(repository.findByCode).toThrow(/Method is not implemented/);
  });
});
