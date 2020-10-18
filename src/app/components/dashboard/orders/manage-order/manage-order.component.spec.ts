import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderComponent } from './manage-order.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageOrderComponent', () => {
  let component: ManageOrderComponent;
  let fixture: ComponentFixture<ManageOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOrderComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
