import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequisitionComponent } from './manage-requisition.component';

describe('ManageRequisitionComponent', () => {
  let component: ManageRequisitionComponent;
  let fixture: ComponentFixture<ManageRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
