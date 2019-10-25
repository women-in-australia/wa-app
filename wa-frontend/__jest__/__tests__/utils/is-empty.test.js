import { isEmpty } from '../../../src/util/is-empty';

describe('test util jest', () => {
  it('test empty object', () => {
    expect(isEmpty({})).toBe(true);
  });
  it('test empty string', () => {
    expect(isEmpty('')).toBe(true);
  });
  it('test null', () => {
    expect(isEmpty(null)).toBe(true);
  });
  it('test undefined', () => {
    expect(isEmpty(null)).toBe(true);
  });
});
