import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { NumericType } from '../../interfaces/button';
import { buttonsObj } from '../../buttons';
import { OperationType } from '../../interfaces/operations';

fdescribe('CalculatorService', () => {
  let service: CalculatorService;
  
  function pressNumber(num: NumericType) {
    service.updateScreen(buttonsObj[num]);
  };

  function selectOperation(opr: OperationType) {
    service.updateScreen(buttonsObj[opr]);
  }

  function erase() {
    service.updateScreen(buttonsObj.erase);
  }

  function reset() {
    service.updateScreen(buttonsObj.reset);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing typing', () => {

    expect(service.updateScreen(buttonsObj.one).input).toEqual('1');
  });

  it('testing typing decimal', () => {

    service.updateScreen(buttonsObj.decimal);
    expect(service.getOperand('first').value).toEqual(0);
  });

  it('testing first operand length without decimals', () => {

    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.one);
    }
    expect(service.getOperand('first').label.length).toEqual(14);
  });

  it('testing first operand length starting with decimals', () => {

    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.getOperand('first').label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 2; i++) {
      service.updateScreen(buttonsObj.one);
    }
    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 15; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.getOperand('first').label.length).toEqual(15);
  });

  it('testing secondOperand just typing decimal', () => {

    pressNumber('eight');
    selectOperation('add');
    service.updateScreen(buttonsObj.decimal);
    expect(service.getOperand('second').value).toEqual(0);
  });

  it('testing secondOperand just typing decimal', () => {

    pressNumber('eight');
    selectOperation('add');
    service.updateScreen(buttonsObj.decimal);
    expect(service.getOperand('second').label).toEqual('.');
  });

  it('testing second operand length without decimals', () => {

    pressNumber('eight');
    selectOperation('add');
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.one);
    }
    expect(service.getOperand('second').label.length).toEqual(14);
  });

  it('testing second operand length starting with decimals', () => {

    pressNumber('eight');
    selectOperation('add');
    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.getOperand('second').label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    pressNumber('eight');
    selectOperation('add');
    for(let i = 0; i < 2; i++) {
      service.updateScreen(buttonsObj.one);
    }
    service.updateScreen(buttonsObj.decimal);
    for(let i = 0; i < 23; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.getOperand('second').label.length).toEqual(15);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 25; i++) {
      pressNumber('eight');
    }
    selectOperation('add');
    for(let i = 0; i < 23; i++) {
      pressNumber('one');
    }
    expect(service.result.label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 25; i++) {
      pressNumber('eight');
    }
    selectOperation('multiply');
    service.updateScreen(buttonsObj.decimal);
    for(let i = 0; i < 23; i++) {
      pressNumber('one');
    }
    expect(service.calculatorScreen.result.split(',').join('').length).toEqual(15);
  });
});
