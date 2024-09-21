import { OperationFunctions } from "./models/operations.model";

export const operations: OperationFunctions = {
  add: (a, b) => {
    let c = a + b;
    return c;
  },
  substract: (a, b) => a,
  multiply: (a, b) => a,
  divide: (a, b) => a,
  percent: (a, b) => a,
}