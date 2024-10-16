import { Injectable } from '@angular/core';
import { initialOperand } from '../../operations';
import { Button } from '../../interfaces/button';
import { OperandServiceInterface } from '../../interfaces/service';
import { Operand } from '../../interfaces/operand';

export const maxNumLength = 14;

@Injectable({
  providedIn: 'root'
})

export class OperandService implements OperandServiceInterface {

  first = {...initialOperand};
  second = {...initialOperand};

  constructor() { }

  resetAll() {
    this.first = {...initialOperand};
    this.second = {...initialOperand};
  }

  reset(operandType: Operand) {
    this[operandType] = {...initialOperand};
  }

  erase(operandType: Operand) {
    if (this[operandType].label.slice(-1) === '.') {
      this[operandType].decimal = false;
    }
    this[operandType].label = this[operandType].label.substring(0, this[operandType].label.length - 1);
    this[operandType].value = this[operandType].label ?
      parseFloat(this[operandType].label) : 
      0;
  }

  eraseLastCharacter(operandType: Operand) {
    if (this[operandType].label.slice(-1) === '.') {
      this[operandType].decimal = false;
    }
    this[operandType].label = this[operandType].label.substring(0, this[operandType].label.length - 1);
    this[operandType].value = this[operandType].label ?
      parseFloat(this[operandType].label) : 
      0;
  }

  typeOperand(operandType: Operand, btn: Button) {
    if (btn.value === 'substract') {
      // cambio de signo de operadores
      this[operandType].label += btn.label;
      return;
    }
    if(this.lengthAllowed(operandType)) {
      this[operandType].label += btn.label;
      if(btn.operand === 'decimal') this[operandType].decimal = true;
      if(!this.isOnlyDecimal(operandType)) this[operandType].value = parseFloat(this[operandType].label);
    }
  }

  isOnlyDecimal(operandType:Operand): boolean {
    return this[operandType].label === '.'
  }

  lengthAllowed(operandType: Operand): boolean {
    return this[operandType].label.length < maxNumLength + this.lengthFactor(operandType);
  }

  lengthFactor(operandType: Operand): number {
    return (this[operandType].decimal &&
            this[operandType].label.charAt(0) !== '.')
            ? 1 : 0;
  }
}
