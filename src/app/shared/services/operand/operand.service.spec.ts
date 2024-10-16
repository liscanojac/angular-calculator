import { TestBed } from '@angular/core/testing';

import { OperandService } from './operand.service';

describe('OperandService', () => {
  let service: OperandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
