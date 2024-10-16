import { OperationButton } from "./button";
import { BaseOperand, Operand } from "./operand";
import { Operation } from "./operations";


export interface OperandServiceInterface {
  first:  BaseOperand;
  second: BaseOperand;
  resetAll(): void;
  reset(operandType: Operand): void;
  erase(operandType: Operand): void;
  eraseLastCharacter(operandType: Operand): void;
}

export interface OperationServiceInterface {
  label: string;
  selected: boolean;
  eval: Operation | undefined;
  isOperationSelected(): this is SelectedOperationService;
  setOperation(btn: OperationButton): void;
  reset(): void;
}

export interface SelectedOperationService extends OperationServiceInterface {
  selected: true,
  eval: Operation
}
