import { TestBed } from '@angular/core/testing';

import { InventaroitemService } from './inventaroitem.service';

describe('InventaroitemService', () => {
  let service: InventaroitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventaroitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
