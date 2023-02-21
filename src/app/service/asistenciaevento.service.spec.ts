import { TestBed } from '@angular/core/testing';

import { AsistenciaeventoService } from './asistenciaevento.service';

describe('AsistenciaeventoService', () => {
  let service: AsistenciaeventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaeventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
