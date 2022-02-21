import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptComponentComponent } from './dept-component.component';

describe('DeptComponentComponent', () => {
  let component: DeptComponentComponent;
  let fixture: ComponentFixture<DeptComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
