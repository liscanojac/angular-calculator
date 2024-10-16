import { Injectable } from '@angular/core';
import { operations as calculatorOperations } from '../../operations';
import { OperationButton } from '../../interfaces/button';
import { Operation } from '../../interfaces/operations';
import { OperationServiceInterface, SelectedOperationService } from '../../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class OperationService implements OperationServiceInterface {

  label = '';
  selected = false;
  eval: Operation | undefined;

  constructor() { }
  
  isOperationSelected(): this is SelectedOperationService {
    return this.selected;
  };

  reset() {
    this.label = '';
    this.selected = false;
    this.eval = undefined;
  };

  setOperation(btn: OperationButton) {
    this.selected = true;
    this.label = btn.label;
    this.eval = calculatorOperations[btn.value];
  };

}
