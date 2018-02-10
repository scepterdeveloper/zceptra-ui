import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailFormComponent } from './category-detail-form.component';

describe('CategoryDetailFormComponent', () => {
  let component: CategoryDetailFormComponent;
  let fixture: ComponentFixture<CategoryDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
