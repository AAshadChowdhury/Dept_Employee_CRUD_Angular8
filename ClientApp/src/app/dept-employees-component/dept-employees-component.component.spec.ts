import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptEmployeesComponentComponent } from './dept-employees-component.component';

describe('DeptEmployeesComponentComponent', () => {
  let component: DeptEmployeesComponentComponent;
  let fixture: ComponentFixture<DeptEmployeesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptEmployeesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptEmployeesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
