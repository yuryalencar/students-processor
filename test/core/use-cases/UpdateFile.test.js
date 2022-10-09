import { describe, it, expect, beforeEach } from 'vitest';

import File from '../../../src/core/entities/File';
import UpdateFile from '../../../src/core/use-cases/UpdateFile';
import FileInMemoryRepository from '../../../src/infra/repositories/FileInMemoryRepository';

let updateFile;
let repository;

let code;
let filename;
let isProcessed;
let details;

let file;

beforeEach(() => {
  code = "4c58a42c-3929-4ae4-9c7c-ffe979d927a0";
  filename = "example_name.csv";
  isProcessed = false;
  details = "";

  file = new File(code, filename, isProcessed, details);

  repository = new FileInMemoryRepository();
  updateFile = new UpdateFile(repository);

  repository.save(file);
});

describe('execute()', () => {
  it('should be update a file using valid code', async () => {
    const { code, filename, isProcessed } = file;
    const updatedFile = new File(code, filename, isProcessed, "Error is occurred");
    
    await updateFile.execute(updatedFile);
    
    const result = await repository.findByCode(code);
    expect(result).toEqual(updatedFile);
  });

  it('should be not update a file using invalid code', async () => {
    const code = 'invalid-code';
    const { filename, isProcessed, details } = file;
    const updatedFile = new File(code, filename, isProcessed, details);

    await updateFile.execute(updatedFile);

    const result = await repository.findByCode(code);
    expect(result).toBeUndefined();
  });
});
