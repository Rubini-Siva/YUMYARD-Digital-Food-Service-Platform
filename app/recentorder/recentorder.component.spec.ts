import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentorderComponent } from './recentorder.component';

describe('RecentorderComponent', () => {
  let component: RecentorderComponent;
  let fixture: ComponentFixture<RecentorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
