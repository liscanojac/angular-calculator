import { Result } from "./calculator.model";

export type OperationType = 'add' | 'substract' | 'multiply' | 'divide' | 'percent';

export type CalculatorOperation = (a: number, b?: number) => Result;

export type OperationFunctions = {
  [operation in OperationType]: CalculatorOperation;
}

export type OperandType = 'first' | 'second';