export interface BaseOperand {
  value: number;
  label: string;
  decimal: boolean;
}

export type Operand = 'first' | 'second';
