import { Result } from "./result";

export type OperationType = 'add' | 'substract' | 'multiply' | 'divide' | 'percent';

export type Operation = (a: number, b?: number) => Result;

export type OperationFunctions = {
  [operation in OperationType]: Operation;
}
