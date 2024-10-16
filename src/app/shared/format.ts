import { errorMsg } from "./errorMsg";
import { BaseOperand } from "./interfaces/operand";
import { Result } from "./interfaces/result";
import { maxNumLength } from "./services/operand/operand.service";

export function formatOperand(operand: BaseOperand): string {

  let decimalAtEnd = false;
  if(!operand.label || operand.label === '-') return operand.label;
  if (operand.label.slice(-1) === '.') decimalAtEnd = true;

  return operand.value > 999 ? 
      `${formatThousands(operand)}${decimalAtEnd ? '.' : ''}` : 
      operand.label;
}

export function formatResult(result: Result): string {
  if (result.isError) {
    //handler of error messages
    return errorMsg[result.errorCode];
  }
  if (isNumTooLong(result.label)) {
    return result.value.toExponential(5);
  }
  return formatOperand(result);
}

function formatThousands(operand: BaseOperand): string {
  const b = operand.value.toLocaleString('en-US', {
    maximumFractionDigits: maxNumLength - operand.label.split('.')[0].length
  });

  return b;
}

function isNumTooLong(label: string): boolean {

  return label.split('.')[0].length > maxNumLength;
}
