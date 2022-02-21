import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptItemsComponentComponent } from './dept-items-component.component';

describe('DeptItemsComponentComponent', () => {
  let component: DeptItemsComponentComponent;
  let fixture: ComponentFixture<DeptItemsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptItemsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptItemsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
