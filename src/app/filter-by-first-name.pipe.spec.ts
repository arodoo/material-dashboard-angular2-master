import { FilterByFirstNamePipe } from './filter-by-first-name.pipe';

describe('FilterByFirstNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByFirstNamePipe();
    expect(pipe).toBeTruthy();
  });
});
