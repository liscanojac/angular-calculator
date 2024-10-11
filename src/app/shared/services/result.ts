import { errorMsg } from "./errorMsg";
import { Result } from "./models/calculator.model";
import { formatOperand, isNumTooLong } from "./operand";

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