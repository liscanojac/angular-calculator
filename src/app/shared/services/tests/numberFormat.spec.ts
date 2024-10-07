import { formatLabel } from "../numberFormat"

fdescribe('Testing the formatLabel function', () => {

  
  it('1', () => {

    expect(formatLabel(1)).toEqual('1');
  });

  it('1000', () => {

    expect(formatLabel(1000)).toEqual('1,000');
  });

  it('2000.1', () => {

    expect(formatLabel(2000.1)).toEqual('2,000.1');
  });

  it('14 times 1', () => {

    expect(formatLabel(11111111111111)).toBe('11,111,111,111,111')
  });
})