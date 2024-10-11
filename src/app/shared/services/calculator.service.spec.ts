import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { buttonsObj } from './buttons';
import { OperationType } from './models/operations.model';
import { NumericType } from './models/button.model';

fdescribe('CalculatorService', () => {
  let service: CalculatorService;

  function setOperand(num: NumericType) {
    service.updateScreen(buttonsObj[num]);
  }

  function setOperation(opr: OperationType) {
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
    expect(service.operand.first.value).toEqual(0);
  });

  it('testing first operand length without decimals', () => {

    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.one);
    }
    expect(service.operand.first.label.length).toEqual(14);
  });

  it('testing first operand length starting with decimals', () => {

    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.operand.first.label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 2; i++) {
      service.updateScreen(buttonsObj.one);
    }
    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 15; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.operand.first.label.length).toEqual(15);
  });

  it('testing secondOperand just typing decimal', () => {

    setOperand('eight');
    setOperation('add');
    service.updateScreen(buttonsObj.decimal);
    expect(service.operand.second.value).toEqual(0);
  });

  it('testing secondOperand just typing decimal', () => {

    setOperand('eight');
    setOperation('add');
    service.updateScreen(buttonsObj.decimal);
    expect(service.operand.second.label).toEqual('.');
  });

  it('testing second operand length without decimals', () => {

    setOperand('eight');
    setOperation('add');
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.one);
    }
    expect(service.operand.second.label.length).toEqual(14);
  });

  it('testing second operand length starting with decimals', () => {

    setOperand('eight');
    setOperation('add');
    service.updateScreen(buttonsObj.decimal)
    for(let i = 0; i < 20; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.operand.second.label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    setOperand('eight');
    setOperation('add');
    for(let i = 0; i < 2; i++) {
      service.updateScreen(buttonsObj.one);
    }
    service.updateScreen(buttonsObj.decimal);
    for(let i = 0; i < 23; i++) {
      service.updateScreen(buttonsObj.two);
    }
    expect(service.operand.second.label.length).toEqual(15);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 25; i++) {
      setOperand('eight');
    }
    setOperation('add');
    for(let i = 0; i < 23; i++) {
      setOperand('one');
    }
    expect(service.result.label.length).toEqual(14);
  });

  it('testing first operand length with decimals', () => {

    for(let i = 0; i < 25; i++) {
      setOperand('eight');
    }
    setOperation('multiply');
    service.updateScreen(buttonsObj.decimal);
    for(let i = 0; i < 23; i++) {
      setOperand('one');
    }
    expect(service.calculatorScreen.result.split(',').join('').length).toEqual(15);
  });
});
