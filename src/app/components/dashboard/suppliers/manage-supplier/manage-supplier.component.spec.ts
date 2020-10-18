import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageSupplierComponent } from './manage-supplier.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageSupplierComponent', () => {
  let component: ManageSupplierComponent;
  let fixture: ComponentFixture<ManageSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupplierComponent],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
