import { ErrorMsgIndexes } from "./error.model";
import { CalculatorOperation } from "./operations.model";

interface BaseOperation {
  label: string;
};

interface UnselectedOperation extends BaseOperation {
  selected: false,
  eval: undefined
};

interface SelectedOperation extends BaseOperation {
  selected: true,
  eval: CalculatorOperation
};

export interface BaseOperand {
  value: number;
  label: string;
  decimal: boolean;
}

export interface Operand {
  first: BaseOperand;
  second: BaseOperand;
}

interface ResultTrue extends BaseOperand {
  isError: true;
  errorCode: ErrorMsgIndexes;
}
interface ResultFalse extends BaseOperand {
  isError: false;
  errorCode: "-1";
}

export type Result = ResultTrue | ResultFalse


export type Operation = SelectedOperation | UnselectedOperation;
