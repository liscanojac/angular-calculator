import { Injectable } from '@angular/core';
import { Button, EqualButton, OperationButton } from './models/button.model';
import { CalculatorScreen } from './models/screen.model';
import { Operand, Operation, Result } from './models/calculator.model';
import { buttons } from './buttons';
import { initialOperand, initialOperation, operations as calculatorOperations, initialResult } from './operations';
import { OperandType } from './models/operations.model';
import { formatOperand, operandOnlyDecimal, typeOperand } from './operand';
import { formatResult } from './result';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  calculatorScreen: CalculatorScreen = {
    input: '',
    result: ''
  };

  operand: Operand = {
    first: {...initialOperand},
    second: {...initialOperand}
  }

  operation: Operation = {...initialOperation}

  result: Result = {...initialResult}

  constructor() { }

  getButtons() {
    return buttons;
  }

  getCalculatorScreen() {
    return this.calculatorScreen;
  }

  resetOperands() {
    this.operand.first = {...initialOperand};
    this.operand.second = {...initialOperand};
    this.operation = {...initialOperation};
  }

  resetCalculator() {
    this.resetOperands();
    this.result = {...initialResult}
  }

  erase() {
    if (this.operand.second.label && this.operation.selected) {
      //Borrar ultimo caracter de segundo operand
      this.eraseLastCharacter('second');
      this.result = this.operation.eval(this.operand.first.value, this.operand.second.value);
      return;
    }
    if(this.operation.selected) {
      // Borrar operacion
      this.operation = {...initialOperation};
      this.result = {...initialResult};
      return;
    }
    this.eraseLastCharacter('first');
  }

  eraseLastCharacter(operandType: OperandType) {
    if (this.operand[operandType].label.slice(-1) === '.') {
      this.operand[operandType].decimal = false;
    }
    this.operand[operandType].label = this.operand[operandType].label.substring(0, this.operand[operandType].label.length - 1);
    this.operand[operandType].value = this.operand[operandType].label ?
      parseFloat(this.operand[operandType].label) : 
      0;
  }

  setOperation(btn: OperationButton) {
    this.operation.selected = true;
    this.operation.label = btn.label;
    this.operation.eval = calculatorOperations[btn.value];
    if (btn.value === 'percent' && !this.operand.second.value) {
      // calculo de percentajes por default
      this.result = this.operation.eval(this.operand.first.value);
    }
  }

  makeOperandFromResult(btn: OperationButton | EqualButton) {
    this.operand.first = this.result;
    this.operand.second = {...initialOperand};
    this.result = {...initialResult}
    btn.operand === 'operation' ? 
      this.setOperation(btn):
      this.operation = {...initialOperation};
  }

  calculate(btn: Button) {
    if (btn.operand === 'deletion') {
      // Donde se borra
      if(btn.value === 'reset') {
        this.resetCalculator();
        return;
      }
      this.erase();
      return;
    }
    if (btn.operand === 'equal' && this.operand.second.label) {
      if(this.result.isError) {
        // aca va el mensaje de error
        this.resetOperands();
        return;
      }
      this.makeOperandFromResult(btn)
      return;
    }
    if (btn.operand === 'operation') {
      // Operaciones Matematicas
      if (this.result.label && !this.result.isError) {
        this.makeOperandFromResult(btn);
      }
      if (btn.value === 'substract' && 
        ((!this.operand.first.label) || 
        (this.operation.selected && !this.operand.second.label))) {
        // cambio de signo de operadores
        this.operation.selected ? 
          this.operand.second.label += btn.label : 
          this.operand.first.label += btn.label
        return;
      }
      if (this.operand.first.label) this.setOperation(btn);
      return;
    }
    // Escribir Numeros
    if (this.operation.selected) {
      this.operand.second = typeOperand(this.operand.second, btn);
      if(!operandOnlyDecimal(this.operand.second)){
        this.result = this.operation.eval(this.operand.first.value, this.operand.second.value);
      }
      return;
    }
    if(this.result.isError) this.result = {...initialResult};
    this.operand.first = typeOperand(this.operand.first, btn);
  }

  getResultValue() {
    return this.result.value;
  }

  updateScreen(btn: Button): CalculatorScreen {

    this.calculate(btn);
    this.calculatorScreen.input = `${formatOperand(this.operand.first)}${this.operation.label}${formatOperand(this.operand.second)}`;
    this.calculatorScreen.result = formatResult(this.result);

    return this.calculatorScreen;
  }
}
