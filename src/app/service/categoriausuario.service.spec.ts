import { TestBed } from '@angular/core/testing';

import { CategoriausuarioService } from './categoriausuario.service';

describe('CategoriausuarioService', () => {
  let service: CategoriausuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriausuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
