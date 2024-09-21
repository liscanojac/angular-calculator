import { CalculatorOperation } from "./operations.model";

export interface Calculator {
  firstOperand: {
    value: number;
    decimal: boolean;
    label: string;
  },
  secondOperand: {
    value: number;
    decimal: boolean;
    label: string;
  },
  operation: FalsyOperation | TruthyOperation,
  result: {
    value: number;
    label: string;
  }
}
interface BaseOperation {
  label: string;
};

interface FalsyOperation extends BaseOperation {
  selected: false,
  value: undefined
};

interface TruthyOperation extends BaseOperation {
  selected: true,
  value: CalculatorOperation
};