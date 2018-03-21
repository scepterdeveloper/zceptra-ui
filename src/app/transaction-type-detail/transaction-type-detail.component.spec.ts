import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeDetailComponent } from './transaction-type-detail.component';

describe('TransactionTypeDetailComponent', () => {
  let component: TransactionTypeDetailComponent;
  let fixture: ComponentFixture<TransactionTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
