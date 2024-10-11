import { formatOperand } from "../operand"

fdescribe('Testing the formatOperand function', () => {

  
  it('1', () => {

    expect(formatOperand({
      label: '1',
      value: 1,
      decimal: false
    })).toEqual('1');
  });

  it('1000', () => {

    expect(formatOperand({
      label: '1000',
      value: 1000,
      decimal: false
    })).toEqual('1,000');
  });

  it('2000.1', () => {

    expect(formatOperand({
      label: '2000.1',
      value: 2000.1,
      decimal: true
    })).toEqual('2,000.1');
  });

  it('14 times 1', () => {

    expect(formatOperand({
      label: '11111111111111',
      value: 11111111111111,
      decimal: false
    })).toBe('11,111,111,111,111')
  });
})