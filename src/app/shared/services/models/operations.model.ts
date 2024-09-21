export type OperationType = 'add' | 'substract' | 'multiply' | 'divide' | 'percent';

export type CalculatorOperation = (a: number, b: number) => number;

export type OperationFunctions = {
  [operation in OperationType]: CalculatorOperation;
}