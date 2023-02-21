import { TestBed } from '@angular/core/testing';

import { AsistenciamedicaService } from './asistenciamedica.service';

describe('AsistenciamedicaService', () => {
  let service: AsistenciamedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciamedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
