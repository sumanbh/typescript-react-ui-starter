import { addTwo, multiplyTwo } from './utils';

describe('utils', () => {
  it('should add 2', () => {
    expect(addTwo(2)).toEqual(4);
  });

  it('should multiply by 2', () => {
    expect(multiplyTwo(3)).toEqual(6);
  });
});
