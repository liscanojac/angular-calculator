import { formatResult, setResult } from "../result";


fdescribe('testing the formatResult function', () => {


  function testFormatResult(num: number, isError?: boolean): string {
    return formatResult(setResult(num, isError));
  }

  it('testing 1', () => {

    expect(testFormatResult(1)).toEqual('1');
  });

  it('testing 1000', () => {

    expect(testFormatResult(1000)).toEqual('1,000');
  });

  it('testing 1000.1', () => {

    expect(testFormatResult(1000.1)).toEqual('1,000.1');
  });

  it('testing 1000.222222222222', () => {

    expect(testFormatResult(1000.222222222222)).toEqual('1,000.2222222222');
  });

  it('testing 1000000.222222222222', () => {

    expect(testFormatResult(1000000.222222222222)).toEqual('1,000,000.2222222');
  });
  
  it('testing 1000000000.222222222222', () => {

    expect(testFormatResult(1000000000.222222222222)).toEqual('1,000,000,000.2222');
  });

  it('testing 10000000000000', () => {

    expect(testFormatResult(10000000000000)).toEqual('10,000,000,000,000');
  });

  it('testing 100000000000000 to be showed in exponential notation', () => {

    expect(testFormatResult(100000000000000)).toContain('e+');
  });

  it('testing the error message', () => {

    expect(testFormatResult(0, true)).toEqual(`Can't divide by 0`);
  });
})