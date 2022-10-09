import { describe, it, expect, beforeEach } from 'vitest';

import File from '../../../src/core/entities/File';
import SearchFile from '../../../src/core/use-cases/SearchFile';
import FileInMemoryRepository from '../../../src/infra/repositories/FileInMemoryRepository';

let searchFile;
let repository;

let code;
let filename;
let isProcessed;
let details;

let file;

beforeEach(() => {
  code = "4c58a42c-3929-4ae4-9c7c-ffe979d927a0";
  filename = "example_name.csv";
  isProcessed = true;
  details = "Example error message";

  file = new File(code, filename, isProcessed, details);

  repository = new FileInMemoryRepository();
  searchFile = new SearchFile(repository);

  repository.save(file);
});

describe('executeByCode()', () => {
  it('should be find a file using valid code', async () => {
    const result = await searchFile.executeByCode(code);
    expect(result).toEqual(file);
  });

  it('should be find student using invalid code', async () => {
    const result = await searchFile.executeByCode('invalid-code');
    expect(result).toBeUndefined();
  });
});
