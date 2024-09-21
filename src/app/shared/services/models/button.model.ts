import { OperationType } from './operations.model'

export interface Button {
  id: number;
  label: string;
  operand: boolean;
  value: number | OperationType;
}

interface BaseButton {
  id: number;
  label: string;
};

interface NumericButton extends BaseButton {
  operand: 'numeric';
  value: number;
};

interface OperationButton extends BaseButton {
  operand: 'operation';
  value: OperationType;
};

interface DeletionButton extends BaseButton {
  operand: 'deletion';
  value: 'erase' | 'delete'
}

export type Button2 = NumericButton | OperationButton | DeletionButton
