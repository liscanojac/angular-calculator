import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { buttonsObj } from './buttons';

fdescribe('CalculatorService', () => {
  let service: CalculatorService;

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

});
