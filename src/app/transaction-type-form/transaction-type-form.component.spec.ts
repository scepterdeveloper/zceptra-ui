import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeFormComponent } from './transaction-type-form.component';

describe('TransactionTypeFormComponent', () => {
  let component: TransactionTypeFormComponent;
  let fixture: ComponentFixture<TransactionTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
