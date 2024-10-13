import { errorMsg } from "./errorMsg";
import { Result } from "./models/calculator.model";
import { formatOperand, isNumTooLong } from "./operand";
import { hasDecimals } from "./operations";

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

export function setResult(num: number, isError?: boolean): Result {

  if (isError) {
    return {
      value: 0,
      label: '',
      decimal: false,
      isError,
      errorCode: "0"
    };
  }
  const resultValue = parseFloat(num.toFixed(14));
  return {
    value: resultValue,
    label: resultValue.toString(),
    decimal: hasDecimals(num),
    isError: false,
    errorCode: "-1"
  };
}