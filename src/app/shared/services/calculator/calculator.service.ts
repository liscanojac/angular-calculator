import { Injectable } from '@angular/core';
import { CalculatorScreen } from '../../interfaces/screen';
import { Operand } from '../../interfaces/operand';
import { initialResult } from '../../operations';
import { buttons } from '../../buttons';
import { OperandService } from '../operand/operand.service';
import { OperationService } from '../operation/operation.service';
import { Button, EqualButton, OperationButton } from '../../interfaces/button';
import { formatOperand, formatResult } from '../../format';
import { Result } from '../../interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  calculatorScreen: CalculatorScreen = {
    input: '',
    result: ''
  };

  result: Result = {...initialResult};

  constructor(
    private operand: OperandService,
    private operation: OperationService
  ) { }

  getButtons() {
    return buttons;
  };

  getCalculatorScreen() {
    return this.calculatorScreen;
  };

  resetResult() {
    this.result = {...initialResult};
  };

  resetCalculator() {
    this.operand.resetAll();
    this.operation.reset();
    this.resetResult();
  }

  erase() {
    if (this.operand.second.label && this.operation.isOperationSelected()) {
      //Borrar ultimo caracter de segundo operand
      this.operand.eraseLastCharacter('second');
      this.result = this.operation.eval(this.operand.first.value, this.operand.second.value);
      return;
    }
    if(this.operation.isOperationSelected()) {
      // Borrar operacion
      this.operation.reset();
      this.resetResult();
      return;
    }
    this.operand.eraseLastCharacter('first');
  }

  makeOperandFromResult(btn: OperationButton | EqualButton) {
    this.operand.first = this.result;
    this.operand.reset('second');
    this.result = {...initialResult};
    if (btn.operand === 'operation') {
      this.operation.setOperation(btn);
      if(this.operation.isOperationSelected() && btn.value === 'percent' && !this.operand.second.value) {
        this.result = this.operation.eval(this.operand.first.value);
      }
      return;
    }
    this.operation.reset();
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
        this.operand.resetAll();
        this.operation.reset();
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
      if (!this.operand.first.label || 
        (this.operation.isOperationSelected() && !this.operand.second.label)) {
        // cambio de signo de operadores
        this.operation.isOperationSelected() ?
          this.operand.typeOperand('second', btn) :
          this.operand.typeOperand('first', btn)
      }
      if (this.operand.first.label) this.operation.setOperation(btn);
      return;
    }
    // Escribir Numeros
    if (this.operation.selected) {
      this.operand.typeOperand('second', btn);
      if(this.operation.isOperationSelected() && !this.operand.isOnlyDecimal('second')){
        this.result = this.operation.eval(this.operand.first.value, this.operand.second.value);
      }
      return;
    }
    if(this.result.isError) this.resetResult();
    this.operand.typeOperand('first', btn);
  }

  getResult(): Result {
    return this.result;
  };

  getOperand(operandType: Operand) {
    return this.operand[operandType];
  }

  updateScreen(btn: Button): CalculatorScreen {
    this.calculate(btn);
    this.calculatorScreen.input = `${formatOperand(this.getOperand('first'))}${this.operation.label}${formatOperand(this.getOperand('second'))}`;
    this.calculatorScreen.result = formatResult(this.getResult());

    return this.calculatorScreen;
  }
}
