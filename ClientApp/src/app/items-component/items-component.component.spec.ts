import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponentComponent } from './items-component.component';

describe('ItemsComponentComponent', () => {
  let component: ItemsComponentComponent;
  let fixture: ComponentFixture<ItemsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
