import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStocksComponent } from './manage-stocks.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageStocksComponent', () => {
  let component: ManageStocksComponent;
  let fixture: ComponentFixture<ManageStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageStocksComponent],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
