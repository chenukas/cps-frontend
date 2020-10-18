import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateSupplierComponent } from './create-supplier.component';

describe('CreateSupplierComponent', () => {
  let component: CreateSupplierComponent;
  let fixture: ComponentFixture<CreateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSupplierComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
