import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEmployeesComponent } from './department-employees.component';

describe('DepartmentEmployeesComponent', () => {
  let component: DepartmentEmployeesComponent;
  let fixture: ComponentFixture<DepartmentEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
