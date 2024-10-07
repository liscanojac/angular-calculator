import { OperationType } from "../models/operations.model";
import { operations as calculatorOperations } from "../operations"

function getOperation(operation: OperationType): 
  (a: number, b?: number) => number {

  return function(a, b) {
    return calculatorOperations[operation](a, b).value;
  }
}

fdescribe('Testing the adding operation function', () => {

  const addOperation = getOperation('add');
  
  it('should return 4', () => {

    expect(addOperation(2, 2)).toEqual(4);
  })
})

fdescribe('Testing the percentage operation function', () => {

  const percentOperation = getOperation('percent');

  it('1%', () => {

    expect(percentOperation(1)).toEqual(0.01);
  })

  it('10%', () => {

    expect(percentOperation(10)).toEqual(0.1);
  })

  it('1%0', () => {

    expect(percentOperation(1, 0)).toEqual(0);
  })

  it('10%50', () => {
    expect(percentOperation(10, 50)).toEqual(5);
  })

  it('7%7', () => {
    expect(percentOperation(7, 7)).toEqual(0.49);
  })

  it('100%100', () => {

    expect(percentOperation(100, 100)).toEqual(100);
  })

  it('100%', () => {

    expect(percentOperation(100)).toEqual(1);
  })

  it('50%100', () => {

    expect(percentOperation(50, 100)).toEqual(50);
  })
  
  it('333%', () => {

    expect(percentOperation(333)).toEqual(3.33);
  })

  it('-3%14', () => {

    expect(percentOperation(-3, 14)).toEqual(-0.42);
  })
})