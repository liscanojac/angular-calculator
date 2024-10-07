import { OperationType } from './operations.model'

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
  value: 'erase' | 'reset'
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
