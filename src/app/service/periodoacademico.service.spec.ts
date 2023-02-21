import { TestBed } from '@angular/core/testing';

import { PeriodoacademicoService } from './periodoacademico.service';

describe('PeriodoacademicoService', () => {
  let service: PeriodoacademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoacademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
