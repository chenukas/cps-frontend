import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequisitionComponent } from './create-requisition.component';

describe('CreateRequisitionComponent', () => {
  let component: CreateRequisitionComponent;
  let fixture: ComponentFixture<CreateRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
