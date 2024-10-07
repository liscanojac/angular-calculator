import { BaseOperand, Operation, Result } from "./models/calculator.model";
import { OperationFunctions } from "./models/operations.model";

export const initialOperand: BaseOperand = {
  value: 0,
  label: '',
  decimal: false
};

export const initialOperation: Operation = {
  eval: undefined,
  selected: false,
  label: ''
};

export const initialResult: Result = {
  ...initialOperand,
  isError: false,
  errorCode: "-1"
};

export const operations: OperationFunctions = {
  add: (a, b) => {
    if (b === undefined) return getResult(a);
    const c = a + b;

    return getResult(c);
  },
  substract: (a, b) => {
    if (b === undefined) return getResult(a);
    const c = a - b;

    return getResult(c);
  },
  multiply: (a, b) => {
    if (b === undefined) return getResult(a);
    const c = a * b;

    return getResult(c);
  },
  divide: (a, b) => {

    if(b === 0) {
      return {
        value: 0,
        isError: true,
        label: '',
        decimal: false,
        errorCode: "0"
      }
    }
    if (!b) return getResult(a);
    const c = a / b;

    return getResult(c);
  },
  percent: (a, b) => {
    if (b === 0) return getResult(b);
    if (!b) return operations.divide(a, 100);
    if (b === 100) return getResult(a);
    if (a === 100) return getResult(b);

    const c = formatDecimals(b * (a / 100))

    return getResult(c);
  },
}

function hasDecimals(num: number): boolean {
  return num % 1 != 0;
}

function formatDecimals(a: number): number {
  const b = a.toFixed(2);

  return parseFloat(b);
}

function getResult(a: number): Result {

  const resultValue = parseFloat(a.toFixed(14));
  return {
    value: resultValue,
    isError: false,
    label: resultValue.toString(),
    decimal: hasDecimals(a),
    errorCode: "-1"
  };
}