import { TestBed } from '@angular/core/testing';

import { AsistenciasubcategoriaService } from './asistenciasubcategoria.service';

describe('AsistenciasubcategoriaService', () => {
  let service: AsistenciasubcategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciasubcategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
