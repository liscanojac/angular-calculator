import { Button } from "./models/button.model";
import { BaseOperand } from "./models/calculator.model";

const maxNumLength = 14;

export function typeOperand(operand: BaseOperand, btn: Button) {
  if(operandLengthAllowed(operand)) {
      operand.label += btn.label
      if(btn.operand === 'decimal') operand.decimal = true;
      if(!operandOnlyDecimal(operand)) {
        operand.value = parseFloat(operand.label);
      }
    }
}

export function formatOperand(operand: BaseOperand): string {

  let decimalAtEnd = false;
  if(!operand.label || operand.label === '-') return operand.label;
  if (operand.label.slice(-1) === '.') decimalAtEnd = true;

  return operand.value > 999 ? 
      `${formatThousands(operand)}${decimalAtEnd ? '.' : ''}` : 
      operand.label;
}

export function operandOnlyDecimal(operand: BaseOperand): boolean {
  return operand.label === '.';
}

function formatThousands(operand: BaseOperand): string {
  const b = operand.value.toLocaleString('en-US', {
    maximumFractionDigits: maxNumLength - operand.label.split('.')[0].length
  });

  return b;
}

export function isNumTooLong(label: string): boolean {

  return label.split('.')[0].length > maxNumLength;
}

function operandLengthAllowed(operand: BaseOperand): boolean {

  return operand.label.length < maxNumLength + lenghtFactor(operand);
}

function lenghtFactor(operand: BaseOperand): number {
  return (operand.decimal &&
          operand.label.charAt(0) !== '.') 
          ? 1 : 0
}


