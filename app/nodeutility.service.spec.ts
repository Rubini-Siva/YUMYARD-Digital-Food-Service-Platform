import { TestBed } from '@angular/core/testing';

import { NodeutilityService } from './nodeutility.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('NodeutilityService', () => {
  let service: NodeutilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
    }).compileComponents();
    service = TestBed.inject(NodeutilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
