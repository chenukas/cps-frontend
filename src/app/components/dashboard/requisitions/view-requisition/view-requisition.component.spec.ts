import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequisitionComponent } from './view-requisition.component';

describe('ViewRequisitionComponent', () => {
  let component: ViewRequisitionComponent;
  let fixture: ComponentFixture<ViewRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
