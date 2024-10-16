import { OperationType } from "./operations";

interface BaseButton {
  id: number;
  label: string;
};

interface NumericButton extends BaseButton {
  operand: 'numeric';
  value: number;
};

export interface OperationButton extends BaseButton {
  operand: 'operation';
  value: OperationType;
};

interface DeletionButton extends BaseButton {
  operand: 'deletion';
  value: DeletionType
}

interface DecimalButton extends BaseButton {
  operand: 'decimal'
  value: 0
}

export interface EqualButton extends BaseButton {
  operand: 'equal',
  value: 0
}

export type Button = NumericButton | OperationButton | DeletionButton | DecimalButton | EqualButton;

export type ButtonObj = {
  [button in ButtonType]: Button;
};

type DeletionType = 'erase' | 'reset';

export type NumericType = 'zero' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine'; 

type ButtonType = 'decimal' | 'equal' | DeletionType | OperationType | NumericType;
