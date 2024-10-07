import { BaseOperand } from "./models/calculator.model";

export function formatLabel(a: number): string {
  const b = a.toLocaleString('en-US', {
  });

  return b;
}

export function formatOperand(operand: BaseOperand): string {

  let decimalAtEnd = false;
  if(!operand.label || operand.label === '-') return operand.label;
  if (operand.label.slice(-1) === '.') decimalAtEnd = true;

  return operand.value > 999 ? 
      `${formatThousands(operand.value)}${decimalAtEnd ? '.' : ''}` : 
      operand.label;
}

function formatThousands(a: number): string {
  const b = a.toLocaleString('en-US', {
  });

  return b;
}

export function isNumTooLong(label: string): boolean {

  return label.split('.')[0].length > 13;
}

