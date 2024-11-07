import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModelComponent } from './menu-model.component';

describe('MenuModelComponent', () => {
  let component: MenuModelComponent;
  let fixture: ComponentFixture<MenuModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
