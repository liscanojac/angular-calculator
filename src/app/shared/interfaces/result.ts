import { BaseOperand } from "./operand";
import { ErrorMsgIndexes } from "./error";

interface ResultTrue extends BaseOperand {
  isError: true;
  errorCode: ErrorMsgIndexes;
}
interface ResultFalse extends BaseOperand {
  isError: false;
  errorCode: "-1";
}

export type Result = ResultTrue | ResultFalse
