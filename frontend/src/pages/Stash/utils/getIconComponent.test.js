import {
  File,
  FileBinary,
  FileCode,
  FileMedia,
  FilePdf,
  FileZip,
} from '@primer/octicons-react';
import getIconComponent from './getIconComponent';

describe('getIconComponent', () => {
  it('should return correct icon component', () => {
    expect(getIconComponent('test.jpg')).toBe(FileMedia);
    expect(getIconComponent('test.png')).toBe(FileMedia);
    expect(getIconComponent('test.spec.js')).toBe(FileCode);
    expect(getIconComponent('test.js')).toBe(FileCode);
    expect(getIconComponent('test.pdf')).toBe(FilePdf);
    expect(getIconComponent('test.exe')).toBe(FileBinary);
    expect(getIconComponent('test.md')).toBe(File);
    expect(getIconComponent('test.txt')).toBe(File);
    expect(getIconComponent('test.zip')).toBe(FileZip);
    expect(getIconComponent('test')).toBe(File);
  });
});
