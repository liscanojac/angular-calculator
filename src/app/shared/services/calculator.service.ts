import { Injectable } from '@angular/core';
import { Button, Button2 } from './models/button.model';
import { CalculatorScreen } from './models/screen.model';
import { Calculator } from './models/calculator.model';
import { operations } from './operations';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  buttons: Array<Button2> = [
    {
      id: 7,
      operand: 'numeric',
      label: '7',
      value: 7
    },
    {
      id: 8,
      operand: 'numeric',
      label: '8',
      value: 8
    },
    {
      id: 9,
      operand: 'numeric',
      label: '9',
      value: 9
    },
    {
      id: 4,
      operand: 'numeric',
      label: '4',
      value: 4
    },
    {
      id: 5,
      operand: 'numeric',
      label: '5',
      value: 5
    },
    {
      id: 6,
      operand: 'numeric',
      label: '6',
      value: 6
    },
    {
      id: 1,
      operand: 'numeric',
      label: '1',
      value: 1
    },
    {
      id: 2,
      operand: 'numeric',
      label: '2',
      value: 2
    },
    {
      id: 3,
      operand: 'numeric',
      label: '3',
      value: 3
    },
    {
      id: 10,
      operand: 'operation',
      label: '+',
      value: 'add'
    },
    {
      id: 11,
      operand: 'operation',
      label: '-',
      value: 'substract'
    }
  ];

  calculatorScreen: CalculatorScreen = {
    input: '',
    result: ''
  };

  calculator: Calculator = {
    firstOperand: {
      value: 0,
      decimal: false,
      label: ''
    },
    secondOperand: {
      value: 0,
      decimal: false,
      label: ''
    },
    operation: {
      value: undefined,
      selected: false,
      label: ''
    },
    result: {
      value: 0,
      label: ''
    }
  }

  constructor() { }

  getButtons() {
    return this.buttons;
  }

  getCalculatorScreen() {
    return this.calculatorScreen;
  }

  resetCalculator() {
    this.calculator = {
          firstOperand: {
            value: 0,
            decimal: false,
            label: ''
          },
          secondOperand: {
            value: 0,
            decimal: false,
            label: ''
          },
          operation: {
            value: undefined,
            selected: false,
            label: ''
          },
          result: {
            value: 0,
            label: ''
          }
        }
  }

  eraseLastCharacter() {

  }
  calculate(btn: Button2) {
    if (btn.operand === 'deletion') {
      // Donde se borra
      btn.value === 'erase' ? this.resetCalculator() : this.eraseLastCharacter(); 
    }
    if (btn.operand === 'operation') {
      // Operaciones Matematicas
      if(btn.value === 'substract' && (!this.calculator.firstOperand.value) || (this.calculator.operation.selected && ! this.calculator.secondOperand.value)) {
        // cambio de signo de operadores
      }
      this.calculator.operation.selected = true;
      this.calculator.operation.label = btn.label;
      this.calculator.operation.value = operations[btn.value];
    }
    // Escribir Numeros
    if (this.calculator.operation.selected) {
      
      this.calculator.secondOperand.label += btn.label;
      this.calculator.secondOperand.value = parseFloat(this.calculator.secondOperand.label);
      this.calculator.result.value = this.calculator.operation.value(this.calculator.firstOperand.value, this.calculator.secondOperand.value);
      this.calculator.result.label = this.calculator.result.value.toString();
    }
    this.calculator.firstOperand.label += btn.label;
    this.calculator.firstOperand.value = parseFloat(this.calculator.firstOperand.label);
  }


  updateScreen(btn: Button2): CalculatorScreen {

    this.calculate(btn);

    return {
      input: '',
      result: ''
    }
  }
}
