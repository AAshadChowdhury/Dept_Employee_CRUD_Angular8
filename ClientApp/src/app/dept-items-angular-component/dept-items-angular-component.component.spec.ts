import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptItemsAngularComponentComponent } from './dept-items-angular-component.component';

describe('DeptItemsAngularComponentComponent', () => {
  let component: DeptItemsAngularComponentComponent;
  let fixture: ComponentFixture<DeptItemsAngularComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptItemsAngularComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptItemsAngularComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
