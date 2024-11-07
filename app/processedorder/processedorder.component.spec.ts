import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedorderComponent } from './processedorder.component';

describe('ProcessedorderComponent', () => {
  let component: ProcessedorderComponent;
  let fixture: ComponentFixture<ProcessedorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessedorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessedorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
